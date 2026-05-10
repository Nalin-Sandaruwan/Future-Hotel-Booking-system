"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Quote, ArrowRight, ArrowLeft } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import Image from "next/image";

export default function TestimonialsSection() {
  const [index, setIndex] = useState(0);

  const testimonials = [
    {
      quote: "Coastal Cove isn't just a stay; it's a profound dialogue between architecture and nature. The attention to detail in the linen textures and the morning light is simply unmatched.",
      author: "Julianne V. Moore",
      role: "Interior Architect",
      image: "/image/roberto-nickson-emqnSQwQQDo-unsplash.jpg",
    },
    {
      quote: "The serenity found here is curated with surgical precision. It's rare to find a space that understands the luxury of silence so well.",
      author: "Marcus Aurelius Thorne",
      role: "Creative Director",
      image: "/image/frames-for-your-heart-zSG-kd-L6vw-unsplash.jpg",
    },
    {
      quote: "A masterclass in modern coastal living. The seamless transition between indoor and outdoor spaces creates a rhythm of life that is both energizing and deeply peaceful.",
      author: "Elena Sofia Rossi",
      role: "Design Critic",
      image: "/image/michael-brown-bZZ-YKRvRF0-unsplash.jpg",
    }
  ];

  const next = () => setIndex((i) => (i + 1) % testimonials.length);
  const prev = () => setIndex((i) => (i - 1 + testimonials.length) % testimonials.length);

  return (
    <section className="py-60 px-12 bg-base relative overflow-hidden flex items-center justify-center min-h-[900px]">
      
      {/* Background Decorative Text */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full text-center pointer-events-none select-none overflow-hidden">
        <motion.span 
          key={`bg-text-${index}`}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 2, ease: [0.22, 1, 0.36, 1] }}
          className="text-[20vw] font-serif font-black text-primary/[0.02] whitespace-nowrap block"
        >
          {testimonials[index].author.split(' ')[0]}
        </motion.span>
      </div>

      <div className="max-w-7xl mx-auto w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          
          {/* Left: Image Showcase */}
          <div className="relative aspect-square md:aspect-[4/5] lg:aspect-auto lg:h-[600px] rounded-[3rem] overflow-hidden shadow-2xl shadow-black/10 border border-black/5">
            <AnimatePresence mode="wait">
              <motion.div
                key={testimonials[index].image}
                initial={{ opacity: 0, scale: 1.1 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.05 }}
                transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
                className="absolute inset-0"
              >
                <Image
                  src={testimonials[index].image}
                  alt={testimonials[index].author}
                  fill
                  className="object-cover grayscale-[0.3]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
              </motion.div>
            </AnimatePresence>
            
            {/* Technical Overlay */}
            <div className="absolute bottom-12 left-12 right-12 flex justify-between items-end">
              <div className="flex flex-col gap-2">
                <div className="w-8 h-[1px] bg-white/50"></div>
                <span className="text-[10px] font-main font-bold tracking-[0.4em] text-white/80 uppercase">
                  Subject Ref. 00{index + 1}
                </span>
              </div>
              <Quote className="h-8 w-8 text-white/30" />
            </div>
          </div>

          {/* Right: Content */}
          <div className="flex flex-col">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-12"
            >
              <span className="text-[10px] font-main font-black tracking-[0.5em] text-accent-primary uppercase mb-6 block">
                [ GUEST PERSPECTIVE ]
              </span>
              <div className="w-12 h-[1px] bg-accent-primary/30"></div>
            </motion.div>

            <div className="relative min-h-[350px] flex flex-col justify-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                >
                  <h3 className="text-4xl md:text-5xl font-serif text-primary leading-[1.2] mb-12 tracking-tight">
                    "{testimonials[index].quote}"
                  </h3>

                  <div className="flex items-center gap-6">
                    <div className="h-px w-8 bg-primary/20"></div>
                    <div className="flex flex-col">
                      <span className="text-[14px] font-main font-bold tracking-[0.2em] text-primary uppercase">
                        {testimonials[index].author}
                      </span>
                      <span className="text-[11px] font-sec font-medium tracking-[0.1em] text-muted uppercase mt-1">
                        {testimonials[index].role}
                      </span>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Navigation Controls */}
            <div className="flex items-center gap-8 mt-16">
              <div className="flex gap-4">
                <button
                  onClick={prev}
                  className="h-14 w-14 rounded-full border border-primary/10 flex items-center justify-center hover:bg-primary hover:text-white transition-all duration-500 group bg-white/50 backdrop-blur-sm"
                >
                  <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
                </button>
                <button
                  onClick={next}
                  className="h-14 w-14 rounded-full border border-primary/10 flex items-center justify-center hover:bg-primary hover:text-white transition-all duration-500 group bg-white/50 backdrop-blur-sm"
                >
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>

              {/* Fractional Indicator */}
              <div className="flex items-center gap-4 ml-4">
                <span className="text-[12px] font-main font-black text-primary">0{index + 1}</span>
                <div className="w-16 h-[1px] bg-primary/10 relative">
                  <motion.div 
                    initial={false}
                    animate={{ width: `${((index + 1) / testimonials.length) * 100}%` }}
                    className="absolute inset-y-0 left-0 bg-accent-primary"
                  />
                </div>
                <span className="text-[12px] font-main font-black text-primary/30">0{testimonials.length}</span>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Decorative Technical Lines */}
      <div className="absolute bottom-0 right-0 w-1/3 h-[1px] bg-gradient-to-r from-transparent to-primary/5"></div>
      <div className="absolute top-0 left-0 w-[1px] h-1/3 bg-gradient-to-b from-primary/5 to-transparent"></div>
    </section>
  );
}
