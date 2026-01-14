/**
 * Query Response DTO
 * 
 * Structured response for outfit recommendations.
 */

import { Outfit } from '@fashiondeck/types';

export class QueryResponseDto {
  /**
   * Array of outfit recommendations
   */
  outfits: Outfit[];

  /**
   * Total processing time in milliseconds
   */
  processingTime?: number;

  /**
   * Number of results returned
   */
  count: number;

  /**
   * Parsed aesthetic from the prompt
   */
  aesthetic?: string;

  /**
   * Any warnings or notices
   */
  warnings?: string[];
}

/**
 * Error Response DTO
 */
export class QueryErrorResponseDto {
  /**
   * HTTP status code
   */
  statusCode: number;

  /**
   * Error message
   */
  message: string;

  /**
   * Error type
   */
  error: string;

  /**
   * Timestamp of the error
   */
  timestamp: string;

  /**
   * Request path
   */
  path: string;
}
