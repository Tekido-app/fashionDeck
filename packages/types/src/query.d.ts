import { ProductCategory } from './product';
export type Gender = 'male' | 'female' | 'unisex';
export type Size = 'XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL';
export interface ParsedPrompt {
    aesthetic: string;
    budget?: number;
    size?: Size;
    gender?: Gender;
    occasion?: string;
    categories: ProductCategory[];
}
export interface SearchQuery {
    query: string;
    category?: ProductCategory;
    maxPrice?: number;
    minPrice?: number;
    size?: Size;
    gender?: Gender;
    limit?: number;
}
export interface QueryRequest {
    prompt: string;
}
export interface QueryResponse {
    outfits: import('./outfit').Outfit[];
    processingTime?: number;
    error?: string;
}
