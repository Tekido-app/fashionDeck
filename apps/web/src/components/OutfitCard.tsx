/**
 * Outfit Card Component
 *
 * Displays a single outfit recommendation
 */

"use client";

import Image from "next/image";
import { Outfit } from "@fashiondeck/types";
import { getMarketplaceLogo } from "@/lib/tracking";

interface OutfitCardProps {
  outfit: Outfit;
  onViewDetails: () => void;
}

export default function OutfitCard({ outfit, onViewDetails }: OutfitCardProps) {
  const { aesthetic, totalPrice, items, score } = outfit;

  // Get unique marketplaces
  const marketplaces = Array.from(
    new Set(items.map((item) => item.marketplace))
  );

  return (
    <div
      onClick={onViewDetails}
      className="group cursor-pointer bg-white border border-editorial-divider rounded-lg overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
    >
      {/* Product Grid */}
      <div className="grid grid-cols-2 gap-2 p-4 bg-gray-50">
        {items.slice(0, 4).map((item, index) => (
          <div
            key={index}
            className="aspect-square bg-white rounded overflow-hidden relative"
          >
            {item.image ? (
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                <span className="text-xs text-gray-400">No image</span>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Card Content */}
      <div className="p-6 space-y-4">
        {/* Aesthetic Label */}
        <div className="flex items-start justify-between">
          <div>
            <h3 className="font-serif text-xl md:text-2xl font-medium group-hover:underline decoration-1 underline-offset-4">
              {aesthetic}
            </h3>
            {score && (
              <p className="text-xs text-editorial-text-muted mt-1">
                Match score: {score.toFixed(1)}/10
              </p>
            )}
          </div>
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300"
          >
            <path
              d="M4 10h12M12 6l4 4-4 4"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        {/* Items Count */}
        <p className="text-sm text-editorial-text-muted">
          {items.length} {items.length === 1 ? "item" : "items"}
        </p>

        {/* Price & Marketplaces */}
        <div className="flex items-center justify-between pt-2 border-t border-editorial-divider">
          <div>
            <p className="text-xs text-editorial-text-muted">Total</p>
            <p className="text-lg font-semibold">
              ₹{totalPrice.toLocaleString()}
            </p>
          </div>
          <div className="flex items-center gap-2">
            {marketplaces.map((marketplace) => (
              <span
                key={marketplace}
                className="text-xs px-2 py-1 bg-gray-100 rounded text-editorial-text-muted"
              >
                {getMarketplaceLogo(marketplace)}
              </span>
            ))}
          </div>
        </div>

        {/* CTA */}
        <button className="w-full py-3 border border-editorial-text text-editorial-text font-medium rounded hover:bg-editorial-text hover:text-white transition-colors">
          View Details
        </button>
      </div>
    </div>
  );
}
