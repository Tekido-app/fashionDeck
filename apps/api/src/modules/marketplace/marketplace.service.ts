import { Injectable, Logger } from '@nestjs/common';
import { AmazonAdapter } from './adapters/amazon.adapter';
import { FlipkartAdapter } from './adapters/flipkart.adapter';
import { ProductResult, ParsedPrompt } from '@fashiondeck/types';
import { CacheService } from '../redis/cache.service';

@Injectable()
export class MarketplaceService {
  private readonly logger = new Logger(MarketplaceService.name);

  constructor(
    private readonly amazonAdapter: AmazonAdapter,
    private readonly flipkartAdapter: FlipkartAdapter,
    private readonly cacheService: CacheService,
  ) {}

  /**
   * Search all available marketplaces in parallel for all required categories
   */
  async searchAll(parsedPrompt: ParsedPrompt): Promise<ProductResult[]> {
    const startTime = Date.now();
    
    this.logger.log(`Searching all marketplaces for: ${parsedPrompt.aesthetic}`);

    try {
      // Check cache first
      const cacheKey = this.generateCacheKey(parsedPrompt);
      const cached = await this.cacheService.getCachedMarketplaceData(
        'all',
        cacheKey,
      );

      if (cached) {
        this.logger.log('Cache hit for marketplace search');
        return cached;
      }

      // Fetch from all marketplaces for all categories in parallel
      const searchPromises: Promise<ProductResult[]>[] = [];

      for (const category of parsedPrompt.categories) {
        searchPromises.push(
          this.amazonAdapter.search(parsedPrompt, category),
          this.flipkartAdapter.search(parsedPrompt, category),
        );
      }

      const results = await Promise.allSettled(searchPromises);

      // Extract successful results
      const allProducts: ProductResult[] = [];
      
      results.forEach((result, index) => {
        const marketplace = index % 2 === 0 ? 'Amazon' : 'Flipkart';
        
        if (result.status === 'fulfilled') {
          allProducts.push(...result.value);
          this.logger.log(`${marketplace}: ${result.value.length} products`);
        } else {
          this.logger.warn(`${marketplace} search failed:`, result.reason?.message);
        }
      });

      // Filter and process results
      const filteredProducts = this.filterProducts(allProducts, parsedPrompt);
      const deduplicatedProducts = this.deduplicateProducts(filteredProducts);
      const sortedProducts = this.sortProducts(deduplicatedProducts, parsedPrompt);

      const processingTime = Date.now() - startTime;
      this.logger.log(
        `Marketplace search completed in ${processingTime}ms: ` +
        `${allProducts.length} total → ${deduplicatedProducts.length} after dedup → ` +
        `${sortedProducts.length} final results`
      );

      // Cache results
      await this.cacheService.cacheMarketplaceData(
        'all',
        cacheKey,
        sortedProducts,
      );

      return sortedProducts;

    } catch (error) {
      this.logger.error('Marketplace search failed:', error);
      throw error;
    }
  }

  /**
   * Filter products based on parsed prompt criteria
   */
  private filterProducts(products: ProductResult[], parsedPrompt: ParsedPrompt): ProductResult[] {
    return products.filter(product => {
      // Filter by budget
      if (parsedPrompt.budget && product.price > parsedPrompt.budget) {
        return false;
      }

      // Filter by size availability
      if (parsedPrompt.size && product.sizes && !product.sizes.includes(parsedPrompt.size)) {
        return false;
      }

      return true;
    });
  }

  /**
   * Remove duplicate products across marketplaces
   * Uses title similarity to detect duplicates
   */
  private deduplicateProducts(products: ProductResult[]): ProductResult[] {
    const seen = new Map<string, ProductResult>();

    for (const product of products) {
      const normalizedTitle = this.normalizeTitle(product.title);
      
      // Check for similar titles
      let isDuplicate = false;
      
      for (const [seenTitle, seenProduct] of seen.entries()) {
        const similarity = this.calculateTitleSimilarity(normalizedTitle, seenTitle);
        
        if (similarity > 0.8) {
          isDuplicate = true;
          
          // Keep the cheaper product
          if (product.price < seenProduct.price) {
            seen.set(seenTitle, product);
          }
          
          break;
        }
      }

      if (!isDuplicate) {
        seen.set(normalizedTitle, product);
      }
    }

    return Array.from(seen.values());
  }

  /**
   * Sort products by price (lower is better)
   */
  private sortProducts(products: ProductResult[], parsedPrompt: ParsedPrompt): ProductResult[] {
    return products.sort((a, b) => {
      // Sort by price (lower is better)
      return a.price - b.price;
    });
  }

  /**
   * Normalize product title for comparison
   */
  private normalizeTitle(title: string): string {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, '')
      .replace(/\s+/g, ' ')
      .trim();
  }

  /**
   * Calculate similarity between two titles (0-1)
   * Uses Jaccard similarity on word sets
   */
  private calculateTitleSimilarity(title1: string, title2: string): number {
    const words1 = new Set(title1.split(' '));
    const words2 = new Set(title2.split(' '));

    const intersection = new Set([...words1].filter(x => words2.has(x)));
    const union = new Set([...words1, ...words2]);

    return intersection.size / union.size;
  }

  /**
   * Generate cache key for parsed prompt
   */
  private generateCacheKey(parsedPrompt: ParsedPrompt): string {
    return `${parsedPrompt.aesthetic}_${parsedPrompt.categories.join(',')}_${parsedPrompt.budget || 'any'}_${parsedPrompt.size || 'any'}`;
  }

  /**
   * Get statistics about marketplace availability
   */
  getMarketplaceStats() {
    return {
      amazon: {
        available: this.amazonAdapter.isAvailable(),
        name: this.amazonAdapter.name,
      },
      flipkart: {
        available: this.flipkartAdapter.isAvailable(),
        name: this.flipkartAdapter.name,
      },
    };
  }
}
