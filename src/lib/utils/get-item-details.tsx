import { CartItem } from "@/schemas/cart";


export function getItemDetails(item: CartItem): string {
  const details = [];
  if (item.flavor) details.push(`Flavor: ${item.flavor}`);
  if (item.color) details.push(`Color: ${item.color}`);
  if (item.option) details.push(`Option: ${item.option}`);
  if (item.nicotineLevel) details.push(`Nicotine: ${item.nicotineLevel}`);
  return details.join(" • ");
}