import Link from "next/link"
import { Home } from "lucide-react"

export default function NotFound() {
	return (
		<main className="min-h-screen bg-white flex items-center justify-center">
			<div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
				{/* 404 Content */}
				<div className="mb-12">
					<h1 className="text-[120px] font-bold text-[#283277] mb-4 leading-none">
						404
					</h1>
					<h2 className="text-4xl font-semibold text-[#283277] mb-6">
						Page Not Found
					</h2>
					<p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
						Sorry, the page you are looking for doesn't exist or has been moved. 
						Let's get you back to the right place.
					</p>
				</div>

				{/* Navigation Button */}
				<div className="flex flex-col sm:flex-row gap-4 justify-center">
					<Link
						href="/"
						className="bg-[#2dc0d9] text-white px-8 py-4 rounded-lg font-medium hover:bg-[#25a8b8] transition-colors flex items-center justify-center gap-2"
					>
						<Home className="w-5 h-5" />
						Go to Homepage
					</Link>
					<Link
						href="/contact-us"
						className="bg-white text-[#283277] border-2 border-[#283277] px-8 py-4 rounded-lg font-medium hover:bg-[#283277] hover:text-white transition-colors"
					>
						Contact Us
					</Link>
				</div>
			</div>
		</main>
	)
}
