"use client";

import { motion } from "framer-motion";

export default function StoryHero() {
  return (
    <section className="relative pt-52 pb-14 px-12 bg-base overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col items-center text-center">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 0.4, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="text-[12px] font-main font-black tracking-[0.5em] text-accent-primary uppercase mb-12"
          >
            [ OUR PHILOSOPHY ]
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
            className="text-6xl md:text-9xl font-serif font-medium text-primary tracking-tighter leading-[0.85] mb-12 uppercase"
          >
            The Story <br />
            <span className="italic text-primary/80">of Coastal Cove</span>
          </motion.h1>

          <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 0.2 }}
            transition={{ duration: 1.5, delay: 0.5 }}
            className="w-24 h-[1px] bg-primary mb-12 origin-center"
          ></motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.4 }}
            className="text-sm md:text-lg font-main text-muted leading-[1.8] font-medium max-w-2xl mx-auto"
          >
            A journey through time and architectural evolution. Discover the heritage, design, and vision behind the island's most exclusive retreat—where every stone tells a story of serenity.
          </motion.p>
        </div>
      </div>

      {/* Decorative side element */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 -rotate-90 origin-left hidden xl:block">
        <span className="text-[10px] font-sec font-bold tracking-[1em] text-primary/10 uppercase">
          Coastal Cove Heritage
        </span>
      </div>
    </section>
  );
}
