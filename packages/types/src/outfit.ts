/**
 * Outfit-related type definitions
 */

import { ProductItem } from './product';

/**
 * Complete outfit with curated items
 */
export interface Outfit {
  /** Aesthetic style of the outfit (e.g., "korean minimal", "streetwear") */
  aesthetic: string;
  
  /** Total price of all items in the outfit */
  totalPrice: number;
  
  /** Array of product items that make up the outfit */
  items: ProductItem[];
  
  /** Optional coherence score (1-10) from ML service */
  score?: number;
}
