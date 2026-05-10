"use client";

import { motion } from "framer-motion";
import Image from "next/image";

interface AuthHeroProps {
  title: React.ReactNode;
  subtitle: string;
  image: string;
  label: string;
}

export default function AuthHero({ title, subtitle, image, label }: AuthHeroProps) {
  return (
    <div className="relative hidden lg:flex lg:w-1/2 overflow-hidden">
      <motion.div
        initial={{ scale: 1.1, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 2, ease: [0.22, 1, 0.36, 1] }}
        className="absolute inset-0"
      >
        <Image
          src={image}
          alt="Coastal Cove Architecture"
          fill
          priority
          className="object-cover grayscale-[0.2]"
        />
        <div className="absolute inset-0 bg-primary/20 mix-blend-overlay"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-transparent to-transparent"></div>
      </motion.div>

      <div className="relative z-10 mt-auto p-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
        >
          <span className="text-[12px] font-main font-black tracking-[0.5em] text-white/60 uppercase mb-8 block">
            [ {label} ]
          </span>
          <h1 className="text-6xl font-serif text-white leading-tight mb-8">
            {title}
          </h1>
          <div className="w-12 h-[1px] bg-accent/40"></div>
        </motion.div>
      </div>
    </div>
  );
}
