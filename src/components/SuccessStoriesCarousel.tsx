"use client"

import { Star } from "lucide-react"
import { useEffect, useState } from "react"
import Image from "next/image"

export type Testimonial = {
    client_name: string
    visa_type: string
    testimonial: string
    rating: string
    profile_pic?: { url?: string }
}

export default function SuccessStoriesCarousel({ stories }: { stories: Testimonial[] }) {
    const [currentIndex, setCurrentIndex] = useState(0)

    useEffect(() => {
        if (!stories.length) return
        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % stories.length)
        }, 5000)
        return () => clearInterval(interval)
    }, [stories.length])

    const goTo = (index: number) => setCurrentIndex(index)
    const next = () => setCurrentIndex((prev) => (prev + 1) % stories.length)
    const prev = () => setCurrentIndex((prev) => (prev - 1 + stories.length) % stories.length)

    if (!stories.length) return null

    return (
        <div className="relative">
            <div className="overflow-hidden">
                <div className="flex transition-transform duration-500 ease-in-out" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
                    {stories.map((story, index) => (
                        <div key={index} className="w-full flex-shrink-0 px-4">
                            <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100 relative">
                                <div className="absolute top-6 left-6 text-6xl text-[#283277] opacity-20 font-serif">"</div>
                                <div className="w-20 h-20 rounded-full mx-auto mb-6 relative z-10 overflow-hidden">
                                    {story.profile_pic?.url ? (
                                        <Image src={story.profile_pic.url} alt={story.client_name} width={80} height={80} className="w-full h-full object-cover" />
                                    ) : (
                                        <div className="w-full h-full bg-gradient-to-br from-[#2dc0d9] to-[#283277] rounded-full flex items-center justify-center">
                                            <span className="text-white font-bold text-2xl">
                                                {story.client_name?.split(' ').map((n: string) => n[0]).join('')}
                                            </span>
                                        </div>
                                    )}
                                </div>
                                <div className="text-center mb-6">
                                    <p className="text-gray-700 italic text-lg leading-relaxed mb-6">"{story.testimonial}"</p>
                                    <div className="space-y-2">
                                        <h4 className="font-bold text-[#283277] text-xl">{story.client_name}</h4>
                                        <p className="text-gray-600 text-sm">{story.visa_type}</p>
                                    </div>
                                </div>
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
            <button onClick={prev} aria-label="Previous" className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white shadow rounded-full p-2 border border-gray-200">‹</button>
            <button onClick={next} aria-label="Next" className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white shadow rounded-full p-2 border border-gray-200">›</button>
            <div className="flex justify-center mt-8 space-x-2">
                {stories.map((_, i) => (
                    <button key={i} onClick={() => goTo(i)} className={`w-3 h-3 rounded-full transition-colors ${i === currentIndex ? 'bg-[#2dc0d9]' : 'bg-gray-300 hover:bg-gray-400'}`} />
                ))}
            </div>
        </div>
    )
}


