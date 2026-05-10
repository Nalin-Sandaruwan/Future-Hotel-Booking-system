"use client";

import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import IntroSection from "@/components/IntroSection";
import FeaturedRooms from "@/components/FeaturedRooms";
import Footer from "@/components/Footer";
import ServicesSection from "@/components/ServicesSection";
import InfiniteGallery from "@/components/InfiniteGallery";
import TestimonialsSection from "@/components/TestimonialsSection";
import { motion, Variants } from "framer-motion";
import FeaturesSection from "@/components/FeaturesSection";

export default function Home() {
  const sectionVariants: Variants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 1.5,
        ease: [0.22, 1, 0.36, 1], // Cinematic ease
      }
    },
  };

  return (
    <div className="flex flex-col min-h-screen bg-base transition-colors duration-700">
      <Navbar />

      <main className="relative">
        {/* Hero Section handles its own entrance animation */}
        <HeroSection />

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={sectionVariants}
        >
          <IntroSection />
        </motion.div>


        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={sectionVariants}
        >
          <FeaturesSection />
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={sectionVariants}
        >
          <ServicesSection />
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={sectionVariants}
        >
          <FeaturedRooms />
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={sectionVariants}
        >
          <TestimonialsSection />
        </motion.div>





        <InfiniteGallery />
      </main>

      <Footer />
    </div>
  );
}
