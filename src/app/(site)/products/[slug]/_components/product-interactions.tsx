"use client";

import { useState } from "react";
import { Minus, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  ProductOptions,
  ProductOptionsSelector,
  ProductSelection,
  validateProductSelection,
} from "../../_components/product-options-selector";
import { useCart } from "@/lib/provider/cart-context";
import { Product } from "@/types/products";

interface ProductInteractionsProps {
  product: Product;
}

export default function ProductInteractions({
  product,
}: ProductInteractionsProps) {
  const [quantity, setQuantity] = useState(1);
  const [selectedOptions, setSelectedOptions] = useState<ProductSelection>({});
  const { addToCart, setCartSheetOpen } = useCart();

  const productOptions: ProductOptions = {
    flavors: product.flavors,
    options: product?.options,
    colors: product?.colors,
    // nicotineLevels: product?.nicotineLevels,
  };

  const handleQuantityChange = (change: number) => {
    setQuantity(Math.max(1, quantity + change));
  };

  const handleSelectionChange = (selection: ProductSelection) => {
    setSelectedOptions(selection);
  };

  const handleAddToCart = () => {
    // Validate that all required options are selected
    const isValid = validateProductSelection(productOptions, selectedOptions);
    
    if (!isValid) {
      // toast.error("Please select all required options");
      return;
    }

    // Create a unique ID for this cart item based on product ID and selected options
    const optionString = [
      selectedOptions.flavor,
      selectedOptions.color,
      selectedOptions.option,
      selectedOptions.nicotineLevel,
    ]
      .filter(Boolean)
      .join("-");
    
    const cartItemId = `${product.id}-${optionString || "default"}`;

    // Add items to cart based on quantity
    for (let i = 0; i < quantity; i++) {
      addToCart({
        id: cartItemId,
        productId: product.id,
        name: product.name,
        price: product.price,
        image: product.images[0],
        flavor: selectedOptions.flavor,
        color: selectedOptions.color,
        option: selectedOptions.option,
        nicotineLevel: selectedOptions.nicotineLevel,
      });
    }

    // Show success message
    // toast.success(`Added ${quantity} ${product.name} to cart`);

    // Open cart sheet
    setCartSheetOpen(true);

    // Reset quantity after adding to cart
    setQuantity(1);
  };

  // Check if all required options are selected
  const isAddToCartDisabled = !validateProductSelection(productOptions, selectedOptions);

  return (
    <div className="space-y-4">
      <ProductOptionsSelector
        productOptions={productOptions}
        onSelectionChange={handleSelectionChange}
      />

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <Button
            onClick={() => handleQuantityChange(-1)}
            className="h-10 w-10"
            variant="outline"
            size="icon"
          >
            <Minus className="h-4 w-4" />
          </Button>
          <span className="w-12 text-center font-medium">{quantity}</span>
          <Button
            onClick={() => handleQuantityChange(1)}
            className="h-10 w-10"
            variant="outline"
            size="icon"
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>

        <Button
          onClick={handleAddToCart}
          className="flex-1"
          disabled={isAddToCartDisabled}
        >
          ADD TO CART
        </Button>
      </div>
    </div>
  );
}