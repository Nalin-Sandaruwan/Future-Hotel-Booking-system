"use client";

import SuiteCard from "./SuiteCard";

export default function FeaturedRooms() {
  const rooms = [
    { 
      id: 1, 
      name: "Oceanic Retreat", 
      price: 540, 
      category: "Premium Suite",
      image: "/image/roberto-nickson-emqnSQwQQDo-unsplash.jpg",
      description: "A panoramic escape featuring floor-to-ceiling glass and artisanal linen textures."
    },
    { 
      id: 2, 
      name: "Coastal Haven", 
      price: 620, 
      category: "Luxury Suite",
      image: "/image/frames-for-your-heart-zSG-kd-L6vw-unsplash.jpg",
      description: "Architectural purity meets organic warmth in this secluded beachfront sanctuary."
    },
    { 
      id: 3, 
      name: "Island Sanctuary", 
      price: 750, 
      category: "Presidential",
      image: "/image/michael-brown-bZZ-YKRvRF0-unsplash.jpg",
      description: "The pinnacle of Coastal Cove luxury, featuring private concierge and infinite views."
    },
  ];

  return (
    <section className="py-60 bg-surface/30">
      <div className="max-w-7xl mx-auto px-12">
        {/* Standardized Header */}
        <div className="flex flex-col items-center text-center mb-40 max-w-5xl mx-auto">
          <span className="text-[12px] font-main font-black tracking-[0.5em] text-accent-primary uppercase mb-12">
            [ THE RESIDENCES ]
          </span>
          <h2 className="text-5xl md:text-8xl font-serif font-medium text-primary tracking-tighter leading-[0.85] mb-12">
            Unrivaled <br />
            <span className="italic text-primary/80">Privacy</span>
          </h2>
          <div className="w-12 h-[1px] bg-accent-primary/20 mb-12"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
          {rooms.map((room, index) => (
            <SuiteCard key={room.id} suite={room} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
