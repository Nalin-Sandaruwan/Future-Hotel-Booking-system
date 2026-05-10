"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Wind, Sun, Droplets, Moon } from "lucide-react";

export default function WellnessView() {
  return (
    <>
      {/* Cinematic Hero */}
      <section className="relative h-screen w-full overflow-hidden">
        <motion.div
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 3, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0"
        >
          <Image
            src="/image/wellness-hero.png"
            alt="Luxury Wellness Interior"
            fill
            priority
            className="object-cover brightness-[0.9]"
          />
          <div className="absolute inset-0 bg-black/20"></div>
        </motion.div>

        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-[12px] font-main font-black tracking-[0.6em] text-white uppercase mb-8"
          >
            The Sanctuary of Stillness
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="text-7xl md:text-9xl font-serif text-white tracking-tighter uppercase leading-[0.8]"
          >
            Restorative <br />
            <span className="italic opacity-80">Harmony</span>
          </motion.h1>
        </div>
        
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2">
           <motion.div 
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-px h-16 bg-white/40"
           />
        </div>
      </section>

      {/* Narrative Section */}
      <section className="py-40 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            <h2 className="text-4xl md:text-6xl font-serif text-primary leading-tight mb-12">
              Realign your <span className="italic text-accent">rhythm</span> with the cadence of the ocean.
            </h2>
            <div className="w-12 h-px bg-accent-primary mb-12"></div>
            <p className="text-lg font-main text-muted leading-relaxed mb-8">
              The Coastal Cove Wellness experience is an architectural extension of the island's natural healing properties. We provide a space where geometric clarity meets organic tranquility.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-2 gap-8">
            {[
              { icon: Droplets, title: "Aquatic Therapy", desc: "Hydro-thermal circuits designed for deep cellular renewal." },
              { icon: Wind, title: "Breath Work", desc: "Guided sessions on our cliffside yoga pavilion." },
              { icon: Sun, title: "Solar Rituals", desc: "Sunrise meditation aligned with the coastal horizon." },
              { icon: Moon, title: "Celestial Spa", desc: "Lunar-cycle treatments using island-sourced botanicals." },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-8 bg-white rounded-3xl border border-black/5 shadow-xl shadow-black/[0.02]"
              >
                <item.icon className="h-6 w-6 text-accent-primary mb-6 opacity-40" />
                <h3 className="text-[11px] font-main font-black tracking-[0.2em] text-primary uppercase mb-4">{item.title}</h3>
                <p className="text-xs text-muted leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Experience Showcase */}
      <section className="pb-40 px-6 md:px-12">
         <div className="max-w-7xl mx-auto overflow-hidden rounded-[3rem] relative aspect-video group">
            <Image 
              src="/image/michael-brown-bZZ-YKRvRF0-unsplash.jpg"
              alt="Immersive Spa Experience"
              fill
              className="object-cover grayscale-[0.3] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000"
            />
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
               <button className="h-24 w-24 rounded-full border border-white/20 bg-white/10 backdrop-blur-md flex items-center justify-center text-white font-main font-black tracking-[0.2em] uppercase text-[10px] hover:bg-white hover:text-primary transition-all duration-500">
                  Explore Menu
               </button>
            </div>
         </div>
      </section>
    </>
  );
}
