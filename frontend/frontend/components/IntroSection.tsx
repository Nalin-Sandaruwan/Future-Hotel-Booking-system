"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function IntroSection() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const yLeft = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const yRight = useTransform(scrollYProgress, [0, 1], [-50, 50]);

  return (
    <section ref={containerRef} className="py-60 px-12 relative overflow-hidden bg-base">
      <div className="max-w-7xl mx-auto flex flex-col items-center">

        {/* Decorative Side Image - Left (Parallax) */}
        <motion.div
          style={{ y: yLeft }}
          className="absolute left-[-5%] top-[20%] w-[25%] aspect-[3/4] hidden xl:block z-0"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 0.8, scale: 1 }}
            transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
            className="w-full h-full relative"
          >
            <Image
              src="/image/roberto-nickson-emqnSQwQQDo-unsplash.jpg"
              alt="Interior view"
              fill
              className="object-cover rounded-2xl shadow-2xl shadow-black/5 brightness-95"
            />
          </motion.div>
        </motion.div>

        {/* Standardized Header */}
        <div className="flex flex-col items-center text-center mb-32 max-w-4xl mx-auto">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 0.4, y: 0 }}
            transition={{ duration: 1 }}
            className="text-[12px] font-main font-black tracking-[0.5em] text-accent-primary uppercase mb-12"
          >
            [ THE APPROACH ]
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            className="text-5xl md:text-8xl font-serif font-medium text-primary tracking-tighter leading-[0.85] mb-12"
          >
            A well-designed home <br />
            <span className="italic">is a work of art</span>
          </motion.h2>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 1.2 }}
            className="text-sm md:text-lg font-main text-muted leading-[1.8] font-medium max-w-xl"
          >
            An aesthetically storied compilation of elements that speak to your lifestyle and ideals, while honoring the organic structure of your space.
          </motion.p>
        </div>

          <motion.button
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.5 }}
            className="px-10 py-4 border border-primary/20 text-[11px] font-sec font-extrabold uppercase tracking-[0.3em] text-primary hover:bg-primary hover:text-white transition-all duration-500 rounded-lg shadow-xl shadow-black/5"
          >
            Work Together
          </motion.button>
        <motion.div
          style={{ y: yRight }}
          className="absolute right-[-5%] top-[10%] w-[30%] aspect-[3/4] hidden xl:block z-0"
        >
          <motion.div
            initial={{ opacity: 0, scale: 1.1 }}
            whileInView={{ opacity: 0.8, scale: 1 }}
            transition={{ duration: 2, ease: [0.22, 1, 0.36, 1] }}
            className="w-full h-full relative"
          >
            <Image
              src="/image/roberto-nickson-emqnSQwQQDo-unsplash.jpg"
              alt="Living space"
              fill
              className="object-cover rounded-2xl shadow-2xl shadow-black/5 brightness-90"
            />
          </motion.div>
        </motion.div>

        {/* Mobile/Tablet Fallback Images */}
        <div className="grid grid-cols-2 gap-8 w-full xl:hidden">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="relative aspect-[3/4] overflow-hidden rounded-2xl"
          >
            <Image src="/image/roberto-nickson-emqnSQwQQDo-unsplash.jpg" alt="Interior" fill className="object-cover" />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 20 }}
            className="relative aspect-[3/4] overflow-hidden rounded-2xl"
          >
            <Image src="/image/roberto-nickson-emqnSQwQQDo-unsplash.jpg" alt="Living" fill className="object-cover" />
          </motion.div>
        </div>

      </div>
    </section>
  );
}
