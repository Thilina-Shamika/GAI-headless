function validateUrl(input?: string | null): string | null {
	if (!input) return null
	try {
		const u = new URL(input)
		return u.toString().replace(/\/$/, '')
	} catch {
		return null
	}
}

function ensureAbsoluteHttpUrl(input?: string): string | undefined {
	if (!input) return undefined
	const trimmed = input.trim()
	if (!trimmed) return undefined
	if (/^https?:\/\//i.test(trimmed)) return trimmed
	if (/^mailto:/i.test(trimmed)) return trimmed
	return `https://${trimmed.replace(/^\/*/, '')}`
}

function deriveRestBaseFromGraphql(): string | null {
	const gql = validateUrl(process.env.WP_GRAPHQL_ENDPOINT)
	if (!gql) return null
	try {
		const url = new URL(gql)
		return `${url.origin}/wp-json`
	} catch {
		return null
	}
}

function getWpRestBase(): string | null {
	const fromEnv = validateUrl(process.env.WP_REST_BASE)
	if (fromEnv) return fromEnv
	const derived = deriveRestBaseFromGraphql()
	if (derived) return derived
	return null
}

export function normalizeWpLink(href?: string): string | undefined {
	if (!href) return undefined
	try {
		const restBase = getWpRestBase()
		if (restBase) {
			const origin = new URL(restBase).origin
			const url = new URL(href, origin)
			// If link starts with WP site origin, convert to pathname
			if (url.origin === origin) return url.pathname.replace(/\/$/, '') || '/'
			return url.toString()
		}
		return href
	} catch {
		return href
	}
}

export type HeaderOptions = {
	site_title?: string
	logo_url?: string
	primary_menu?: Array<{ label?: string; href?: string }>
	rest_api_endpoint?: string
}

export async function fetchAcfOptions(): Promise<HeaderOptions | null> {
	const base = getWpRestBase()
	if (!base) return null
	const url = `${base}/acf/v3/options/options`
	try {
		const res = await fetch(url, { next: { revalidate: 300 } })
		if (!res.ok) return null
		const json = await res.json()
		return (json?.acf ?? null) as HeaderOptions | null
	} catch {
		return null
	}
}

export type TopBarItem = {
	id: number
	slug?: string
	title?: { rendered?: string }
	acf?: Record<string, any>
}

export type TopBarData = {
	workingHours?: string
	email?: string
	socials?: Array<{ label?: string; href?: string; icon?: string }>
}

function extractUrlLike(input: any): string | undefined {
	if (!input) return undefined
	if (typeof input === 'string') return input
	if (typeof input === 'object') {
		if (typeof input.url === 'string') return input.url
		if (input.link && typeof input.link.url === 'string') return input.link.url
	}
	return undefined
}

function coerceEmailFromAcf(acf: Record<string, any>): string | undefined {
	const emailUrl = extractUrlLike(acf['email_url'])
	if (emailUrl) return /^mailto:/i.test(emailUrl) ? emailUrl : `mailto:${emailUrl}`
	if (typeof acf['email'] === 'string' && acf['email'].includes('@')) return `mailto:${acf['email']}`
	const candidates = ["contact_email", "contactEmail", "mail"]
	for (const key of candidates) {
		const raw = acf[key]
		const val = typeof raw === 'object' ? extractUrlLike(raw) : raw
		if (typeof val === 'string' && val.includes('@')) return `mailto:${val}`
	}
	return undefined
}

function coerceWorkingHoursFromAcf(acf: Record<string, any>): string | undefined {
	if (typeof acf['working_hours'] === 'string' && acf['working_hours'].length > 0) return acf['working_hours']
	const candidates = ["workingHours", "hours", "opening_hours", "openingHours"]
	for (const key of candidates) {
		const val = acf[key]
		if (typeof val === "string" && val.length > 0) return val
	}
	return undefined
}

function coerceSocialsFromAcf(acf: Record<string, any>): Array<{ label?: string; href?: string; icon?: string }> {
	const flex = acf['social_media']
	if (Array.isArray(flex)) {
		return flex
			.filter((row) => row && (row.acf_fc_layout ? String(row.acf_fc_layout).toLowerCase() === 'social_icons' : true))
			.map((row) => {
				const label = row?.social_media || row?.label || row?.platform || undefined
				const hrefRaw = extractUrlLike(row?.social_media_link ?? row?.href ?? row?.url)
				return {
					label,
					href: ensureAbsoluteHttpUrl(hrefRaw),
					icon: row?.icon ?? label,
				}
			})
			.filter((s) => !!s.href)
	}
	return []
}

export async function fetchHeaderTopBar(): Promise<TopBarData | null> {
	const explicitCollection = validateUrl(process.env.WP_HEADER_TOP_BAR_URL)
	let baseCollectionUrl: string | null = null
	if (explicitCollection) {
		baseCollectionUrl = explicitCollection
	} else {
		const base = getWpRestBase()
		if (!base) return null
		baseCollectionUrl = `${base}/wp/v2/top-bar-header`
	}
	const collectionUrl = `${baseCollectionUrl}?per_page=1&orderby=modified&order=desc`
	try {
		const res = await fetch(collectionUrl, { cache: 'no-store' })
		if (!res.ok) return null
		const list = (await res.json()) as TopBarItem[]
		const first = Array.isArray(list) ? list[0] : null
		if (!first) return null
		let acf: Record<string, any> = (first.acf ?? {}) as Record<string, any>
		if (Object.keys(acf).length === 0) {
			const base = getWpRestBase()
			if (base) {
				const acfUrl = `${base}/acf/v3/top-bar-header/${first.id}`
				try {
					const acfRes = await fetch(acfUrl, { cache: 'no-store' })
					if (acfRes.ok) {
						const acfJson = await acfRes.json()
						acf = (acfJson?.acf ?? {}) as Record<string, any>
					}
				} catch {}
			}
		}
		const workingHours = coerceWorkingHoursFromAcf(acf)
		const email = coerceEmailFromAcf(acf)
		const socials = coerceSocialsFromAcf(acf)
		return { workingHours, email, socials }
	} catch (e) {
		return null
	}
}

export type RestPostSummary = {
	id: number
	slug: string
	title: { rendered: string }
	excerpt?: { rendered?: string }
}

export async function fetchPostsRest(limit: number = 10): Promise<Array<{ id: string; slug: string; title: string; excerpt?: string }>> {
	const base = getWpRestBase()
	if (!base) return []
	const url = `${base}/wp/v2/posts?per_page=${Math.max(1, Math.min(100, limit))}`
	try {
		const res = await fetch(url, { next: { revalidate: 60 } })
		if (!res.ok) return []
		const json = (await res.json()) as RestPostSummary[]
		return json.map((p) => ({
			id: String(p.id),
			slug: p.slug,
			title: p.title?.rendered ?? '',
			excerpt: p.excerpt?.rendered ?? undefined,
		}))
	} catch {
		return []
	}
}

// Pages
export type RestPage = { id: number; slug: string; acf?: Record<string, any> }

export async function fetchPageBySlug(slug: string): Promise<RestPage | null> {
	// Try explicit full URL override first if provided
	const explicit = validateUrl(process.env.WP_HOME_PAGE_URL)
	if (explicit) {
		try {
			if (process.env.NODE_ENV !== 'production') {
				console.info(`[fetchPageBySlug] Using explicit URL: ${explicit}`)
			}
			const res = await fetch(explicit, { cache: 'no-store' })
			if (res.ok) {
				const list = (await res.json()) as RestPage[]
				return list?.[0] ?? null
			}
		} catch {}
	}
	const base = getWpRestBase()
	if (!base) {
		if (process.env.NODE_ENV !== 'production') {
			console.warn('[fetchPageBySlug] WP_REST_BASE not set')
		}
		return null
	}
	const url = `${base}/wp/v2/pages?slug=${encodeURIComponent(slug)}&per_page=1`
	try {
		if (process.env.NODE_ENV !== 'production') {
			console.info(`[fetchPageBySlug] GET ${url}`)
		}
		const res = await fetch(url, { cache: 'no-store' })
		if (!res.ok) {
			if (process.env.NODE_ENV !== 'production') {
				console.warn(`[fetchPageBySlug] Non-200 ${res.status} from ${url}`)
			}
			return null
		}
		const list = (await res.json()) as RestPage[]
		return list?.[0] ?? null
	} catch (e) {
		if (process.env.NODE_ENV !== 'production') {
			console.warn(`[fetchPageBySlug] Failed to fetch ${url}`)
		}
		return null
	}
}
