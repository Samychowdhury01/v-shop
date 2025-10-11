// types/product.ts

export interface Product {
  _id: string;
  productName: string;
  slug: string;
  soldOut: boolean;
  thumbnailImage: string;
  productShortDescription: string;
  price: number;
  flavours: Array<Flavour>;
  pointDescription: Array<{
    label: string;
    value: string;
  }>;
  productDescription: string;
  featurePoints: Array<{
    label: string;
    value: string;
  }>;
  availableFlavorsPoints: Array<{
    label: string;
    value: string;
  }>;
  whyYouShouldBuyPoints: Array<{
    label: string;
    value: string;
  }>;
  whereToBuyShortDescription: string;
  faq: Array<{
    question: string;
    answer: string;
  }>;
  offer: {
    isActive: boolean;
    offerPrice: number;
  };
  reviews: Array<{
    user: string;
    rating: number;
    comment: string;
  }>;
  // Additional fields for context
  category?: string;
  categorySlug?: string;
  brandName?: string;
  brandSlug?: string;
}


export interface Flavour {
    flavor: string;
    flavorImage: string;
    stock: number;
  };