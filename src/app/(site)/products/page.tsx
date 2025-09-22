import { ProductGrid } from "./_components/product-grid"
import { ProductPageLayout } from "./_components/product-page-layout"

// Mock data - in real app this would come from your database/API
const products = [
  {
    id:Math.random().toString(),
    name: "Buy JUUL 2 Device in UAE At Affordable Price",
    price: 130,
    originalPrice: null,
    image: "/juul-2-device-silver.jpg",
    isOnSale: true,
    inStock: true,
    category: "JUUL",
  },
  {
    id:Math.random().toString(),
    name: "JUUL Device Kit - The Ultimate Starter for New Vapers",
    price: 120,
    originalPrice: null,
    image: "/juul-device-kit-black.jpg",
    isOnSale: true,
    inStock: true,
    category: "JUUL",
  },
  {
    id:Math.random().toString(),
    name: "JUUL 2 Pods - Best Device in UAE",
    price: 65,
    originalPrice: null,
    image: "/juul-2-pods-colorful-pack.jpg",
    isOnSale: true,
    inStock: true,
    category: "JUUL",
  },
  {
    id:Math.random().toString(),
    name: "Juul Pods Menthol in UAE- Premium Vape Pods Available",
    price: 85,
    originalPrice: null,
    image: "/juul-menthol-pods-teal-pack.jpg",
    isOnSale: true,
    inStock: true,
    category: "JUUL",
  },
  {
    id:Math.random().toString(),
    name: "Best JUUL Pods Virginia Tobacco 4-Pack in UAE",
    price: 65,
    originalPrice: null,
    image: "/juul-virginia-tobacco-pods-brown-pack.jpg",
    isOnSale: true,
    inStock: true,
    category: "JUUL",
  },
]

const sidebarProducts = [
  {
    id:Math.random().toString(),
    name: "Best Pod Salt Nexus 3500 Puffs Disposable Vape in UAE",
    price: 40,
    image: "/colorful-disposable-vape.jpg",
  },
  {
    id:Math.random().toString(),
    name: "Best Pod Salt Core Lemon Slice E-liquid 30ml in UAE",
    price: 45,
    image: "/e-liquid-bottle-lemon.jpg",
  },
  {
    id:Math.random().toString(),
    name: "Cheap Price VGOD Tropical Mango Salt Nic E-liquid 30ml in UAE",
    price: 35,
    image: "/tropical-mango-e-liquid-bottle.jpg",
  },
]

export default function ProductsPage() {
  return (
    <ProductPageLayout
      title="Juul Pods: The Ultimate Guide – It's Pronounced 'J-u-u-l' not, 'Y'all'"
      description="Welcome to your no-bs guide to Juul Pods – defining simplicity as easy as using a toothpick. As technology progresses to grow with time, their inherent change and features also casts reflection on the contemporary culture, their needs and aspirations, which also evolves with time."
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "JUUL", href: "/products/juul" },
      ]}
      sidebarProducts={sidebarProducts}
    >
      <ProductGrid products={products} />
    </ProductPageLayout>
  )
}
