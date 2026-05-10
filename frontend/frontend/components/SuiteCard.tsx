"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

interface SuiteCardProps {
  suite: {
    id: number;
    name: string;
    category: string;
    price: number;
    image: string;
    description: string;
  };
  index: number;
}

import Link from "next/link";

export default function SuiteCard({ suite, index }: SuiteCardProps) {
  return (
    <Link href={`/suites/${suite.id}`}>
      <motion.div
        layout
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className={`group cursor-pointer ${index % 3 === 1 ? "lg:mt-32" : ""}`}
      >
        <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] mb-12 shadow-2xl shadow-black/5 border border-black/5">
          <Image
            src={suite.image}
            alt={suite.name}
            fill
            priority={index < 2}
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 45vw, 30vw"
            className="object-cover grayscale-[0.2] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000"
          />
          <div className="absolute top-8 left-8 px-6 py-2 bg-white/90 backdrop-blur-md rounded-full text-[9px] text-primary font-black tracking-[0.3em] uppercase">
            {suite.category}
          </div>

          {/* Overlay Action */}
          <div className="absolute bottom-8 right-8 h-14 w-14 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-700">
            <ArrowUpRight className="h-5 w-5 text-primary" />
          </div>
        </div>

        <div className="flex justify-between items-start mb-6">
          <div>
            <h3 className="text-3xl md:text-4xl font-main font-medium text-primary tracking-tighter uppercase mb-2">
              {suite.name}
            </h3>
            <p className="text-xs font-sec text-muted font-medium uppercase tracking-[0.2em]">
              Starting from ${suite.price} / Night
            </p>
          </div>
        </div>

        <p className="text-sm font-main text-muted/80 leading-relaxed max-w-sm">
          {suite.description}
        </p>
      </motion.div>
    </Link>
  );
}
