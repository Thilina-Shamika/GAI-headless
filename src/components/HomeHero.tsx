"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"

export type HomeHeroProps = {
	subheading?: string
	heading?: string
	description?: string
	primary?: { text?: string; href?: string }
	secondary?: { text?: string; href?: string }
	counters?: Array<{ number?: string; unit?: string; description?: string }>
	circleImageUrl?: string
	rotatingImageUrl?: string
	backgroundImageUrl?: string
}

export default function HomeHero(props: HomeHeroProps) {
	return (
		<section className="relative w-full py-12 lg:py-20">
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
					<div className="absolute inset-0 bg-black/80" />
				</div>
			) : null}
			
			<div className="relative mx-auto w-full max-w-[1600px] px-4 sm:px-6 lg:px-8">
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
				<div>
					{props.subheading ? (
						<motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }} className="text-[#2dc0d9] font-semibold tracking-wide flex items-center gap-2 text-sm">
							<span className="text-[16px]">✈</span>
							{props.subheading}
						</motion.div>
					) : null}
					{props.heading ? (
						<motion.h1 initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.05 }} className="mt-4 text-4xl sm:text-5xl lg:text-6xl font-semibold leading-tight text-white">
							{props.heading}
						</motion.h1>
					) : null}
					{props.description ? (
						<motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }} className="mt-6 text-base sm:text-lg text-white max-w-[48ch]">
							{props.description}
						</motion.p>
					) : null}
					<div className="mt-8 flex flex-wrap gap-4">
						{props.primary?.text ? (
							<Link href={props.primary.href || "#"} className="inline-flex items-center justify-center rounded-md bg-[#283277] px-5 py-3 text-white text-sm font-medium">
								{props.primary.text}
							</Link>
						) : null}
						{props.secondary?.text ? (
							<Link href={props.secondary.href || "#"} className="inline-flex items-center justify-center rounded-md border border-[#2dc0d9] px-5 py-3 text-[#2dc0d9] text-sm font-medium">
								{props.secondary.text}
							</Link>
						) : null}
					</div>
					{props.counters?.length ? (
						<div className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-4">
							{props.counters.map((c, i) => (
								<div key={i} className="rounded-lg border border-white/20 p-4">
									<div className="text-3xl font-bold text-[#283277]">{c.number}{c.unit ? <span className="text-[#2dc0d9] text-xl ml-1">{c.unit}</span> : null}</div>
									{c.description ? (
										<div className="mt-1 text-sm text-white">{c.description}</div>
									) : null}
								</div>
							))}
						</div>
					) : null}
				</div>
				<div className="relative">
					{props.circleImageUrl ? (
						<motion.div className="w-full max-w-[520px] mx-auto" initial={{ rotate: 0 }} animate={{ rotate: 360 }} transition={{ repeat: Infinity, ease: "linear", duration: 40 }}>
							<Image src={props.circleImageUrl} alt="" width={632} height={673} className="w-full h-auto" />
						</motion.div>
					) : null}
					{props.rotatingImageUrl ? (
						<Image
							src={props.rotatingImageUrl}
							alt=""
							width={448}
							height={448}
							className="absolute inset-0 m-auto w-56 h-56 rounded-full object-cover shadow-xl z-10"
							priority
						/>
					) : null}
				</div>
			</div>
		</div>
		</section>
	)
}
