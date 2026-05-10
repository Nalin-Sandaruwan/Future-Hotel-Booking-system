"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function StoryContent() {
  return (
    <section className="py-60 px-12 bg-base">
      <div className="max-w-7xl mx-auto">
        
        {/* Section 1: Architecture */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center mb-60">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="text-[10px] font-main font-black tracking-[0.4em] text-accent-primary/40 uppercase mb-8 block">
              [ 01 ARCHITECTURE ]
            </span>
            <h2 className="text-4xl md:text-6xl font-serif font-medium text-primary tracking-tighter leading-tight mb-10">
              Dialogue with <br />
              <span className="italic">the horizon</span>
            </h2>
            <p className="text-base font-main text-muted leading-relaxed max-w-md">
              Coastal Cove was conceived as a structural response to the island's unique rhythm. Every angle is designed to capture the shifting light, creating a living dialogue between the interior sanctuary and the infinite blue of the coast.
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 2, ease: [0.22, 1, 0.36, 1] }}
            className="relative aspect-[3/4] rounded-[2.5rem] overflow-hidden shadow-2xl shadow-black/5"
          >
            <Image
              src="/image/roberto-nickson-emqnSQwQQDo-unsplash.jpg"
              alt="Architectural detail"
              fill
              sizes="(max-width: 768px) 100vw, 45vw"
              className="object-cover grayscale-[0.2] hover:grayscale-0 transition-all duration-1000"
            />
          </motion.div>
        </div>

        {/* Section 2: Design (Reversed) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center mb-60">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 2, ease: [0.22, 1, 0.36, 1] }}
            className="relative aspect-[4/5] rounded-[2.5rem] overflow-hidden shadow-2xl shadow-black/5 order-2 lg:order-1"
          >
            <Image
              src="/image/frames-for-your-heart-zSG-kd-L6vw-unsplash.jpg"
              alt="Interior design"
              fill
              sizes="(max-width: 768px) 100vw, 45vw"
              className="object-cover grayscale-[0.2] hover:grayscale-0 transition-all duration-1000"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
            className="order-1 lg:order-2"
          >
            <span className="text-[10px] font-main font-black tracking-[0.4em] text-accent-primary/40 uppercase mb-8 block">
              [ 02 DESIGN ]
            </span>
            <h2 className="text-4xl md:text-6xl font-serif font-medium text-primary tracking-tighter leading-tight mb-10">
              The Linen <br />
              <span className="italic">& Ink ethos</span>
            </h2>
            <p className="text-base font-main text-muted leading-relaxed max-w-md">
              Our materiality is a reflection of the coast. Soft linen textures meet deep, precise ink tones to create a space that feels both organic and professional. It is the architectural embodiment of a well-lived life.
            </p>
          </motion.div>
        </div>

        {/* Section 3: Final Statement */}
        <div className="text-center max-w-3xl mx-auto py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2 }}
          >
            <div className="w-16 h-[1px] bg-primary/20 mx-auto mb-16"></div>
            <h3 className="text-3xl md:text-5xl font-serif text-primary leading-snug italic">
              "We don't just provide a room; we provide a storied compilation of elements that speak to your lifestyle."
            </h3>
            <div className="mt-16 flex justify-center items-center gap-6 opacity-30">
              <span className="text-[10px] font-main font-black tracking-[0.8em] text-primary uppercase">
                Coastal Cove
              </span>
            </div>
          </motion.div>
        </div>

      </div>
    </section>
  );
}
