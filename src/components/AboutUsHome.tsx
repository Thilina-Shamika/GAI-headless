"use client"

import Link from "next/link"
import Image from "next/image"
import { useEffect, useRef, useState } from "react"
import { CheckCircle } from "lucide-react"

function useCountUp(target: number, durationMs: number = 1500) {
	const [value, setValue] = useState(0)
	const start = useRef<number | null>(null)
	useEffect(() => {
		let raf = 0
		function step(ts: number) {
			if (start.current === null) start.current = ts
			const progress = Math.min(1, (ts - start.current) / durationMs)
			setValue(Math.floor(progress * target))
			if (progress < 1) raf = requestAnimationFrame(step)
		}
		raf = requestAnimationFrame(step)
		return () => cancelAnimationFrame(raf)
	}, [target, durationMs])
	return value
}

function parseCount(raw?: string): { num: number; suffix: string } {
	if (!raw) return { num: 0, suffix: "" }
	const m = String(raw).match(/([0-9.,]+)/)
	const digits = m ? m[1].replace(/,/g, "") : "0"
	const num = Number.parseFloat(digits)
	const suffix = String(raw).replace(m?.[1] || "", "")
	return { num: Number.isFinite(num) ? num : 0, suffix }
}

export type AboutUsHomeProps = {
	subheading?: string
	heading?: string
	description?: string
	highlights?: string[]
	stats?: Array<{ value?: string; label?: string }>
	button?: { text?: string; href?: string }
	collage1Url?: string
	collage2Url?: string
	successRate?: string
}

export default function AboutUsHome(props: AboutUsHomeProps) {
	const { num: rateNum, suffix: rateSuffix } = parseCount(props.successRate || "99%")
	const rate = useCountUp(rateNum, 1800)
	return (
		<section className="mx-auto w-full max-w-[1600px] px-4 sm:px-6 lg:px-8 py-14">
			<div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-stretch">
				{/* Left: collage + success circle */}
				<div className="relative self-stretch min-h-[520px]">
					{/* Primary image (centered ~50% from left) */}
					{props.collage1Url ? (
						<div className="w-[52%] relative left-1/2 -translate-x-1/2">
							<Image src={props.collage1Url} alt="" width={700} height={900} className="w-full h-auto rounded-lg object-cover" />
						</div>
					) : (
						<div className="aspect-[3/4] w-[52%] relative left-1/2 -translate-x-1/2 rounded-lg bg-neutral-100" />
					)}
					{/* Secondary image overlay bottom-right */}
					{props.collage2Url ? (
						<div className="absolute -bottom-6 right-6 w-[45%] max-w-[320px]">
							<Image src={props.collage2Url} alt="" width={600} height={450} className="w-full h-auto rounded-lg object-cover shadow-xl ring-4 ring-white" />
						</div>
					) : null}
					{/* Success rate badge centered around right 50% */}
					<div className="absolute bottom-6 right-1/2 translate-x-1/2 rounded-full bg-[#283277] text-white w-36 h-36 sm:w-44 sm:h-44 flex flex-col items-center justify-center shadow-lg">
						<div className="absolute inset-3 rounded-full border-2 border-dashed border-white/85" />
						<div className="relative text-2xl sm:text-3xl font-extrabold">{rate}{rateSuffix || "%"}</div>
						<div className="relative text-[10px] sm:text-xs opacity-95">successful visa rate</div>
					</div>
				</div>

				{/* Right: text content */}
				<div className="self-stretch flex flex-col">
					{props.subheading ? <div className="text-[#2dc0d9] font-semibold tracking-wide text-sm">{props.subheading}</div> : null}
					{props.heading ? <h2 className="mt-2 text-3xl sm:text-5xl font-semibold text-[#283277]">{props.heading}</h2> : null}
					{props.description ? <p className="mt-4 text-neutral-700 leading-relaxed">{props.description}</p> : null}
					{props.highlights?.length ? (
						<ul className="mt-6 space-y-3">
							{props.highlights.map((h, i) => (
								<li key={i} className="flex items-start gap-3 text-base text-neutral-700 leading-relaxed">
									<CheckCircle className="mt-0.5 h-5 w-5 text-[#2dc0d9]" />
									<span>{h}</span>
								</li>
							))}
						</ul>
					) : null}
					{props.button?.text ? (
						<div className="mt-6">
							<Link href={props.button.href || "#"} className="inline-flex items-center justify-center rounded-md bg-[#283277] px-5 py-3 text-white text-sm font-medium">
								{props.button.text}
							</Link>
						</div>
					) : null}
				</div>
			</div>

			{/* Stats bar */}
			{props.stats?.length ? (
				<div className="mt-10 w-screen relative left-1/2 right-1/2 -mx-[50vw] bg-[#283277] text-white">
					<div className="mx-auto w-full max-w-[1600px] grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-0 divide-x divide-white/20">
						{props.stats.map((s, i) => {
							const { num, suffix } = parseCount(s.value)
							const val = useCountUp(num, 1400 + i * 200)
							return (
								<div key={i} className="flex flex-col items-center justify-center text-center py-6 px-4">
									<div className="text-3xl sm:text-4xl font-extrabold">{val}{suffix}</div>
									<div className="text-xs sm:text-sm opacity-95 mt-1">{s.label}</div>
								</div>
							)
						})}
					</div>
				</div>
			) : null}
		</section>
	)
}
