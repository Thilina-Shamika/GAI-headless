import { fetchAllSlugs, fetchPostBySlug } from '@/lib/wp-api'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import PostContent from '@/components/PostContent'

export async function generateStaticParams() {
	const slugs = await fetchAllSlugs(50)
	return slugs.map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
	const post = await fetchPostBySlug(params.slug)
	if (!post) return {}
	return {
		title: post.seo?.title || post.title,
		description: post.seo?.metaDesc,
	}
}

export default async function PostPage({ params }: { params: { slug: string } }) {
	const post = await fetchPostBySlug(params.slug)
	if (!post) return notFound()
	return (
		<div className="mx-auto px-4 py-10">
			<PostContent
				title={post.title}
				html={post.content || ''}
				image={{ src: post.featuredImage?.node?.sourceUrl, alt: post.featuredImage?.node?.altText || '' }}
			/>
		</div>
	)
}
