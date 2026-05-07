"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function InfiniteGallery() {
  const images = [
    { src: "/image/roberto-nickson-emqnSQwQQDo-unsplash.jpg", aspect: "aspect-[4/5]", width: "w-[300px] md:w-[450px]" },
    { src: "/luxury_hotel_hero_1777681407690.png", aspect: "aspect-square", width: "w-[300px] md:w-[400px]" },
    { src: "/image/roberto-nickson-emqnSQwQQDo-unsplash.jpg", aspect: "aspect-[3/2]", width: "w-[400px] md:w-[600px]" },
    { src: "/image/roberto-nickson-emqnSQwQQDo-unsplash.jpg", aspect: "aspect-[4/5]", width: "w-[300px] md:w-[450px]" },
    { src: "/luxury_hotel_hero_1777681407690.png", aspect: "aspect-square", width: "w-[300px] md:w-[400px]" },
  ];

  // Duplicate for infinite loop
  const duplicatedImages = [...images, ...images];

  return (
    <section className="py-20 bg-base overflow-hidden relative">
      <div className="absolute inset-y-0 left-0 w-40 bg-gradient-to-r from-base to-transparent z-10 pointer-events-none"></div>
      <div className="absolute inset-y-0 right-0 w-40 bg-gradient-to-l from-base to-transparent z-10 pointer-events-none"></div>

      <motion.div
        className="flex gap-8 whitespace-nowrap"
        animate={{ 
          x: ["0%", "-50%"] 
        }}
        transition={{ 
          duration: 35, 
          ease: "linear", 
          repeat: Infinity,
          repeatType: "loop"
        }}
      >
        {duplicatedImages.map((img, index) => (
          <div
            key={index}
            className={`${img.width} ${img.aspect} flex-shrink-0 relative group overflow-hidden rounded-[2rem] shadow-2xl shadow-black/5 border border-black/5`}
          >
            <Image
              src={img.src}
              alt={`Gallery Image ${index}`}
              fill
              className="object-cover transition-transform duration-1000 group-hover:scale-110 grayscale-[20%] group-hover:grayscale-0"
            />
            {/* Soft Overlay */}
            <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors duration-700"></div>
          </div>
        ))}
      </motion.div>

      {/* Decorative Branding Line */}
      <div className="mt-20 flex justify-center">
        <div className="flex items-center gap-6 opacity-20">
          <div className="w-24 h-[1px] bg-primary"></div>
          <span className="text-[10px] font-main font-black tracking-[0.8em] text-primary uppercase">
            Curated Spaces
          </span>
          <div className="w-24 h-[1px] bg-primary"></div>
        </div>
      </div>
    </section>
  );
}
