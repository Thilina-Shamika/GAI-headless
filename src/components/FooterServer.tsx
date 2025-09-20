import { fetchFooter } from "@/lib/wp-rest"
import Footer from "./Footer"

export const dynamic = 'force-dynamic'

export default async function FooterServer() {
	const footerData = await fetchFooter()
	
	return <Footer footerData={footerData} />
}
