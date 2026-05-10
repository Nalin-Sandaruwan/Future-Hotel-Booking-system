"use client";

import { useState, useEffect } from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon, Users, Search, ChevronDown } from "lucide-react";
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
import { motion } from "framer-motion";
import { DateRange } from "react-day-picker";

interface BookingFilterProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

export default function BookingFilter({ selectedCategory, onCategoryChange }: BookingFilterProps) {
  const [mounted, setMounted] = useState(false);
  const [date, setDate] = useState<DateRange | undefined>({
    from: new Date(),
    to: undefined,
  });
  const [guests, setGuests] = useState("2");

  // Fix hydration issues and ensure Select components have a stable mounting point
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.2, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="max-w-6xl mx-auto -mt-6 relative z-30 px-4"
    >
      <div className="bg-white/90 backdrop-blur-2xl rounded-3xl md:rounded-full shadow-2xl shadow-black/5 border border-black/5 flex flex-col md:flex-row items-center gap-1">
        
        {/* Date Range Selection */}
        <div className="flex-[2] w-full md:w-auto px-8 py-3 flex flex-col gap-1.5 border-r border-black/5 last:border-r-0 hover:bg-black/[0.02] transition-colors rounded-l-full cursor-pointer">
          <span className="text-[10px] font-main font-black tracking-[0.2em] text-primary/40 uppercase ml-1">
            Check-In & Check-Out
          </span>
          <Popover>
            <PopoverTrigger>
              <div className="flex items-center gap-3 text-sm font-main font-bold text-primary text-left group cursor-pointer w-full">
                <CalendarIcon className="h-4 w-4 text-accent group-hover:scale-110 transition-transform" />
                <div className="flex items-center gap-2">
                  {date?.from ? (
                    <>
                      <span>{format(date.from, "MMM dd")}</span>
                      <span className="text-primary/20">—</span>
                      <span>{date.to ? format(date.to, "MMM dd") : <span className="text-primary/30 italic font-medium">Add date</span>}</span>
                    </>
                  ) : (
                    <span className="text-primary/30 font-medium italic">Select your stay</span>
                  )}
                </div>
                <ChevronDown className="h-3 w-3 ml-auto text-primary/20 group-hover:text-primary/40 transition-colors" />
              </div>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0 rounded-3xl overflow-hidden border-black/5 bg-white" align="start">
              <Calendar
                initialFocus
                mode="range"
                defaultMonth={date?.from}
                selected={date}
                onSelect={setDate}
                numberOfMonths={1}
                className="bg-white font-main p-4"
              />
            </PopoverContent>
          </Popover>
        </div>

        {/* Suite Type */}
        <div className="flex-1 w-full md:w-auto px-8 py-3 flex flex-col gap-1.5 border-r border-black/5 last:border-r-0 hover:bg-black/[0.02] transition-colors">
          <span className="text-[10px] font-main font-black tracking-[0.2em] text-primary/40 uppercase ml-1">
            Suite Type
          </span>
          <Select 
            value={selectedCategory || "all"} 
            onValueChange={(val) => val && onCategoryChange(val)}
          >
            <SelectTrigger className="border-none p-0 h-auto focus:ring-0 flex items-center gap-3 text-sm font-main font-bold text-primary hover:text-accent transition-colors">
              <div className="h-4 w-4 text-accent flex items-center justify-center">
                <Search className="h-3 w-3" />
              </div>
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent className="rounded-2xl border-black/5 shadow-2xl bg-white font-main">
              <SelectItem value="all">All Suites</SelectItem>
              <SelectItem value="Premium Suite">Premium</SelectItem>
              <SelectItem value="Luxury Suite">Luxury</SelectItem>
              <SelectItem value="Presidential">Presidential</SelectItem>
              <SelectItem value="Signature">Signature</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Guests */}
        <div className="flex-1 w-full md:w-auto px-8 py-3 flex flex-col gap-1.5 border-r border-black/5 last:border-r-0 hover:bg-black/[0.02] transition-colors">
          <span className="text-[10px] font-main font-black tracking-[0.2em] text-primary/40 uppercase ml-1">
            Guests
          </span>
          <Select 
            value={guests || "2"} 
            onValueChange={(val) => val && setGuests(val)}
          >
            <SelectTrigger className="border-none p-0 h-auto focus:ring-0 flex items-center gap-3 text-sm font-main font-bold text-primary hover:text-accent transition-colors">
              <Users className="h-4 w-4 text-accent" />
              <SelectValue placeholder="Guests" />
            </SelectTrigger>
            <SelectContent className="rounded-2xl border-black/5 shadow-2xl bg-white font-main">
              <SelectItem value="1">1 Guest</SelectItem>
              <SelectItem value="2">2 Guests</SelectItem>
              <SelectItem value="3">3 Guests</SelectItem>
              <SelectItem value="4">4+ Guests</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Search Button */}
        <div className="p-0.5 self-stretch flex">
          <Button className="w-full md:w-auto h-full px-12 rounded-full bg-[#FFEBD3] hover:bg-[#FAD9B5] text-primary font-main font-black tracking-[0.3em] uppercase text-[11px] transition-all duration-500 shadow-xl shadow-[#FFEBD3]/20 flex-shrink-0 min-h-16">
            <Search className="mr-3 h-2 w-4" />
            Search
          </Button>
        </div>

      </div>
    </motion.div>
  );
}
