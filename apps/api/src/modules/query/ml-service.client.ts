/**
 * ML Service Client
 * 
 * Handles communication with the FastAPI ML service for:
 * - Prompt parsing (GPT-4o-mini)
 * - Outfit scoring (Claude 3 Haiku)
 * - Embedding generation (CLIP)
 */

import { Injectable, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom, timeout } from 'rxjs';
import { ParsedPrompt } from '@fashiondeck/types';

export interface ParsePromptResponse {
  parsed: ParsedPrompt;
  processingTime: number;
}

export interface ScoreOutfitRequest {
  aesthetic: string;
  items: Array<{
    title: string;
    category: string;
    price: number;
  }>;
}

export interface ScoreOutfitResponse {
  score: number;
  reasoning: string;
}

@Injectable()
export class MLServiceClient {
  private readonly logger = new Logger(MLServiceClient.name);
  private readonly mlServiceUrl: string;
  private readonly mlServiceTimeout: number;

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {
    this.mlServiceUrl = this.configService.get<string>('ML_SERVICE_URL', 'http://localhost:8000');
    this.mlServiceTimeout = this.configService.get<number>('ML_SERVICE_TIMEOUT', 5000);
  }

  /**
   * Parse user prompt using LLM
   */
  async parsePrompt(prompt: string): Promise<ParsedPrompt> {
    const startTime = Date.now();

    try {
      this.logger.debug(`Parsing prompt: "${prompt}"`);

      const response = await firstValueFrom(
        this.httpService
          .post<ParsePromptResponse>(`${this.mlServiceUrl}/parse-prompt`, {
            prompt,
          })
          .pipe(timeout(this.mlServiceTimeout))
      );

      const processingTime = Date.now() - startTime;
      this.logger.log(`Prompt parsed in ${processingTime}ms`);

      return response.data.parsed;
    } catch (error) {
      const processingTime = Date.now() - startTime;
      this.logger.error(`Failed to parse prompt after ${processingTime}ms:`, error.message);

      // Fallback: Return basic parsed prompt
      return this.createFallbackParsedPrompt(prompt);
    }
  }

  /**
   * Score outfit coherence using LLM
   */
  async scoreOutfit(request: ScoreOutfitRequest): Promise<number> {
    const startTime = Date.now();

    try {
      this.logger.debug(`Scoring outfit with ${request.items.length} items`);

      const response = await firstValueFrom(
        this.httpService
          .post<ScoreOutfitResponse>(`${this.mlServiceUrl}/score-outfit`, request)
          .pipe(timeout(this.mlServiceTimeout))
      );

      const processingTime = Date.now() - startTime;
      this.logger.log(`Outfit scored in ${processingTime}ms: ${response.data.score}`);

      return response.data.score;
    } catch (error) {
      const processingTime = Date.now() - startTime;
      this.logger.warn(`Failed to score outfit after ${processingTime}ms:`, error.message);

      // Fallback: Return neutral score
      return 0.5;
    }
  }

  /**
   * Generate embedding for product
   */
  async generateEmbedding(text: string, imageUrl?: string): Promise<number[]> {
    try {
      const response = await firstValueFrom(
        this.httpService
          .post<{ embedding: number[] }>(`${this.mlServiceUrl}/generate-embedding`, {
            text,
            imageUrl,
          })
          .pipe(timeout(this.mlServiceTimeout))
      );

      return response.data.embedding;
    } catch (error) {
      this.logger.error('Failed to generate embedding:', error.message);
      throw error;
    }
  }

  /**
   * Health check for ML service
   */
  async healthCheck(): Promise<boolean> {
    try {
      const response = await firstValueFrom(
        this.httpService
          .get(`${this.mlServiceUrl}/health`)
          .pipe(timeout(2000))
      );

      return response.status === 200;
    } catch (error) {
      this.logger.warn('ML service health check failed:', error.message);
      return false;
    }
  }

  /**
   * Create fallback parsed prompt when ML service is unavailable
   */
  private createFallbackParsedPrompt(prompt: string): ParsedPrompt {
    this.logger.warn('Using fallback prompt parsing');

    // Extract basic information from prompt
    const lowerPrompt = prompt.toLowerCase();
    
    // Try to extract budget
    const budgetMatch = lowerPrompt.match(/(\d+)/);
    const budget = budgetMatch ? parseInt(budgetMatch[1]) : undefined;

    // Try to extract size
    let size: 'XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL' | undefined;
    if (lowerPrompt.includes(' xs ') || lowerPrompt.includes('extra small')) size = 'XS';
    else if (lowerPrompt.includes(' s ') || lowerPrompt.includes('small')) size = 'S';
    else if (lowerPrompt.includes(' m ') || lowerPrompt.includes('medium')) size = 'M';
    else if (lowerPrompt.includes(' l ') || lowerPrompt.includes('large')) size = 'L';
    else if (lowerPrompt.includes(' xl ') || lowerPrompt.includes('extra large')) size = 'XL';
    else if (lowerPrompt.includes('xxl') || lowerPrompt.includes('2xl')) size = 'XXL';

    // Try to extract gender
    let gender: 'male' | 'female' | 'unisex' | undefined;
    if (lowerPrompt.includes('men') || lowerPrompt.includes('male')) gender = 'male';
    else if (lowerPrompt.includes('women') || lowerPrompt.includes('female')) gender = 'female';
    else gender = 'unisex';

    // Default categories
    const categories: Array<'top' | 'bottom' | 'shoes' | 'accessories'> = ['top', 'bottom'];

    return {
      aesthetic: prompt, // Use full prompt as aesthetic
      budget,
      size,
      gender,
      categories,
    };
  }
}
