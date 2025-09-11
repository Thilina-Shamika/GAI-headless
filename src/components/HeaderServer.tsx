import Image from "next/image"
import Link from "next/link"
import { Phone } from "lucide-react"
import HeaderNavClient from "@/components/HeaderNavClient"
import FadeIn from "@/components/FadeIn"

async function fetchHeader() {
	const baseUrl = process.env.WP_HEADER_URL || "http://gai.local/wp-json/wp/v2/header"
	const url = `${baseUrl}?per_page=1&orderby=modified&order=desc`
	const res = await fetch(url, { cache: "no-store" })
	if (!res.ok) return null
	const arr = (await res.json()) as any[]
	const item = Array.isArray(arr) ? arr[0] : null
	if (!item) return null
	const acf = item.acf || {}
	const logo = acf["logo"]
	const logoUrl: string | undefined = typeof logo?.url === "string" ? logo.url : undefined
	const logoAlt: string = typeof logo?.alt === "string" ? logo.alt : "Logo"
	const menuRaw: Array<any> = Array.isArray(acf["menu"]) ? acf["menu"] : []
	const menu = menuRaw
		.filter((m) => (m?.acf_fc_layout || "").toLowerCase() === "menu_items")
		.map((m) => ({ label: m?.page_name as string, href: (m?.page_link?.url as string) || "#" }))
	const callText: string = acf["call_us_now"] || "Call us now"
	const callHref: string | undefined = acf["call_link"]?.url || (acf["call_us_now"] ? `tel:${acf["call_us_now"]}` : undefined)
	return { logoUrl, logoAlt, menu, callText, callHref }
}

export default async function HeaderServer() {
	const data = await fetchHeader()
	if (!data) return null
	const { logoUrl, logoAlt, menu, callText, callHref } = data
	return (
		<FadeIn>
			<header className="w-full border-b bg-white">
				<div className="mx-auto w-full max-w-[1600px] px-4 sm:px-6 lg:px-8">
					{/* Mobile: 2 cols (logo, hamburger). Desktop: 12 cols (3:6:3) */}
					<div className="grid grid-cols-2 md:grid-cols-12 items-center gap-4 py-4">
						{/* Logo */}
						<div className="flex items-center gap-3 md:col-span-3">
							{logoUrl ? (
								<Link href="/" className="block w-full max-w-[120px]">
									{/* eslint-disable-next-line @next/next/no-img-element */}
									<img src={logoUrl} alt={logoAlt} className="w-full h-auto" />
								</Link>
							) : (
								<span className="text-lg font-semibold">Site</span>
							)}
						</div>
						{/* Desktop menu */}
						<nav className="hidden md:flex items-center justify-center gap-8 md:col-span-6">
							{menu.map((m, i) => (
								<Link key={`${m.href}-${i}`} href={m.href} className="text-[15px] text-neutral-800 hover:text-black">
									{m.label}
								</Link>
							))}
						</nav>
						{/* Mobile hamburger (right column) */}
						<div className="md:hidden flex justify-end">
							<HeaderNavClient menu={menu} />
						</div>
						{/* Desktop call button (right col) */}
						<div className="hidden md:flex items-center justify-end md:col-span-3">
							{callHref ? (
								<a href={callHref} className="inline-flex items-center gap-2 rounded-md bg-[#273378] px-4 py-2 text-white">
									<Phone className="h-4 w-4" />
									<div className="leading-tight text-sm text-left">
										<div className="font-medium">Call us now</div>
										<div className="opacity-90 text-[15px]">{callText}</div>
									</div>
								</a>
							) : (
								<div className="inline-flex items-center gap-2 rounded-md bg-[#273378] px-4 py-2 text-white">
									<Phone className="h-4 w-4" />
									<div className="leading-tight text-sm">
										<div className="font-medium">Call us now</div>
										<div className="opacity-90 text-[15px]">{callText}</div>
									</div>
								</div>
							)}
						</div>
						{/* Mobile full-width call button row */}
						<div className="col-span-2 md:hidden">
							{callHref ? (
								<a href={callHref} className="block w-full items-center gap-2 rounded-md bg-[#273378] px-4 py-3 text-white text-left">
									<span className="inline-flex items-center gap-2">
										<Phone className="h-5 w-5" />
										<span className="font-medium">Call us now</span>
									</span>
									<div className="opacity-90 text-base mt-1">{callText}</div>
								</a>
							) : (
								<div className="block w-full items-center gap-2 rounded-md bg-[#273378] px-4 py-3 text-white">
									<span className="inline-flex items-center gap-2">
										<Phone className="h-5 w-5" />
										<span className="font-medium">Call us now</span>
									</span>
									<div className="opacity-90 text-base mt-1">{callText}</div>
								</div>
							)}
						</div>
					</div>
				</div>
			</header>
		</FadeIn>
	)
}
