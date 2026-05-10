import type { Metadata } from "next";
import { Hanken_Grotesk, Inter, Geist, Playfair_Display } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

const hanken = Hanken_Grotesk({
  variable: "--font-hanken",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://coastalcove.com'),
  title: {
    default: "Coastal Cove | Luxury Hotel & Resort",
    template: "%s | Coastal Cove"
  },
  description: "Experience architectural tranquility and luxury at Coastal Cove. Discover our curated suites, holistic wellness sanctuary, and the pinnacle of island hospitality.",
  keywords: ["Luxury Hotel", "Coastal Resort", "Architectural Suites", "Boutique Hotel", "Island Retreat", "Wellness Spa"],
  authors: [{ name: "Coastal Cove Architecture Team" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://coastalcove.com",
    siteName: "Coastal Cove Luxury Residences",
    title: "Coastal Cove | A Sanctuary of Stillness",
    description: "Architectural purity meets organic warmth on the edge of the island.",
    images: [
      {
        url: "/image/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Coastal Cove Luxury Resort"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Coastal Cove | Luxury Hotel & Resort",
    description: "Discover the pinnacle of island hospitality and architectural tranquility.",
    images: ["/image/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn("h-full", "antialiased", hanken.variable, inter.variable, playfair.variable, "font-sans", geist.variable)}
    >
      <body suppressHydrationWarning className="min-h-full flex flex-col selection:bg-accent selection:text-white">
        {children}
      </body>
    </html>
  );
}
