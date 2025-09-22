import { Suspense } from "react";

import { PageBreadcrumb } from "../products/_components/page-breadcrumb";
import { CartLoading } from "./_components/cart-loading";
import { CartContent } from "./_components/cart-content";

export default function CartPage() {
  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "Cart", href: "/cart" },
  ];

  return (
    <div className="bg-white min-h-screen">
      <div className="container mx-auto px-4">
        <div className="p-5 mb-5">
          <PageBreadcrumb items={breadcrumbs} />
        </div>
        <Suspense fallback={<CartLoading />}>
          <CartContent />
        </Suspense>
      </div>
    </div>
  );
}