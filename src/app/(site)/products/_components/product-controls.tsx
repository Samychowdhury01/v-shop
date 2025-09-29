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
import { LayoutGrid, Grid, Grid3x2 } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export function ProductControls() {
  const [sortBy, setSortBy] = useState("latest");
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const viewType = searchParams.get("view") || "grid";

  const handleViewChange = (value: string) => {
    if (!value) return;

    const params = new URLSearchParams(searchParams);
    params.set("view", value);

    // Set columns based on view type
    const colsMap: Record<string, string> = {
      "grid-large": "2",
      grid: "3",
      list: "4",
    };

    params.set("cols", colsMap[value] || "3");

    router.push(`${pathname}?${params.toString()}`);
  };

  const handleSortChange = (value: string) => {
    setSortBy(value);
  };

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center ml-auto space-x-4">
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
            <Grid3x2 className="h-4 w-4" />
          </ToggleGroupItem>
          <ToggleGroupItem value="list" aria-label="List view" size="sm">
            <Grid className="h-4 w-4" />
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
