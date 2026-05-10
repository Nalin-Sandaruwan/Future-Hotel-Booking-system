import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WellnessView from "@/components/WellnessView";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Wellness & Spa | The Sanctuary of Stillness",
  description: "Realign your rhythm at Coastal Cove. Discover restorative harmony through aquatic therapy, celestial spa rituals, and cliffside breathwork in our architectural sanctuary.",
  keywords: ["Luxury Spa", "Wellness Retreat", "Yoga Pavilion", "Aquatic Therapy", "Island Spa Treatments", "Coastal Cove Wellness"],
  openGraph: {
    title: "Wellness | Coastal Cove Sanctuary",
    description: "Experience the pinnacle of island healing and restorative architecture.",
    images: ["/image/wellness-hero.png"],
  }
};

export default function WellnessPage() {
  return (
    <div className="min-h-screen bg-[#F5F5F3] flex flex-col">
      <Navbar darkText={false} />

      <main className="flex-1">
        <WellnessView />
      </main>

      <Footer />
    </div>
  );
}
