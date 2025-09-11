import HomeHero from "@/components/HomeHero"
import { normalizeWpLink } from "@/lib/wp-rest"
import Assessment from "@/components/Assessment"
import MarqueeCountries from "@/components/MarqueeCountries"

function buildHomeUrl(): string | null {
	const explicit = process.env.WP_HOME_PAGE_URL
	if (explicit) return explicit
	const base = process.env.WP_REST_BASE
	if (base) return `${base.replace(/\/$/, '')}/wp/v2/pages?slug=home&per_page=1`
	return `http://gai.local/wp-json/wp/v2/pages?slug=home&per_page=1`
}

async function fetchHomePage() {
	const url = buildHomeUrl()
	try {
		const res = await fetch(url!, { cache: "no-store" })
		if (!res.ok) return null
		const list = (await res.json()) as any[]
		return list?.[0] ?? null
	} catch {
		return null
	}
}

export default async function HomeHeroServer() {
	const page = await fetchHomePage()
	const acf = page?.acf || {}
	const heroProps = {
		subheading: acf?.subheading as string | undefined,
		heading: (acf?.haeding as string | undefined) || (acf?.heading as string | undefined),
		description: acf?.description as string | undefined,
		primary: { text: acf?.primary_button_text as string | undefined, href: normalizeWpLink(acf?.primary_button_link?.url) || "#" },
		secondary: { text: acf?.secondary_button_text as string | undefined, href: normalizeWpLink(acf?.secondary_button_link?.url) || "#" },
		counters: (Array.isArray(acf?.counter) ? acf?.counter : []).map((c: any) => ({ number: c?.counter_number, unit: c?.counter_text, description: c?.counter_description })),
		circleImageUrl: acf?.circle_image?.url as string | undefined,
		rotatingImageUrl: acf?.rotating_image?.url as string | undefined,
	}
	const assessmentProps = {
		subheading: acf?.assessment_subheading as string | undefined,
		heading: acf?.assessment_heading as string | undefined,
		description: acf?.assessment_description as string | undefined,
		highlights: (Array.isArray(acf?.highlights) ? acf?.highlights : []).map((b: any) => b?.bullet_points_text).filter(Boolean),
		formNote: acf?.form_note as string | undefined,
	}
	const countries: string[] = (Array.isArray(acf?.country_list) ? acf?.country_list : []).map((x: any) => x?.country_name).filter(Boolean)
	if (!page) {
		return (
			<section className="mx-auto max-w-2xl px-4 py-10">
				<p>Debug: Home page not found from REST. Tried: {buildHomeUrl()}</p>
			</section>
		)
	}
	return (
		<>
			<HomeHero {...heroProps} />
			{countries.length ? <MarqueeCountries countries={countries} /> : null}
			<Assessment {...assessmentProps} />
		</>
	)
}
