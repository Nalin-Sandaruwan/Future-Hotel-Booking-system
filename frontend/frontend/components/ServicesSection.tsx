"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight, Sparkles } from "lucide-react";

const packages = [
  { 
    title: "The Romantic Escape", 
    category: "Exclusive Experience",
    offer: "15% Preferred Rate", 
    desc: "A curated journey for two, featuring private sunset dining and artisanal wellness rituals.",
    image: "/image/roberto-nickson-emqnSQwQQDo-unsplash.jpg",
    price: "From $850"
  },
  { 
    title: "Architectural Discovery", 
    category: "Guided Tour",
    offer: "Signature Tour", 
    desc: "Explore the geometric precision and island heritage of Coastal Cove with our lead designers.",
    image: "/image/frames-for-your-heart-zSG-kd-L6vw-unsplash.jpg",
    price: "Complimentary"
  },
  { 
    title: "Island Wellness Retreat", 
    category: "Holistic Stay",
    offer: "Full Board", 
    desc: "Rejuvenate your senses with locally sourced organic cuisine and open-air meditation sessions.",
    image: "/image/michael-brown-bZZ-YKRvRF0-unsplash.jpg",
    price: "From $1,200"
  }
];

export default function ServicesSection() {
  return (
    <section className="py-60 px-12 bg-base relative overflow-hidden">
      
      {/* Decorative Background Element */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-surface/10 -skew-x-12 translate-x-1/4 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-48 max-w-5xl mx-auto">
          <span className="text-[12px] font-main font-black tracking-[0.5em] text-accent-primary uppercase mb-12">
            [ CURATED OFFERS ]
          </span>
          <h2 className="text-5xl md:text-8xl font-serif font-medium text-primary tracking-tighter leading-[0.85] mb-12">
            Elevated <br />
            <span className="italic text-primary/80">Experiences</span>
          </h2>
          <div className="w-12 h-[1px] bg-accent-primary/20 mb-12"></div>
          <p className="text-sm md:text-lg font-main text-muted leading-[1.8] font-medium max-w-2xl">
            Tailored journeys & architectural excellence for an unforgettable island escape.
          </p>
        </div>

        {/* Unique Inset Grid Design */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 lg:gap-8">
          {packages.map((pkg, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, delay: index * 0.2, ease: [0.22, 1, 0.36, 1] }}
              className={`relative flex flex-col group ${index === 1 ? "lg:-translate-y-20" : ""}`}
            >
              {/* Image Canvas */}
              <div className="relative aspect-[3/4] w-full overflow-hidden rounded-[3rem] shadow-2xl shadow-black/10">
                <Image
                  src={pkg.image}
                  alt={pkg.title}
                  fill
                  className="object-cover grayscale-[0.4] group-hover:grayscale-0 group-hover:scale-110 transition-all duration-[2s] ease-out"
                />
                
                {/* Floating Tag */}
                <div className="absolute top-10 left-10 flex items-center gap-4">
                   <div className="h-px w-8 bg-white/50"></div>
                   <span className="text-[10px] font-main font-black tracking-[0.3em] text-white uppercase">
                     {pkg.offer}
                   </span>
                </div>
              </div>

              {/* Unique Inset Content Box */}
              <div className="absolute -bottom-12 left-8 right-8 bg-white/95 backdrop-blur-xl p-10 rounded-[2.5rem] shadow-xl shadow-black/5 border border-black/5 transform group-hover:-translate-y-4 transition-transform duration-700 ease-out">
                <div className="flex flex-col">
                  <div className="flex justify-between items-start mb-6">
                    <span className="text-[9px] font-sec font-black tracking-[0.2em] text-accent-primary uppercase">
                      {pkg.category}
                    </span>
                    <ArrowUpRight className="h-4 w-4 text-primary/20 group-hover:text-accent-primary group-hover:rotate-45 transition-all duration-500" />
                  </div>
                  
                  <h3 className="text-2xl md:text-3xl font-serif text-primary tracking-tight mb-4 leading-tight">
                    {pkg.title}
                  </h3>
                  
                  <p className="text-[13px] font-main text-muted/80 leading-relaxed mb-6 opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-100 line-clamp-2">
                    {pkg.desc}
                  </p>
                  
                  <div className="flex items-center justify-between mt-auto pt-4 border-t border-black/5">
                    <span className="text-[11px] font-main font-black text-primary tracking-[0.2em] uppercase">
                      {pkg.price}
                    </span>
                    <span className="text-[9px] font-main font-bold text-accent-primary underline underline-offset-4 decoration-accent-primary/30">
                      DETAILS
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Decorative Technical Detail */}
      <div className="absolute bottom-20 left-12 h-[200px] w-[1px] bg-gradient-to-t from-primary/10 to-transparent hidden xl:block"></div>
    </section>
  );
}
