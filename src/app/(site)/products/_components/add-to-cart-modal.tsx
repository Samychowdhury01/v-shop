"use client"
import { useState } from "react";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Minus, Plus } from "lucide-react";
import { useCart } from "@/lib/provider/cart-context";
import {
  ProductOptionsSelector,
  validateProductSelection,
} from "./product-options-selector"
import { ProductSelection } from "./product-options-selector";
import { Product } from "@/types/products";

interface AddToCartModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: Product;
}

export function AddToCartModal({
  isOpen,
  onClose,
  product,
}: AddToCartModalProps) {
  const [quantity, setQuantity] = useState(1);
  const [productSelection, setProductSelection] = useState<ProductSelection>(
    {}
  );
  const [resetTrigger, setResetTrigger] = useState(0);
  const { addToCart, setCartSheetOpen } = useCart();

  const resetSelections = () => {
    setQuantity(1);
    setProductSelection({});
    setResetTrigger((prev) => prev + 1); // Trigger reset in child component
  };

  const handleSelectionChange = (selection: ProductSelection) => {
    setProductSelection(selection);
  };

  const handleAdd = () => {
    // Validate required selections
    const isValid = validateProductSelection(product, productSelection);

    if (!isValid) {
      alert("Please select all required options");
      return;
    }

    // Add the item to cart with the specified quantity
    for (let i = 0; i < quantity; i++) {
      addToCart({
        id: Math.random().toString(),
        productId: product._id,
        name: product.productName,
        price: product.price,
        image: product.thumbnailImage,
        flavor: productSelection.flavor,
        color: productSelection.color,
        option: productSelection.option,
        nicotineLevel: productSelection.nicotineLevel,
      });
    }

    onClose();
    resetSelections();
    setCartSheetOpen(true);
  };

 
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Add to Cart</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="flex items-center space-x-4">
            <div className="relative w-20 h-20">
              <Image
                src={product.thumbnailImage}
                alt={product.productName}
                fill
                className="object-cover rounded"
                sizes="80px"
              />
            </div>
            <div className="flex-1">
              <h3 className="font-medium text-gray-900">{product.productName}</h3>
              <p className="text-lg font-bold text-black">
                {product.price} AED
              </p>
            </div>
          </div>

          {/* Product Options Selector */}
          <ProductOptionsSelector
            productOptions={product}
            onSelectionChange={handleSelectionChange}
            resetTrigger={resetTrigger}
          />

          {/* Quantity Selection */}
          <div className="flex items-center justify-center space-x-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="h-10 w-10 p-0"
            >
              <Minus className="h-4 w-4" />
            </Button>
            <span className="w-12 text-center text-lg font-medium">
              {quantity}
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setQuantity(quantity + 1)}
              className="h-10 w-10 p-0"
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>

          <Button
            onClick={handleAdd}
            className="w-full bg-black hover:bg-gray-800 text-white"
          >
            Add to Cart
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
