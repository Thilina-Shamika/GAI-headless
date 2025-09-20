"use client"

import { fetchSuccessStories } from "@/lib/wp-rest"
import { Send, Star } from "lucide-react"
import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"

function TestimonialCarousel({ stories }: { stories: any[] }) {
	const [currentIndex, setCurrentIndex] = useState(0)
	
	useEffect(() => {
		const interval = setInterval(() => {
			setCurrentIndex((prev) => (prev + 1) % stories.length)
		}, 5000) // Auto-advance every 5 seconds
		
		return () => clearInterval(interval)
	}, [stories.length])

	const goToSlide = (index: number) => {
		setCurrentIndex(index)
	}

	return (
		<div className="relative">
			{/* Testimonials Container */}
			<div className="overflow-hidden">
				<div 
					className="flex transition-transform duration-500 ease-in-out"
					style={{ transform: `translateX(-${currentIndex * 50}%)` }}
				>
					{stories.map((story, index) => (
						<div key={index} className="w-1/2 flex-shrink-0 px-4">
							<div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100 relative">
								{/* Quote Icon */}
								<div className="absolute top-6 left-6 text-6xl text-[#283277] opacity-20 font-serif">
									"
								</div>
								
								{/* Profile Picture */}
								<div className="w-20 h-20 rounded-full mx-auto mb-6 relative z-10 overflow-hidden">
									{story.profile_pic?.url ? (
										<Image
											src={story.profile_pic.url}
											alt={story.client_name}
											width={80}
											height={80}
											className="w-full h-full object-cover"
										/>
									) : (
										<div className="w-full h-full bg-gradient-to-br from-[#2dc0d9] to-[#283277] rounded-full flex items-center justify-center">
											<span className="text-white font-bold text-2xl">
												{story.client_name.split(' ').map((n: string) => n[0]).join('')}
											</span>
										</div>
									)}
								</div>
								
								{/* Testimonial Text */}
								<div className="text-center mb-6">
									<p className="text-gray-700 italic text-lg leading-relaxed mb-6">
										"{story.testimonial}"
									</p>
									<div className="space-y-2">
										<h4 className="font-bold text-[#283277] text-xl">{story.client_name}</h4>
										<p className="text-gray-600 text-sm">{story.visa_type}</p>
									</div>
								</div>
								
								{/* Rating */}
								<div className="flex justify-center">
									<div className="bg-[#2dc0d9] rounded-full px-4 py-2 flex items-center gap-2">
										<Star className="w-4 h-4 text-white fill-white" />
										<span className="text-white font-medium">{story.rating}</span>
									</div>
								</div>
							</div>
						</div>
					))}
				</div>
			</div>

			{/* Pagination Dots */}
			<div className="flex justify-center mt-8 space-x-2">
				{Array.from({ length: Math.max(1, stories.length - 1) }).map((_, index) => (
					<button
						key={index}
						onClick={() => goToSlide(index)}
						className={`w-3 h-3 rounded-full transition-colors ${
							index === currentIndex 
								? 'bg-[#2dc0d9]' 
								: 'bg-gray-300 hover:bg-gray-400'
						}`}
					/>
				))}
			</div>
		</div>
	)
}

export default function SuccessStories() {
	const [stories, setStories] = useState<any[]>([])
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		async function loadStories() {
			try {
				const data = await fetchSuccessStories()
				setStories(data)
			} catch (error) {
				console.error('Error loading stories:', error)
			} finally {
				setLoading(false)
			}
		}
		loadStories()
	}, [])

	if (loading) {
		return (
			<section className="py-20 bg-gray-50">
				<div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
					<div className="text-center">
						<div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#2dc0d9] mx-auto mb-4"></div>
						<p className="text-gray-600">Loading success stories...</p>
					</div>
				</div>
			</section>
		)
	}

	const mainStory = stories[0]
	const allTestimonials = mainStory?.acf?.stories || []

	return (
		<section className="py-20 bg-gray-50">
			<div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
				{/* Header Section */}
				<div className="text-center mb-16">
					{/* Subheading */}
					<div className="flex items-center justify-center gap-2 mb-4">
						<Send className="w-5 h-5 text-[#2dc0d9]" />
						<span className="text-[#2dc0d9] font-semibold tracking-wide text-sm uppercase">SUCCESS STORIES</span>
					</div>
					
					{/* Main Heading */}
					<h2 className="text-[60px] font-medium text-[#283277] mb-8 leading-tight">
						{mainStory?.acf?.heading || "How we do our visa & Immigration processing"}
					</h2>

					{/* Description */}
					{mainStory?.acf?.description && (
						<div 
							className="text-[16px] text-gray-700 leading-relaxed max-w-4xl mx-auto space-y-4"
							dangerouslySetInnerHTML={{ __html: mainStory.acf.description }}
						/>
					)}
				</div>

				{/* Testimonials Section */}
				{allTestimonials.length > 0 ? (
					<TestimonialCarousel stories={allTestimonials} />
				) : (
					<div className="text-center py-12">
						<p className="text-gray-500 text-lg">No success stories found.</p>
					</div>
				)}

				{/* View All Button */}
				<div className="text-center mt-12">
					<Link 
						href="/success-stories"
						className="inline-flex items-center px-8 py-4 bg-[#283277] text-white rounded-lg font-semibold text-lg hover:bg-[#1f295f] transition-colors duration-200 focus:ring-2 focus:ring-[#2dc0d9] focus:ring-offset-2"
					>
						View All Success Stories
						<Send className="w-5 h-5 ml-2" />
					</Link>
				</div>
			</div>
		</section>
	)
}
