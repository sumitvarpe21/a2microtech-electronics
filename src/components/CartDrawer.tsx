import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  X,
  Plus,
  Minus,
  Trash2,
  ShoppingBag,
  ArrowRight,
} from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { formatINR } from '@/lib/format';
import { COMPANY } from '@/lib/company';

export function CartDrawer() {
  const {
    items,
    isOpen,
    closeCart,
    updateQuantity,
    removeFromCart,
    cartTotal,
    cartCount,
  } = useCart();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const whatsappText = items
    .map(
      (i) =>
        `${i.product.name} x${i.quantity} = ${formatINR(
          Number(i.product.price) * i.quantity,
        )}`,
    )
    .join('%0A');
  const waLink = `https://wa.me/${COMPANY.whatsapp}?text=Order%20enquiry:%0A${whatsappText}%0ATotal:%20${formatINR(
    cartTotal,
  )}`;

  return (
    <div className="fixed inset-0 z-50">
      <div
        className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm"
        onClick={closeCart}
      />
      <div className="absolute right-0 top-0 flex h-full w-96 max-w-[90vw] animate-slide-in-right flex-col bg-white shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
          <div className="flex items-center gap-2">
            <ShoppingBag className="h-5 w-5 text-teal-700" />
            <h2 className="text-base font-bold text-slate-900">
              Cart ({cartCount})
            </h2>
          </div>
          <button
            onClick={closeCart}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-500 hover:bg-slate-100"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Items */}
        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 px-5">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-slate-100">
              <ShoppingBag className="h-8 w-8 text-slate-400" />
            </div>
            <p className="text-center text-sm text-slate-500">
              Your cart is empty. Start exploring our components!
            </p>
            <Link
              to="/products"
              onClick={closeCart}
              className="btn-primary"
            >
              Browse Products
            </Link>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto px-5 py-4">
              <ul className="space-y-4">
                {items.map((item) => (
                  <li
                    key={item.product.id}
                    className="flex gap-3 rounded-xl border border-slate-100 p-3"
                  >
                    <Link
                      to={`/products/${item.product.slug}`}
                      onClick={closeCart}
                      className="flex-shrink-0"
                    >
                      <img
                        src={item.product.image || ''}
                        alt={item.product.name}
                        className="h-16 w-16 rounded-lg border border-slate-200 bg-slate-50 object-contain"
                        loading="lazy"
                      />
                    </Link>
                    <div className="flex min-w-0 flex-1 flex-col">
                      <Link
                        to={`/products/${item.product.slug}`}
                        onClick={closeCart}
                        className="line-clamp-2 text-sm font-medium text-slate-900 hover:text-teal-700"
                      >
                        {item.product.name}
                      </Link>
                      <span className="mt-0.5 text-xs text-slate-400">
                        {item.product.category}
                      </span>
                      <div className="mt-auto flex items-center justify-between pt-2">
                        <div className="flex items-center rounded-lg border border-slate-200">
                          <button
                            onClick={() =>
                              updateQuantity(
                                item.product.id,
                                item.quantity - 1,
                              )
                            }
                            className="flex h-7 w-7 items-center justify-center text-slate-500 hover:text-teal-700"
                          >
                            <Minus className="h-3.5 w-3.5" />
                          </button>
                          <span className="w-8 text-center text-sm font-semibold">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              updateQuantity(
                                item.product.id,
                                item.quantity + 1,
                              )
                            }
                            className="flex h-7 w-7 items-center justify-center text-slate-500 hover:text-teal-700"
                          >
                            <Plus className="h-3.5 w-3.5" />
                          </button>
                        </div>
                        <span className="text-sm font-bold text-slate-900">
                          {formatINR(
                            Number(item.product.price) * item.quantity,
                          )}
                        </span>
                      </div>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.product.id)}
                      className="flex h-7 w-7 flex-shrink-0 items-center justify-center self-start rounded-md text-slate-400 hover:bg-red-50 hover:text-red-500"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Footer */}
            <div className="border-t border-slate-200 px-5 py-4">
              <div className="mb-3 flex items-center justify-between">
                <span className="text-sm font-medium text-slate-600">
                  Subtotal
                </span>
                <span className="text-lg font-bold text-slate-900">
                  {formatINR(cartTotal)}
                </span>
              </div>
              <p className="mb-3 text-xs text-slate-400">
                Shipping calculated at checkout · Cash on Delivery available
              </p>
              <Link
                to="/checkout"
                onClick={closeCart}
                className="btn-primary w-full"
              >
                Checkout
                <ArrowRight className="h-4 w-4" />
              </Link>
              <a
                href={waLink}
                target="_blank"
                rel="noreferrer"
                className="mt-2 flex w-full items-center justify-center gap-2 rounded-lg border border-green-200 bg-green-50 px-5 py-2.5 text-sm font-semibold text-green-700 transition-colors hover:bg-green-100"
              >
                Order on WhatsApp
              </a>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
