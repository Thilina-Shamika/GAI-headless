"use client"

import Link from "next/link"
import { motion } from "framer-motion"

export type PostListItem = {
	id: string
	slug: string
	title: string
	excerpt?: string
}

export default function PostsList({ posts }: { posts: PostListItem[] }) {
	return (
		<div>
			<motion.h1
				initial={{ opacity: 0, y: 10 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.4 }}
				className="text-3xl font-semibold tracking-tight sm:text-4xl"
			>
				Latest posts
			</motion.h1>
			{posts.length === 0 ? (
				<p className="mt-6 text-sm text-neutral-600">
					No posts found. Ensure <code>.env.local</code> has <code>WP_GRAPHQL_ENDPOINT</code> set and restart the dev server.
				</p>
			) : (
				<ul className="mt-8 space-y-6">
					{posts.map((p) => (
						<li key={p.id} className="rounded-lg border border-neutral-200 p-4 hover:bg-neutral-50 transition-colors">
							<Link href={`/posts/${p.slug}`} className="block">
								<motion.h2 initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }} className="text-xl font-medium">
									{p.title}
								</motion.h2>
								{p.excerpt ? (
									<p className="mt-2 line-clamp-3 text-sm text-neutral-600" dangerouslySetInnerHTML={{ __html: p.excerpt }} />
								) : null}
							</Link>
						</li>
					))}
				</ul>
			)}
		</div>
	)
}
