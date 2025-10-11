import { Product } from "./products";

export interface Brand {
  name: string;
  slug: string;
  types: Product[];
}

export interface Category {
  category: string;
  slug: string;
  brands: Brand[];
}