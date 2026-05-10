"use client";

import { Check, Wind, Wifi, Coffee, Star } from "lucide-react";

interface SuiteAmenitiesProps {
  description: string;
  features: string[];
}

export default function SuiteAmenities({ description, features }: SuiteAmenitiesProps) {
  return (
    <div className="lg:col-span-7 space-y-24">
      <div>
        <span className="text-[10px] font-main font-black tracking-[0.5em] text-accent-primary uppercase mb-10 block">
          THE SPACE
        </span>
        <p className="text-xl md:text-3xl font-serif text-primary leading-snug mb-12">
          {description} Designed with architectural precision, this space harmonizes organic textures with geometric clarity.
        </p>
        <div className="w-12 h-px bg-primary/10"></div>
      </div>

      {/* Amenities Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-12 border-y border-black/5">
        {[
          { icon: Wind, label: "Air Purifier" },
          { icon: Wifi, label: "Infinite WiFi" },
          { icon: Coffee, label: "Artisanal Brew" },
          { icon: Star, label: "Concierge" }
        ].map((item, i) => (
          <div key={i} className="flex flex-col gap-4">
            <item.icon className="h-5 w-5 text-accent-primary opacity-40" />
            <span className="text-[10px] font-main font-bold tracking-[0.2em] text-primary uppercase">{item.label}</span>
          </div>
        ))}
      </div>

      {/* Detailed Features */}
      <div className="space-y-12">
        <h4 className="text-[12px] font-main font-black tracking-[0.4em] text-primary/40 uppercase">
          Residence Features
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
          {features.map((feature, i) => (
            <div key={i} className="flex items-center gap-4 group">
              <div className="h-6 w-6 rounded-full bg-accent/10 flex items-center justify-center group-hover:bg-accent transition-colors">
                <Check className="h-3 w-3 text-accent group-hover:text-white" />
              </div>
              <span className="text-sm font-main font-medium text-muted">{feature}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
