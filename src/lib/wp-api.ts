import { tryGetWpClient } from '@/lib/wp-client'
import { gql } from 'graphql-request'
import { QUERY_ALL_POSTS, QUERY_POST_BY_SLUG, QUERY_ALL_SLUGS } from '@/lib/wp-queries'

export type WpPostSummary = {
	id: string
	slug: string
	title: string
	excerpt?: string
	date?: string
	featuredImage?: {
		node?: { sourceUrl?: string; altText?: string }
	}
}

export type WpPost = WpPostSummary & {
	content?: string
	seo?: { title?: string; metaDesc?: string }
}

export async function fetchAllPosts(limit: number = 10): Promise<WpPostSummary[]> {
	const client = tryGetWpClient()
	if (!client) return []
	const data = await client.request(gql`${QUERY_ALL_POSTS}`, { first: limit })
	return data?.posts?.nodes ?? []
}

export async function fetchAllSlugs(limit: number = 100): Promise<string[]> {
	const client = tryGetWpClient()
	if (!client) return []
	const data = await client.request(gql`${QUERY_ALL_SLUGS}`, { first: limit })
	return (data?.posts?.nodes ?? []).map((n: { slug: string }) => n.slug)
}

export async function fetchPostBySlug(slug: string): Promise<WpPost | null> {
	const client = tryGetWpClient()
	if (!client) return null
	const data = await client.request(gql`${QUERY_POST_BY_SLUG}`, { slug })
	return data?.post ?? null
}
