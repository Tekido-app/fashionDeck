/**
 * Amazon Marketplace Adapter
 * 
 * Integrates with Amazon India Affiliate API for product search.
 * Uses Amazon Product Advertising API (PA-API 5.0).
 */

import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
import { MarketplaceAdapter } from '../interfaces/marketplace-adapter.interface';
import { ProductResult, ProductDetail, ParsedPrompt, ProductCategory } from '@fashiondeck/types';
import { MarketplaceError } from '@fashiondeck/utils';

@Injectable()
export class AmazonAdapter implements MarketplaceAdapter {
  readonly name = 'amazon' as const;
  private readonly logger = new Logger(AmazonAdapter.name);
  
  private readonly affiliateTag: string;
  private readonly accessKey: string;
  private readonly secretKey: string;
  private readonly region: string;

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {
    this.affiliateTag = this.configService.get<string>('AMAZON_AFFILIATE_TAG', '');
    this.accessKey = this.configService.get<string>('AMAZON_ACCESS_KEY', '');
    this.secretKey = this.configService.get<string>('AMAZON_SECRET_KEY', '');
    this.region = this.configService.get<string>('AMAZON_REGION', 'in');
  }

  /**
   * Search Amazon for products
   */
  async search(parsedPrompt: ParsedPrompt, category: string): Promise<ProductResult[]> {
    if (!this.isAvailable()) {
      this.logger.warn('Amazon adapter not configured, skipping');
      return [];
    }

    try {
      this.logger.debug(`Searching Amazon for: ${parsedPrompt.aesthetic} in ${category}`);

      // TODO: Implement actual Amazon PA-API integration
      // For now, return mock data
      const mockProducts = this.generateMockProducts(parsedPrompt, category as ProductCategory);

      this.logger.log(`Found ${mockProducts.length} products on Amazon`);
      return mockProducts;

    } catch (error) {
      this.logger.error(`Amazon search failed: ${error.message}`, error.stack);
      throw new MarketplaceError(`Amazon search failed: ${error.message}`, 'amazon');
    }
  }

  /**
   * Get detailed product information
   */
  async getDetails(productId: string): Promise<ProductDetail> {
    if (!this.isAvailable()) {
      throw new MarketplaceError('Amazon adapter not configured', 'amazon');
    }

    try {
      // TODO: Implement actual Amazon PA-API GetItems operation
      throw new Error('Not implemented');
    } catch (error) {
      this.logger.error(`Failed to get Amazon product details for ${productId}: ${error.message}`, error.stack);
      throw new MarketplaceError(`Failed to get product details: ${error.message}`, 'amazon');
    }
  }

  /**
   * Generate Amazon affiliate link
   */
  generateAffiliateLink(productUrl: string, _productId: string): string {
    if (!this.affiliateTag) {
      return productUrl;
    }

    // Add affiliate tag to Amazon URL
    const url = new URL(productUrl);
    url.searchParams.set('tag', this.affiliateTag);
    
    return url.toString();
  }

  /**
   * Check if adapter is configured
   */
  isAvailable(): boolean {
    return !!(this.affiliateTag && this.accessKey && this.secretKey);
  }

  /**
   * Generate mock products for development
   * TODO: Remove when PA-API is integrated
   */
  private generateMockProducts(parsedPrompt: ParsedPrompt, category: ProductCategory): ProductResult[] {
    const categoryMap: Record<ProductCategory, string[]> = {
      top: ['T-Shirt', 'Shirt', 'Hoodie', 'Sweater'],
      bottom: ['Jeans', 'Trousers', 'Shorts', 'Joggers'],
      shoes: ['Sneakers', 'Boots', 'Loafers', 'Sandals'],
      accessories: ['Watch', 'Belt', 'Bag', 'Sunglasses'],
    };

    const items = categoryMap[category] || ['Product'];
    const basePrice = parsedPrompt.budget ? parsedPrompt.budget / 3 : 1000;

    return items.slice(0, 5).map((item: string, index: number) => ({
      id: `amazon_${category}_${index}`,
      marketplace: 'amazon' as const,
      category,
      title: `${parsedPrompt.aesthetic} ${item}`,
      price: Math.round(basePrice * (0.8 + Math.random() * 0.4)),
      productUrl: `https://amazon.in/dp/MOCK${index}`,
      affiliateUrl: `https://amazon.in/dp/MOCK${index}?tag=${this.affiliateTag}`,
      image: `https://via.placeholder.com/300x400?text=${item}`,
      sizes: parsedPrompt.size ? [parsedPrompt.size] : ['S', 'M', 'L', 'XL'],
    }));
  }
}
