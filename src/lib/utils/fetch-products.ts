import { Category } from "@/types/category";
import { Product } from "@/types/products";

const API_BASE_URL = process.env.NEXT_PUBLIC_SERVER_BASE_URL;





export async function fetchProducts(): Promise<Product[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/products`, {
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error("Failed to fetch products");
    }

    const data: Category[] = await response.json();

    // Flatten the nested structure to get all products
    const allProducts: Product[] = [];

    data.forEach((category) => {
      category.brands.forEach((brand) => {
        brand.types.forEach((product) => {
          allProducts.push({
            ...product,
            category: category.category,
            categorySlug: category.slug,
            brandName: brand.name,
            brandSlug: brand.slug,
          });
        });
      });
    });

    return allProducts;
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
}

// Fetch products by category
export async function fetchProductsByCategory(
  categorySlug: string
): Promise<Product[]> {
  const allProducts = await fetchProducts();
  return allProducts.filter((product) => product.categorySlug === categorySlug);
}

// Fetch products by brand
export async function fetchProductsByBrand(
  categorySlug: string,
  brandSlug: string
): Promise<Product[]> {
   const response = await fetch(`${API_BASE_URL}/products/${categorySlug}/${brandSlug}`, {
      cache: "no-store",
    });
  if (!response.ok) {
      throw new Error("Failed to fetch products");
    }
  const data: Category[] = await response.json();
  console.log(data, "data")
}

// Fetch single product
export async function fetchProductBySlug(
  slug: string
): Promise<Product | null> {
  const allProducts = await fetchProducts();
  return allProducts.find((product) => product.slug === slug) || null;
}