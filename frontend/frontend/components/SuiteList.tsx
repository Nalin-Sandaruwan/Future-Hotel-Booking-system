"use client";

import { motion, AnimatePresence } from "framer-motion";
import SuiteCard from "./SuiteCard";
import { suites } from "@/lib/data/suites";

interface SuiteListProps {
  selectedCategory: string;
}

export default function SuiteList({ selectedCategory }: SuiteListProps) {
  const filteredSuites = selectedCategory === "all"
    ? suites
    : suites.filter(suite => suite.category === selectedCategory);

  return (
    <section className="pb-60 px-12 bg-base min-h-[600px]">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-32">
          <AnimatePresence mode="popLayout">
            {filteredSuites.map((suite, index) => (
              <SuiteCard key={suite.id} suite={suite} index={index} />
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
