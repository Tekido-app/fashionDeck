"use client";

import { useState } from "react";
import { ProductCard } from "@/components/ProductCard";
import { TRENDING_ITEMS } from "@/data/trending";

const CATEGORIES = ["All", "Dresses", "Shirts", "Jeans", "T-Shirts"];

export default function ExplorePage() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredItems =
    activeCategory === "All"
      ? TRENDING_ITEMS
      : TRENDING_ITEMS.filter((item) => item.category === activeCategory);

  return (
    <div className="space-y-8 pb-12 min-h-screen">
      <div className="relative pt-12 pb-6 px-6 -mx-6 bg-gray-50 border-b border-editorial-divider">
        <div className="max-w-2xl">
          <h1 className="text-4xl md:text-5xl font-serif mb-4 text-editorial-text">
            Explore Trending
          </h1>
          <p className="text-lg text-editorial-text-muted leading-relaxed">
            Curated picks from top retailers just for you. Hand-selected for the
            best vibes and value.
          </p>
        </div>
      </div>

      {/* Sticky Filter Bar */}
      <div className="sticky top-14 z-40 bg-white/80 backdrop-blur-md border-b border-gray-100 py-3 -mx-4 px-4 md:px-6 md:-mx-6 mb-8 overflow-x-auto no-scrollbar">
        <div className="flex items-center gap-3 min-w-max">
          {CATEGORIES.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`
                px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 border
                ${
                  activeCategory === category
                    ? "bg-black text-white border-black shadow-md scale-105"
                    : "bg-white text-gray-600 border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                }
              `}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {filteredItems.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-10 animate-in fade-in duration-500">
          {filteredItems.map((item) => (
            <ProductCard key={item.id} {...item} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 text-editorial-text-muted">
          <p>No items found in this category.</p>
        </div>
      )}

      {/* Load More Trigger (Visual only for now) */}
      <div className="flex justify-center pt-12 border-t border-gray-100 mt-8">
        <button className="px-8 py-3 bg-white border border-gray-200 text-gray-900 rounded-full font-medium hover:bg-gray-50 hover:border-black transition-all duration-300 uppercase text-xs tracking-widest shadow-sm">
          Load More Styles
        </button>
      </div>
    </div>
  );
}
