/**
 * Product Detail Modal Component
 *
 * Shows detailed view of products in an outfit
 */

"use client";

import { useState } from "react";
import Image from "next/image";
import { Outfit, ProductItem } from "@fashiondeck/types";
import { trackAffiliateClick, getMarketplaceName } from "@/lib/tracking";

interface ProductDetailModalProps {
  outfit: Outfit | null;
  onClose: () => void;
}

export default function ProductDetailModal({
  outfit,
  onClose,
}: ProductDetailModalProps) {
  const [selectedItemIndex, setSelectedItemIndex] = useState(0);

  if (!outfit) return null;

  const selectedItem = outfit.items[selectedItemIndex];

  const handleAffiliateClick = (item: ProductItem) => {
    trackAffiliateClick(
      item.url, // Using URL as ID
      item.title,
      item.marketplace,
      item.price,
      item.affiliateUrl
    );
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-editorial-divider p-6 flex items-center justify-between z-10">
          <div>
            <h2 className="font-serif text-2xl md:text-3xl font-medium">
              {outfit.aesthetic}
            </h2>
            <p className="text-sm text-editorial-text-muted mt-1">
              {outfit.items.length} items • ₹
              {outfit.totalPrice.toLocaleString()}
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path
                d="M5 5l10 10M15 5l-10 10"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="p-6 grid md:grid-cols-2 gap-8">
          {/* Left: Image */}
          <div className="space-y-4">
            <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden relative">
              {selectedItem.image ? (
                <Image
                  src={selectedItem.image}
                  alt={selectedItem.title}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <span className="text-gray-400">No image available</span>
                </div>
              )}
            </div>

            {/* Thumbnail Navigation */}
            {outfit.items.length > 1 && (
              <div className="flex gap-2 overflow-x-auto">
                {outfit.items.map((item, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedItemIndex(index)}
                    className={`flex-shrink-0 w-20 h-20 rounded overflow-hidden border-2 transition-all ${
                      index === selectedItemIndex
                        ? "border-editorial-text"
                        : "border-transparent hover:border-gray-300"
                    }`}
                  >
                    {item.image ? (
                      <Image
                        src={item.image}
                        alt={item.title}
                        width={80}
                        height={80}
                        className="object-cover w-full h-full"
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-200"></div>
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right: Details */}
          <div className="space-y-6">
            {/* Category */}
            <div>
              <span className="text-xs uppercase tracking-wider text-editorial-text-muted">
                {selectedItem.category}
              </span>
            </div>

            {/* Title */}
            <h3 className="text-xl md:text-2xl font-medium leading-tight">
              {selectedItem.title}
            </h3>

            {/* Price */}
            <div>
              <p className="text-3xl font-semibold">
                ₹{selectedItem.price.toLocaleString()}
              </p>
            </div>

            {/* Sizes */}
            {selectedItem.sizes && selectedItem.sizes.length > 0 && (
              <div>
                <p className="text-sm text-editorial-text-muted mb-2">
                  Available sizes:
                </p>
                <div className="flex flex-wrap gap-2">
                  {selectedItem.sizes.map((size) => (
                    <span
                      key={size}
                      className="px-3 py-1 border border-editorial-divider rounded text-sm"
                    >
                      {size}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Marketplace */}
            <div className="pt-4 border-t border-editorial-divider">
              <p className="text-xs text-editorial-text-muted mb-2">
                Available on
              </p>
              <span className="inline-block px-3 py-1 bg-gray-100 rounded text-sm font-medium">
                {getMarketplaceName(selectedItem.marketplace)}
              </span>
            </div>

            {/* CTA */}
            <button
              onClick={() => handleAffiliateClick(selectedItem)}
              className="w-full py-4 bg-editorial-text text-white font-medium rounded hover:bg-editorial-text-muted transition-colors flex items-center justify-center gap-2"
            >
              Open in {getMarketplaceName(selectedItem.marketplace)}
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path
                  d="M6 3h7v7M13 3L3 13"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>

            <p className="text-xs text-editorial-text-muted text-center">
              Opens in a new tab • Affiliate link
            </p>
          </div>
        </div>

        {/* All Items List */}
        {outfit.items.length > 1 && (
          <div className="p-6 border-t border-editorial-divider">
            <h4 className="font-medium mb-4">All items in this outfit</h4>
            <div className="space-y-3">
              {outfit.items.map((item, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedItemIndex(index)}
                  className={`w-full flex items-center gap-4 p-3 rounded border transition-all ${
                    index === selectedItemIndex
                      ? "border-editorial-text bg-gray-50"
                      : "border-editorial-divider hover:border-gray-300"
                  }`}
                >
                  <div className="w-16 h-16 bg-gray-100 rounded overflow-hidden flex-shrink-0 relative">
                    {item.image && (
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        className="object-cover"
                      />
                    )}
                  </div>
                  <div className="flex-1 text-left">
                    <p className="text-sm font-medium line-clamp-1">
                      {item.title}
                    </p>
                    <p className="text-xs text-editorial-text-muted">
                      {item.category} • ₹{item.price.toLocaleString()}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
