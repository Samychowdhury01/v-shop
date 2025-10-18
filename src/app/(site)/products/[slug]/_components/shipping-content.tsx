export function ShippingContent() {
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
