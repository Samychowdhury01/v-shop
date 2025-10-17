import { OrderTrackingForm } from "./_components/order-tracking-form";

export default function OrderTrackingPage() {
  return (
    <div className="min-h-screen bg-background py-10">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center space-y-3">
          <h2 className="text-4xl font-bold text-foreground text-balance">
            Track Your Order
          </h2>
          <p className="text-muted-foreground text-lg">
            Enter your order ID to view real-time tracking information
          </p>
        </div>

        <OrderTrackingForm />
      </div>
    </div>
  );
}


