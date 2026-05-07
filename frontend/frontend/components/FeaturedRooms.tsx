import Image from "next/image";

export default function FeaturedRooms() {
  const rooms = [
    { id: 1, name: "Oceanic Retreat", price: 540, type: "Premium Suite" },
    { id: 2, name: "Coastal Haven", price: 620, type: "Luxury Suite" },
    { id: 3, name: "Island Sanctuary", price: 750, type: "Presidential" },
  ];

  return (
    <section className="py-60 bg-surface/30">
      <div className="container mx-auto px-12">
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
          {rooms.map((room) => (
            <div key={room.id} className="group cursor-pointer">
              <div className="relative aspect-[3/4] overflow-hidden rounded-2xl mb-8">
                <Image
                  src="/image/roberto-nickson-emqnSQwQQDo-unsplash.jpg"
                  alt={room.name}
                  fill
                  className="object-cover grayscale-[0.3] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                />
                <div className="absolute top-8 left-8 px-5 py-1.5 bg-black/40 backdrop-blur-md rounded-lg text-[10px] text-white font-extrabold uppercase tracking-widest">
                  {room.type}
                </div>
              </div>
              <h3 className="text-3xl font-main font-bold text-primary mb-3 uppercase tracking-tighter">{room.name}</h3>
              <p className="text-[13px] font-sec text-accent font-extrabold uppercase tracking-[0.2em]">${room.price} / NIGHT</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
