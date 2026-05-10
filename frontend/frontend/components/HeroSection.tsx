"use client";

import Image from "next/image";
import { motion, Variants } from "framer-motion";

export default function HeroSection() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.5,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 1.5,
        ease: [0.22, 1, 0.36, 1], // Custom cinematic ease
      },
    },
  };

  const lineVariants: Variants = {
    hidden: { scaleX: 0, opacity: 0 },
    visible: {
      scaleX: 1,
      opacity: 0.4,
      transition: {
        duration: 2,
        ease: "easeInOut",
      },
    },
  };

  return (
    <section className="relative h-[100dvh] w-full flex flex-col items-center justify-center overflow-hidden">
      {/* Background with Motion */}
      <motion.div
        initial={{ scale: 1.1, x: "-5%" }}
        animate={{ x: "5%" }}
        transition={{
          duration: 30,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "linear"
        }}
        className="absolute inset-0 z-0"
      >
        <Image
          src="/image/michael-brown-bZZ-YKRvRF0-unsplash.jpg"
          alt="Luxury Coastal Horizon"
          fill
          sizes="100vw"
          className="object-cover brightness-[0.7] scale-110"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-base/80 z-1"></div>
      </motion.div>

      {/* Content with Motion */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 text-center px-4 max-w-5xl"
      >
        <motion.div variants={itemVariants} className="mb-12 opacity-80">
          <span className="text-[12px] font-sec font-extrabold uppercase tracking-[0.5em] text-white">EST. 2026</span>
        </motion.div>

        <motion.h1 variants={itemVariants} className="text-5xl md:text-8xl font-main font-medium text-white mb-10 leading-[1.1] tracking-tight">
          Bringing <span className="italic font-serif font-normal">beauty & enjoyment</span> <br /> to everyday living
        </motion.h1>

        <motion.div
          variants={lineVariants}
          className="w-12 h-[1px] bg-white mx-auto mb-10 origin-center"
        ></motion.div>

        <motion.p variants={itemVariants} className="text-[11px] font-sec text-white/90 max-w-md mx-auto leading-loose font-extrabold uppercase tracking-[0.4em]">
          INTERIOR DESIGN FIRM SERVING <br /> THE COASTAL COVE & BEYOND
        </motion.p>
      </motion.div>

      {/* Scroll Indicator with Motion */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5, duration: 1 }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-6 text-white/60 group cursor-pointer"
      >
        <div className="w-[1px] h-12 bg-gradient-to-b from-white/60 to-transparent transition-all group-hover:h-16"></div>
      </motion.div>
    </section>
  );
}
