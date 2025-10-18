
"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

interface ProductContextType {
  selectedFlavor: string | undefined;
  setSelectedFlavor: (flavor: string | undefined) => void;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export function ProductProvider({ children }: { children: ReactNode }) {
  const [selectedFlavor, setSelectedFlavor] = useState<string | undefined>();

  return (
    <ProductContext.Provider value={{ selectedFlavor, setSelectedFlavor }}>
      {children}
    </ProductContext.Provider>
  );
}

export function useProductContext() {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error("useProductContext must be used within a ProductProvider");
  }
  return context;
}