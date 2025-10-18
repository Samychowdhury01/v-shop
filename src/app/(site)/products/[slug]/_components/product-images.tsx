"use client";

import type React from "react";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { ZoomIn } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Product } from "@/types/products";
import { useProductContext } from "@/lib/provider/product-context";

interface ProductImagesProps {
  productData: Product;
}

export default function ProductImages({ productData }: ProductImagesProps) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [currentDisplayImage, setCurrentDisplayImage] = useState<string>("");
  const [thumbnailImages, setThumbnailImages] = useState<string[]>([]);
  const imageRef = useRef<HTMLDivElement>(null);
  const { selectedFlavor } = useProductContext();

  // Build thumbnail gallery - this stays constant
  useEffect(() => {
    let thumbnails: string[] = [];

    if (productData.thumbnailImage) {
      thumbnails.push(productData.thumbnailImage);
    }
    
    // Add flavor images for the gallery view
    if (productData.flavours && productData.flavours.length > 0) {
      const flavorImages = productData.flavours
        .slice(0, productData.thumbnailImage ? 3 : 4) // 3 more if thumbnail exists, else 4
        .map((f) => f.flavorImage)
        .filter((img): img is string => !!img && img !== productData.thumbnailImage);
      
      thumbnails = [...thumbnails, ...flavorImages];
    }

    // Fallback to placeholder if no images
    if (thumbnails.length === 0) {
      thumbnails = ["/placeholder.svg"];
    }

    setThumbnailImages(thumbnails);
  }, [productData.flavours, productData.thumbnailImage]);

  // Update display image based on selected flavor or selected thumbnail
  useEffect(() => {
    let displayImage = "";

    if (selectedFlavor && productData.flavours) {
      // Find the selected flavor and use its image
      const selectedFlavorData = productData.flavours.find(
        (f) => f.flavor === selectedFlavor
      );
      if (selectedFlavorData?.flavorImage) {
        displayImage = selectedFlavorData.flavorImage;
        // Find this image in thumbnails and set as selected
        const thumbIndex = thumbnailImages.indexOf(displayImage);
        if (thumbIndex !== -1) {
          setSelectedImage(thumbIndex);
        }
      }
    } else {
      // When no flavor is selected, use the selected thumbnail image
      displayImage = thumbnailImages[selectedImage] || thumbnailImages[0] || "/placeholder.svg";
    }

    setCurrentDisplayImage(displayImage || "/placeholder.svg");
  }, [selectedFlavor, productData.flavours, thumbnailImages, selectedImage]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (imageRef.current) {
      const rect = imageRef.current.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      setMousePosition({ x, y });
    }
  };

  const handleMouseLeave = () => {
    setMousePosition({ x: 50, y: 50 }); // Reset to center
  };

  const handleThumbnailClick = (index: number) => {
    setSelectedImage(index);
    // If a flavor is selected, this click should clear it
    // so user can browse through thumbnails freely
  };

  return (
    <div className="space-y-4">
      <div
        ref={imageRef}
        className="relative aspect-square bg-gray-50 rounded-lg flex items-center justify-center group overflow-hidden"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        {productData.offer?.isActive && (
          <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold z-10">
            SALE
          </div>
        )}

        <div
          className="relative w-full h-full transition-transform duration-100 ease-out"
          style={{
            transform: `scale(1.1) translate(${(mousePosition.x - 50) * 0.2}px, ${
              (mousePosition.y - 50) * 0.2
            }px)`,
          }}
        >
          <Image
            src={currentDisplayImage}
            alt={selectedFlavor || productData.productName || "Product Image"}
            fill
            className="object-contain"
            sizes="(max-width: 768px) 100vw, 50vw"
            priority
          />
        </div>

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
            <div className="relative w-full aspect-square">
              <Image
                src={currentDisplayImage}
                alt={`${productData.productName} - Full Size`}
                fill
                className="object-contain"
                sizes="(max-width: 1200px) 100vw, 1200px"
              />
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Always show thumbnails if there are multiple images */}
      {thumbnailImages.length > 1 && (
        <div className="grid grid-cols-4 gap-2">
          {thumbnailImages.map((image, index) => (
            <button
              key={`${image}-${index}`}
              onClick={() => handleThumbnailClick(index)}
              className={`relative aspect-square bg-gray-50 rounded border cursor-pointer hover:border-primary transition-colors duration-200 ${
                selectedImage === index
                  ? "border-primary ring-2 ring-primary/20"
                  : ""
              }`}
            >
              <Image
                src={image || "/placeholder.svg"}
                alt={`Product view ${index + 1}`}
                fill
                className="object-contain p-2"
                sizes="(max-width: 768px) 25vw, 10vw"
              />
            </button>
          ))}
        </div>
      )}

      {/* Show flavor preview when selected */}
      {selectedFlavor && (
        <div className="text-center text-sm text-gray-600">
          Selected Flavor: <span className="font-medium">{selectedFlavor}</span>
        </div>
      )}
    </div>
  );
}