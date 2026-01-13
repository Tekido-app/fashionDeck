/**
 * Query and search-related type definitions
 */

import { ProductCategory } from './product';

/**
 * Gender options
 */
export type Gender = 'male' | 'female' | 'unisex';

/**
 * Size options
 */
export type Size = 'XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL';

/**
 * Parsed user prompt from LLM
 */
export interface ParsedPrompt {
  /** Aesthetic style (e.g., "korean minimal", "streetwear") */
  aesthetic: string;
  
  /** Budget constraint in INR (optional) */
  budget?: number;
  
  /** Clothing size (optional) */
  size?: Size;
  
  /** Gender preference (optional) */
  gender?: Gender;
  
  /** Occasion (e.g., "party", "office", "casual") (optional) */
  occasion?: string;
  
  /** Required categories for the outfit */
  categories: ProductCategory[];
}

/**
 * Search query for marketplace adapters
 */
export interface SearchQuery {
  /** Search keywords */
  query: string;
  
  /** Product category filter */
  category?: ProductCategory;
  
  /** Maximum price */
  maxPrice?: number;
  
  /** Minimum price */
  minPrice?: number;
  
  /** Size filter */
  size?: Size;
  
  /** Gender filter */
  gender?: Gender;
  
  /** Maximum number of results */
  limit?: number;
}

/**
 * API query request
 */
export interface QueryRequest {
  /** Natural language prompt from user */
  prompt: string;
}

/**
 * API query response
 */
export interface QueryResponse {
  /** Array of curated outfits */
  outfits: import('./outfit').Outfit[];
  
  /** Query processing time in milliseconds */
  processingTime?: number;
  
  /** Error message if query failed */
  error?: string;
}
