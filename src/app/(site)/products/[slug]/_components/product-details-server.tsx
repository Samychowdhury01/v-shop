import { Card } from "@/components/ui/card"
import { Share2, Facebook, Twitter, Instagram } from "lucide-react"
import { Button } from "@/components/ui/button"
import ProductInteractions from "./product-interactions"
import { Product } from "@/types/products"


export default function ProductDetailsServer({product}:{product: Product}) {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Buy Pod Salt 35K Disposable Vape in UAE at the Best Price
        </h1>
        <div className="flex items-center gap-2 mb-4">
          <span className="text-3xl font-bold text-red-600">50 AED</span>
        </div>
      </div>

      <div>
        <h2 className="font-semibold text-gray-900 mb-2">Pod Salt 35K Disposable Vape Overview Dubai</h2>
        <p className="text-gray-600 text-sm leading-relaxed">
          Buy Pod Salt 35K Disposable Vape in UAE at <span className="text-blue-600">Vape Dubai Hub</span>. Designed for
          vapers who need up to 35,000 puffs, advanced technology, and convenience.{" "}
          <span className="text-blue-600">Shop Pod Salt Disposable Vape in UAE</span> for daily vaping satisfaction.
        </p>
      </div>

      <div>
        <h3 className="font-semibold text-gray-900 mb-3">Pod Salt 35K Vape Specifications in UAE</h3>
        <ul className="text-sm text-gray-600 space-y-1">
          <li>• Product Name: Pod Salt 35K Disposable Vape</li>
          <li>• Brand: Pod Salt</li>
          <li>• Type: Disposable Vape, Rechargeable Device</li>
          <li>• Flavor Types: 10 flavors</li>
          <li>• Nicotine Strength: 5% (50 mg/ml) salt nicotine</li>
          <li>• Puffs Count: Approximately 35,000 puffs</li>
          <li>• Coil: Dual mesh coil with 10 boost technology</li>
          <li>• Coil Resistance: ~1.2 Ω mesh coil</li>
          <li>• Battery: 850 mAh rechargeable</li>
          <li>• Charging: USB Type-C</li>
          <li>• Display: Smart LED for puff count and battery</li>
          <li>• Activation: Draw-activated</li>
          <li>• Model: Pod Salt 35K Puffs</li>
          <li>• Selling Options: Wholesale & Retail in Dubai & UAE</li>
          <li>• Offer: Free shipping on orders over AED 300</li>
        </ul>
      </div>

      <Card className="p-4 border-orange-200 bg-orange-50">
        <p className="text-sm font-medium text-orange-800 text-center">
          🚚 FREE SHIPPING ON ALL VAPE ORDERS OVER AED 300
        </p>
      </Card>

      <ProductInteractions product={product}/>

      <div className="flex items-center gap-4 pt-4 border-t">
        <span className="text-sm text-gray-600">Share:</span>
        <div className="flex gap-2">
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
            <Facebook className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
            <Twitter className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
            <Instagram className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
            <Share2 className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
