"use client";

import { motion } from "framer-motion";
import { ArrowRight, Lock, Mail } from "lucide-react";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function LoginForm() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, delay: 0.3 }}
      className="w-full max-w-md z-10"
    >
      <div className="mb-16 text-center lg:text-left">
        <h2 className="text-4xl font-serif text-primary tracking-tight mb-4 uppercase">Welcome Back</h2>
        <p className="text-sm font-main text-muted/80 leading-relaxed">
          Enter your credentials to access your private Coastal Cove sanctuary.
        </p>
      </div>

      <form className="space-y-8">
        <div className="space-y-6">
          <div className="group">
            <label className="text-[10px] font-main font-black tracking-[0.2em] text-primary/40 uppercase ml-1 mb-3 block">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-primary/20 group-focus-within:text-accent transition-colors" />
              <Input
                type="email"
                placeholder="name@architecture.com"
                className="pl-12 h-14 rounded-2xl border-black/5 bg-base/50 focus:bg-white transition-all focus:ring-0 focus:border-accent"
              />
            </div>
          </div>

          <div className="group">
            <div className="flex justify-between items-center mb-3 ml-1">
              <label className="text-[10px] font-main font-black tracking-[0.2em] text-primary/40 uppercase">
                Password
              </label>
              <a href="#" className="text-[9px] font-main font-bold text-accent tracking-[0.1em] uppercase hover:underline">
                Forgot?
              </a>
            </div>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-primary/20 group-focus-within:text-accent transition-colors" />
              <Input
                type="password"
                placeholder="••••••••"
                className="pl-12 h-14 rounded-2xl border-black/5 bg-base/50 focus:bg-white transition-all focus:ring-0 focus:border-accent"
              />
            </div>
          </div>
        </div>

        <Button className="w-full h-16 rounded-full bg-primary text-white font-main font-black tracking-[0.3em] uppercase text-[11px] hover:bg-accent transition-all duration-500 shadow-xl shadow-primary/10">
          Unlock Access
          <ArrowRight className="ml-3 h-4 w-4" />
        </Button>
      </form>

      <div className="mt-12 text-center">
        <p className="text-[11px] font-main font-medium text-muted uppercase tracking-[0.1em]">
          New to the Cove? {" "}
          <Link href="/signup" className="text-accent font-black hover:underline underline-offset-4 decoration-accent/30">
            Create an Account
          </Link>
        </p>
      </div>
    </motion.div>
  );
}
