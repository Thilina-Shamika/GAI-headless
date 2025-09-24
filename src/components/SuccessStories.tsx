import { fetchSuccessStories } from "@/lib/wp-rest"
import { Send } from "lucide-react"
import Link from "next/link"
import SuccessStoriesCarousel from "./SuccessStoriesCarousel"

export default async function SuccessStories() {
    const data = await fetchSuccessStories()
    const mainStory = data?.[0]
    const allTestimonials = (mainStory?.acf?.stories as any[]) || []

    return (
        <section className="py-20 bg-gray-50">
            <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <div className="flex items-center justify-center gap-2 mb-4">
                        <Send className="w-5 h-5 text-[#2dc0d9]" />
                        <span className="text-[#2dc0d9] font-semibold tracking-wide text-sm uppercase">SUCCESS STORIES</span>
                    </div>
                    <h2 className="text-[60px] font-medium text-[#283277] mb-8 leading-tight">
                        {mainStory?.acf?.heading || "How we do our visa & Immigration processing"}
                    </h2>
                    {mainStory?.acf?.description ? (
                        <div className="text-[16px] text-gray-700 leading-relaxed max-w-4xl mx-auto space-y-4" dangerouslySetInnerHTML={{ __html: mainStory.acf.description as string }} />
                    ) : null}
                </div>
                {allTestimonials.length > 0 ? (
                    <SuccessStoriesCarousel stories={allTestimonials as any[]} />
                ) : (
                    <div className="text-center py-12">
                        <p className="text-gray-500 text-lg">No success stories found.</p>
                    </div>
                )}
                <div className="text-center mt-12">
                    <Link href="/success-stories" className="inline-flex items-center px-8 py-4 bg-[#283277] text-white rounded-lg font-semibold text-lg hover:bg-[#1f295f] transition-colors duration-200 focus:ring-2 focus:ring-[#2dc0d9] focus:ring-offset-2">
                        View All Success Stories
                    </Link>
                </div>
            </div>
        </section>
    )
}
