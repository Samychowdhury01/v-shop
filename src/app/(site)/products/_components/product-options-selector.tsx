"use client";

import { useState, useEffect } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Flavour, Product } from "@/types/products";

interface ProductOptionsSelectorProps {
  productOptions: Product;
  onSelectionChange: (selection: ProductSelection) => void;
  resetTrigger?: number;
}

export interface ProductOptions {
  flavors?: Flavour[];
  colors?: string[];
  options?: string[];
  nicotineLevels?: string[];
}

export interface ProductSelection {
  flavor?: string;
  color?: string;
  option?: string;
  nicotineLevel?: string;
}

export function ProductOptionsSelector({
  productOptions,
  onSelectionChange,
  resetTrigger = 0,
}: ProductOptionsSelectorProps) {
  const [selectedFlavor, setSelectedFlavor] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedOption, setSelectedOption] = useState("");
  const [selectedNicotineLevel, setSelectedNicotineLevel] = useState("");
console.log(productOptions, "opt")
  // Reset selections when resetTrigger changes
  useEffect(() => {
    if (resetTrigger > 0) {
      setSelectedFlavor("");
      setSelectedColor("");
      setSelectedOption("");
      setSelectedNicotineLevel("");
    }
  }, [resetTrigger]);

  // Notify parent of selection changes
  useEffect(() => {
    onSelectionChange({
      flavor: selectedFlavor || undefined,
      color: selectedColor || undefined,
      option: selectedOption || undefined,
      nicotineLevel: selectedNicotineLevel || undefined,
    });
  }, [selectedFlavor, selectedColor, selectedOption, selectedNicotineLevel]);

  return (
    <div className="space-y-4">
      {/* Flavor Selection */}
      {productOptions.flavours && productOptions.flavours.length > 0 && (
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">
            Flavors <span className="text-red-500">*</span>
          </label>
          <Select value={selectedFlavor} onValueChange={setSelectedFlavor}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select a flavor" />
            </SelectTrigger>
            <SelectContent className="w-full">
              {productOptions.flavours.map((flavor) => (
                <SelectItem key={flavor.flavor} value={flavor.flavor}>
                  {flavor.flavor}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}

      {/* Color Selection */}
      {productOptions.colors && productOptions.colors.length > 0 && (
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">
            Colors <span className="text-red-500">*</span>
          </label>
          <Select value={selectedColor} onValueChange={setSelectedColor}>
            <SelectTrigger>
              <SelectValue placeholder="Select a color" />
            </SelectTrigger>
            <SelectContent>
              {productOptions.colors.map((color) => (
                <SelectItem key={color} value={color}>
                  {color}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}

      {/* Options Selection */}
      {productOptions.options && productOptions.options.length > 0 && (
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">
            Options <span className="text-red-500">*</span>
          </label>
          <Select value={selectedOption} onValueChange={setSelectedOption}>
            <SelectTrigger>
              <SelectValue placeholder="Select an option" />
            </SelectTrigger>
            <SelectContent>
              {productOptions.options.map((option) => (
                <SelectItem key={option} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}

      {/* Nicotine Level Selection */}
      {productOptions.nicotineLevels &&
        productOptions.nicotineLevels.length > 0 && (
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">
              Nicotine Level <span className="text-red-500">*</span>
            </label>
            <Select
              value={selectedNicotineLevel}
              onValueChange={setSelectedNicotineLevel}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select nicotine level" />
              </SelectTrigger>
              <SelectContent>
                {productOptions.nicotineLevels.map((level) => (
                  <SelectItem key={level} value={level}>
                    {level}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}
    </div>
  );
}

// Export validation utility
export function validateProductSelection(
  product: Product,
  selection: ProductSelection
): boolean {
  return (
    (!product.flavours ||
      product.flavours.length === 0 ||
      !!selection.flavor) &&
    (!product.colors ||
      product.colors.length === 0 ||
      !!selection.color) &&
    (!product.options ||
      product.options.length === 0 ||
      !!selection.option) &&
    (!product.nicotineLevels ||
      product.nicotineLevels.length === 0 ||
      !!selection.nicotineLevel)
  );
}
