/**
 * Outfit Service
 * 
 * Assembles complete outfits from product candidates.
 * Handles scoring, ranking, and budget filtering.
 */

import { Injectable, Logger } from '@nestjs/common';
import { ProductResult, Outfit, ParsedPrompt, ProductItem } from '@fashiondeck/types';
import { MLServiceClient } from '../query/ml-service.client';

@Injectable()
export class OutfitService {
  private readonly logger = new Logger(OutfitService.name);

  constructor(private readonly mlServiceClient: MLServiceClient) {}

  /**
   * Assemble and score outfits from product candidates
   */
  async assembleOutfits(
    products: ProductResult[],
    parsedPrompt: ParsedPrompt,
  ): Promise<Outfit[]> {
    const startTime = Date.now();

    this.logger.log(`Assembling outfits from ${products.length} products`);

    // Group products by category
    const productsByCategory = this.groupProductsByCategory(products);

    // Generate outfit combinations
    const outfitCombinations = this.generateCombinations(
      productsByCategory,
      parsedPrompt,
    );

    this.logger.debug(`Generated ${outfitCombinations.length} outfit combinations`);

    // Filter by budget
    const budgetFiltered = this.filterByBudget(outfitCombinations, parsedPrompt);

    this.logger.debug(`${budgetFiltered.length} outfits within budget`);

    // Score outfits
    const scoredOutfits = await this.scoreOutfits(budgetFiltered, parsedPrompt);

    // Sort by score and take top 2-6
    const rankedOutfits = this.rankOutfits(scoredOutfits);
    const topOutfits = rankedOutfits.slice(0, 6);

    const processingTime = Date.now() - startTime;
    this.logger.log(
      `Assembled ${topOutfits.length} outfits in ${processingTime}ms`
    );

    return topOutfits;
  }

  /**
   * Group products by category for easier combination
   */
  private groupProductsByCategory(
    products: ProductResult[],
  ): Map<string, ProductResult[]> {
    const grouped = new Map<string, ProductResult[]>();

    for (const product of products) {
      const category = product.category;
      if (!grouped.has(category)) {
        grouped.set(category, []);
      }
      grouped.get(category)!.push(product);
    }

    return grouped;
  }

  /**
   * Generate all valid outfit combinations
   */
  private generateCombinations(
    productsByCategory: Map<string, ProductResult[]>,
    parsedPrompt: ParsedPrompt,
  ): Outfit[] {
    const outfits: Outfit[] = [];

    const tops = productsByCategory.get('top') || [];
    const bottoms = productsByCategory.get('bottom') || [];
    const shoes = productsByCategory.get('shoes') || [];
    const accessories = productsByCategory.get('accessories') || [];

    // Core outfit: top + bottom (required)
    for (const top of tops.slice(0, 10)) {
      // Limit to top 10 to avoid combinatorial explosion
      for (const bottom of bottoms.slice(0, 10)) {
        const items: ProductItem[] = [
          this.convertToProductItem(top),
          this.convertToProductItem(bottom),
        ];

        // Add shoes if requested
        if (parsedPrompt.categories.includes('shoes') && shoes.length > 0) {
          for (const shoe of shoes.slice(0, 5)) {
            const outfitWithShoes = {
              aesthetic: parsedPrompt.aesthetic,
              items: [...items, this.convertToProductItem(shoe)],
              totalPrice: this.calculateTotalPrice([...items, this.convertToProductItem(shoe)]),
            };

            if (this.validateOutfit(outfitWithShoes)) {
              outfits.push(outfitWithShoes);
            }
          }
        } else {
          // Outfit without shoes
          const outfit = {
            aesthetic: parsedPrompt.aesthetic,
            items,
            totalPrice: this.calculateTotalPrice(items),
          };

          if (this.validateOutfit(outfit)) {
            outfits.push(outfit);
          }
        }

        // Add accessories if requested (optional)
        if (parsedPrompt.categories.includes('accessories') && accessories.length > 0) {
          for (const accessory of accessories.slice(0, 3)) {
            const outfitWithAccessory = {
              aesthetic: parsedPrompt.aesthetic,
              items: [...items, this.convertToProductItem(accessory)],
              totalPrice: this.calculateTotalPrice([...items, this.convertToProductItem(accessory)]),
            };

            if (this.validateOutfit(outfitWithAccessory)) {
              outfits.push(outfitWithAccessory);
            }
          }
        }
      }
    }

    return outfits;
  }

  /**
   * Convert ProductResult to ProductItem
   */
  private convertToProductItem(product: ProductResult): ProductItem {
    return {
      category: product.category as any,
      title: product.title,
      price: product.price,
      image: product.image,
      url: product.productUrl,
      affiliateUrl: product.affiliateUrl,
      marketplace: product.marketplace,
      sizes: product.sizes,
    };
  }

  /**
   * Calculate total price of outfit
   */
  private calculateTotalPrice(items: ProductItem[]): number {
    return items.reduce((sum, item) => sum + item.price, 0);
  }

  /**
   * Filter outfits by budget constraint (+10% tolerance)
   */
  private filterByBudget(outfits: Outfit[], parsedPrompt: ParsedPrompt): Outfit[] {
    if (!parsedPrompt.budget) {
      return outfits;
    }

    const maxBudget = parsedPrompt.budget * 1.1; // +10% tolerance

    return outfits.filter(outfit => outfit.totalPrice <= maxBudget);
  }

  /**
   * Score outfits using ML service
   */
  private async scoreOutfits(
    outfits: Outfit[],
    parsedPrompt: ParsedPrompt,
  ): Promise<Outfit[]> {
    const scoredOutfits = await Promise.all(
      outfits.map(async (outfit) => {
        try {
          // Call ML service for coherence scoring
          const llmScore = await this.mlServiceClient.scoreOutfit({
            aesthetic: parsedPrompt.aesthetic,
            items: outfit.items.map(item => ({
              title: item.title,
              category: item.category,
              price: item.price,
            })),
          });

          // Mock embedding score for now (will be replaced with real ML service)
          const embeddingScore = this.mockEmbeddingScore(outfit);

          // Combine scores: 60% LLM, 40% embeddings
          const finalScore = llmScore * 0.6 + embeddingScore * 0.4;

          return {
            ...outfit,
            score: finalScore,
          };
        } catch (error) {
          this.logger.warn('Failed to score outfit, using default score:', error.message);
          
          // Fallback: use simple heuristic score
          return {
            ...outfit,
            score: this.calculateHeuristicScore(outfit, parsedPrompt),
          };
        }
      })
    );

    return scoredOutfits;
  }

  /**
   * Mock embedding score (placeholder for real ML service)
   */
  private mockEmbeddingScore(outfit: Outfit): number {
    // Simple heuristic: prefer outfits with more items and balanced prices
    const itemCount = outfit.items.length;
    // const avgPrice = outfit.totalPrice / itemCount;
    const priceVariance = this.calculatePriceVariance(outfit.items);

    // Normalize to 0-1 range
    const itemScore = Math.min(itemCount / 4, 1); // Max 4 items
    const balanceScore = 1 - Math.min(priceVariance / 1000, 1);

    return (itemScore * 0.5 + balanceScore * 0.5);
  }

  /**
   * Calculate price variance (lower is better for balanced outfits)
   */
  private calculatePriceVariance(items: ProductItem[]): number {
    const avgPrice = items.reduce((sum, item) => sum + item.price, 0) / items.length;
    const variance = items.reduce((sum, item) => {
      return sum + Math.pow(item.price - avgPrice, 2);
    }, 0) / items.length;

    return Math.sqrt(variance);
  }

  /**
   * Calculate heuristic score when ML service is unavailable
   */
  private calculateHeuristicScore(outfit: Outfit, parsedPrompt: ParsedPrompt): number {
    let score = 0.5; // Base score

    // Prefer complete outfits
    if (outfit.items.length >= 3) {
      score += 0.2;
    }

    // Prefer outfits within budget
    if (parsedPrompt.budget && outfit.totalPrice <= parsedPrompt.budget) {
      score += 0.2;
    }

    // Prefer balanced prices
    const priceVariance = this.calculatePriceVariance(outfit.items);
    if (priceVariance < 500) {
      score += 0.1;
    }

    return Math.min(score, 1);
  }

  /**
   * Rank outfits by score (descending)
   */
  private rankOutfits(outfits: Outfit[]): Outfit[] {
    return outfits.sort((a, b) => {
      const scoreA = a.score || 0;
      const scoreB = b.score || 0;
      return scoreB - scoreA;
    });
  }

  /**
   * Validate outfit has required components
   */
  private validateOutfit(outfit: Outfit): boolean {
    // Must have at least top and bottom
    const categories = outfit.items.map(item => item.category);
    const hasTop = categories.includes('top');
    const hasBottom = categories.includes('bottom');

    if (!hasTop || !hasBottom) {
      return false;
    }

    // Verify all affiliate links are valid URLs
    for (const item of outfit.items) {
      if (!this.isValidUrl(item.affiliateUrl)) {
        return false;
      }
    }

    return true;
  }

  /**
   * Check if string is valid URL
   */
  private isValidUrl(url: string): boolean {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  }
}
