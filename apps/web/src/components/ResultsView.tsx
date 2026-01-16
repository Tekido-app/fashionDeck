/**
 * Results View Component
 *
 * Displays outfit results with search controls
 */

"use client";

import Link from "next/link";
import { Outfit } from "@fashiondeck/types";
import StyleInput from "./StyleInput";
import OutfitCard from "./OutfitCard";

interface ResultsViewProps {
  query: string;
  onQueryChange: (value: string) => void;
  onSubmit: () => void;
  onNewSearch: () => void;
  isLoading: boolean;
  outfits: Outfit[];
  onSelectOutfit: (outfit: Outfit) => void;
}

export default function ResultsView({
  query,
  onQueryChange,
  onSubmit,
  onNewSearch,
  isLoading,
  outfits,
  onSelectOutfit,
}: ResultsViewProps) {
  return (
    <div className="min-h-screen bg-editorial-white flex flex-col">
      {/* Top Bar with Collapsed Input */}
      <div className="sticky top-0 z-40 bg-white border-b border-editorial-divider">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-4">
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="font-serif text-xl md:text-2xl tracking-tight font-medium hover:opacity-80 transition-opacity flex-shrink-0"
            >
              FashionDeck
            </Link>
            <div className="flex-1">
              <StyleInput
                value={query}
                onChange={onQueryChange}
                onSubmit={onSubmit}
                isLoading={isLoading}
                collapsed
              />
            </div>
            <button
              onClick={onNewSearch}
              className="flex-shrink-0 text-sm text-editorial-text-muted hover:text-editorial-text transition-colors"
            >
              New search
            </button>
          </div>
        </div>
      </div>

      {/* Results Grid */}
      <div className="flex-1 px-4 md:px-6 py-8 md:py-12">
        <div className="max-w-7xl mx-auto">
          {/* Results Header */}
          <div className="mb-8">
            <h2 className="font-serif text-3xl md:text-4xl mb-2">
              Your outfits
            </h2>
            <p className="text-editorial-text-muted">
              Found {outfits.length}{" "}
              {outfits.length === 1 ? "outfit" : "outfits"}
            </p>
          </div>

          {/* Outfit Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {outfits.map((outfit, index) => (
              <OutfitCard
                key={index}
                outfit={outfit}
                onViewDetails={() => onSelectOutfit(outfit)}
              />
            ))}
          </div>

          {/* No Results Message */}
          {outfits.length === 0 && (
            <div className="text-center py-16">
              <p className="text-xl text-editorial-text-muted mb-4">
                No outfits found
              </p>
              <p className="text-sm text-editorial-text-muted mb-8">
                Try adjusting your search or removing some filters
              </p>
              <button
                onClick={onNewSearch}
                className="px-6 py-3 border border-editorial-text text-editorial-text font-medium rounded hover:bg-editorial-text hover:text-white transition-colors"
              >
                Start new search
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
