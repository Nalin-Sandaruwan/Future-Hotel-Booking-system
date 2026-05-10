"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const categories = ["All", "Architecture", "Interiors", "Coastline"];

interface GalleryViewProps {
  images: any[];
}

export default function GalleryView({ images }: GalleryViewProps) {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredImages = activeCategory === "All" 
    ? images 
    : images.filter(img => img.category === activeCategory);

  return (
    <>
      {/* Filters */}
      <div className="flex flex-wrap justify-center gap-8 md:gap-12 mb-32 border-b border-black/5 pb-12">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`text-[10px] font-main font-black uppercase tracking-[0.3em] transition-all relative py-2 ${
              activeCategory === cat ? "text-primary" : "text-primary/30 hover:text-primary"
            }`}
          >
            {cat}
            {activeCategory === cat && (
              <motion.div 
                layoutId="underline"
                className="absolute -bottom-[1px] left-0 right-0 h-[1px] bg-accent-primary"
              />
            )}
          </button>
        ))}
      </div>

      {/* Masonry Grid */}
      <div className="columns-1 md:columns-2 lg:columns-3 gap-12 space-y-12">
        <AnimatePresence mode="popLayout">
          {filteredImages.map((img) => (
            <motion.div
              key={img.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="relative group cursor-none overflow-hidden rounded-[2rem] border border-black/5 shadow-2xl shadow-black/5"
            >
              <Image
                src={img.src}
                alt={img.title}
                width={800}
                height={1000}
                className="object-cover transition-all duration-1000 grayscale-[0.2] group-hover:grayscale-0 group-hover:scale-105"
              />
              
              <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 flex flex-col justify-end p-10">
                <span className="text-[10px] font-main font-black tracking-[0.3em] text-white/60 uppercase mb-2">
                   {img.category}
                </span>
                <h3 className="text-2xl font-serif text-white italic">
                    {img.title}
                </h3>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </>
  );
}
