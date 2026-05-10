"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface SuiteDetailHeroProps {
  name: string;
  category: string;
  gallery: string[];
}

export default function SuiteDetailHero({ name, category, gallery }: SuiteDetailHeroProps) {
  const [index, setIndex] = useState(0);

  const next = () => setIndex((i) => (i + 1) % gallery.length);
  const prev = () => setIndex((i) => (i - 1 + gallery.length) % gallery.length);

  return (
    <section className="relative h-[85dvh] w-full overflow-hidden group">
      {/* Cinematic Slider */}
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 1.05, opacity: 0 }}
          transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0"
        >
          <Image
            src={gallery[index]}
            alt={`${name} perspective ${index + 1}`}
            fill
            priority
            className="object-cover brightness-[0.8]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
        </motion.div>
      </AnimatePresence>

      {/* Slider Controls (Hidden by default, appear on hover) */}
      <div className="absolute inset-x-12 top-1/2 -translate-y-1/2 flex justify-between z-30 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
        <button
          onClick={prev}
          className="h-16 w-16 rounded-full border border-white/20 flex items-center justify-center backdrop-blur-xl bg-white/5 text-white hover:bg-white hover:text-primary transition-all duration-500"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>
        <button
          onClick={next}
          className="h-16 w-16 rounded-full border border-white/20 flex items-center justify-center backdrop-blur-xl bg-white/5 text-white hover:bg-white hover:text-primary transition-all duration-500"
        >
          <ChevronRight className="h-6 w-6" />
        </button>
      </div>

      {/* Back Button */}


      {/* Floating Indicator */}
      <div className="absolute bottom-24 right-12 z-40 flex flex-col items-end gap-6">
        <div className="flex gap-4">
          {gallery.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              className={`h-[2px] transition-all duration-700 ${index === i ? "w-12 bg-accent-primary" : "w-4 bg-white/20"}`}
            />
          ))}
        </div>
        <span className="text-[12px] font-main font-black text-white/40 tracking-[0.3em]">
          0{index + 1} / 0{gallery.length}
        </span>
      </div>

      <div className="absolute bottom-24 left-12 right-12 z-10 max-w-7xl mx-auto pointer-events-none">
        <motion.div
          key={`title-${index}`}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          <span className="text-[12px] font-main font-black tracking-[0.5em] text-accent-primary uppercase mb-8 block drop-shadow-lg">
            [ {category} ]
          </span>
          <h1 className="text-6xl md:text-9xl font-serif text-white tracking-tighter leading-[0.85] mb-12 drop-shadow-2xl uppercase">
            {name.split(' ')[0]} <br />
            <span className="italic opacity-80">{name.split(' ').slice(1).join(' ')}</span>
          </h1>
        </motion.div>
      </div>
    </section>
  );
}
