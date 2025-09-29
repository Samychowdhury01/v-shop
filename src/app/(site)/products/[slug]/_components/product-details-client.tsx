"use client";

import type React from "react";

import { useState, useRef } from "react";
import Image from "next/image";
import { ZoomIn } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Product } from "@/types/products";

export default function ProductDetailsClient({
  productData,
}: {
  productData: Product;
}) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const imageRef = useRef<HTMLDivElement>(null);

  const images = productData?.images;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (imageRef.current) {
      const rect = imageRef.current.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      setMousePosition({ x, y });
    }
  };

  return (
    <div className="space-y-4">
      <div
        ref={imageRef}
        className="relative aspect-square bg-gray-50 rounded-lg flex items-center justify-center group overflow-hidden"
        onMouseMove={handleMouseMove}
      >
        {productData.isOnSale && (
          <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold z-10">
            SALE
          </div>
        )}

        <img
          src={images[selectedImage] || "/placeholder.svg"}
          alt="Pod Salt 35K Disposable Vape"
          className="max-w-full max-h-full object-contain transition-transform duration-100 ease-out"
          style={{
            transform: `translate(${(mousePosition.x - 50) * 0.1}px, ${
              (mousePosition.y - 50) * 0.1
            }px)`,
          }}
        />

        <Dialog>
          <DialogTrigger asChild>
            <Button
              variant="secondary"
              size="sm"
              className="absolute bottom-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            >
              <ZoomIn className="h-4 w-4 mr-2" />
              <span className="text-sm">View Full Size</span>
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl">
            <img
              src={images[selectedImage] || "/placeholder.svg"}
              alt="Pod Salt 35K Disposable Vape - Full Size"
              className="w-full h-auto"
            />
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-4 gap-2">
        {images.map((image, index) => (
          <button
            key={index}
            onClick={() => setSelectedImage(index)}
            className={`aspect-square bg-gray-50 rounded border cursor-pointer hover:border-primary transition-colors duration-200 ${
              selectedImage === index
                ? "border-primary ring-2 ring-primary/20"
                : ""
            }`}
          >
            <img
              src={image || "/placeholder.svg"}
              alt={`Product view ${index + 1}`}
              className="w-full h-full object-contain p-2"
            />
          </button>
        ))}
      </div>
    </div>
  );
}
