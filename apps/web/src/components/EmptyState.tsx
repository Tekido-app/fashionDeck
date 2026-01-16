/**
 * Empty State Component
 *
 * Shown when user first visits /app
 */

"use client";

import Link from "next/link";
import StyleInput from "./StyleInput";

interface EmptyStateProps {
  query: string;
  onQueryChange: (value: string) => void;
  onSubmit: () => void;
  isLoading: boolean;
}

const SAMPLE_PROMPTS = [
  "korean minimal fit, size M, under 1500",
  "streetwear black outfit for college",
  "y2k campus look, size S",
  "date night vintage dress under 2000",
  "old money aesthetic, size L",
  "preppy casual weekend look",
];

export default function EmptyState({
  query,
  onQueryChange,
  onSubmit,
  isLoading,
}: EmptyStateProps) {
  const handlePromptClick = (prompt: string) => {
    onQueryChange(prompt);
  };

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
          <Link
            href="/"
            className="text-sm text-editorial-text-muted hover:text-editorial-text transition-colors"
          >
            ← Back to home
          </Link>
        </div>
      </nav>

      {/* Centered Content */}
      <div className="flex-1 flex items-center justify-center px-4 md:px-6 py-12">
        <div className="w-full max-w-4xl space-y-12">
          {/* Heading */}
          <div className="text-center space-y-4">
            <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl leading-tight tracking-tight">
              Describe the vibe you're shopping for
            </h1>
            <p className="text-lg md:text-xl text-editorial-text-muted max-w-2xl mx-auto">
              Tell us what you're looking for in plain English. We'll find and
              combine the perfect pieces.
            </p>
          </div>

          {/* Input */}
          <StyleInput
            value={query}
            onChange={onQueryChange}
            onSubmit={onSubmit}
            isLoading={isLoading}
          />

          {/* Sample Prompts */}
          <div className="space-y-4">
            <p className="text-sm text-editorial-text-muted text-center">
              Try one of these:
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              {SAMPLE_PROMPTS.map((prompt, index) => (
                <button
                  key={index}
                  onClick={() => handlePromptClick(prompt)}
                  disabled={isLoading}
                  className="px-4 py-2 border border-editorial-divider rounded-full text-sm hover:border-editorial-text hover:bg-gray-50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {prompt}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
