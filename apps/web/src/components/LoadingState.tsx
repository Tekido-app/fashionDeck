/**
 * Loading State Component
 *
 * Shown while processing outfit query
 */

"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const PROGRESS_MESSAGES = [
  "Searching stores…",
  "Matching styles…",
  "Assembling outfits…",
];

export default function LoadingState() {
  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % PROGRESS_MESSAGES.length);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-editorial-white flex flex-col">
      {/* Minimal Top Nav */}
      <nav className="border-b border-editorial-divider bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-6 h-14 md:h-16 flex items-center justify-between">
          <Link
            href="/"
            className="font-serif text-xl md:text-2xl tracking-tight font-medium hover:opacity-80 transition-opacity"
          >
            FashionDeck
          </Link>
        </div>
      </nav>

      {/* Loading Content */}
      <div className="flex-1 flex items-center justify-center px-4 md:px-6">
        <div className="text-center space-y-12">
          {/* Clothing Silhouettes */}
          <div className="flex items-center justify-center gap-8">
            {/* Top */}
            <div
              className="w-16 h-20 bg-gray-200 rounded-lg animate-pulse"
              style={{ animationDelay: "0ms" }}
            ></div>
            {/* Bottom */}
            <div
              className="w-16 h-24 bg-gray-200 rounded-lg animate-pulse"
              style={{ animationDelay: "200ms" }}
            ></div>
            {/* Shoes */}
            <div
              className="w-16 h-12 bg-gray-200 rounded-lg animate-pulse"
              style={{ animationDelay: "400ms" }}
            ></div>
          </div>

          {/* Progress Text */}
          <div className="space-y-2">
            <p className="text-2xl md:text-3xl font-serif text-editorial-text transition-opacity duration-500">
              {PROGRESS_MESSAGES[messageIndex]}
            </p>
            <p className="text-sm text-editorial-text-muted">
              This usually takes 5-7 seconds
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
