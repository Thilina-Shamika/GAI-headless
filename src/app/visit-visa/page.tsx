import Image from "next/image"
import Link from "next/link"
import { fetchVisitVisas, fetchVisitVisaPage } from "@/lib/wp-rest"
import { Check } from "lucide-react"

export const dynamic = "force-dynamic"

export default async function VisitVisaIndexPage() {
	const items = await fetchVisitVisas()
	const pageData = await fetchVisitVisaPage()
	
	return (
		<>
			<main className="mx-auto w-full max-w-[1200px] px-4 sm:px-6 lg:px-8 py-12">
				<div className="text-center">
					<div className="text-[#2dc0d9] font-semibold tracking-wide text-sm">VISIT VISA</div>
					<h1 className="mt-2 text-3xl sm:text-5xl font-semibold text-[#283277]">Choose Your Visit Visa</h1>
				</div>
				{items.length === 0 ? (
					<p className="mt-10 text-center text-sm text-neutral-600">No visit visa items found.</p>
				) : (
					<div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-center">
						{items.map((it) => {
							const acf: any = (it as any)?.acf || {}
							const title = (acf?.service_name as string) || it.title?.rendered || "Visit Visa"
							const subheading = (acf?.service_subheading as string) || ""
							const img = (acf?.service_image?.url as string) || undefined
							return (
								<Link href={`/visit-visa/${it.slug}`} key={it.id} className="w-full max-w-[360px] mx-auto rounded-lg overflow-hidden flex flex-col relative group cursor-pointer hover:scale-105 transition-transform duration-300">
									{/* Background Image with Dark Overlay */}
									<div className="relative h-96 w-full">
										{img ? (
											<Image 
												src={img} 
												alt={title} 
												width={600} 
												height={360} 
												className="h-full w-full object-cover" 
											/>
										) : (
											<div className="h-full w-full bg-gradient-to-br from-gray-800 to-gray-900" />
										)}
										{/* Dark Overlay */}
										<div className="absolute inset-0 bg-black/60 group-hover:bg-black/50 transition-colors duration-300" />
										
										{/* Content Overlay */}
										<div className="absolute inset-0 p-6 flex flex-col justify-between">
											{/* Top Section with Icon */}
											<div className="flex justify-between items-start">
												<div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
													<svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
														<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
													</svg>
												</div>
												{/* Arrow Button */}
												<div className="w-8 h-8 bg-red-500 group-hover:bg-red-600 rounded-full flex items-center justify-center transition-colors duration-300">
													<svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
														<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
													</svg>
												</div>
											</div>
											
											{/* Bottom Section with Text */}
											<div className="space-y-4">
												<div className="flex items-center space-x-3">
													<div className="w-1 h-10 bg-white"></div>
													<div>
														<div className="text-white/80 text-xs font-medium uppercase tracking-wider mb-2">SERVICE</div>
														<h2 className="text-white font-bold text-xl leading-tight">{title}</h2>
													</div>
												</div>
												{subheading && (
													<p className="text-white/90 text-sm leading-relaxed">{subheading}</p>
												)}
											</div>
										</div>
									</div>
								</Link>
							)
						})}
					</div>
				)}
			</main>

			{/* Additional Content Section */}
			{pageData?.acf && (
				<div className="bg-gray-50 py-16">
					<div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
						{/* Hero Section */}
						{pageData.acf.heading && (
							<div className="text-center mb-16">
								<h2 className="text-4xl sm:text-5xl font-semibold text-[#283277] mb-4">
									{pageData.acf.heading}
								</h2>
								{pageData.acf.subheading && (
									<p className="text-xl text-gray-600 mb-6">{pageData.acf.subheading}</p>
								)}
								{pageData.acf.description && (
									<p className="text-lg text-gray-700 max-w-4xl mx-auto">{pageData.acf.description}</p>
								)}
							</div>
						)}

						{/* 2nd Section */}
						{pageData.acf["2nd_section_heading"] && (
							<div className="mb-16">
								<h3 className="text-3xl font-semibold text-[#283277] mb-6">
									{pageData.acf["2nd_section_heading"]}
								</h3>
								{pageData.acf["2nd_section_description"] && (
									<p className="text-lg text-gray-700 mb-8">{pageData.acf["2nd_section_description"]}</p>
								)}
								{pageData.acf["2nd_section_points"] && (
									<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
										{pageData.acf["2nd_section_points"].map((point: any, index: number) => (
											<div key={index} className="flex items-start gap-3">
												<Check className="w-5 h-5 text-[#2dc0d9] mt-1 flex-shrink-0" />
												<p className="text-gray-700">{point["2nd_section_bullets"]}</p>
											</div>
										))}
									</div>
								)}
							</div>
						)}

						{/* 3rd Section */}
						{pageData.acf["3rd_section_heading"] && (
							<div className="mb-16">
								{pageData.acf["3rd_section_image"] && (
									<div className="mb-8">
										<Image
											src={pageData.acf["3rd_section_image"].url}
											alt={pageData.acf["3rd_section_image"].alt || "Process Image"}
											width={860}
											height={312}
											className="w-full h-auto rounded-lg"
										/>
									</div>
								)}
								<h3 className="text-3xl font-semibold text-[#283277] mb-6">
									{pageData.acf["3rd_section_heading"]}
								</h3>
								{pageData.acf["3rd_section_points"] && (
									<div className="space-y-4">
										{pageData.acf["3rd_section_points"].map((point: any, index: number) => (
											<div key={index} className="flex items-start gap-3">
												<Check className="w-5 h-5 text-[#2dc0d9] mt-1 flex-shrink-0" />
												<p className="text-gray-700">{point["3rd_section_bullet_points"]}</p>
											</div>
										))}
									</div>
								)}
							</div>
						)}

						{/* 4th Section */}
						{pageData.acf["4th_section_heading"] && (
							<div className="mb-16">
								<h3 className="text-3xl font-semibold text-[#283277] mb-6">
									{pageData.acf["4th_section_heading"]}
								</h3>
								{pageData.acf["4th_section_subheading"] && (
									<p className="text-lg text-gray-700 mb-8">{pageData.acf["4th_section_subheading"]}</p>
								)}
								{pageData.acf["4th_section_points"] && (
									<div className="space-y-4">
										{pageData.acf["4th_section_points"].map((point: any, index: number) => (
											<div key={index} className="flex items-start gap-3">
												<Check className="w-5 h-5 text-[#2dc0d9] mt-1 flex-shrink-0" />
												<p className="text-gray-700">{point["4th_section_bullet_points"]}</p>
											</div>
										))}
									</div>
								)}
							</div>
						)}

						{/* 5th Section */}
						{pageData.acf["5th_section_heading"] && (
							<div className="mb-16">
								{pageData.acf["5th_section_image"] && (
									<div className="mb-8">
										<Image
											src={pageData.acf["5th_section_image"].url}
											alt={pageData.acf["5th_section_image"].alt || "Destinations Image"}
											width={860}
											height={312}
											className="w-full h-auto rounded-lg"
										/>
									</div>
								)}
								<h3 className="text-3xl font-semibold text-[#283277] mb-6">
									{pageData.acf["5th_section_heading"]}
								</h3>
								{pageData.acf["5th_section_subheading"] && (
									<p className="text-lg text-gray-700 mb-8">{pageData.acf["5th_section_subheading"]}</p>
								)}
								{pageData.acf["5th_section_points"] && (
									<div className="space-y-4">
										{pageData.acf["5th_section_points"].map((point: any, index: number) => (
											<div key={index} className="flex items-start gap-3">
												<Check className="w-5 h-5 text-[#2dc0d9] mt-1 flex-shrink-0" />
												<p className="text-gray-700">{point["5th_section_bullet_points"]}</p>
											</div>
										))}
									</div>
								)}
							</div>
						)}

						{/* 6th Section */}
						{pageData.acf["6th_section_heading"] && (
							<div className="mb-16">
								<h3 className="text-3xl font-semibold text-[#283277] mb-6">
									{pageData.acf["6th_section_heading"]}
								</h3>
								{pageData.acf["6th_section_subheading"] && (
									<p className="text-lg text-gray-700 mb-8">{pageData.acf["6th_section_subheading"]}</p>
								)}
								{pageData.acf["6th_section_points"] && (
									<div className="space-y-4">
										{pageData.acf["6th_section_points"].map((point: any, index: number) => (
											<div key={index} className="flex items-start gap-3">
												<Check className="w-5 h-5 text-[#2dc0d9] mt-1 flex-shrink-0" />
												<p className="text-gray-700">{point["6th_section_bullet_points"]}</p>
											</div>
										))}
									</div>
								)}
							</div>
						)}

						{/* 7th Section */}
						{pageData.acf["7th_section_heading"] && (
							<div className="mb-16">
								<h3 className="text-3xl font-semibold text-[#283277] mb-6">
									{pageData.acf["7th_section_heading"]}
								</h3>
								{pageData.acf["7th_section_points"] && (
									<div className="space-y-4">
										{pageData.acf["7th_section_points"].map((point: any, index: number) => (
											<div key={index} className="flex items-start gap-3">
												<Check className="w-5 h-5 text-[#2dc0d9] mt-1 flex-shrink-0" />
												<p className="text-gray-700">{point["7th_section_bullet_points"]}</p>
											</div>
										))}
									</div>
								)}
							</div>
						)}

						{/* Final CTA Section */}
						{pageData.acf["final_section_heading"] && (
							<div className="bg-[#283277] rounded-2xl p-8 text-center text-white">
								<h3 className="text-3xl font-semibold mb-4">
									{pageData.acf["final_section_heading"]}
								</h3>
								{pageData.acf["final_section_description"] && (
									<p className="text-lg mb-8">{pageData.acf["final_section_description"]}</p>
								)}
								<div className="flex flex-col sm:flex-row gap-4 justify-center">
									{pageData.acf["button_1_text"] && (
										<Link
											href={pageData.acf["button_1_link"]?.url || "#"}
											className="bg-[#2dc0d9] text-white px-8 py-3 rounded-lg font-medium hover:bg-[#25a8b8] transition-colors"
										>
											{pageData.acf["button_1_text"]}
										</Link>
									)}
									{pageData.acf["button_2_text"] && (
										<Link
											href={pageData.acf["button_2_link"]?.url || "#"}
											className="bg-white text-[#283277] px-8 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors"
										>
											{pageData.acf["button_2_text"]}
										</Link>
									)}
								</div>
							</div>
						)}
					</div>
				</div>
			)}
		</>
	)
}


