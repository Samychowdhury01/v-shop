// types/product.ts

export interface Product {
  id: string;
  slug: string;
  name: string;
  description?: string;
  price: number;
  discountPrice?: number | null;
  image: string;
  category: {
    slug: string;
  };
  shortDescription: string;
  brand?: string;
  specifications?: string[];
  flavors?: string[];
  isOnSale?: boolean;
  faqs: Faq[];
  colors?: string[];
  options?: string[];
  createdAt?: string;
  updatedAt?: string;
}

type Faq = {
  question: string;
  answer: string;
};
