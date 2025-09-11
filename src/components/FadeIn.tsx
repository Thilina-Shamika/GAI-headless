"use client"

import { motion } from "framer-motion"
import { PropsWithChildren } from "react"

export default function FadeIn({ children }: PropsWithChildren) {
	return (
		<motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }}>
			{children}
		</motion.div>
	)
}
