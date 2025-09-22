"use client";

import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { LayoutGrid, Grid, List } from "lucide-react";

export function ProductControls() {
  const [itemsPerPage, setItemsPerPage] = useState("18");
  const [viewType, setViewType] = useState("grid");
  const [sortBy, setSortBy] = useState("latest");

  const handleItemsPerPageChange = (value: string) => {
    setItemsPerPage(value);
  };

  const handleViewChange = (value: string) => {
    if (value) {
      setViewType(value);
    }
  };

  const handleSortChange = (value: string) => {
    setSortBy(value);
  };

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center space-x-4">
        <span className="text-sm text-gray-600">Show:</span>
        <ToggleGroup
          type="single"
          value={itemsPerPage}
          onValueChange={handleItemsPerPageChange}
          className="flex items-center space-x-1"
        >
          {["9", "12", "18", "24"].map((num) => (
            <ToggleGroupItem
              key={num}
              value={num}
              aria-label={`Show ${num} items`}
              className="px-3 py-1 text-sm data-[state=on]:bg-gray-700 data-[state=on]:text-white"
            >
              {num}
            </ToggleGroupItem>
          ))}
        </ToggleGroup>
      </div>

      <div className="flex items-center space-x-4">
        <ToggleGroup
          type="single"
          value={viewType}
          onValueChange={handleViewChange}
          className="flex items-center"
        >
          <ToggleGroupItem
            value="grid-large"
            aria-label="Large grid view"
            size="sm"
          >
            <LayoutGrid className="h-4 w-4" />
          </ToggleGroupItem>
          <ToggleGroupItem value="grid" aria-label="Grid view" size="sm">
            <Grid className="h-4 w-4" />
          </ToggleGroupItem>
          <ToggleGroupItem value="list" aria-label="List view" size="sm">
            <List className="h-4 w-4" />
          </ToggleGroupItem>
        </ToggleGroup>

        <Select value={sortBy} onValueChange={handleSortChange}>
          <SelectTrigger className="w-[180px] h-8 text-sm">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="latest">Sort by latest</SelectItem>
            <SelectItem value="price-low-high">
              Sort by price: low to high
            </SelectItem>
            <SelectItem value="price-high-low">
              Sort by price: high to low
            </SelectItem>
            <SelectItem value="popularity">Sort by popularity</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
