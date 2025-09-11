"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"
import { AnimatePresence, motion } from "framer-motion"

export type HeaderMenuItem = { label: string; href: string }

export default function HeaderNavClient({ menu }: { menu: HeaderMenuItem[] }) {
	const [open, setOpen] = useState(false)
	return (
		<div className="md:hidden">
			<button
				aria-label={open ? "Close menu" : "Open menu"}
				onClick={() => setOpen((v) => !v)}
				className="inline-flex items-center justify-center rounded-md border px-3 py-2 text-sm"
		>
			{open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
		</button>
			<AnimatePresence>
				{open ? (
					<motion.div
						key="backdrop"
						className="fixed inset-0 z-50 bg-black/50"
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						onClick={() => setOpen(false)}
					>
						<motion.div
							key="drawer"
							className="absolute right-0 top-0 h-full w-5/6 max-w-xs bg-white shadow-lg p-5 flex flex-col gap-3"
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							exit={{ opacity: 0 }}
							onClick={(e) => e.stopPropagation()}
						>
							<div className="flex items-center justify-between mb-2">
								<span className="text-sm font-medium">Menu</span>
								<button aria-label="Close" onClick={() => setOpen(false)} className="p-1">
									<X className="h-5 w-5" />
								</button>
							</div>
							<nav className="flex flex-col">
								{menu.map((m, i) => (
									<Link
										key={`${m.href}-drawer-${i}`}
										href={m.href}
										className="px-2 py-3 text-base text-neutral-800 hover:bg-neutral-100 rounded"
										onClick={() => setOpen(false)}
									>
										{m.label}
									</Link>
								))}
							</nav>
						</motion.div>
					</motion.div>
				) : null}
			</AnimatePresence>
		</div>
	)
}
