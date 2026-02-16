"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Sparkles, ScanLine, Box, Tag } from "lucide-react";
import { Logo } from "@/components/Logo";

const PROGRESS_MESSAGES = [
  "Analyzing your vibe...",
  "Scanning retailer inventory...",
  "Matching aesthetics...",
  "Curating your look...",
  "Finalizing details...",
];

export default function LoadingState() {
  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % PROGRESS_MESSAGES.length);
    }, 1500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-editorial-white flex flex-col overflow-hidden relative">
      {/* Background Grid - "Runway" Effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>

        {/* Animated Floor moving towards camera */}
        <div className="absolute inset-0 perspective-[1000px]">
          <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_0%,#00000005_100%)]"></div>
        </div>
      </div>

      {/* Minimal Top Nav */}
      <nav className="relative z-10 border-b border-editorial-divider bg-white/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 md:px-6 h-14 md:h-16 flex items-center justify-between">
          <Link
            href="/"
            className="opacity-50 hover:opacity-100 transition-opacity"
          >
            <Logo variant="light" className="h-8" />
          </Link>
        </div>
      </nav>

      {/* Loading Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-4 md:px-6 relative z-10">
        {/* Scanner Container */}
        <div className="relative w-64 h-64 md:w-80 md:h-80 mb-12 flex items-center justify-center">
          {/* Rotating border rings */}
          <div className="absolute inset-0 border border-gray-200 rounded-full animate-[spin_10s_linear_infinite] opacity-30"></div>
          <div className="absolute inset-4 border border-gray-200 rounded-full animate-[spin_15s_linear_infinite_reverse] opacity-30"></div>

          {/* The "Runway" Cards */}
          <div className="relative w-48 h-64 perspective-[1000px] flex items-center justify-center">
            {/* Card 1 (Back) */}
            <div className="absolute w-32 h-40 bg-gray-100 rounded-xl shadow-lg transform -translate-y-8 -translate-z-12 opacity-0 animate-[popup_2s_ease-out_infinite] [animation-delay:0s] border border-gray-200"></div>
            {/* Card 2 (Middle) */}
            <div className="absolute w-36 h-44 bg-gray-50 rounded-xl shadow-xl transform -translate-y-4 -translate-z-6 opacity-0 animate-[popup_2s_ease-out_infinite] [animation-delay:0.5s] border border-gray-200 flex items-center justify-center">
              <Box className="w-8 h-8 text-gray-300" />
            </div>
            {/* Card 3 (Front - Highlight) */}
            <div className="absolute w-40 h-48 bg-white rounded-xl shadow-2xl transform translate-z-0 opacity-0 animate-[popup_2s_ease-out_infinite] [animation-delay:1s] border border-gray-100 flex flex-col items-center justify-center p-4">
              <div className="w-full h-24 bg-gray-50 rounded mb-3 animate-pulse"></div>
              <div className="w-3/4 h-2 bg-gray-100 rounded mb-2"></div>
              <div className="w-1/2 h-2 bg-gray-100 rounded"></div>

              {/* Scanning Line */}
              <div className="absolute top-0 left-0 w-full h-1 bg-black/10 blur-[1px] shadow-[0_0_10px_rgba(0,0,0,0.1)] animate-scanner"></div>
            </div>
          </div>
        </div>

        {/* Progress Text */}
        <div className="text-center space-y-4 max-w-md">
          <div className="flex items-center justify-center gap-2 text-sm font-bold uppercase tracking-widest text-gray-400 mb-2">
            <Sparkles className="w-4 h-4 animate-pulse" />
            <span>AI Processing</span>
          </div>

          <h2 className="text-3xl md:text-4xl font-serif text-editorial-text animate-in fade-in slide-in-from-bottom-4 duration-500 key={messageIndex}">
            {PROGRESS_MESSAGES[messageIndex]}
          </h2>

          <div className="w-64 h-1 bg-gray-100 rounded-full mx-auto overflow-hidden mt-6">
            <div className="h-full bg-black rounded-full animate-[marquee_2s_linear_infinite] w-1/3"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
