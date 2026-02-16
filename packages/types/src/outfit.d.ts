import { ProductItem } from './product';
export interface Outfit {
    aesthetic: string;
    totalPrice: number;
    items: ProductItem[];
    score?: number;
}
