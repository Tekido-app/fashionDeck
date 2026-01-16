/**
 * Affiliate Link Tracking
 * 
 * Handles tracking of outbound affiliate clicks
 */

import { Marketplace } from "@fashiondeck/types";

export interface AffiliateClickEvent {
  productId: string;
  productTitle: string;
  marketplace: Marketplace;
  price: number;
  timestamp: number;
}

/**
 * Track an affiliate link click
 */
export function trackAffiliateClick(
  productId: string,
  productTitle: string,
  marketplace: Marketplace,
  price: number,
  affiliateUrl: string
): void {
  // Log the click event
  const event: AffiliateClickEvent = {
    productId,
    productTitle,
    marketplace,
    price,
    timestamp: Date.now(),
  };

  console.log("[Affiliate Click]", event);

  // TODO: Send to analytics service (Google Analytics, Mixpanel, etc.)
  // Example: gtag('event', 'affiliate_click', event);

  // Open the affiliate link in a new tab
  window.open(affiliateUrl, "_blank", "noopener,noreferrer");
}

/**
 * Format marketplace name for display
 */
export function getMarketplaceName(marketplace: Marketplace): string {
  const names: Record<Marketplace, string> = {
    amazon: "Amazon",
    flipkart: "Flipkart",
  };
  return names[marketplace];
}

/**
 * Get marketplace logo/icon
 */
export function getMarketplaceLogo(marketplace: Marketplace): string {
  // Return simple text for now, can be replaced with actual logos later
  return marketplace.charAt(0).toUpperCase() + marketplace.slice(1);
}
