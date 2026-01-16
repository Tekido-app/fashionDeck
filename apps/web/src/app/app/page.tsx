/**
 * Main App Page - /app
 *
 * Core product experience for FashionDeck
 */

"use client";

import { useState } from "react";
import { Outfit } from "@fashiondeck/types";
import { submitQuery, QueryApiError } from "@/lib/api";
import EmptyState from "@/components/EmptyState";
import LoadingState from "@/components/LoadingState";
import ResultsView from "@/components/ResultsView";
import ProductDetailModal from "@/components/ProductDetailModal";

export default function AppPage() {
  const [query, setQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [results, setResults] = useState<Outfit[]>([]);
  const [selectedOutfit, setSelectedOutfit] = useState<Outfit | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async () => {
    if (!query || query.trim().length < 10) return;

    setIsSearching(true);
    setError(null);

    try {
      const response = await submitQuery(query);
      setResults(response.outfits);
    } catch (err) {
      if (err instanceof QueryApiError) {
        setError(err.message);
        // Show suggestions if available
        if (err.suggestions) {
          console.log("Suggestions:", err.suggestions);
        }
      } else {
        setError("Something went wrong. Please try again.");
      }
      setResults([]);
    } finally {
      setIsSearching(false);
    }
  };

  const handleNewSearch = () => {
    setQuery("");
    setResults([]);
    setError(null);
  };

  const handleSelectOutfit = (outfit: Outfit) => {
    setSelectedOutfit(outfit);
  };

  const handleCloseModal = () => {
    setSelectedOutfit(null);
  };

  // Determine which state to show
  const showEmpty = !results.length && !isSearching;
  const showLoading = isSearching;
  const showResults = results.length > 0 && !isSearching;

  return (
    <>
      {showEmpty && (
        <EmptyState
          query={query}
          onQueryChange={setQuery}
          onSubmit={handleSearch}
          isLoading={isSearching}
        />
      )}

      {showLoading && <LoadingState />}

      {showResults && (
        <ResultsView
          query={query}
          onQueryChange={setQuery}
          onSubmit={handleSearch}
          onNewSearch={handleNewSearch}
          isLoading={isSearching}
          outfits={results}
          onSelectOutfit={handleSelectOutfit}
        />
      )}

      {/* Error Message */}
      {error && (
        <div className="fixed bottom-4 right-4 bg-red-50 border border-red-200 text-red-800 px-6 py-4 rounded-lg shadow-lg max-w-md">
          <p className="font-medium mb-1">Error</p>
          <p className="text-sm">{error}</p>
          <button
            onClick={() => setError(null)}
            className="mt-2 text-xs underline"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* Product Detail Modal */}
      <ProductDetailModal outfit={selectedOutfit} onClose={handleCloseModal} />
    </>
  );
}
