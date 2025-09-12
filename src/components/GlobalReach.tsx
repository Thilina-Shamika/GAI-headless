"use client"

import Image from "next/image"
import Link from "next/link"

export type GlobalReachCountry = {
	country?: string
	points?: string
	flagUrl?: string
}

export type GlobalReachProps = {
	subheading?: string
	heading?: string
	description?: string
	button?: { text?: string; href?: string }
	countries?: GlobalReachCountry[]
	mapUrl?: string
	backgroundImageUrl?: string
}

export default function GlobalReach(props: GlobalReachProps) {
	const countries = (props.countries || []).slice(0, 6)
	return (
		<section className="relative w-full text-white py-[120px]">
			{/* Background Image - Full Screen */}
			{props.backgroundImageUrl ? (
				<div className="absolute inset-0 -z-10">
					<Image
						src={props.backgroundImageUrl}
						alt=""
						fill
						className="object-cover"
						priority
					/>
					<div className="absolute inset-0 bg-black/97" />
				</div>
			) : (
				<div className="absolute inset-0 bg-[#283277] -z-10" />
			)}
			
			<div className="relative mx-auto w-full max-w-[1200px] px-4 sm:px-6 lg:px-8 text-center">
				{props.subheading ? (
					<div className="text-[#2dc0d9] font-semibold tracking-wide text-sm">{props.subheading}</div>
				) : null}
				{props.heading ? (
					<h2 className="mt-2 text-3xl sm:text-5xl font-semibold">{props.heading}</h2>
				) : null}
				{props.description ? (
					<p className="mt-4 text-white/90 leading-relaxed max-w-3xl mx-auto">{props.description}</p>
				) : null}
				{props.button?.text ? (
					<div className="mt-6">
						<Link href={props.button.href || "#"} className="inline-flex items-center justify-center rounded-md bg-white text-[#283277] px-5 py-3 text-sm font-medium">
							{props.button.text}
						</Link>
					</div>
				) : null}

				{/* Flags grid */}
				{countries.length ? (
					<div className="mt-10 grid grid-cols-2 md:grid-cols-3 gap-6">
						{countries.map((c, i) => (
							<div key={`${c.country}-${i}`} className="rounded-lg bg-white/5 ring-1 ring-white/10 px-4 py-5 flex flex-col items-center">
								{c.flagUrl ? (
									<Image src={c.flagUrl} alt={c.country || ""} width={96} height={96} className="h-16 w-16 rounded-full object-cover ring-2 ring-white/30" />
								) : null}
								<div className="mt-3 font-semibold">{c.country}</div>
								{c.points ? <div className="mt-1 text-xs text-white/85 max-w-[22ch]">{c.points}</div> : null}
							</div>
						))}
					</div>
				) : null}

				{/* Map image */}
				{props.mapUrl ? (
					<div className="mt-12">
						<Image src={props.mapUrl} alt="Global map" width={1200} height={600} className="mx-auto w-full max-w-[1000px] h-auto" />
					</div>
				) : null}
			</div>
		</section>
	)
}
