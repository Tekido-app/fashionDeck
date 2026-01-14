/**
 * Query Service
 * 
 * Orchestrates the entire query flow:
 * 1. Parse prompt with ML service
 * 2. Fetch products from marketplaces (parallel)
 * 3. Assemble outfits
 * 4. Score and rank outfits
 * 5. Log metrics
 */

import { Injectable, Logger } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { MLServiceClient } from './ml-service.client';
import { CacheService } from '../redis/cache.service';
import { MarketplaceService } from '../marketplace/marketplace.service';
import { QueryResponseDto } from './dto/query-response.dto';
import { Outfit, ParsedPrompt, ProductItem } from '@fashiondeck/types';
import { NoResultsError } from '@fashiondeck/utils';

@Injectable()
export class QueryService {
  private readonly logger = new Logger(QueryService.name);

  constructor(
    private readonly mlServiceClient: MLServiceClient,
    private readonly cacheService: CacheService,
    private readonly marketplaceService: MarketplaceService,
    @InjectDataSource()
    private readonly dataSource: DataSource,
  ) {}

  /**
   * Process user query and return outfit recommendations
   */
  async processQuery(prompt: string, userIp?: string): Promise<QueryResponseDto> {
    const startTime = Date.now();
    const queryId = this.generateQueryId();

    this.logger.log(`[${queryId}] Processing query: "${prompt}"`);

    try {
      // Step 1: Check cache
      const cacheKey = this.cacheService.generateHash(prompt);
      const cachedResult = await this.cacheService.getCachedPrompt(cacheKey);

      if (cachedResult) {
        this.logger.log(`[${queryId}] Cache hit for prompt`);
        const processingTime = Date.now() - startTime;
        
        return {
          outfits: cachedResult.outfits,
          processingTime,
          count: cachedResult.outfits.length,
          aesthetic: cachedResult.aesthetic,
        };
      }

      // Step 2: Parse prompt with ML service
      const parsedPrompt = await this.mlServiceClient.parsePrompt(prompt);
      this.logger.debug(`[${queryId}] Parsed prompt:`, parsedPrompt);

      // Step 3: Fetch products (placeholder - will be implemented with marketplace adapters)
      const outfits = await this.assembleOutfits(parsedPrompt, queryId);

      // Step 4: Score outfits (if ML service is available)
      const scoredOutfits = await this.scoreOutfits(outfits, parsedPrompt.aesthetic, queryId);

      // Step 5: Sort by score and limit results
      const topOutfits = scoredOutfits
        .sort((a, b) => (b.score || 0) - (a.score || 0))
        .slice(0, 6); // Return top 6 outfits

      const processingTime = Date.now() - startTime;

      // Step 6: Cache result
      await this.cacheService.cachePrompt(cacheKey, {
        outfits: topOutfits,
        aesthetic: parsedPrompt.aesthetic,
      });

      // Step 7: Log query metrics
      await this.logQueryMetrics({
        queryId,
        prompt,
        parsedPrompt,
        numResults: topOutfits.length,
        processingTime,
        success: true,
        userIp,
      });

      this.logger.log(`[${queryId}] Query completed in ${processingTime}ms with ${topOutfits.length} results`);

      return {
        outfits: topOutfits,
        processingTime,
        count: topOutfits.length,
        aesthetic: parsedPrompt.aesthetic,
      };

    } catch (error) {
      const processingTime = Date.now() - startTime;

      // Log failed query
      await this.logQueryMetrics({
        queryId,
        prompt,
        parsedPrompt: null,
        numResults: 0,
        processingTime,
        success: false,
        errorMessage: error.message,
        userIp,
      });

      this.logger.error(`[${queryId}] Query failed after ${processingTime}ms:`, error);

      throw error;
    }
  }

  /**
   * Assemble outfits from products
   * TODO: Implement with marketplace adapters
   */
  private async assembleOutfits(parsedPrompt: ParsedPrompt, queryId: string): Promise<Outfit[]> {
    this.logger.debug(`[${queryId}] Assembling outfits for aesthetic: ${parsedPrompt.aesthetic}`);

    // Placeholder: Return mock outfits for now
    // This will be replaced with actual marketplace product fetching
    const mockOutfits: Outfit[] = [
      {
        aesthetic: parsedPrompt.aesthetic,
        totalPrice: 2500,
        items: [],
      },
    ];

    if (mockOutfits.length === 0) {
      throw new NoResultsError('No outfits found matching your criteria');
    }

    return mockOutfits;
  }

  /**
   * Score outfits using ML service
   */
  private async scoreOutfits(
    outfits: Outfit[],
    aesthetic: string,
    queryId: string,
  ): Promise<Outfit[]> {
    this.logger.debug(`[${queryId}] Scoring ${outfits.length} outfits`);

    const scoredOutfits = await Promise.all(
      outfits.map(async (outfit) => {
        try {
          const score = await this.mlServiceClient.scoreOutfit({
            aesthetic,
            items: outfit.items.map(item => ({
              title: item.title,
              category: item.category,
              price: item.price,
            })),
          });

          return {
            ...outfit,
            score,
          };
        } catch (error) {
          this.logger.warn(`[${queryId}] Failed to score outfit:`, error.message);
          return outfit; // Return without score
        }
      })
    );

    return scoredOutfits;
  }

  /**
   * Log query metrics to database
   */
  private async logQueryMetrics(metrics: {
    queryId: string;
    prompt: string;
    parsedPrompt: ParsedPrompt | null;
    numResults: number;
    processingTime: number;
    success: boolean;
    errorMessage?: string;
    userIp?: string;
  }): Promise<void> {
    try {
      await this.dataSource.query(
        `
        INSERT INTO query_logs (
          prompt,
          parsed_json,
          response_time_ms,
          num_results,
          success,
          error_message,
          user_ip
        ) VALUES ($1, $2, $3, $4, $5, $6, $7)
        `,
        [
          metrics.prompt,
          metrics.parsedPrompt ? JSON.stringify(metrics.parsedPrompt) : null,
          metrics.processingTime,
          metrics.numResults,
          metrics.success,
          metrics.errorMessage || null,
          metrics.userIp || null,
        ]
      );

      this.logger.debug(`[${metrics.queryId}] Query metrics logged`);
    } catch (error) {
      this.logger.error(`[${metrics.queryId}] Failed to log query metrics:`, error.message);
      // Don't throw - logging failure shouldn't break the query
    }
  }

  /**
   * Generate unique query ID for tracking
   */
  private generateQueryId(): string {
    return `q_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }
}
