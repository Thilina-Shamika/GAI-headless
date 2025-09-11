"use client"

import { motion } from "framer-motion"

export default function PostContent({ title, html, image }: { title: string; html: string; image?: { src?: string; alt?: string } }) {
	return (
		<article className="prose dark:prose-invert mx-auto">
			<motion.h1 initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="mb-2">
				{title}
			</motion.h1>
			{image?.src ? (
				<motion.img
					src={image.src}
					alt={image.alt || ''}
					className="w-full rounded-lg border"
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ delay: 0.1 }}
				/>
			) : null}
			<div className="mt-6" dangerouslySetInnerHTML={{ __html: html }} />
		</article>
	)
}
