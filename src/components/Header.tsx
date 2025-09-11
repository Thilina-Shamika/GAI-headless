"use client"

import Link from "next/link"
import { Menu, X } from "lucide-react"
import { useState } from "react"

export type HeaderProps = {
	title?: string
	logoUrl?: string
	menu?: Array<{ label?: string; href?: string }>
}

export default function Header({ title = "Site", logoUrl, menu = [] }: HeaderProps) {
	const [open, setOpen] = useState(false)
	return (
		<header className="border-b">
			<div className="mx-auto max-w-5xl px-4 py-3 flex items-center justify-between">
				<Link href="/" className="flex items-center gap-2">
					{logoUrl ? (
						<img src={logoUrl} alt="Logo" className="h-10 w-10 rounded" />
					) : null}
					<span className="text-base sm:text-lg font-semibold">{title}</span>
				</Link>
				<nav className="hidden sm:flex items-center gap-4">
					{menu?.map((m, i) => (
						<Link key={`${m.href}-${i}`} href={m.href || "#"} className="text-sm text-neutral-700 hover:text-black">
							{m.label}
						</Link>
					))}
				</nav>
				<button className="sm:hidden" aria-label="Toggle menu" onClick={() => setOpen((v) => !v)}>
					{open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
				</button>
			</div>
			{open ? (
				<div className="sm:hidden border-t">
					<nav className="mx-auto max-w-5xl px-4 py-3 flex flex-col gap-3">
						{menu?.map((m, i) => (
							<Link key={`${m.href}-${i}`} href={m.href || "#"} className="text-sm text-neutral-700 hover:text-black">
								{m.label}
							</Link>
						))}
					</nav>
				</div>
			) : null}
		</header>
	)
}
