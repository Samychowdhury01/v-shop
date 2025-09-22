export interface CartItem {
  id: string;
  productId: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  flavor?: string;
  color?: string;
  option?: string;
  nicotineLevel?: string;
}