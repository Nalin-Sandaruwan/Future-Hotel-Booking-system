import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import GalleryView from "@/components/GalleryView";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Gallery | Architectural Visual Narrative",
  description: "Explore the visual narrative of Coastal Cove. A curated gallery showcasing our minimalist architecture, artisanal interiors, and the raw beauty of the island coastline.",
  keywords: ["Hotel Gallery", "Architectural Photography", "Luxury Interiors", "Coastal Landscapes", "Coastal Cove Photos"],
  openGraph: {
    title: "Gallery | Coastal Cove Visual Narrative",
    description: "A cinematic journey through our architectural sanctuary.",
    images: ["/image/roberto-nickson-emqnSQwQQDo-unsplash.jpg"],
  }
};

const images = [
  { id: 1, src: "/image/roberto-nickson-emqnSQwQQDo-unsplash.jpg", category: "Architecture", title: "Geometric Horizon" },
  { id: 2, src: "/image/frames-for-your-heart-zSG-kd-L6vw-unsplash.jpg", category: "Interiors", title: "Artisanal Sanctuary" },
  { id: 3, src: "/image/michael-brown-bZZ-YKRvRF0-unsplash.jpg", category: "Coastline", title: "Infinite Azure" },
  { id: 4, src: "/image/roberto-nickson-emqnSQwQQDo-unsplash.jpg", category: "Architecture", title: "Minimalist Ascent" },
  { id: 5, src: "/image/frames-for-your-heart-zSG-kd-L6vw-unsplash.jpg", category: "Interiors", title: "Organic Textures" },
  { id: 6, src: "/image/michael-brown-bZZ-YKRvRF0-unsplash.jpg", category: "Coastline", title: "Tidal Serenity" },
];

export default function GalleryPage() {
  return (
    <div className="min-h-screen bg-base flex flex-col">
      <Navbar darkText={true} />

      <main className="flex-1 pt-40 px-6 md:px-12 pb-40">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-24 text-center">
             <span className="text-[10px] font-main font-black tracking-[0.5em] text-accent-primary uppercase mb-6 block">
                Visual Narrative
             </span>
             <h1 className="text-6xl md:text-8xl font-serif text-primary tracking-tighter uppercase">
                The <span className="italic opacity-80">Gallery</span>
             </h1>
          </div>

          <GalleryView images={images} />
        </div>
      </main>

      <Footer />
    </div>
  );
}
