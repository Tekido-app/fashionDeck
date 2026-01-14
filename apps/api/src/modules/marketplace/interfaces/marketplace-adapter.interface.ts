/**
 * Marketplace Adapter Interface
 * 
 * Common interface for all marketplace integrations (Amazon, Flipkart).
 */

import { ProductResult, ProductDetail, ParsedPrompt } from '@fashiondeck/types';

export interface MarketplaceAdapter {
  /**
   * Marketplace name
   */
  readonly name: 'amazon' | 'flipkart';

  /**
   * Search for products matching the parsed prompt
   */
  search(parsedPrompt: ParsedPrompt, category: string): Promise<ProductResult[]>;

  /**
   * Get detailed product information
   */
  getDetails(productId: string): Promise<ProductDetail>;

  /**
   * Generate affiliate tracking link
   */
  generateAffiliateLink(productUrl: string, productId: string): string;

  /**
   * Check if adapter is available/configured
   */
  isAvailable(): boolean;
}
