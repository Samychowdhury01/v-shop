"use client"

import { Product } from "@/types/products"
import { useState } from "react"

export default function ProductTabsClient({product}: {product: Product}) {
  const [activeTab, setActiveTab] = useState("description")

  return (
    <div className="w-full">
      <div className="border-b border-gray-200">
        <nav className="flex space-x-8">
          <button
            onClick={() => setActiveTab("description")}
            className={`py-4 px-1 border-b-2 font-medium text-sm transition-all duration-300 ${
              activeTab === "description"
                ? "border-black text-black"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            }`}
          >
            DESCRIPTION
          </button>
          <button
            onClick={() => setActiveTab("shipping")}
            className={`py-4 px-1 border-b-2 font-medium text-sm transition-all duration-300 ${
              activeTab === "shipping"
                ? "border-black text-black"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            }`}
          >
            SHIPPING AND DELIVERY
          </button>
        </nav>
      </div>

      <div className="mt-6">
        {activeTab === "description" && <DescriptionContent />}
        {activeTab === "shipping" && <ShippingContent />}
      </div>
    </div>
  )
}

function DescriptionContent() {
  return (
    <div className="prose max-w-none">
      <h2 className="text-xl font-bold mb-4">Description</h2>

      <h3 className="text-lg font-semibold mb-3">Buy Pod Salt 35K Disposable Vape in UAE – Features & Benefits</h3>
      <p className="text-gray-600 mb-4">
        The Pod Salt 35000 Puffs Disposable Vape is crafted for both flavor and performance, as dual mesh coil and 10
        Boost technology deliver stronger vapor and richer taste. The 850 mAh rechargeable battery with USB Type-C
        ensures you get the full count and battery life.
      </p>
      <p className="text-gray-600 mb-6">
        Available in 10 premium flavors, the Pod Salt 35K is perfect for vapers in Dubai looking for long-lasting{" "}
        <span className="text-blue-600">disposable devices</span>. Buy Pod Salt 35K Disposable Vape in UAE to enjoy
        consistent flavor delivery every day.
      </p>

      <h3 className="text-lg font-semibold mb-3">Top Features of Pod Salt 35000 Puffs Disposable Vape</h3>
      <ul className="list-disc pl-6 space-y-1 text-gray-600 mb-6">
        <li>Up to 35,000 puffs per device</li>
        <li>5% salt nicotine for smooth hits</li>
        <li>Dual mesh coil with 10 Boost for superior flavor</li>
        <li>850 mAh rechargeable battery with USB Type-C</li>
        <li>LED display showing puff count & battery level</li>
        <li>10 delicious flavors to choose from</li>
        <li>Draw-activated, easy-to-use design</li>
        <li>Available for wholesale and retail in Dubai, UAE</li>
      </ul>

      <h3 className="text-lg font-semibold mb-3">Available Flavors of Pod Salt 35K Vape in Dubai</h3>
      <p className="text-gray-600 mb-3">
        If you want to buy Pod Salt 35K disposable vape in UAE, don't worry, we have more than 10 flavors available at
        the store for you. Just choose your favorite flavor to <span className="text-blue-600">order now</span> and get
        free disposable vape delivery in UAE. Below are the top 10 vape flavors:
      </p>
      <ul className="list-disc pl-6 space-y-1 text-gray-600 mb-6">
        <li>
          <strong>Grape Ice:</strong> Bold grapes with icy finish
        </li>
        <li>
          <strong>Ice Mint:</strong> Refreshing mint with cooling sensation
        </li>
        <li>
          <strong>Lemon Lime:</strong> Citrus burst with tangy twist
        </li>
        <li>
          <strong>Mixed Berries Ice:</strong> Sweet berry mix with frosty finish
        </li>
        <li>
          <strong>Watermelon Breeze:</strong> Crisp watermelon with cooling breeze
        </li>
        <li>
          <strong>Blue Raspberry:</strong> Tangy candy-like flavor
        </li>
        <li>
          <strong>Tropical Ice:</strong> Exotic fruits with icy freshness
        </li>
        <li>
          <strong>Candy:</strong> Sweet and playful candy taste
        </li>
        <li>
          <strong>Summer Dream:</strong> Fruity blend with cool finish
        </li>
      </ul>

      <h3 className="text-lg font-semibold mb-3">How to Use Pod Salt 35K Puffs Disposable Vape Safely?</h3>
      <ol className="list-decimal pl-6 space-y-1 text-gray-600 mb-6">
        <li>Unbox your Pod Salt 35K rechargeable vape</li>
        <li>Simply inhale - it is draw-activated, no button needed</li>
        <li>Check puff count and battery on the LED display</li>
        <li>Recharge with USB Type-C when low</li>
        <li>Enjoy up to 35,000 puffs of smooth flavor</li>
      </ol>

      <h3 className="text-lg font-semibold mb-3">Why Buy Pod Salt 35K Disposable Vape in UAE</h3>
      <ul className="list-disc pl-6 space-y-1 text-gray-600 mb-6">
        <li>Trusted UK brand Pod Salt</li>
        <li>High puff count device: 35,000 puffs</li>
        <li>Smooth 5% salt nicotine for satisfying hits</li>
        <li>Easy to use draw-activated design</li>
        <li>LED puff counter and rechargeable battery for convenience</li>
        <li>Free shipping across the UAE on orders over AED 300</li>
      </ul>

      <h3 className="text-lg font-semibold mb-3">Where to Buy Pod Salt 35K Disposable Vape in UAE?</h3>
      <p className="text-gray-600 mb-4">
        You can Buy Pod Salt 35K Disposable Vape in UAE directly from{" "}
        <span className="text-blue-600">Vape Dubai Hub Store</span> - the elite{" "}
        <span className="text-blue-600">Online Vape Store in Dubai</span>. We provide fast delivery, secure payment, and
        wholesale options for bulk orders.
      </p>

      <h3 className="text-lg font-semibold mb-3">Frequently Asked Questions For Pod Salt 35K Vape Dubai</h3>
      <div className="space-y-2">
        <details className="group border border-gray-200 rounded-lg">
          <summary className="flex justify-between items-center cursor-pointer p-4 font-medium text-gray-900 hover:bg-gray-50">
            Q: How many puffs does Pod Salt 35K last?
            <span className="ml-6 flex-shrink-0 transition-transform group-open:rotate-180">
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </span>
          </summary>
          <div className="px-4 pb-4 text-gray-600">
            Approximately 35,000 puffs, and it's one of the longest Pod Salt Disposable vapes in Dubai.
          </div>
        </details>

        <details className="group border border-gray-200 rounded-lg">
          <summary className="flex justify-between items-center cursor-pointer p-4 font-medium text-gray-900 hover:bg-gray-50">
            Q: What nicotine level does Pod Salt 35K have?
            <span className="ml-6 flex-shrink-0 transition-transform group-open:rotate-180">
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </span>
          </summary>
          <div className="px-4 pb-4 text-gray-600">
            It contains 5% (50 mg) salt nicotine, ideal for smooth and satisfying hits.
          </div>
        </details>

        <details className="group border border-gray-200 rounded-lg">
          <summary className="flex justify-between items-center cursor-pointer p-4 font-medium text-gray-900 hover:bg-gray-50">
            Q: Is Pod Salt 35K rechargeable?
            <span className="ml-6 flex-shrink-0 transition-transform group-open:rotate-180">
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </span>
          </summary>
          <div className="px-4 pb-4 text-gray-600">
            Yes, it has a 850mAh rechargeable battery with USB Type-C fast charging.
          </div>
        </details>

        <details className="group border border-gray-200 rounded-lg">
          <summary className="flex justify-between items-center cursor-pointer p-4 font-medium text-gray-900 hover:bg-gray-50">
            Q: Does it have a puff counter?
            <span className="ml-6 flex-shrink-0 transition-transform group-open:rotate-180">
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </span>
          </summary>
          <div className="px-4 pb-4 text-gray-600">Yes, the smart LED display shows puff count and battery life.</div>
        </details>

        <details className="group border border-gray-200 rounded-lg">
          <summary className="flex justify-between items-center cursor-pointer p-4 font-medium text-gray-900 hover:bg-gray-50">
            Q: Where can I buy Pod Salt 35K Vape in Dubai?
            <span className="ml-6 flex-shrink-0 transition-transform group-open:rotate-180">
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </span>
          </summary>
          <div className="px-4 pb-4 text-gray-600">
            Order from vape Dubai hub, with free delivery across UAE on orders over AED 300.
          </div>
        </details>
      </div>
    </div>
  )
}

function ShippingContent() {
  return (
    <div className="prose max-w-none">
      <h2 className="text-xl font-bold mb-4">Shipping and Delivery</h2>

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <h3 className="text-lg font-semibold mb-3">Delivery Information</h3>
          <ul className="space-y-2 text-gray-600">
            <li>
              • <strong>Free Shipping:</strong> On orders over AED 300
            </li>
            <li>
              • <strong>Dubai Delivery:</strong> Same day delivery available
            </li>
            <li>
              • <strong>UAE Delivery:</strong> 1-2 business days
            </li>
            <li>
              • <strong>Express Delivery:</strong> Available for urgent orders
            </li>
            <li>
              • <strong>Tracking:</strong> SMS and email updates provided
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-3">Shipping Rates</h3>
          <ul className="space-y-2 text-gray-600">
            <li>
              • <strong>Dubai:</strong> AED 15 (Free over AED 300)
            </li>
            <li>
              • <strong>Abu Dhabi:</strong> AED 20 (Free over AED 300)
            </li>
            <li>
              • <strong>Sharjah:</strong> AED 15 (Free over AED 300)
            </li>
            <li>
              • <strong>Other Emirates:</strong> AED 25 (Free over AED 300)
            </li>
            <li>
              • <strong>Express Delivery:</strong> Additional AED 10
            </li>
          </ul>
        </div>
      </div>

      <div className="mt-6">
        <h3 className="text-lg font-semibold mb-3">Important Notes</h3>
        <ul className="space-y-2 text-gray-600">
          <li>• Age verification required (21+ years)</li>
          <li>• Valid Emirates ID must be presented upon delivery</li>
          <li>• Orders placed before 2 PM qualify for same-day delivery in Dubai</li>
          <li>• Weekend deliveries available with prior arrangement</li>
          <li>• Bulk orders may require additional processing time</li>
        </ul>
      </div>
    </div>
  )
}
