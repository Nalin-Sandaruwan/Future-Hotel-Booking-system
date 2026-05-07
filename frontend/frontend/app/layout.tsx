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
  title: "Coastal Cove | Luxury Hotel & Resort",
  description: "Experience tranquility and luxury at Coastal Cove. Book your stay at the finest island retreat.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn("h-full", "antialiased", hanken.variable, inter.variable, playfair.variable, "font-sans", geist.variable)}
    >
      <body className="min-h-full flex flex-col selection:bg-accent selection:text-white">
        {children}
      </body>
    </html>
  );
}
