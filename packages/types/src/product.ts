/**
 * Product-related type definitions
 */

/**
 * Product category types
 */
export type ProductCategory = 'top' | 'bottom' | 'shoes' | 'accessories';

/**
 * Marketplace types
 */
export type Marketplace = 'amazon' | 'flipkart';

/**
 * Individual product item in an outfit
 */
export interface ProductItem {
  /** Product category */
  category: ProductCategory;
  
  /** Product title/name */
  title: string;
  
  /** Price in INR */
  price: number;
  
  /** Product image URL */
  image: string;
  
  /** Direct product URL */
  url: string;
  
  /** Affiliate tracking URL */
  affiliateUrl: string;
  
  /** Marketplace source */
  marketplace: Marketplace;
  
  /** Available sizes (optional) */
  sizes?: string[];
}

/**
 * Product result from marketplace adapter
 */
export interface ProductResult {
  /** Unique product identifier */
  id: string;
  
  /** Product title */
  title: string;
  
  /** Price in INR */
  price: number;
  
  /** Product image URL */
  image: string;
  
  /** Direct product URL */
  productUrl: string;
  
  /** Affiliate tracking URL */
  affiliateUrl: string;
  
  /** Available sizes */
  sizes: string[];
  
  /** Product category */
  category: string;
  
  /** Marketplace source */
  marketplace: Marketplace;
}

/**
 * Detailed product information
 */
export interface ProductDetail extends ProductResult {
  /** Product description */
  description?: string;
  
  /** Brand name */
  brand?: string;
  
  /** Product rating (1-5) */
  rating?: number;
  
  /** Number of reviews */
  reviewCount?: number;
  
  /** Available colors */
  colors?: string[];
}
