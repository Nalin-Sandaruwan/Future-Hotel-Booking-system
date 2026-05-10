import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SuitesView from "@/components/SuitesView";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "The Suites | Curated Coastal Residences",
  description: "Browse our collection of luxury suites at Coastal Cove. From panoramic retreats to secluded beachfront sanctuaries, find your perfect architectural escape.",
  keywords: ["Luxury Room Booking", "Hotel Suites", "Beachfront Villas", "Coastal Accommodations", "Coastal Cove Booking"],
  openGraph: {
    title: "Our Suites | Architectural Sanctuaries",
    description: "Discover curated residences designed for serenity.",
    images: ["/image/roberto-nickson-emqnSQwQQDo-unsplash.jpg"],
  }
};

export default function SuitesPage() {
  return (
    <div className="flex flex-col min-h-screen bg-base transition-colors duration-700 selection:bg-accent selection:text-white">
      <Navbar darkText={true} />
      <SuitesView />
      <Footer />
    </div>
  );
}
