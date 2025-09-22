"use client";

import { Button } from "@/components/ui/button";
import { TableCell, TableRow } from "@/components/ui/table";
import { getItemDetails } from "@/lib/utils/get-item-details";
import { CartItem } from "@/schemas/cart";
import { X } from "lucide-react";
import Image from "next/image";
import { QuantitySelector } from "./quantity-selector";

interface CartTableRowProps {
  item: CartItem;
  updateQuantity: (id: string, quantity: number) => void;
  removeItem: (id: string) => void;
}

export function CartTableRow({
  item,
  updateQuantity,
  removeItem,
}: CartTableRowProps) {
  return (
    <TableRow className="hover:bg-gray-50 transition-colors">
      <TableCell className="py-6">
        <div className="flex items-center space-x-4">
          <div className="relative w-20 h-20 flex-shrink-0">
            <Image
              src={item.image}
              alt={item.name}
              fill
              sizes="80px"
              className="w-full h-full object-cover rounded border"
            />
          </div>
          <div className="flex-1">
            <h3 className="text-sm font-medium text-gray-900 leading-tight mb-1">
              {item.name}
            </h3>
            {getItemDetails(item) && (
              <p className="text-xs text-gray-500">{getItemDetails(item)}</p>
            )}
          </div>
        </div>
      </TableCell>

      <TableCell className="text-center">
        <span className="text-sm text-gray-600 font-medium">
          {item.price} AED
        </span>
      </TableCell>

      <TableCell className="text-center">
        <QuantitySelector
          quantity={item.quantity}
          onQuantityChange={(quantity) => updateQuantity(item.id, quantity)}
        />
      </TableCell>

      <TableCell className="text-center">
        <span className="text-sm font-semibold ">
          {item.price * item.quantity} AED
        </span>
      </TableCell>

      <TableCell className="text-center">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => removeItem(item.id)}
          className="h-8 w-8 p-0 text-gray-400 hover:text-red-600 hover:bg-red-50 transition-colors"
        >
          <X className="h-4 w-4" />
        </Button>
      </TableCell>
    </TableRow>
  );
}
