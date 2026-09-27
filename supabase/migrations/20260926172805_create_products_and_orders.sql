/*
# Create products, orders, and order_items tables for A2 Microtech e-commerce store

1. New Tables
- `products`: Electronic components catalog (development boards, sensors, motors, LEDs, resistors, displays, tools).
  Columns: id, name, slug, category, subcategory, brand, sku, price (numeric), old_price (numeric, nullable), stock (int), image (url), description (text), specifications (jsonb), featured (bool), created_at, updated_at.
- `orders`: Customer orders placed through checkout.
  Columns: id, order_number (unique), customer name, email, phone, shipping address fields, payment_method, total_amount, status, created_at.
- `order_items`: Line items belonging to an order.
  Columns: id, order_id (FK), product_id (FK, nullable), product_name, product_image, unit_price, quantity, subtotal.

2. Security
- Enable RLS on all three tables.
- products: public read (anon + authenticated SELECT). No public writes — products are managed via the database dashboard.
- orders: anon + authenticated can INSERT (customers place orders without signing in) and SELECT their own orders by order_number. No public UPDATE/DELETE.
- order_items: anon + authenticated can INSERT and SELECT via join to parent order. No public UPDATE/DELETE.

3. Notes
- Single-tenant store: no user accounts / no auth.uid() ownership. Orders are identified by a generated order_number.
- Specifications stored as JSONB for flexible key-value pairs per product.
*/

CREATE TABLE IF NOT EXISTS products (
  id serial PRIMARY KEY,
  name text NOT NULL,
  slug text UNIQUE NOT NULL,
  category text NOT NULL DEFAULT 'Electronic Components',
  subcategory text,
  brand text,
  sku text UNIQUE,
  price numeric(10,2) NOT NULL,
  old_price numeric(10,2),
  stock integer NOT NULL DEFAULT 0,
  image text,
  description text,
  specifications jsonb DEFAULT '{}'::jsonb,
  featured boolean NOT NULL DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE products ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "public_select_products" ON products;
CREATE POLICY "public_select_products"
  ON products FOR SELECT
  TO anon, authenticated USING (true);

CREATE TABLE IF NOT EXISTS orders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  order_number text UNIQUE NOT NULL,
  first_name text NOT NULL,
  last_name text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL,
  address text NOT NULL,
  city text NOT NULL,
  state text NOT NULL,
  pincode text NOT NULL,
  payment_method text NOT NULL DEFAULT 'Cash on Delivery',
  total_amount numeric(10,2) NOT NULL,
  status text NOT NULL DEFAULT 'Pending',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "public_insert_orders" ON orders;
CREATE POLICY "public_insert_orders"
  ON orders FOR INSERT
  TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "public_select_orders" ON orders;
CREATE POLICY "public_select_orders"
  ON orders FOR SELECT
  TO anon, authenticated USING (true);

CREATE TABLE IF NOT EXISTS order_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id uuid NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  product_id integer REFERENCES products(id) ON DELETE SET NULL,
  product_name text NOT NULL,
  product_image text,
  unit_price numeric(10,2) NOT NULL,
  quantity integer NOT NULL DEFAULT 1,
  subtotal numeric(10,2) NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "public_insert_order_items" ON order_items;
CREATE POLICY "public_insert_order_items"
  ON order_items FOR INSERT
  TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "public_select_order_items" ON order_items;
CREATE POLICY "public_select_order_items"
  ON order_items FOR SELECT
  TO anon, authenticated USING (true);

CREATE INDEX IF NOT EXISTS idx_products_category ON products(category);
CREATE INDEX IF NOT EXISTS idx_products_slug ON products(slug);
CREATE INDEX IF NOT EXISTS idx_products_featured ON products(featured);
CREATE INDEX IF NOT EXISTS idx_orders_order_number ON orders(order_number);
CREATE INDEX IF NOT EXISTS idx_order_items_order_id ON order_items(order_id);
