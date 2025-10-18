"use client";

import { useState } from "react";
import { Minus, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  ProductOptionsSelector,
  ProductSelection,
  validateProductSelection,
} from "../../_components/product-options-selector";
import { useCart } from "@/lib/provider/cart-context";
import { Product } from "@/types/products";
import toast from "react-hot-toast";
import { useProductContext } from "@/lib/provider/product-context";

interface ProductInteractionsProps {
  product: Product;
}

export default function ProductInteractions({
  product,
}: ProductInteractionsProps) {
  const [quantity, setQuantity] = useState(1);
  const [selectedOptions, setSelectedOptions] = useState<ProductSelection>({});
  const [resetTrigger, setResetTrigger] = useState(0);
  const { addToCart, setCartSheetOpen } = useCart();
  const { setSelectedFlavor } = useProductContext();

  const handleQuantityChange = (change: number) => {
    setQuantity(Math.max(1, quantity + change));
  };

  const handleSelectionChange = (selection: ProductSelection) => {
    setSelectedOptions(selection);
    // Update context when flavor changes
    if (selection.flavor !== selectedOptions.flavor) {
      setSelectedFlavor(selection.flavor);
    }
  };

  const resetSelections = () => {
    setQuantity(1);
    setSelectedOptions({});
    setResetTrigger((prev) => prev + 1);
    setSelectedFlavor(undefined);
  };

  const handleAddToCart = () => {
    // Validate that all required options are selected
    const isValid = validateProductSelection(product, selectedOptions);
    
    if (!isValid) {
      toast.error("Please select all required options");
      return;
    }

    // Find selected flavor image or use thumbnail
    let image = product.thumbnailImage || "/placeholder.svg";
    if (selectedOptions.flavor && product.flavours) {
      const selectedFlavorData = product.flavours.find(
        (f) => f.flavor === selectedOptions.flavor
      );
      if (selectedFlavorData?.flavorImage) {
        image = selectedFlavorData.flavorImage;
      }
    }

    // Create a unique ID for this cart item based on product ID and selected options
    const uniqueKey = `${product._id}-${selectedOptions.flavor || ""}-${
      selectedOptions.color || ""
    }-${selectedOptions.option || ""}-${selectedOptions.nicotineLevel || ""}`;

    const orderObject = {
      id: uniqueKey,
      productId: product._id,
      name: product.productName,
      price: product?.offer?.isActive
        ? product?.offer?.offerPrice
        : product.price,
      image: image,
      flavor: selectedOptions.flavor,
      color: selectedOptions.color,
      option: selectedOptions.option,
      nicotineLevel: selectedOptions.nicotineLevel,
      quantity: quantity, // Pass the quantity directly
    };
    
    // Add the item to cart with the specified quantity
    addToCart(orderObject);

    // Show success message
    toast.success(`Added ${quantity} ${product.productName} to cart`);

    // Open cart sheet
    setCartSheetOpen(true);

    // Reset after adding to cart
    resetSelections();
  };

  // Check if all required options are selected
  const isAddToCartDisabled = !validateProductSelection(product, selectedOptions);

  return (
    <div className="space-y-4">
      <ProductOptionsSelector
        productOptions={product}
        onSelectionChange={handleSelectionChange}
        resetTrigger={resetTrigger}
      />

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <Button
            onClick={() => handleQuantityChange(-1)}
            className="h-10 w-10"
            variant="outline"
            size="icon"
            disabled={quantity <= 1}
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
          className="flex-1 bg-black hover:bg-gray-800 text-white"
          disabled={isAddToCartDisabled}
        >
          ADD TO CART
        </Button>
      </div>
    </div>
  );
}