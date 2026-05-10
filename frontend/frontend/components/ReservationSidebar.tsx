"use client";

import { ArrowRight, Star } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ReservationSidebarProps {
  price: number;
}

export default function ReservationSidebar({ price }: ReservationSidebarProps) {
  return (
    <div className="lg:col-span-5">
      <div className="sticky top-40 bg-white rounded-[3rem] p-12 shadow-2xl shadow-black/5 border border-black/5 overflow-hidden">
        {/* Decorative Pattern */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-accent/5 -rotate-45 translate-x-16 -translate-y-16"></div>

        <div className="relative z-10">
          <div className="flex justify-between items-end mb-12">
            <div>
              <span className="text-[10px] font-main font-black tracking-[0.3em] text-primary/40 uppercase block mb-2">
                Per Evening
              </span>
              <span className="text-5xl font-serif text-primary tracking-tight">${price}</span>
            </div>
            <div className="flex flex-col items-end">
              <div className="flex gap-1 mb-2">
                {[1, 2, 3, 4, 5].map(s => <Star key={s} className="h-3 w-3 fill-accent text-accent" />)}
              </div>
              <span className="text-[9px] font-main font-bold text-muted uppercase tracking-[0.1em]">5.0 (42 Reviews)</span>
            </div>
          </div>

          <div className="space-y-4 mb-12">
            <div className="p-6 bg-base rounded-2xl border border-black/5">
              <span className="text-[9px] font-main font-black tracking-[0.2em] text-primary/40 uppercase mb-2 block">
                Check Availability
              </span>
              <p className="text-sm font-main font-bold text-primary">May 14 — May 19</p>
            </div>
            <div className="p-6 bg-base rounded-2xl border border-black/5 flex justify-between items-center">
              <span className="text-[9px] font-main font-black tracking-[0.2em] text-primary/40 uppercase">Guests</span>
              <p className="text-sm font-main font-bold text-primary">02 Adults</p>
            </div>
          </div>

          <Button className="w-full h-20 rounded-full bg-primary text-white font-main font-black tracking-[0.4em] uppercase text-[11px] hover:bg-accent transition-all duration-700 shadow-xl shadow-primary/10">
            Secure Reservation
            <ArrowRight className="ml-4 h-4 w-4" />
          </Button>

          <p className="text-center mt-8 text-[9px] font-main font-medium text-muted uppercase tracking-[0.1em]">
            No immediate payment required for reservation.
          </p>
        </div>
      </div>
    </div>
  );
}
