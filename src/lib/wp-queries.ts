export const QUERY_ALL_POSTS = /* GraphQL */ `
	query AllPosts($first: Int = 10) {
		posts(first: $first, where: {orderby: {field: DATE, order: DESC}}) {
			nodes {
				id
				slug
				title
				excerpt
				date
				featuredImage {
					node {
						sourceUrl
						altText
					}
				}
			}
		}
	}
`

export const QUERY_POST_BY_SLUG = /* GraphQL */ `
	query PostBySlug($slug: ID!) {
		post(id: $slug, idType: SLUG) {
			id
			slug
			title
			content
			date
			featuredImage {
				node {
					sourceUrl
					altText
				}
			}
			seo {
				title
				metaDesc
			}
		}
	}
`

export const QUERY_ALL_SLUGS = /* GraphQL */ `
	query AllSlugs($first: Int = 100) {
		posts(first: $first) {
			nodes { slug }
		}
	}
`
