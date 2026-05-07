"use client";

import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import { cn } from "@/lib/utils";

export default function ServicesSection() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(1);

  const packages = [
    {
      title: "OCEAN BREEZE SUITE",
      desc: "EXPERIENCE THE RHYTHM OF THE TIDES IN TOTAL LUXURY",
      offer: null,
    },
    {
      title: "AZURE PENTHOUSE",
      desc: "THE ULTIMATE PANORAMIC RETREAT WITH PRIVATE CONCIERGE",
      offer: "30% OFF WINTER RETREAT",
    },
    {
      title: "GARDEN SANCTUARY",
      desc: "A HIDDEN ARCHITECTURAL GEM AMONGST TROPICAL FLORA",
      offer: null,
    },
  ];

  return (
    <section className="pb-40 px-12 bg-base">
      <div className="container mx-auto">

        {/* Standardized Header */}
        <div className="flex flex-col items-center text-center mb-40 max-w-5xl mx-auto">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 0.4, y: 0 }}
            transition={{ duration: 1 }}
            className="text-[12px] font-main font-black tracking-[0.5em] text-accent-primary uppercase mb-12"
          >
            [ THE COLLECTION ]
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            className="text-5xl md:text-8xl font-serif font-medium text-primary tracking-tighter leading-[0.85] mb-12"
          >
            Exclusive <br />
            <span className="italic">room packages</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 1.2 }}
            className="text-sm md:text-lg font-main text-muted leading-[1.8] font-medium max-w-2xl"
          >
            Tailored experiences & architectural excellence for an unforgettable island escape.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {packages.map((pkg, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 1 }}
              className="flex h-[550px] group cursor-pointer overflow-hidden rounded-3xl shadow-2xl shadow-black/5 border border-black/5 bg-white"
            >
              {/* Vertical Title Strip */}
              <div className="w-16 md:w-24 flex flex-col items-center justify-center border-r border-black/5 bg-white py-12 px-2">
                <h4 className="text-xl md:text-3xl font-serif text-primary whitespace-nowrap -rotate-90 origin-center tracking-tight">
                  {pkg.title.split(' ').map(word => word.charAt(0) + word.slice(1).toLowerCase()).join(' ')}
                </h4>
              </div>

              {/* Image Area with Ribbon */}
              <div className="flex-1 relative overflow-hidden">
                <Image
                  src="/image/frames-for-your-heart-zSG-kd-L6vw-unsplash.jpg"
                  alt={pkg.title}
                  fill
                  className="object-cover transition-transform duration-1000 group-hover:scale-110"
                />

                {/* Diagonal Ribbon */}
                {pkg.offer && (
                  <div className="absolute top-0 left-0 w-32 h-32 overflow-hidden pointer-events-none">
                    <div className="absolute top-[25px] left-[-35px] w-[150px] py-2 bg-[#f4c45e] text-primary text-[8px] font-main font-black tracking-[0.2em] uppercase text-center -rotate-45 shadow-lg">
                      {pkg.offer.includes('%') ? `Save ${pkg.offer.match(/\d+%/)?.[0] || pkg.offer}` : pkg.offer}
                    </div>
                  </div>
                )}

                {/* Subtle Hover Overlay */}
                <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/5 transition-colors duration-700"></div>

                {/* Bottom Details (Appears on Hover) */}
                <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-700 bg-gradient-to-t from-black/60 to-transparent">
                  <p className="text-white/80 text-[9px] font-sec font-bold tracking-[0.2em] uppercase">
                    {pkg.desc}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
