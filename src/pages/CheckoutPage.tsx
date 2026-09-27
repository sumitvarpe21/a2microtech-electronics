import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Check, ShoppingBag, Loader2 } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { formatINR } from '@/lib/format';
import { supabase } from '@/lib/supabase';
import type { OrderInput } from '@/types';

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  paymentMethod: string;
}

const EMPTY: FormData = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  address: '',
  city: '',
  state: '',
  pincode: '',
  paymentMethod: 'Cash on Delivery',
};

export function CheckoutPage() {
  const { items, cartTotal, clearCart } = useCart();
  const navigate = useNavigate();
  const [form, setForm] = useState<FormData>(EMPTY);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const shipping = cartTotal > 999 ? 0 : 49;
  const grandTotal = cartTotal + shipping;

  const update = (field: keyof FormData, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const validate = (): boolean => {
    if (!form.firstName || !form.lastName) {
      setError('Please enter your name.');
      return false;
    }
    if (!form.email.includes('@')) {
      setError('Please enter a valid email address.');
      return false;
    }
    if (form.phone.length < 10) {
      setError('Please enter a valid phone number (at least 10 digits).');
      return false;
    }
    if (!form.address || !form.city || !form.state || !form.pincode) {
      setError('Please fill all address fields.');
      return false;
    }
    setError(null);
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate() || items.length === 0) return;

    setSubmitting(true);
    setError(null);

    const orderNumber = `A2-${Date.now().toString().slice(-6)}`;

    try {
      const { data: orderData, error: orderError } = await supabase
        .from('orders')
        .insert({
          order_number: orderNumber,
          first_name: form.firstName,
          last_name: form.lastName,
          email: form.email,
          phone: form.phone,
          address: form.address,
          city: form.city,
          state: form.state,
          pincode: form.pincode,
          payment_method: form.paymentMethod,
          total_amount: grandTotal,
          status: 'Pending',
        })
        .select()
        .single();

      if (orderError || !orderData) {
        throw new Error(
          orderError?.message || 'Failed to place order. Please try again.',
        );
      }

      const orderItems = items.map((item) => ({
        order_id: orderData.id,
        product_id: item.product.id,
        product_name: item.product.name,
        product_image: item.product.image,
        unit_price: Number(item.product.price),
        quantity: item.quantity,
        subtotal: Number(item.product.price) * item.quantity,
      }));

      const { error: itemsError } = await supabase
        .from('order_items')
        .insert(orderItems);

      if (itemsError) throw itemsError;

      clearCart();
      navigate(`/order-confirmation?order=${orderNumber}`, { replace: true });
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'Something went wrong. Please try again.',
      );
    } finally {
      setSubmitting(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="container-app flex flex-col items-center justify-center py-20 text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-slate-100">
          <ShoppingBag className="h-8 w-8 text-slate-400" />
        </div>
        <h1 className="mt-5 text-xl font-bold text-slate-900">
          Your cart is empty
        </h1>
        <p className="mt-2 text-sm text-slate-500">
          Add some products before checking out.
        </p>
        <Link to="/products" className="mt-6 btn-primary">
          <ArrowLeft className="h-4 w-4" />
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="animate-fade-in min-h-screen bg-slate-50">
      <div className="container-app py-8">
        <Link
          to="/products"
          className="mb-4 inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-teal-700"
        >
          <ArrowLeft className="h-4 w-4" />
          Continue Shopping
        </Link>

        <h1 className="text-2xl font-bold tracking-tight text-slate-900">
          Complete Your Order
        </h1>

        <form
          onSubmit={handleSubmit}
          className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3"
        >
          {/* Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Contact */}
            <div className="card p-6">
              <h2 className="mb-4 text-base font-bold text-slate-900">
                Contact Information
              </h2>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1.5 block text-xs font-medium text-slate-600">
                    First Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={form.firstName}
                    onChange={(e) => update('firstName', e.target.value)}
                    className="input-field"
                    placeholder="John"
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-xs font-medium text-slate-600">
                    Last Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={form.lastName}
                    onChange={(e) => update('lastName', e.target.value)}
                    className="input-field"
                    placeholder="Doe"
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-xs font-medium text-slate-600">
                    Email *
                  </label>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => update('email', e.target.value)}
                    className="input-field"
                    placeholder="john@example.com"
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-xs font-medium text-slate-600">
                    Phone *
                  </label>
                  <input
                    type="tel"
                    required
                    value={form.phone}
                    onChange={(e) => update('phone', e.target.value)}
                    className="input-field"
                    placeholder="9876543210"
                  />
                </div>
              </div>
            </div>

            {/* Shipping */}
            <div className="card p-6">
              <h2 className="mb-4 text-base font-bold text-slate-900">
                Shipping Address
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="mb-1.5 block text-xs font-medium text-slate-600">
                    Street Address *
                  </label>
                  <input
                    type="text"
                    required
                    value={form.address}
                    onChange={(e) => update('address', e.target.value)}
                    className="input-field"
                    placeholder="House no, street, area"
                  />
                </div>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                  <div>
                    <label className="mb-1.5 block text-xs font-medium text-slate-600">
                      City *
                    </label>
                    <input
                      type="text"
                      required
                      value={form.city}
                      onChange={(e) => update('city', e.target.value)}
                      className="input-field"
                      placeholder="Pune"
                    />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-xs font-medium text-slate-600">
                      State *
                    </label>
                    <input
                      type="text"
                      required
                      value={form.state}
                      onChange={(e) => update('state', e.target.value)}
                      className="input-field"
                      placeholder="Maharashtra"
                    />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-xs font-medium text-slate-600">
                      Pincode *
                    </label>
                    <input
                      type="text"
                      required
                      value={form.pincode}
                      onChange={(e) => update('pincode', e.target.value)}
                      className="input-field"
                      placeholder="411062"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Payment */}
            <div className="card p-6">
              <h2 className="mb-4 text-base font-bold text-slate-900">
                Payment Method
              </h2>
              <div className="space-y-3">
                <label
                  className={`flex cursor-pointer items-center gap-3 rounded-lg border p-4 transition-colors ${
                    form.paymentMethod === 'Cash on Delivery'
                      ? 'border-teal-500 bg-teal-50'
                      : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <input
                    type="radio"
                    name="payment"
                    value="Cash on Delivery"
                    checked={form.paymentMethod === 'Cash on Delivery'}
                    onChange={(e) => update('paymentMethod', e.target.value)}
                    className="accent-teal-600"
                  />
                  <div>
                    <p className="text-sm font-semibold text-slate-900">
                      Cash on Delivery
                    </p>
                    <p className="text-xs text-slate-500">
                      Pay with cash when your order is delivered
                    </p>
                  </div>
                </label>
                <label
                  className={`flex cursor-not-allowed items-center gap-3 rounded-lg border border-dashed border-slate-200 p-4 opacity-60`}
                >
                  <input
                    type="radio"
                    name="payment"
                    disabled
                    className="accent-teal-600"
                  />
                  <div>
                    <p className="text-sm font-semibold text-slate-700">
                      Online Payment
                    </p>
                    <p className="text-xs text-slate-400">
                      Coming soon — payment gateway integration
                    </p>
                  </div>
                </label>
              </div>
            </div>
          </div>

          {/* Summary */}
          <div className="lg:col-span-1">
            <div className="card sticky top-24 p-6">
              <h2 className="mb-4 text-base font-bold text-slate-900">
                Order Summary
              </h2>

              <ul className="mb-4 max-h-64 space-y-3 overflow-y-auto">
                {items.map((item) => (
                  <li key={item.product.id} className="flex gap-3">
                    <img
                      src={item.product.image || ''}
                      alt={item.product.name}
                      className="h-12 w-12 flex-shrink-0 rounded-lg border border-slate-200 bg-white object-contain p-1"
                    />
                    <div className="min-w-0 flex-1">
                      <p className="line-clamp-1 text-xs font-medium text-slate-900">
                        {item.product.name}
                      </p>
                      <p className="text-xs text-slate-400">
                        Qty: {item.quantity} × {formatINR(Number(item.product.price))}
                      </p>
                    </div>
                    <span className="text-xs font-bold text-slate-900">
                      {formatINR(Number(item.product.price) * item.quantity)}
                    </span>
                  </li>
                ))}
              </ul>

              <div className="space-y-2 border-t border-slate-100 pt-4 text-sm">
                <div className="flex justify-between text-slate-600">
                  <span>Subtotal</span>
                  <span className="font-medium text-slate-900">
                    {formatINR(cartTotal)}
                  </span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Shipping</span>
                  <span className="font-medium text-slate-900">
                    {shipping === 0 ? 'FREE' : formatINR(shipping)}
                  </span>
                </div>
                {shipping === 0 && (
                  <p className="text-xs text-green-600">
                    Free shipping on orders above ₹999!
                  </p>
                )}
              </div>

              <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-4">
                <span className="text-sm font-semibold text-slate-700">Total</span>
                <span className="text-xl font-bold text-slate-900">
                  {formatINR(grandTotal)}
                </span>
              </div>

              {error && (
                <p className="mt-3 rounded-lg bg-red-50 px-3 py-2 text-xs font-medium text-red-600">
                  {error}
                </p>
              )}

              <button
                type="submit"
                disabled={submitting}
                className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg bg-teal-700 px-5 py-3 text-sm font-bold text-white transition-all hover:bg-teal-800 active:scale-[0.98] disabled:opacity-60"
              >
                {submitting ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Placing Order...
                  </>
                ) : (
                  <>
                    <Check className="h-4 w-4" />
                    Place Order
                  </>
                )}
              </button>

              <p className="mt-3 text-center text-xs text-slate-400">
                By placing your order, you agree to our terms of service.
              </p>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
