import { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import {
  ChevronRight,
  ShoppingCart,
  Minus,
  Plus,
  Truck,
  ShieldCheck,
  Check,
  ArrowLeft,
  MessageCircle,
} from 'lucide-react';
import { supabase } from '@/lib/supabase';
import type { Product } from '@/types';
import { useCart } from '@/context/CartContext';
import { formatINR } from '@/lib/format';
import { COMPANY } from '@/lib/company';
import { ProductCard } from '@/components/ProductCard';

export function ProductDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { addToCart, openCart } = useCart();
  const [product, setProduct] = useState<Product | null>(null);
  const [related, setRelated] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    (async () => {
      setLoading(true);
      setAdded(false);
      setQuantity(1);
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('slug', slug)
        .maybeSingle();

      if (error || !data) {
        setProduct(null);
        setLoading(false);
        return;
      }

      const prod = data as Product;
      setProduct(prod);

      const { data: relData } = await supabase
        .from('products')
        .select('*')
        .eq('category', prod.category)
        .neq('id', prod.id)
        .limit(4);
      if (relData) setRelated(relData as Product[]);

      setLoading(false);
    })();
  }, [slug]);

  const handleAddToCart = () => {
    if (!product) return;
    addToCart(product, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const handleBuyNow = () => {
    if (!product) return;
    addToCart(product, quantity);
    navigate('/checkout');
  };

  if (loading) {
    return (
      <div className="container-app py-20">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
          <div className="aspect-square animate-pulse rounded-2xl bg-slate-200" />
          <div className="space-y-4">
            <div className="h-8 w-3/4 animate-pulse rounded-lg bg-slate-200" />
            <div className="h-4 w-1/2 animate-pulse rounded-lg bg-slate-200" />
            <div className="h-32 w-full animate-pulse rounded-lg bg-slate-200" />
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container-app flex flex-col items-center justify-center py-20 text-center">
        <h1 className="text-2xl font-bold text-slate-900">Product not found</h1>
        <p className="mt-2 text-sm text-slate-500">
          The product you are looking for does not exist or has been removed.
        </p>
        <Link to="/products" className="mt-6 btn-primary">
          <ArrowLeft className="h-4 w-4" />
          Back to Products
        </Link>
      </div>
    );
  }

  const inStock = product.stock > 0;
  const discount = product.old_price
    ? Math.round(
        ((Number(product.old_price) - Number(product.price)) /
          Number(product.old_price)) *
          100,
      )
    : 0;

  const specEntries = Object.entries(product.specifications || {});
  const waText = `Hi, I'm interested in: ${product.name} (${formatINR(
    Number(product.price),
  )})`;
  const waLink = `https://wa.me/${COMPANY.whatsapp}?text=${encodeURIComponent(
    waText,
  )}`;

  return (
    <div className="animate-fade-in min-h-screen bg-slate-50">
      {/* Breadcrumb */}
      <div className="border-b border-slate-200 bg-white">
        <div className="container-app flex items-center gap-1.5 py-3 text-xs text-slate-500">
          <Link to="/" className="hover:text-teal-700">
            Home
          </Link>
          <ChevronRight className="h-3.5 w-3.5" />
          <Link to="/products" className="hover:text-teal-700">
            Products
          </Link>
          <ChevronRight className="h-3.5 w-3.5" />
          <Link
            to={`/products?category=${encodeURIComponent(product.category)}`}
            className="hover:text-teal-700"
          >
            {product.category}
          </Link>
          <ChevronRight className="h-3.5 w-3.5" />
          <span className="font-medium text-slate-700 line-clamp-1">
            {product.name}
          </span>
        </div>
      </div>

      <div className="container-app py-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          {/* Image */}
          <div className="lg:sticky lg:top-24 lg:self-start">
            <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-8">
              <img
                src={product.image || ''}
                alt={product.name}
                className="aspect-square w-full object-contain"
              />
              {discount > 0 && (
                <span className="absolute left-4 top-4 rounded-md bg-red-500 px-2.5 py-1 text-sm font-bold text-white shadow-sm">
                  -{discount}%
                </span>
              )}
            </div>
          </div>

          {/* Info */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-teal-600">
              {product.category}
              {product.subcategory ? ` · ${product.subcategory}` : ''}
            </p>
            <h1 className="mt-2 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              {product.name}
            </h1>

            {product.brand && (
              <p className="mt-2 text-sm text-slate-500">
                Brand: <span className="font-medium text-slate-700">{product.brand}</span>
                {product.sku && (
                  <>
                    {' · '}SKU: <span className="font-medium text-slate-700">{product.sku}</span>
                  </>
                )}
              </p>
            )}

            <div className="mt-4 flex items-baseline gap-3">
              <span className="text-3xl font-bold text-slate-900">
                {formatINR(Number(product.price))}
              </span>
              {product.old_price && (
                <span className="text-lg text-slate-400 line-through">
                  {formatINR(Number(product.old_price))}
                </span>
              )}
              {discount > 0 && (
                <span className="rounded-md bg-red-50 px-2 py-0.5 text-xs font-bold text-red-600">
                  Save {discount}%
                </span>
              )}
            </div>

            <div className="mt-3 flex items-center gap-2">
              {inStock ? (
                <span className="inline-flex items-center gap-1.5 rounded-md bg-green-50 px-2.5 py-1 text-xs font-semibold text-green-700">
                  <Check className="h-3.5 w-3.5" />
                  In Stock ({product.stock} available)
                </span>
              ) : (
                <span className="rounded-md bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-500">
                  Out of Stock
                </span>
              )}
            </div>

            <p className="mt-5 text-sm leading-relaxed text-slate-600">
              {product.description}
            </p>

            {/* Quantity + actions */}
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <div className="flex items-center rounded-lg border border-slate-300 bg-white">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="flex h-11 w-11 items-center justify-center text-slate-600 hover:text-teal-700"
                >
                  <Minus className="h-4 w-4" />
                </button>
                <span className="w-12 text-center text-base font-bold">
                  {quantity}
                </span>
                <button
                  onClick={() =>
                    setQuantity((q) => Math.min(product.stock || 99, q + 1))
                  }
                  className="flex h-11 w-11 items-center justify-center text-slate-600 hover:text-teal-700"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>

              <button
                onClick={handleAddToCart}
                disabled={!inStock}
                className="btn-secondary disabled:opacity-50"
              >
                {added ? (
                  <>
                    <Check className="h-4 w-4 text-green-600" />
                    Added!
                  </>
                ) : (
                  <>
                    <ShoppingCart className="h-4 w-4" />
                    Add to Cart
                  </>
                )}
              </button>

              <button
                onClick={handleBuyNow}
                disabled={!inStock}
                className="btn-primary disabled:opacity-50"
              >
                Buy Now
              </button>

              <a
                href={waLink}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 rounded-lg border border-green-200 bg-green-50 px-4 py-2.5 text-sm font-semibold text-green-700 hover:bg-green-100"
              >
                <MessageCircle className="h-4 w-4" />
                WhatsApp
              </a>
            </div>

            <button
              onClick={openCart}
              className="mt-2 text-xs font-medium text-teal-600 hover:text-teal-700"
            >
              View cart →
            </button>

            {/* Trust badges */}
            <div className="mt-6 grid grid-cols-2 gap-3 rounded-xl border border-slate-200 bg-white p-4">
              <div className="flex items-center gap-2">
                <Truck className="h-5 w-5 text-teal-600" />
                <span className="text-xs text-slate-600">Fast delivery across India</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-5 w-5 text-teal-600" />
                <span className="text-xs text-slate-600">Quality assured products</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="h-5 w-5 text-teal-600" />
                <span className="text-xs text-slate-600">Cash on Delivery</span>
              </div>
              <div className="flex items-center gap-2">
                <MessageCircle className="h-5 w-5 text-teal-600" />
                <span className="text-xs text-slate-600">WhatsApp support</span>
              </div>
            </div>

            {/* Specifications */}
            {specEntries.length > 0 && (
              <div className="mt-8">
                <h2 className="mb-3 text-lg font-bold text-slate-900">
                  Specifications
                </h2>
                <dl className="overflow-hidden rounded-xl border border-slate-200">
                  {specEntries.map(([key, value], i) => (
                    <div
                      key={key}
                      className={`flex justify-between gap-4 px-4 py-3 text-sm ${
                        i % 2 === 0 ? 'bg-white' : 'bg-slate-50'
                      }`}
                    >
                      <dt className="font-medium text-slate-600">{key}</dt>
                      <dd className="text-right text-slate-900">{value}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            )}
          </div>
        </div>

        {/* Related products */}
        {related.length > 0 && (
          <div className="mt-16">
            <h2 className="mb-6 text-xl font-bold text-slate-900">
              Related Products
            </h2>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
              {related.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
