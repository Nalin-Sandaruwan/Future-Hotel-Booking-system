"use client";

import SuiteHero from "@/components/SuiteHero";
import SuiteList from "@/components/SuiteList";
import BookingFilter from "@/components/BookingFilter";
import { useState } from "react";

export default function SuitesView() {
  const [selectedCategory, setSelectedCategory] = useState("all");

  return (
    <main className="relative">
      <SuiteHero />

      <div className="max-w-7xl mx-auto px-6 md:px-12 h-auto md:h-[120px] pb-14 md:pb-52">
        <BookingFilter
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
        />
      </div>

      <SuiteList selectedCategory={selectedCategory} />
    </main>
  );
}
