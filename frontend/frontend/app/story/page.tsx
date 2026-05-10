import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import StoryHero from "@/components/StoryHero";
import StoryContent from "@/components/StoryContent";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Our Story | The Architecture of Serenity",
  description: "Discover the heritage and vision behind Coastal Cove. A journey through architectural purity, organic warmth, and the pursuit of still luxury.",
  keywords: ["Hotel Heritage", "Coastal Architecture", "Luxury Vision", "Coastal Cove Story"],
};

export default function StoryPage() {
  return (
    <div className="flex flex-col min-h-screen bg-base transition-colors duration-700 selection:bg-accent selection:text-white">
      <Navbar darkText={true} />

      <main className="relative">
        <StoryHero />
        <StoryContent />
      </main>

      <Footer />
    </div>
  );
}
