"use client";

import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import AuthHero from "@/components/AuthHero";
import SignupForm from "@/components/SignupForm";

export default function SignupPage() {
  return (
    <div className="flex min-h-screen bg-base overflow-hidden">

      {/* Back to Home */}
      <Link
        href="/"
        className="absolute top-12 left-12 z-50 flex items-center gap-4 text-[10px] font-main font-black tracking-[0.3em] text-white uppercase group"
      >
        <div className="h-10 w-10 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-white group-hover:text-primary transition-all duration-500">
          <ChevronLeft className="h-4 w-4" />
        </div>
        <span>Back to Haven</span>
      </Link>

      {/* Left Column: Architectural Showcase */}
      <AuthHero
        label="THE BEGINNING"
        title={<>Begin your <br /><span className="italic opacity-80 text-accent">Legacy.</span></>}
        image="/image/frames-for-your-heart-zSG-kd-L6vw-unsplash.jpg"
        subtitle="Join our exclusive circle and experience the pinnacle of coastal luxury."
      />

      {/* Right Column: Form */}
      <div className="w-full lg:w-1/2 flex flex-col items-center justify-center p-8 md:p-24 bg-white relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none opacity-[0.02]">
          <span className="text-[30rem] font-serif font-black">S</span>
        </div>

        <SignupForm />

        {/* Footer Detail */}
        <div className="absolute bottom-8 text-center">
          <p className="text-[8px] font-sec font-bold tracking-[0.5em] text-primary/20 uppercase">
            © 2026 Coastal Cove Luxury Residences
          </p>
        </div>
      </div>
    </div>
  );
}
