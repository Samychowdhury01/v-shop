"use client";
import React, { useState } from "react";
import { Button } from "./ui/button";
import { AddToCartModal } from "@/app/(site)/products/_components/add-to-cart-modal";
import { Product } from "@/types/products";
import { ShoppingCart } from "lucide-react";

const AddToCardButton = ({ product }: { product: Product }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  return (
    <>
      <Button
        onClick={handleModalOpen}
        className="absolute bottom-0 left-0 right-0 w-full z-10 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110"
        size="sm"
      >
        <ShoppingCart />
        <span> ADD TO CART</span>
      </Button>
      <AddToCartModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        product={product}
      />
    </>
  );
};

export default AddToCardButton;
