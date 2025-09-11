"use client"

export default function MarqueeCountries({ countries }: { countries: string[] }) {
	const items = (countries || []).filter(Boolean)
	if (!items.length) return null
	const row = items.map((c, i) => (
		<span key={`${c}-${i}`} className="mx-4 inline-flex items-center gap-4 font-semibold">
			<span className="text-white">{c}</span>
			<span aria-hidden className="inline-block h-1.5 w-1.5 rounded-full bg-white/90" />
		</span>
	))
	return (
		<div className="w-full bg-[#283277] text-white">
			<div className="relative overflow-hidden">
				<div className="flex whitespace-nowrap" style={{ animation: "scroll-left 10s linear infinite" }}>
					{/* duplicate content for seamless loop */}
					<div className="flex items-center py-3">{row}{row}</div>
				</div>
			</div>
			<style jsx>{`
				@keyframes scroll-left {
					0% { transform: translateX(0); }
					100% { transform: translateX(-50%); }
				}
			`}</style>
		</div>
	)
}
