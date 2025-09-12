import HomeHero from "@/components/HomeHero"
import { normalizeWpLink } from "@/lib/wp-rest"
import Assessment from "@/components/Assessment"
import MarqueeCountries from "@/components/MarqueeCountries"
import AboutUsHome from "@/components/AboutUsHome"

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

	// Resolve collage images and success rate from possible field names (including *_about keys)
	const collage1 = (acf?.collage_image_1_about?.url || acf?.collage_image_1?.url || acf?.collage1?.url || acf?.about_collage_1?.url || acf?.about_collage_image_1?.url) as string | undefined
	const collage2 = (acf?.collage_image_2_about?.url || acf?.collage_image_2?.url || acf?.collage2?.url || acf?.about_collage_2?.url || acf?.about_collage_image_2?.url) as string | undefined
	const successRate = (acf?.successful_rate || acf?.successfull_rate || acf?.success_rate) as string | undefined

	const aboutProps = {
		subheading: acf?.about_subheading as string | undefined,
		heading: acf?.about_heading as string | undefined,
		description: acf?.about_description as string | undefined,
		highlights: (Array.isArray(acf?.about_highlights) ? acf?.about_highlights : []).map((x: any) => x?.about_bullet_points).filter(Boolean),
		stats: (Array.isArray(acf?.about_stats_block) ? acf?.about_stats_block : []).map((x: any) => ({ value: x?.about_stat_number, label: x?.about_stat_number_description })),
		button: { text: acf?.about_button_text as string | undefined, href: normalizeWpLink(acf?.about_button_link?.url) || "#" },
		collage1Url: collage1,
		collage2Url: collage2,
		successRate: successRate,
	}
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
			<AboutUsHome {...aboutProps} />
		</>
	)
}
