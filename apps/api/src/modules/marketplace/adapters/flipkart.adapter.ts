/**
 * Flipkart Marketplace Adapter
 * 
 * Integrates with Flipkart Affiliate API for product search.
 * Uses Flipkart Affiliate Product API.
 */

import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
import { MarketplaceAdapter } from '../interfaces/marketplace-adapter.interface';
import { ProductResult, ProductDetail, ParsedPrompt, ProductCategory } from '@fashiondeck/types';
import { MarketplaceError } from '@fashiondeck/utils';

@Injectable()
export class FlipkartAdapter implements MarketplaceAdapter {
  readonly name = 'flipkart' as const;
  private readonly logger = new Logger(FlipkartAdapter.name);
  
  private readonly affiliateId: string;
  private readonly affiliateToken: string;
  private readonly apiBaseUrl = 'https://affiliate-api.flipkart.net/affiliate/api';

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {
    this.affiliateId = this.configService.get<string>('FLIPKART_AFFILIATE_ID', '');
    this.affiliateToken = this.configService.get<string>('FLIPKART_AFFILIATE_TOKEN', '');
  }

  /**
   * Search Flipkart for products
   */
  async search(parsedPrompt: ParsedPrompt, category: string): Promise<ProductResult[]> {
    if (!this.isAvailable()) {
      this.logger.warn('Flipkart adapter not configured, skipping');
      return [];
    }

    try {
      this.logger.debug(`Searching Flipkart for: ${parsedPrompt.aesthetic} in ${category}`);

      // Build search keyword
      // const keyword = this.buildSearchKeyword(parsedPrompt, category);

      // TODO: Implement actual Flipkart Affiliate API integration
      // Flipkart API endpoint: /affiliate/product/json
      // Parameters: query, resultCount, category
      
      const mockProducts = this.generateMockProducts(parsedPrompt, category as ProductCategory);

      this.logger.log(`Found ${mockProducts.length} products on Flipkart`);
      return mockProducts;

    } catch (error) {
      this.logger.error(`Flipkart search failed: ${error.message}`, error.stack);
      throw new MarketplaceError(`Flipkart search failed: ${error.message}`);
    }
  }

  /**
   * Get detailed product information
   */
  async getDetails(productId: string): Promise<ProductDetail> {
    if (!this.isAvailable()) {
      throw new MarketplaceError('Flipkart adapter not configured');
    }

    try {
      // TODO: Implement actual Flipkart Affiliate API product details
      // Endpoint: /affiliate/product/json with productId
      throw new Error('Not implemented');
    } catch (error) {
      this.logger.error(`Failed to get Flipkart product details for ${productId}: ${error.message}`, error.stack);
      throw new MarketplaceError(`Failed to get product details: ${error.message}`);
    }
  }

  /**
   * Generate Flipkart affiliate link
   */
  generateAffiliateLink(productUrl: string, _productId: string): string {
    if (!this.affiliateId) {
      return productUrl;
    }

    // Flipkart affiliate link format
    // https://www.flipkart.com/product/p/itm{productId}?affid={affiliateId}
    const url = new URL(productUrl);
    url.searchParams.set('affid', this.affiliateId);
    
    return url.toString();
  }

  /**
   * Check if adapter is configured
   */
  isAvailable(): boolean {
    return !!(this.affiliateId && this.affiliateToken);
  }

  /**
   * Build search keyword from parsed prompt
   */
  private buildSearchKeyword(parsedPrompt: ParsedPrompt, category: string): string {
    const parts = [parsedPrompt.aesthetic];
    
    if (parsedPrompt.gender && parsedPrompt.gender !== 'unisex') {
      parts.push(parsedPrompt.gender);
    }
    
    // Add category-specific terms
    const categoryTerms: Record<string, string> = {
      top: 'shirt tshirt',
      bottom: 'jeans trousers',
      shoes: 'shoes sneakers',
      accessories: 'accessories',
    };
    
    parts.push(categoryTerms[category] || category);
    
    return parts.join(' ');
  }

  /**
   * Generate mock products for development
   * TODO: Remove when Flipkart API is integrated
   */
  private generateMockProducts(parsedPrompt: ParsedPrompt, category: ProductCategory): ProductResult[] {
    const categoryMap: Record<ProductCategory, string[]> = {
      top: ['Casual Shirt', 'Polo T-Shirt', 'Sweatshirt', 'Jacket'],
      bottom: ['Slim Fit Jeans', 'Cargo Pants', 'Chinos', 'Track Pants'],
      shoes: ['Running Shoes', 'Casual Sneakers', 'Formal Shoes', 'Slippers'],
      accessories: ['Wallet', 'Backpack', 'Cap', 'Socks'],
    };

    const items = categoryMap[category] || ['Product'];
    const basePrice = parsedPrompt.budget ? parsedPrompt.budget / 3 : 900;

    return items.slice(0, 5).map((item: string, index: number) => ({
      id: `flipkart_${category}_${index}`,
      marketplace: 'flipkart' as const,
      category,
      title: `${parsedPrompt.aesthetic} ${item}`,
      price: Math.round(basePrice * (0.75 + Math.random() * 0.5)),
      productUrl: `https://flipkart.com/product/MOCK${index}`,
      affiliateUrl: `https://flipkart.com/product/MOCK${index}?affid=${this.affiliateId}`,
      image: `https://via.placeholder.com/300x400?text=${item}`,
      sizes: parsedPrompt.size ? [parsedPrompt.size] : ['M', 'L', 'XL', 'XXL'],
    }));
  }
}

