import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Shield, Truck, Award, Package } from "lucide-react";
import { ProductCard } from "@/components/product-card";
import { fetchProducts } from "@/lib/utils/fetch-products";

export default async function HomePage() {
   const products = await fetchProducts();
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Banner */}
      <section className="relative h-[70vh] min-h-[500px] flex items-center justify-center overflow-hidden bg-white">
        <Image
          src="/home/homeBanner.png"
          alt="Premium vape products"
          fill
          className="object-cover"
          priority
        />
      </section>

      {/* Featured Products */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Featured Products
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Explore our handpicked selection of premium devices and
              accessories
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.slice(0, 4).map((product, index) => (
              <ProductCard product={product} key={product.slug}/>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button size="lg" variant="outline">
              View All Products
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>


      {/* Why Choose Us */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-black mb-4">
              Why Choose VapeTrack
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              We're committed to providing the best vaping experience
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Shield,
                title: "Authentic Products",
                description:
                  "100% genuine products from authorized distributors",
              },
              {
                icon: Truck,
                title: "Fast Shipping",
                description:
                  "Free shipping on orders over $50. Track every step",
              },
              {
                icon: Award,
                title: "Premium Quality",
                description: "Carefully curated selection of top-tier brands",
              },
              {
                icon: Package,
                title: "Easy Returns",
                description: "30-day hassle-free return policy on all products",
              },
            ].map((feature, index) => (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-black text-white mb-4">
                  <feature.icon className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-bold text-black mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              What Our Customers Say
            </h2>
            <p className="text-muted-foreground text-lg">
              Trusted by thousands of satisfied customers
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                name: "Alex Johnson",
                review:
                  "Best vape shop I've ever used. Fast shipping and authentic products every time.",
                rating: 5,
              },
              {
                name: "Sarah Mitchell",
                review:
                  "The customer service is outstanding. They helped me find the perfect device for my needs.",
                rating: 5,
              },
              {
                name: "Mike Chen",
                review:
                  "Great prices and amazing selection. The order tracking feature is super convenient.",
                rating: 5,
              },
            ].map((testimonial, index) => (
              <div
                key={index}
                className="bg-card border border-border rounded-lg p-6"
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <span key={i} className="text-foreground">
                      ★
                    </span>
                  ))}
                </div>
                <p className="text-foreground mb-4 text-pretty">
                  "{testimonial.review}"
                </p>
                <p className="font-semibold text-foreground">
                  {testimonial.name}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
