"use client";

import * as React from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon, Users, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function BookingBar() {
  const [checkIn, setCheckIn] = React.useState<Date>();
  const [checkOut, setCheckOut] = React.useState<Date>();

  return (
    <div className="relative z-30 -mt-10 max-w-6xl mx-auto w-full px-6">
      <div className="bg-white/95 backdrop-blur-3xl p-1.5 flex flex-wrap lg:flex-nowrap items-center gap-0.5 border border-black/[0.03] rounded-full shadow-[0_32px_64px_-16px_rgba(0,0,0,0.08)]">

        {/* Check In */}
        <div className="flex-1 min-w-[160px] group">
          <Popover>
            <PopoverTrigger
              render={
                <Button
                  variant="ghost"
                  className="w-full h-16 flex flex-col items-start justify-center gap-0.5 px-8 rounded-full hover:bg-gray-50/50 transition-all duration-500 data-[state=open]:bg-gray-50/50"
                >
                  <span className="text-[8px] font-sec font-extrabold uppercase tracking-[0.4em] group-hover:text-primary transition-colors">Arrival</span>
                  <div className="flex items-center gap-2.5">
                    <CalendarIcon className="h-3.5 w-3.5 text-primary/40" />
                    <span className="text-[13px] font-serif italic text-primary">
                      {checkIn ? format(checkIn, "dd MMM yyyy") : "Add Date"}
                    </span>
                  </div>
                </Button>
              }
            />
            <PopoverContent className="w-auto p-0 border-0 bg-white shadow-2xl rounded-[2rem] overflow-hidden" align="start">
              <Calendar
                mode="single"
                selected={checkIn}
                onSelect={setCheckIn}
                initialFocus
                className="bg-white"
              />
            </PopoverContent>
          </Popover>
        </div>

        <div className="hidden lg:block w-[1px] h-8 bg-black/[0.05]"></div>

        {/* Check Out */}
        <div className="flex-1 min-w-[160px] group">
          <Popover>
            <PopoverTrigger
              render={
                <Button
                  variant="ghost"
                  className="w-full h-16 flex flex-col items-start justify-center gap-0.5 px-8 rounded-full hover:bg-gray-50/50 transition-all duration-500 data-[state=open]:bg-gray-50/50"
                >
                  <span className="text-[8px] font-sec font-extrabold uppercase tracking-[0.4em] group-hover:text-primary transition-colors">Departure</span>
                  <div className="flex items-center gap-2.5">
                    <CalendarIcon className="h-3.5 w-3.5 text-primary/40" />
                    <span className="text-[13px] font-serif italic text-primary">
                      {checkOut ? format(checkOut, "dd MMM yyyy") : "Add Date"}
                    </span>
                  </div>
                </Button>
              }
            />
            <PopoverContent className="w-auto p-0 border-0 bg-white shadow-2xl rounded-[2rem] overflow-hidden" align="start">
              <Calendar
                mode="single"
                selected={checkOut}
                onSelect={setCheckOut}
                initialFocus
                className="bg-white"
              />
            </PopoverContent>
          </Popover>
        </div>

        <div className="hidden lg:block w-[1px] h-8 bg-black/[0.05]"></div>

        {/* Guests */}
        <div className="flex-1 min-w-[160px] group">
          <Select>
            <SelectTrigger className="w-full h-16 bg-transparent border-0 px-8 flex flex-col items-start justify-center gap-0.5 focus:ring-0 focus:ring-offset-0 rounded-full hover:bg-gray-50/50 data-[state=open]:bg-gray-50/50 transition-all duration-500 *:data-[slot=select-value]:flex *:data-[slot=select-value]:items-center *:data-[slot=select-value]:gap-2.5">
              <span className="text-[8px] font-sec font-extrabold uppercase tracking-[0.4em] group-hover:text-primary transition-colors">Guests</span>
              <div className="flex items-center gap-2.5 text-primary">
                <Users className="h-3.5 w-3.5 text-primary/40" />
                <SelectValue placeholder="Add Guests" className="text-[13px] font-serif italic" />
              </div>
            </SelectTrigger>
            <SelectContent className="bg-white border-0 shadow-2xl rounded-2xl p-2">
              <SelectItem value="1" className="rounded-lg focus:bg-base/20">1 Adult</SelectItem>
              <SelectItem value="2" className="rounded-lg focus:bg-base/20">2 Adults</SelectItem>
              <SelectItem value="2-1" className="rounded-lg focus:bg-base/20">2 Adults, 1 Child</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Search Action */}
        <button className="h-16 px-10 bg-accent text-primary flex items-center gap-3 rounded-full hover:brightness-95 transition-all duration-500 active:scale-95">
          <span className="text-[10px] font-sec font-extrabold uppercase tracking-[0.4em]">Search</span>
          <ArrowRight className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  );
}
