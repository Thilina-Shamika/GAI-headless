import { GraphQLClient } from 'graphql-request'

function getValidatedEndpoint(): string | null {
	const raw = process.env.WP_GRAPHQL_ENDPOINT?.trim()
	if (!raw) return null
	try {
		// Validate URL format to prevent runtime "Invalid URL"
		new URL(raw)
		return raw
	} catch {
		return null
	}
}

export function tryGetWpClient(): GraphQLClient | null {
	const endpoint = getValidatedEndpoint()
	if (!endpoint) {
		if (process.env.NODE_ENV !== 'production') {
			console.warn('WP_GRAPHQL_ENDPOINT is missing or invalid. Set it in .env.local to enable data fetching.')
		}
		return null
	}
	const headers: Record<string, string> = {}
	if (process.env.WP_HEADLESS_AUTH_TOKEN) {
		headers['Authorization'] = `Bearer ${process.env.WP_HEADLESS_AUTH_TOKEN}`
	}
	return new GraphQLClient(endpoint, { headers })
}
