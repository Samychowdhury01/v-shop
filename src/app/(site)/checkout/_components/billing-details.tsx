import { UseFormReturn } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { CheckoutFormData } from "@/schemas/checkout";


interface BillingDetailsProps {
  form: UseFormReturn<CheckoutFormData>;
}

export function BillingDetails({ form }: BillingDetailsProps) {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">
        BILLING DETAILS
      </h2>

      <div className="space-y-4">
        {/* Name Fields */}
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>First name *</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Last name *</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Company Name */}
        <FormField
          control={form.control}
          name="companyName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Company name (optional)</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Country */}
        <FormField
          control={form.control}
          name="country"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Country / Region *</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Street Address */}
        <FormField
          control={form.control}
          name="streetAddress"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Street address *</FormLabel>
              <FormControl>
                <Input
                  placeholder="House number and street name"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Town/City */}
        <FormField
          control={form.control}
          name="townCity"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Town / City *</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* State/County */}
        <FormField
          control={form.control}
          name="stateCounty"
          render={({ field }) => (
            <FormItem>
              <FormLabel>State / County (optional)</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Phone */}
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone *</FormLabel>
              <FormControl>
                <Input type="tel" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Email */}
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email address *</FormLabel>
              <FormControl>
                <Input type="email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Ship to Different Address */}
        <FormField
          control={form.control}
          name="shipToDifferentAddress"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <FormLabel className="font-normal">
                Ship to a different address?
              </FormLabel>
            </FormItem>
          )}
        />

        {/* Order Notes */}
        <FormField
          control={form.control}
          name="orderNotes"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Order notes (optional)</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Notes about your order, e.g. special notes for delivery."
                  className="min-h-[100px]"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
}