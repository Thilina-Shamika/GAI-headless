import HomeHeroServer from "@/components/HomeHeroServer";
import SuccessStories from "@/components/SuccessStories";

export default async function Home() {
	return (
		<>
			<HomeHeroServer />
			<SuccessStories />
		</>
	);
}
