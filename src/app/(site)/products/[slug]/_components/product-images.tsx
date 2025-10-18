"use client";

import type React from "react";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { ZoomIn, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";
import type { Product } from "@/types/products";
import { useProductContext } from "@/lib/provider/product-context";

interface ProductImagesProps {
  productData: Product;
}

export default function ProductImages({ productData }: ProductImagesProps) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [currentDisplayImage, setCurrentDisplayImage] = useState<string>("");
  const [thumbnailImages, setThumbnailImages] = useState<string[]>([]);
  const [manuallySelected, setManuallySelected] = useState(false);
  const imageRef = useRef<HTMLDivElement>(null);
  const { selectedFlavor } = useProductContext();

  // Build thumbnail gallery - this stays constant
  useEffect(() => {
    let thumbnails: string[] = [];

    if (productData.thumbnailImage) {
      thumbnails.push(productData.thumbnailImage);
    }

    if (productData?.flavours && productData?.flavours.length > 0) {
      const flavorImages = productData?.flavours
        .map((f) => f.flavorImage)
        .filter(
          (img): img is string => !!img && img !== productData.thumbnailImage
        );

      thumbnails = [...thumbnails, ...flavorImages];
    }

    // Fallback to placeholder if no images
    if (thumbnails.length === 0) {
      thumbnails = ["/placeholder.svg"];
    }

    setThumbnailImages(thumbnails);
  }, [productData?.flavours, productData.thumbnailImage]);

  // Handle flavor selection
  useEffect(() => {
    if (selectedFlavor && productData?.flavours && !manuallySelected) {
      // Find the selected flavor and use its image
      const selectedFlavorData = productData?.flavours.find(
        (f) => f.flavor === selectedFlavor
      );
      if (selectedFlavorData?.flavorImage) {
        const thumbIndex = thumbnailImages.findIndex(
          (img) => img === selectedFlavorData.flavorImage
        );
        if (thumbIndex !== -1) {
          setSelectedImage(thumbIndex);
          setCurrentDisplayImage(selectedFlavorData.flavorImage);
        }
      }
    }
  }, [
    selectedFlavor,
    productData?.flavours,
    thumbnailImages,
    manuallySelected,
  ]);

  // Update display image based on selected index
  useEffect(() => {
    const displayImage =
      thumbnailImages[selectedImage] ||
      thumbnailImages[0] ||
      "/placeholder.svg";
    setCurrentDisplayImage(displayImage);
  }, [selectedImage, thumbnailImages]);

  // Reset manual selection when flavor changes
  useEffect(() => {
    setManuallySelected(false);
  }, [selectedFlavor]);

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
    setManuallySelected(true);
  };

  const handlePrevImage = () => {
    const newIndex =
      selectedImage === 0 ? thumbnailImages.length - 1 : selectedImage - 1;
    setSelectedImage(newIndex);
    setManuallySelected(true);
  };

  const handleNextImage = () => {
    const newIndex =
      selectedImage === thumbnailImages.length - 1 ? 0 : selectedImage + 1;
    setSelectedImage(newIndex);
    setManuallySelected(true);
  };

  return (
    <div className="space-y-4">
      <div className="relative flex items-center justify-center gap-2">
        {thumbnailImages.length > 1 && (
          <Button
            variant="ghost"
            size="icon"
            onClick={handlePrevImage}
            className="absolute left-0 z-10 h-10 w-10 rounded-full bg-white/80 hover:bg-white shadow-md cursor-pointer"
            aria-label="Previous image"
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>
        )}

        <div
          ref={imageRef}
          className="relative aspect-square bg-gray-50 rounded-lg flex items-center justify-center group overflow-hidden w-full"
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
              transform: `scale(1.1) translate(${
                (mousePosition.x - 50) * 0.2
              }px, ${(mousePosition.y - 50) * 0.2}px)`,
            }}
          >
            <Image
              src={currentDisplayImage || "/placeholder.svg"}
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
                  src={currentDisplayImage || "/placeholder.svg"}
                  alt={`${productData.productName} - Full Size`}
                  fill
                  className="object-contain"
                  sizes="(max-width: 1200px) 100vw, 1200px"
                />
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {thumbnailImages.length > 1 && (
          <Button
            variant="ghost"
            size="icon"
            onClick={handleNextImage}
            className="absolute right-0 z-10 h-10 w-10 rounded-full bg-white/80 hover:bg-white shadow-md cursor-pointer"
            aria-label="Next image"
          >
            <ChevronRight className="h-5 w-5" />
          </Button>
        )}
      </div>

      {thumbnailImages.length > 1 && (
        <div className="px-12">
          <Carousel className="w-full">
          <CarouselContent className="-ml-2 md:-ml-4">
            {thumbnailImages.map((image, index) => (
              <CarouselItem
                key={`${image}-${index}`}
                className="pl-2 md:pl-4 basis-1/4 md:basis-1/5"
              >
                <button
                  onClick={() => handleThumbnailClick(index)}
                  className={`relative w-full aspect-square bg-gray-50 rounded border cursor-pointer hover:border-primary transition-colors duration-200 ${
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
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden md:flex" />
          <CarouselNext className="hidden md:flex" />
        </Carousel>
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
