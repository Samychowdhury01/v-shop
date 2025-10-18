import { Product } from "@/types/products";
import Faqs from "./Faqs";

export function DescriptionContent({ product }: { product: Product }) {
  return (
    <div className="prose max-w-none">
      <h2 className="text-xl font-bold mb-4">Description</h2>

      <h3 className="text-lg font-semibold mb-3">
        {product?.productName} – Features & Benefits
      </h3>
      <p className="text-gray-600 mb-4">{product?.productDescription}</p>

      <h3 className="text-lg font-semibold mb-3">
        Top Features of {product?.productName} Vape
      </h3>
      <ul className="list-disc pl-6 space-y-1 text-gray-600 mb-6">
        {product?.featurePoints?.map((point, index) => (
          <li key={index}>
            <span className="font-semibold mr-1">{point?.label}</span>
            <span>{point?.value}</span>
          </li>
        ))}
      </ul>

      {/* available flavours */}
      {product?.availableFlavorsPoints?.length > 0 ? (
        <div>
          <h3 className="text-lg font-semibold mb-3">
            Available Flavors of {product?.productName}
          </h3>
          <p className="text-gray-600 mb-3">
            If you want to buy {product?.productName} vape in UAE, don&apos;t
            worry, we have more than {product?.availableFlavorsPoints?.length}{" "}
            flavors available at the store for you. Just choose your favorite
            flavor to <span className="text-blue-600">order now</span> and get
            free delivery in UAE. Below are the top vape flavors:
          </p>
          <ul className="list-disc pl-6 space-y-1 text-gray-600 mb-6">
            {product?.availableFlavorsPoints?.map((point, index) => (
              <li key={index}>
                <span className="font-semibold mr-1">{point?.label}</span>
                <span>{point?.value}</span>
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      <h3 className="text-lg font-semibold mb-3">
        How to Use Pod Salt 35K Puffs Disposable Vape Safely?
      </h3>
      <ol className="list-decimal pl-6 space-y-1 text-gray-600 mb-6">
        <li>Unbox your Pod Salt 35K rechargeable vape</li>
        <li>Simply inhale - it is draw-activated, no button needed</li>
        <li>Check puff count and battery on the LED display</li>
        <li>Recharge with USB Type-C when low</li>
        <li>Enjoy up to 35,000 puffs of smooth flavor</li>
      </ol>

      {/* why buy section*/}
      {product?.whyYouShouldBuyPoints.length > 0 ? (
        <div>
          <h3 className="text-lg font-semibold mb-3">
            Why Buy {product?.productName} Vape in UAE
          </h3>
          <ul className="list-disc pl-6 space-y-1 text-gray-600 mb-6">
            {product?.whyYouShouldBuyPoints?.map((point, index) => (
              <li key={index}>
                <span className="font-semibold mr-1">{point?.label}</span>
                <span>{point?.value}</span>
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      {/* where to buy */}
      <div>
        <h3 className="text-lg font-semibold mb-3">
          Where to Buy {product?.productName} Vape in UAE?
        </h3>
        <p className="text-gray-600 mb-4">
          {product?.whereToBuyShortDescription}
        </p>
      </div>
      <Faqs faqs={product?.faq} />
    </div>
  );
}
