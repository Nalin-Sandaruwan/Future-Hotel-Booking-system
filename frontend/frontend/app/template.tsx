"use client";

import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

// Persistent tracker outside the component to survive re-mounts
let globalPrevPath = "";

export default function Template({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [direction, setDirection] = useState<"up" | "down">("up");

  useEffect(() => {
    const getDepth = (path: string) => path.split("/").filter(Boolean).length;

    const currentDepth = getDepth(pathname);
    const prevDepth = getDepth(globalPrevPath);

    if (globalPrevPath) {
      if (currentDepth < prevDepth) {
        setDirection("down"); // Back = Slide down
      } else {
        setDirection("up"); // Forward = Slide up
      }
    }

    globalPrevPath = pathname;
  }, [pathname]);

  return (
    <div className="relative w-full overflow-hidden">
      {/* Cinematic Direction-Aware Slide Overlay */}
      <motion.div
        key={pathname}
        initial={{ y: "0%" }}
        animate={{ y: direction === "up" ? "-100%" : "100%" }}
        transition={{
          duration: 1.2,
          ease: [0.65, 0, 0.35, 1],
        }}
        className="fixed inset-0 z-[100] bg-primary flex items-center justify-center"
      >
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: [0, 1, 0], y: 0 }}
          transition={{ duration: 1.2, times: [0, 0.5, 1] }}
          className="text-white font-serif italic text-4xl tracking-[0.3em] uppercase"
        >
          Coastal Cove
        </motion.span>
      </motion.div>

      {/* Content Glide */}
      <motion.div
        initial={{ opacity: 0, y: direction === "up" ? 30 : -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 1,
          delay: 0.5,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="flex-1 flex flex-col"
      >
        {children}
      </motion.div>
    </div>
  );
}
