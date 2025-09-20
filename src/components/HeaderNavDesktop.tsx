"use client"

import { useState } from "react"
import Link from "next/link"
import { ChevronDown } from "lucide-react"
import { AnimatePresence, motion } from "framer-motion"

export type HeaderMenuItem = { label: string; href: string }
export type VisitVisaItem = { 
	id: number
	slug: string
	title: { rendered: string }
	acf?: { service_name?: string }
}

export default function HeaderNavDesktop({ 
	menu, 
	visitVisas 
}: { 
	menu: HeaderMenuItem[]
	visitVisas: VisitVisaItem[]
}) {
	const [hoveredItem, setHoveredItem] = useState<string | null>(null)

	return (
		<nav className="hidden md:flex items-center justify-evenly w-full md:col-span-9">
			{menu.map((m, i) => (
				<div
					key={`${m.href}-${i}`}
					className="relative"
					onMouseEnter={() => setHoveredItem(m.label)}
					onMouseLeave={() => setHoveredItem(null)}
				>
					<Link
						href={m.href}
						className="text-[14px] text-neutral-800 hover:text-black flex items-center gap-1"
					>
						{m.label}
						{m.label.toLowerCase() === "visit visa" && (
							<ChevronDown className="h-3 w-3" />
						)}
					</Link>
					
					{/* Visit Visa Submenu */}
					{m.label.toLowerCase() === "visit visa" && (
						<AnimatePresence>
							{hoveredItem === "Visit Visa" && (
								<motion.div
									initial={{ opacity: 0, y: 10 }}
									animate={{ opacity: 1, y: 0 }}
									exit={{ opacity: 0, y: 10 }}
									transition={{ duration: 0.2 }}
									className="absolute top-full left-0 mt-2 w-64 bg-white border border-gray-200 rounded-lg shadow-lg z-50"
									onMouseEnter={() => setHoveredItem("Visit Visa")}
									onMouseLeave={() => setHoveredItem(null)}
								>
									<div className="py-2">
										{visitVisas.length > 0 ? (
											visitVisas.map((visa) => {
												const title = visa.acf?.service_name || visa.title?.rendered || "Visit Visa"
												return (
													<Link
														key={visa.id}
														href={`/visit-visa/${visa.slug}`}
														className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 transition-colors"
													>
														{title}
													</Link>
												)
											})
										) : (
											<div className="px-4 py-2 text-sm text-gray-500">
												No visit visa items found
											</div>
										)}
									</div>
								</motion.div>
							)}
						</AnimatePresence>
					)}
				</div>
			))}
		</nav>
	)
}
