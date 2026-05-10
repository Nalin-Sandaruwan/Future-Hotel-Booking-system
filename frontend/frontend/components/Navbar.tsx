"use client";

import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { X, Menu } from "lucide-react";
import Link from "next/link";

export default function Navbar({ darkText = false }: { darkText?: boolean }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Prevent scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isOpen]);

  const navLinks = [
    { name: "Suites", href: "/suites" },
    { name: "Story", href: "/story" },
    { name: "Gallery", href: "/gallery" },
    { name: "Wellness", href: "/wellness" },
  ];

  return (
    <>
      <nav
        className={cn(
          "fixed top-0 w-full z-50 transition-all duration-700 px-6 md:px-12",
          isScrolled ? "py-4 bg-white/90 backdrop-blur-xl " : "py-8 md:py-10 bg-transparent"
        )}
      >
        <div className="max-w-7xl mx-auto flex justify-between items-center lg:grid lg:grid-cols-3">

          {/* Left: Desktop Navigation */}
          <div className={cn(
            "hidden lg:flex items-center gap-10 text-[10px] font-main font-black uppercase tracking-[0.4em] transition-colors duration-500",
            (isScrolled || darkText) ? "text-primary" : "text-white"
          )}>
            {navLinks.slice(0, 4).map((link) => (
              <Link key={link.name} href={link.href} className="group relative">
                <span className="relative z-10">{link.name}</span>
                <div className="absolute -bottom-1 left-0 w-0 h-[1px] bg-accent-primary group-hover:w-full transition-all duration-500"></div>
              </Link>
            ))}
          </div>

          {/* Left: Mobile Menu Toggle */}
          <div className="lg:hidden flex items-center">
            <button
              onClick={() => setIsOpen(true)}
              className={cn(
                "p-2 transition-colors",
                (isScrolled || darkText) ? "text-primary" : "text-white"
              )}
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>

          {/* Center: Brand */}
          <Link href="/" className="flex flex-col items-center justify-center">
            <div className={cn(
              "text-xl md:text-3xl font-serif font-medium tracking-[0.2em] transition-all duration-700 uppercase",
              (isScrolled || darkText) ? "text-primary scale-90" : "text-white"
            )}>
              COASTAL COVE
            </div>
            <div className={cn(
              "text-[7px] md:text-[8px] font-main font-black tracking-[0.6em] uppercase mt-1 transition-opacity duration-700",
              (isScrolled || darkText) ? "opacity-0 h-0" : "opacity-60 text-white"
            )}>
              HOTEL & RESIDENCES
            </div>
          </Link>

          {/* Right: Actions */}
          <div className="flex items-center justify-end gap-6 md:gap-10">
            {/* Additional Desktop Links (Right Side) */}
            <div className={cn(
              "hidden lg:flex items-center gap-10 text-[10px] font-main font-black uppercase tracking-[0.4em] transition-colors duration-500 mr-4",
              (isScrolled || darkText) ? "text-primary" : "text-white"
            )}>
              {/* {navLinks.slice(2, 4).map((link) => (
                <Link key={link.name} href={link.href} className="group relative">
                  <span className="relative z-10">{link.name}</span>
                  <div className="absolute -bottom-1 left-0 w-0 h-[1px] bg-accent-primary group-hover:w-full transition-all duration-500"></div>
                </Link>
              ))} */}
            </div>

            <Link href="/login" className={cn(
              "hidden md:block text-[10px] font-main font-black uppercase tracking-[0.4em] transition-colors",
              (isScrolled || darkText) ? "text-primary/60 hover:text-primary" : "text-white/60 hover:text-white"
            )}>
              Login
            </Link>
            <Link href="/suites">
              <button className={cn(
                "px-4 md:px-8 py-2 md:py-3 text-[9px] md:text-[10px] font-main font-black uppercase tracking-[0.3em] transition-all rounded-full border flex items-center justify-center gap-2",
                (isScrolled || darkText)
                  ? "border-primary text-primary hover:bg-primary hover:text-white"
                  : "border-white/40 text-white hover:bg-white hover:text-primary"
              )}>
                <span className="hidden md:block">Reserve</span>
                <div className="md:hidden">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
                  </svg>
                </div>
              </button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-primary flex flex-col p-12 overflow-hidden"
          >
            {/* Background Texture */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none select-none overflow-hidden">
              <span className="text-[40rem] font-serif font-black absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">C</span>
            </div>

            <div className="relative z-10 flex flex-col h-full">
              <div className="flex justify-between items-center mb-24">
                <span className="text-[10px] font-main font-black tracking-[0.5em] text-white/40 uppercase">
                  [ MENU ]
                </span>
                <button
                  onClick={() => setIsOpen(false)}
                  className="h-14 w-14 rounded-full border border-white/10 flex items-center justify-center text-white hover:bg-white hover:text-primary transition-all duration-500"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              <nav className="flex flex-col gap-12">
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + i * 0.1, duration: 0.8 }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      className="group flex items-end gap-6"
                    >
                      <span className="text-[12px] font-main font-black text-white/20 group-hover:text-accent-primary transition-colors">0{i + 1}</span>
                      <span className="text-5xl md:text-7xl font-serif text-white group-hover:italic transition-all duration-500 uppercase">{link.name}</span>
                    </Link>
                  </motion.div>
                ))}
              </nav>

              <div className="mt-auto flex flex-col md:flex-row justify-between items-end gap-12">
                <div className="flex flex-col gap-4">
                  <span className="text-[10px] font-main font-black tracking-[0.3em] text-white/40 uppercase">Connect</span>
                  <div className="flex gap-8">
                    {["Instagram", "Journal", "Architects"].map(item => (
                      <a key={item} href="#" className="text-[10px] font-main font-bold tracking-[0.2em] text-white uppercase hover:text-accent-primary transition-colors">{item}</a>
                    ))}
                  </div>
                </div>

                <Link
                  href="/login"
                  onClick={() => setIsOpen(false)}
                  className="px-12 py-6 bg-white text-primary rounded-full text-[11px] font-main font-black tracking-[0.4em] uppercase hover:bg-accent-primary hover:text-white transition-all duration-700"
                >
                  Member Login
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
