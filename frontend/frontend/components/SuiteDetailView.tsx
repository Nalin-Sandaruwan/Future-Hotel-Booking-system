"use client";

import SuiteDetailHero from "@/components/SuiteDetailHero";
import SuiteAmenities from "@/components/SuiteAmenities";
import ReservationSidebar from "@/components/ReservationSidebar";

interface SuiteDetailViewProps {
  suite: any;
}

export default function SuiteDetailView({ suite }: SuiteDetailViewProps) {
  return (
    <main className="flex-1">
      <SuiteDetailHero 
        name={suite.name}
        category={suite.category}
        gallery={suite.gallery}
      />

      <section className="py-40 px-12 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-24">
          <SuiteAmenities 
            description={suite.description}
            features={suite.features}
          />
          <ReservationSidebar 
            price={suite.price}
          />
        </div>
      </section>
    </main>
  );
}
