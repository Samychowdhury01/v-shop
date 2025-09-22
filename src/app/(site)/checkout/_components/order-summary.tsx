import { UseFormReturn } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { CartItem, CheckoutFormData } from "@/schemas/checkout";

interface OrderSummaryProps {
  form: UseFormReturn<CheckoutFormData>;
  orderItems: CartItem[];
  subtotal: number;
  deliveryCharge: number;
  total: number;
}

export function OrderSummary({
  form,
  orderItems,
  subtotal,
  deliveryCharge,
  total,
}: OrderSummaryProps) {
  return (
    <div className="bg-gray-50 p-6 rounded-lg">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">YOUR ORDER</h2>

      {/* Order Items Header */}
      <div className="flex justify-between items-center pb-4 border-b border-gray-200 text-sm font-medium text-gray-700 uppercase tracking-wide">
        <span>PRODUCT</span>
        <span>SUBTOTAL</span>
      </div>

      {/* Order Items */}
      <div className="space-y-3 mt-4">
        {orderItems.map((item) => (
          <div
            key={item.id}
            className="flex justify-between items-center text-sm"
          >
            <div className="flex-1">
              <span className="text-gray-900">{item.name}</span>
              <span className="text-gray-500 ml-2">× {item.quantity}</span>
            </div>
            <span className="font-medium">
              {item.price * item.quantity} AED
            </span>
          </div>
        ))}
      </div>

      {/* Totals */}
      <div className="space-y-3 mt-6 pt-4 border-t border-gray-200">
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Shipping</span>
          <div className="text-right">
            <div className="text-gray-900">
              Delivery Charge:{" "}
              <span className="text-red-600 font-medium">
                {deliveryCharge} AED
              </span>
            </div>
          </div>
        </div>

        <div className="flex justify-between text-lg font-semibold pt-2 border-t border-gray-200">
          <span>Total</span>
          <span className="text-red-600">{total} AED</span>
        </div>
      </div>

      {/* Payment Method */}
      <div className="mt-6 pt-6 border-t border-gray-200">
        <div className="flex items-center space-x-2">
          <span className="text-sm font-medium">Cash on delivery</span>
        </div>
        <p className="text-sm text-gray-600 mt-3">
          Pay with cash upon delivery.
        </p>
      </div>

      {/* Privacy Policy */}
      <div className="mt-6 pt-6 border-t border-gray-200">
        <p className="text-xs text-gray-600 leading-relaxed">
          Your personal data will be used to process your order, support your
          experience throughout this website, and for other purposes described
          in our{" "}
          <a href="#" className="text-blue-600 hover:text-blue-800 underline">
            privacy policy
          </a>
          .
        </p>
      </div>

      {/* Terms and Conditions */}
      <div className="mt-4">
        <FormField
          control={form.control}
          name="agreeToTerms"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  className="mt-1"
                />
              </FormControl>
              <FormLabel className="text-sm text-gray-700 leading-relaxed font-normal">
                I have read and agree to the website{" "}
                <a
                  href="#"
                  className="text-blue-600 hover:text-blue-800 underline"
                >
                  terms and conditions
                </a>{" "}
                *
              </FormLabel>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      {/* Place Order Button */}
      <Button
        type="submit"
        variant={"default"}
        className="w-full mt-6 text-white py-3 text-sm font-medium uppercase tracking-wide"
      >
        PLACE ORDER
      </Button>
    </div>
  );
}