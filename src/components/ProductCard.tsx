import { Link } from 'react-router-dom';
import { ShoppingCart, Eye } from 'lucide-react';
import type { Product } from '@/types';
import { useCart } from '@/context/CartContext';
import { formatINR } from '@/lib/format';

export function ProductCard({ product }: { product: Product }) {
  const { addToCart } = useCart();
  const inStock = product.stock > 0;
  const discount = product.old_price
    ? Math.round(
        ((Number(product.old_price) - Number(product.price)) /
          Number(product.old_price)) *
          100,
      )
    : 0;

  return (
    <div className="group card overflow-hidden hover:shadow-lg hover:border-teal-200">
      <div className="relative aspect-square overflow-hidden bg-slate-50">
        <Link to={`/products/${product.slug}`}>
          <img
            src={product.image || ''}
            alt={product.name}
            className="h-full w-full object-contain p-4 transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
          />
        </Link>
        {discount > 0 && (
          <span className="absolute left-3 top-3 rounded-md bg-red-500 px-2 py-1 text-[11px] font-bold text-white shadow-sm">
            -{discount}%
          </span>
        )}
        {!inStock && (
          <span className="absolute left-3 top-3 rounded-md bg-slate-700 px-2 py-1 text-[11px] font-bold text-white">
            Out of stock
          </span>
        )}
        <div className="absolute right-3 top-3 flex flex-col gap-2 opacity-0 transition-opacity group-hover:opacity-100">
          <Link
            to={`/products/${product.slug}`}
            className="flex h-9 w-9 items-center justify-center rounded-lg bg-white shadow-md text-slate-700 transition-colors hover:bg-teal-50 hover:text-teal-700"
            aria-label="Quick view"
          >
            <Eye className="h-4 w-4" />
          </Link>
        </div>
      </div>

      <div className="p-4">
        <p className="mb-1 text-[11px] font-medium uppercase tracking-wide text-teal-600">
          {product.category}
        </p>
        <Link to={`/products/${product.slug}`}>
          <h3 className="line-clamp-2 text-sm font-semibold leading-snug text-slate-900 transition-colors hover:text-teal-700">
            {product.name}
          </h3>
        </Link>
        <p className="mt-1 line-clamp-2 text-xs text-slate-500">
          {product.description}
        </p>

        <div className="mt-3 flex items-center justify-between">
          <div className="flex items-baseline gap-1.5">
            <span className="text-base font-bold text-slate-900">
              {formatINR(Number(product.price))}
            </span>
            {product.old_price && (
              <span className="text-xs text-slate-400 line-through">
                {formatINR(Number(product.old_price))}
              </span>
            )}
          </div>
        </div>

        <button
          onClick={() => addToCart(product, 1)}
          disabled={!inStock}
          className="mt-3 flex w-full items-center justify-center gap-1.5 rounded-lg bg-slate-900 px-3 py-2 text-xs font-semibold text-white transition-all hover:bg-teal-700 disabled:cursor-not-allowed disabled:bg-slate-300"
        >
          <ShoppingCart className="h-3.5 w-3.5" />
          {inStock ? 'Add to Cart' : 'Unavailable'}
        </button>
      </div>
    </div>
  );
}
