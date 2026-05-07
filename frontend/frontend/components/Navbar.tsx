"use client";

import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={cn(
        "fixed top-0 w-full z-50 transition-all duration-700 px-12",
        isScrolled ? "py-4 bg-white/90 backdrop-blur-xl border-black/5" : "py-10 bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto grid grid-cols-3 items-center">
        {/* Left: Navigation */}
        <div className={cn(
          "flex items-center gap-10 text-[10px] font-sec font-extrabold uppercase tracking-[0.4em] transition-colors duration-500",
          isScrolled ? "text-primary" : "text-white"
        )}>
          <a href="#" className="group relative hidden lg:block">
            <span className="relative z-10">Suites</span>
            <div className="absolute -bottom-1 left-0 w-0 h-[1px] bg-accent group-hover:w-full transition-all duration-500"></div>
          </a>
          <a href="#" className="group relative hidden lg:block">
            <span className="relative z-10">Story</span>
            <div className="absolute -bottom-1 left-0 w-0 h-[1px] bg-accent group-hover:w-full transition-all duration-500"></div>
          </a>
          <button className="lg:hidden text-lg">☰</button>
        </div>

        {/* Center: Brand */}
        <div className="flex flex-col items-center justify-center">
          <div className={cn(
            "text-2xl md:text-3xl font-main font-medium tracking-[0.2em] transition-all duration-700",
            isScrolled ? "text-primary scale-90" : "text-white"
          )}>
            COASTAL COVE
          </div>
          <div className={cn(
            "text-[8px] font-sec font-bold tracking-[0.6em] uppercase mt-1 transition-opacity duration-700",
            isScrolled ? "opacity-0 h-0" : "opacity-60 text-white"
          )}>
            HOTEL & RESIDENCES
          </div>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center justify-end gap-6 md:gap-10">
          <a href="#" className={cn(
            "hidden md:block text-[10px] font-sec font-extrabold uppercase tracking-[0.4em] transition-colors",
            isScrolled ? "text-primary/60 hover:text-primary" : "text-white/60 hover:text-white"
          )}>
            Login
          </a>
          <button className={cn(
            "px-8 py-3 text-[10px] font-sec font-extrabold uppercase tracking-[0.3em] transition-all rounded-full border",
            isScrolled
              ? "border-primary text-primary hover:bg-primary hover:text-white"
              : "border-white/40 text-white hover:bg-white hover:text-primary"
          )}>
            Reserve
          </button>
        </div>
      </div>
    </nav>
  );
}
