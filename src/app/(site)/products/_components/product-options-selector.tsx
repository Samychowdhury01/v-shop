"use client";

import { useState, useEffect } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface ProductOptionsSelectorProps {
  productOptions: ProductOptions;
  onSelectionChange: (selection: ProductSelection) => void;
  resetTrigger?: number;
}

export interface ProductOptions {
  flavors?: string[];
  colors?: string[];
  options?: string[];
  nicotineLevels?: string[];
}

export interface Product extends ProductOptions {
  id: string;
  name: string;
  price: number;
  image: string;
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
      {productOptions.flavors && productOptions.flavors.length > 0 && (
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">
            Flavors <span className="text-red-500">*</span>
          </label>
          <Select value={selectedFlavor} onValueChange={setSelectedFlavor}>
            <SelectTrigger>
              <SelectValue placeholder="Select a flavor" />
            </SelectTrigger>
            <SelectContent>
              {productOptions.flavors.map((flavor) => (
                <SelectItem key={flavor} value={flavor}>
                  {flavor}
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
  productOptions: ProductOptions,
  selection: ProductSelection
): boolean {
  return (
    (!productOptions.flavors ||
      productOptions.flavors.length === 0 ||
      !!selection.flavor) &&
    (!productOptions.colors ||
      productOptions.colors.length === 0 ||
      !!selection.color) &&
    (!productOptions.options ||
      productOptions.options.length === 0 ||
      !!selection.option) &&
    (!productOptions.nicotineLevels ||
      productOptions.nicotineLevels.length === 0 ||
      !!selection.nicotineLevel)
  );
}
