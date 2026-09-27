export interface Product {
  id: number;
  name: string;
  slug: string;
  category: string;
  subcategory: string | null;
  brand: string | null;
  sku: string | null;
  price: number;
  old_price: number | null;
  stock: number;
  image: string | null;
  description: string | null;
  specifications: Record<string, string>;
  featured: boolean;
  created_at: string;
  updated_at: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface OrderItemInput {
  product_id: number | null;
  product_name: string;
  product_image: string | null;
  unit_price: number;
  quantity: number;
  subtotal: number;
}

export interface OrderInput {
  order_number: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  payment_method: string;
  total_amount: number;
  items: OrderItemInput[];
}
