"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight, Sun } from "lucide-react";
import { cn } from "@/lib/utils";

export default function FeaturesSection() {
  const features = [
    {
      id: "01",
      title: "VARIETY OF SUITES",
      desc: "Individual stay plans, curated amenities, and full concierge support make your retreat seamless and stress-free.",
    },
    {
      id: "02",
      title: "STYLISH INTERIOR ART",
      desc: "Contemporary design, high-quality textures, and bespoke craftsmanship make your room a true reflection of luxury.",
    },
    {
      id: "03",
      title: "BALANCE & SERENITY",
      desc: "A calm atmosphere ideal for physical and mental well-being, with space for relaxation and slow island living.",
    },
    {
      id: "04",
      title: "FLEXIBLE STAY TERMS",
      desc: "Personalized booking options, transparent policies, and comprehensive support ensure a confident experience.",
    },
  ];

  return (
    <section className="py-60 px-12 bg-base overflow-hidden">
      <div className="container mx-auto">

        {/* Header Section */}
        <div className="relative mb-40 text-center">
          {/* Decorative Brackets - Editorial Style */}

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col items-center relative"
          >
            <span className="text-[12px] font-main font-black tracking-[0.5em] text-accent-primary/40 uppercase mb-12">
              Featuers
            </span>

            <div className="relative group">
              <h2 className="text-5xl md:text-8xl font-serif font-medium text-primary tracking-tighter leading-[0.85] text-center">
                The Parks <br />
                <span className="flex flex-wrap items-center justify-center gap-x-8 gap-y-6">
                  <span className="italic">of living </span>


                </span>
              </h2>
            </div>
          </motion.div>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-20 items-center">

          {/* Left Column: Titles */}
          <div className="space-y-20">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1, duration: 0.8 }}
                className="group cursor-pointer"
              >
                <div className="flex items-start gap-4">
                  <span className="text-[10px] font-main font-bold text-primary/30 mt-1">
                    [{feature.id}
                  </span>
                  <h4 className="text-xl md:text-3xl font-main font-medium text-primary tracking-tight group-hover:text-accent transition-colors duration-500">
                    {feature.title}
                  </h4>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Center Column: Visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
            whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
            className="relative aspect-square rounded-full overflow-hidden shadow-2xl shadow-black/10 border-8 border-white/20"
          >
            <Image
              src="/image/roberto-nickson-emqnSQwQQDo-unsplash.jpg"
              alt="Nature Harmony"
              fill
              sizes="(max-width: 768px) 80vw, 40vw"
              className="object-cover hover:scale-110 transition-transform duration-[2s]"
            />
          </motion.div>

          {/* Right Column: Descriptions */}
          <div className="space-y-20">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1, duration: 0.8 }}
                className="flex items-center justify-between gap-8 group"
              >
                <p className="text-sm font-sec text-muted leading-relaxed max-w-[240px]">
                  {feature.desc}
                </p>
                <button className="h-10 w-10 rounded-full border border-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all duration-500">
                  <ArrowUpRight className="h-4 w-4" />
                </button>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
