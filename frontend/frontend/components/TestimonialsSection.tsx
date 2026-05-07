"use client";

import { motion } from "framer-motion";
import { Quote, ArrowRight, ArrowLeft } from "lucide-react";
import { useState } from "react";

export default function TestimonialsSection() {
  const [index, setIndex] = useState(0);

  const testimonials = [
    {
      quote: "Coastal Cove isn't just a stay; it's a profound dialogue between architecture and nature. The attention to detail in the linen textures and the morning light is simply unmatched.",
      author: "Julianne V. Moore",
      role: "Interior Architect",
    },
    {
      quote: "The serenity found here is curated with surgical precision. It's rare to find a space that understands the luxury of silence so well.",
      author: "Marcus Aurelius Thorne",
      role: "Creative Director",
    },
    {
      quote: "A masterclass in modern coastal living. The seamless transition between indoor and outdoor spaces creates a rhythm of life that is both energizing and deeply peaceful.",
      author: "Elena Sofia Rossi",
      role: "Design Critic",
    }
  ];

  const next = () => setIndex((i) => (i + 1) % testimonials.length);
  const prev = () => setIndex((i) => (i - 1 + testimonials.length) % testimonials.length);

  return (
    <section className="py-60 px-12 bg-base relative overflow-hidden">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="flex flex-col items-center mb-24 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="mb-8"
          >
            <Quote className="h-10 w-10 text-accent-primary opacity-20" />
          </motion.div>
          <span className="text-[10px] font-main font-black tracking-[0.5em] text-accent-primary/40 uppercase">
            GUEST STORIES
          </span>
        </div>

        {/* Horizontal Slider Container */}
        <div className="relative">
          <div className="overflow-hidden">
            <motion.div
              className="flex"
              animate={{ x: `-${index * 100}%` }}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            >
              {testimonials.map((t, i) => (
                <div key={i} className="min-w-full px-4 md:px-20 flex flex-col items-center text-center relative">
                  <h3 className="text-3xl md:text-5xl font-serif text-primary leading-snug mb-16 max-w-4xl mx-auto">
                    "{t.quote}"
                  </h3>

                  <div className="flex flex-col items-center gap-6">
                    <div className="w-12 h-[1px] bg-accent-primary/30"></div>
                    <div className="flex flex-col items-center">
                      <span className="text-[12px] font-main font-bold tracking-[0.3em] text-primary uppercase">
                        {t.author}
                      </span>
                      <span className="text-[10px] font-sec font-medium tracking-[0.1em] text-muted uppercase mt-1">
                        {t.role}
                      </span>
                    </div>
                  </div>

                  {/* Even lighter decorative initial for better legibility */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[60%] text-[20rem] md:text-[25rem] font-serif font-black text-primary/[0.01] -z-10 pointer-events-none select-none">
                    {t.author.charAt(0)}
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Navigation Controls */}
          <div className="flex justify-center gap-10 mt-24">
            <button
              onClick={prev}
              className="h-12 w-12 rounded-full border border-primary/10 flex items-center justify-center hover:bg-primary hover:text-white transition-all duration-500 group"
            >
              <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
            </button>
            <div className="flex items-center gap-4">
              {testimonials.map((_, i) => (
                <div
                  key={i}
                  className={cn(
                    "h-1 transition-all duration-700 rounded-full",
                    index === i ? "w-12 bg-accent-primary" : "w-4 bg-primary/10"
                  )}
                />
              ))}
            </div>
            <button
              onClick={next}
              className="h-12 w-12 rounded-full border border-primary/10 flex items-center justify-center hover:bg-primary hover:text-white transition-all duration-500 group"
            >
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}

// Minimal utility if not imported
function cn(...classes: any[]) {
  return classes.filter(Boolean).join(" ");
}
