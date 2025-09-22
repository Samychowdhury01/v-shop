"use client";

import { Button } from "@/components/ui/button";
import { Minus, Plus } from "lucide-react";

interface QuantitySelectorProps {
  quantity: number;
  onQuantityChange: (quantity: number) => void;
}

export function QuantitySelector({ quantity, onQuantityChange }: QuantitySelectorProps) {
  return (
    <div className="flex items-center justify-center">
      <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onQuantityChange(quantity - 1)}
          className="h-10 w-10 p-0 hover:bg-gray-100 rounded-none border-r"
        >
          <Minus className="h-4 w-4" />
        </Button>
        <input
          type="number"
          value={quantity}
          onChange={(e) => {
            const value = parseInt(e.target.value) || 1;
            onQuantityChange(Math.max(1, value));
          }}
          className="w-16 h-10 text-center text-sm border-0 focus:ring-0 focus:outline-none bg-white"
          min="1"
        />
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onQuantityChange(quantity + 1)}
          className="h-10 w-10 p-0 hover:bg-gray-100 rounded-none border-l"
        >
          <Plus className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}