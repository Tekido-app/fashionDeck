export type ProductCategory = 'top' | 'bottom' | 'shoes' | 'accessories';
export type Marketplace = 'amazon' | 'flipkart';
export interface ProductItem {
    category: ProductCategory;
    title: string;
    price: number;
    image: string;
    url: string;
    affiliateUrl: string;
    marketplace: Marketplace;
    sizes?: string[];
}
export interface ProductResult {
    id: string;
    title: string;
    price: number;
    image: string;
    productUrl: string;
    affiliateUrl: string;
    sizes: string[];
    category: string;
    marketplace: Marketplace;
}
export interface ProductDetail extends ProductResult {
    description?: string;
    brand?: string;
    rating?: number;
    reviewCount?: number;
    colors?: string[];
}
