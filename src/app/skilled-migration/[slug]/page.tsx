import { fetchSkilledMigrationBySlug, fetchSkilledMigrations } from "@/lib/wp-rest"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { CheckCircle } from "lucide-react"

export const dynamic = "force-dynamic"

export async function generateStaticParams() {
	return []
}

function getArray(acf: Record<string, any>, key: string): any[] {
	const v = acf?.[key]
	return Array.isArray(v) ? v : []
}

export default async function SkilledMigrationDetail(props: { params: Promise<{ slug: string }> }) {
    const { slug } = await props.params
    const [item, all] = await Promise.all([
        fetchSkilledMigrationBySlug(slug),
        fetchSkilledMigrations(),
    ])
	if (!item) return notFound()
	const acf: any = (item as any)?.acf || {}

	const title = (acf?.service_name as string) || item.title?.rendered || "Skilled Migration"
	const subheading = (acf?.service_subheading as string) || ""
	const description = (acf?.service_description as string) || ""
	const heroImg = acf?.service_image?.url as string | undefined

	const sec2Heading = (acf?.["2nd_section_heading"] as string) || ""
	const sec2Points = getArray(acf, "2nd_section_points").map((p) => String(p?.["2nd_section_bullet_points"] || "")).filter(Boolean)

	const sec3Heading = (acf?.["3rd_section_heading"] as string) || ""
	const sec3Image = (acf?.["3rd_section_images"]?.url as string) || undefined
	const sec3Categories = getArray(acf, "3rd_section_categories")

	const sec4Heading = (acf?.["4th_section_heading"] as string) || ""
	const sec4Points = getArray(acf, "4th_section_points").map((p) => String(p?.["4th_section_points"] || "")).filter(Boolean)

	const sec5Heading = (acf?.["5th_section_heading"] as string) || ""
	const sec5Points = getArray(acf, "5th_section_points").map((p) => String(p?.["5th_section_bullet_points"] || "")).filter(Boolean)

	const sec6Heading = (acf?.["6th_section_heading"] as string) || ""
	const sec6Points = getArray(acf, "6th_section_points").map((p) => String(p?.["6th_section_bullet_points"] || "")).filter(Boolean)

	const sec7Heading = (acf?.["7th_section_heading"] as string) || ""
	const sec7Points = getArray(acf, "7th_section_points").map((p) => String(p?.["7th_section_bullet_points"] || "")).filter(Boolean)
	const sec7Image = (acf?.["7th_section_image"]?.url as string) || undefined

	const finalHeading = (acf?.["final_section_heading"] as string) || ""
	const finalDescription = (acf?.["final_section_description"] as string) || ""
	const btn1Text = (acf?.["button_1_text"] as string) || ""
	const btn1Link = (acf?.["button_1_link"]?.url as string) || "#"
	const btn2Text = (acf?.["button_2_text"] as string) || ""
	const btn2Link = (acf?.["button_2_link"]?.url as string) || "#"

	const leftSidebarImage = (acf?.["left_side_bar_image"]?.url as string) || undefined

	return (
		<>
			<section className="relative w-full h-auto">
				<div className="relative w-full h-[220px] sm:h-[280px] md:h-[340px]">
					{heroImg ? (
						<Image src={heroImg} alt={title} fill priority className="object-cover" />
					) : (
						<div className="absolute inset-0 bg-gradient-to-r from-[#273378] to-[#1f295f]" />
					)}
					<div className="absolute inset-0 bg-black/55" />
					<div className="relative h-full flex items-center">
						<div className="mx-auto w-full max-w-[1600px] px-4 sm:px-6 lg:px-8">
							<h1 className="text-white text-2xl sm:text-4xl md:text-5xl font-semibold">{title}</h1>
							{subheading ? <p className="mt-2 text-white/90 text-sm sm:text-base max-w-3xl">{subheading}</p> : null}
							{description ? <p className="mt-4 text-white/90 text-sm sm:text-base max-w-4xl whitespace-pre-line">{description}</p> : null}
						</div>
					</div>
				</div>
			</section>

			<section className="mx-auto w-full max-w-[1600px] px-4 sm:px-6 lg:px-8 py-10">
				<div className="grid grid-cols-1 md:grid-cols-12 gap-8">
					<aside className="md:col-span-4">
						<nav className="rounded-xl bg-white ring-1 ring-black/5 overflow-hidden">
							<ul className="divide-y divide-black/5">
								{all.map((it) => {
                                    const isActive = it.slug === slug
									const iacf: any = (it as any)?.acf || {}
									const label = (iacf?.service_name as string) || it.title?.rendered || "Skilled Migration"
									return (
										<li key={it.id}>
											<Link href={`/skilled-migration/${it.slug}`} className={`flex items-center justify-between gap-3 px-4 py-4 text-[15px] transition ${isActive ? "bg-[#e94a4a] text-white" : "bg-white hover:bg-neutral-50 text-neutral-800"}`}>
												<span className="truncate">{label}</span>
												<span className={`shrink-0 ${isActive ? "text-white" : "text-neutral-400"}`}>›</span>
											</Link>
										</li>
									)
								})}
							</ul>
						</nav>
						
						{leftSidebarImage && (
							<div className="mt-6">
								<Image
									src={leftSidebarImage}
									alt="Sidebar Image"
									width={300}
									height={400}
									className="w-full rounded-lg"
								/>
							</div>
						)}
					</aside>

					<main className="md:col-span-8">
						{sec2Heading && (
							<section className="mb-8">
								<h2 className="text-2xl sm:text-3xl font-semibold text-[#283277] mb-4">{sec2Heading}</h2>
								{sec2Points.length > 0 && (
									<ul className="space-y-2">
										{sec2Points.map((point, i) => (
											<li key={i} className="flex items-start gap-3">
												<CheckCircle className="w-4 h-4 text-green-600 mt-1 shrink-0" />
												<span className="text-[15px] text-neutral-700">{point}</span>
											</li>
										))}
									</ul>
								)}
							</section>
						)}

						{sec3Heading && (
							<section className="mb-8">
								<h2 className="text-2xl sm:text-3xl font-semibold text-[#283277] mb-4">{sec3Heading}</h2>
								
								{sec3Image && (
									<div className="mb-6">
										<Image
											src={sec3Image}
											alt="Section 3 Image"
											width={860}
											height={312}
											className="w-full rounded-lg"
										/>
									</div>
								)}

								{sec3Categories.length > 0 && (
									<div className="space-y-6">
										{sec3Categories.map((category, categoryIndex) => (
											<div key={categoryIndex} className="bg-neutral-50 p-6 rounded-lg">
												<h3 className="text-lg font-semibold text-[#283277] mb-4">
													{category.category_heading}
												</h3>
												
												{category.category_points && category.category_points.length > 0 && (
													<ul className="space-y-2 mb-4">
														{category.category_points.map((point: any, pointIndex: number) => (
															<li key={pointIndex} className="flex items-start gap-3">
																<CheckCircle className="w-4 h-4 text-green-600 mt-1 shrink-0" />
																<span className="text-[15px] text-neutral-700">{point.category_bullet_points}</span>
															</li>
														))}
													</ul>
												)}

												{category.category_heading_2 && (
													<div className="mt-4">
														<h4 className="text-base font-semibold text-[#283277] mb-3">
															{category.category_heading_2}
														</h4>
														{category.category_2_points && category.category_2_points.length > 0 && (
															<ul className="space-y-2">
																{category.category_2_points.map((point: any, pointIndex: number) => (
																	<li key={pointIndex} className="flex items-start gap-3">
																		<CheckCircle className="w-4 h-4 text-green-600 mt-1 shrink-0" />
																		<span className="text-[15px] text-neutral-700">{point.category_2_bullet_points}</span>
																	</li>
																))}
															</ul>
														)}
													</div>
												)}
											</div>
										))}
									</div>
								)}
							</section>
						)}

						{sec4Heading && (
							<section className="mb-8">
								<h2 className="text-2xl sm:text-3xl font-semibold text-[#283277] mb-4">{sec4Heading}</h2>
								{sec4Points.length > 0 && (
									<ul className="space-y-2">
										{sec4Points.map((point, i) => (
											<li key={i} className="flex items-start gap-3">
												<CheckCircle className="w-4 h-4 text-green-600 mt-1 shrink-0" />
												<span className="text-[15px] text-neutral-700">{point}</span>
											</li>
										))}
									</ul>
								)}
							</section>
						)}

						{sec5Heading && (
							<section className="mb-8">
								<h2 className="text-2xl sm:text-3xl font-semibold text-[#283277] mb-4">{sec5Heading}</h2>
								{sec5Points.length > 0 && (
									<ul className="space-y-2">
										{sec5Points.map((point, i) => (
											<li key={i} className="flex items-start gap-3">
												<CheckCircle className="w-4 h-4 text-green-600 mt-1 shrink-0" />
												<span className="text-[15px] text-neutral-700">{point}</span>
											</li>
										))}
									</ul>
								)}
							</section>
						)}

						{sec6Heading && (
							<section className="mb-8">
								<h2 className="text-2xl sm:text-3xl font-semibold text-[#283277] mb-4">{sec6Heading}</h2>
								{sec6Points.length > 0 && (
									<ul className="space-y-2">
										{sec6Points.map((point, i) => (
											<li key={i} className="flex items-start gap-3">
												<CheckCircle className="w-4 h-4 text-green-600 mt-1 shrink-0" />
												<span className="text-[15px] text-neutral-700">{point}</span>
											</li>
										))}
									</ul>
								)}
							</section>
						)}

						{sec7Heading && (
							<section className="mb-8">
								{sec7Image && (
									<div className="mb-6">
										<Image
											src={sec7Image}
											alt="Section 7 Image"
											width={800}
											height={400}
											className="w-full rounded-lg"
										/>
									</div>
								)}
								<h2 className="text-2xl sm:text-3xl font-semibold text-[#283277] mb-4">{sec7Heading}</h2>
								{sec7Points.length > 0 && (
									<ul className="space-y-2">
										{sec7Points.map((point, i) => (
											<li key={i} className="flex items-start gap-3">
												<CheckCircle className="w-4 h-4 text-green-600 mt-1 shrink-0" />
												<span className="text-[15px] text-neutral-700">{point}</span>
											</li>
										))}
									</ul>
								)}
							</section>
						)}

						{/* Final CTA */}
						{finalHeading || finalDescription || btn1Text || btn2Text ? (
							<section className="mt-12 rounded-lg bg-[#f6fbff] p-6 ring-1 ring-[#2dc0d9]/20">
								<h2 className="text-3xl sm:text-4xl font-semibold text-[#283277]">{finalHeading}</h2>
								{finalDescription ? (
									<p className="mt-3 text-[15px] leading-7 text-neutral-700 whitespace-pre-line">{finalDescription}</p>
								) : null}
								<div className="mt-5 flex flex-wrap gap-3">
									{btn1Text ? (
										<Link href={btn1Link || "#"} className="inline-flex items-center justify-center rounded-md bg-[#283277] px-5 py-2 text-white text-sm font-medium">
											{btn1Text}
										</Link>
									) : null}
									{btn2Text ? (
										<Link href={btn2Link || "#"} className="inline-flex items-center justify-center rounded-md border border-[#283277] px-5 py-2 text-[#283277] text-sm font-medium">
											{btn2Text}
										</Link>
									) : null}
								</div>
							</section>
						) : null}
					</main>
				</div>
			</section>
		</>
	)
}
