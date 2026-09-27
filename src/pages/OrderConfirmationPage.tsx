import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { CheckCircle2, Package, ArrowRight, Copy } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { formatINR } from '@/lib/format';

interface OrderDetail {
  order_number: string;
  first_name: string;
  last_name: string;
  total_amount: number;
  payment_method: string;
  status: string;
  created_at: string;
}

export function OrderConfirmationPage() {
  const [searchParams] = useSearchParams();
  const orderNumber = searchParams.get('order') || '';
  const [order, setOrder] = useState<OrderDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    (async () => {
      if (!orderNumber) {
        setLoading(false);
        return;
      }
      const { data, error } = await supabase
        .from('orders')
        .select('order_number, first_name, last_name, total_amount, payment_method, status, created_at')
        .eq('order_number', orderNumber)
        .maybeSingle();

      if (!error && data) setOrder(data as OrderDetail);
      setLoading(false);
    })();
  }, [orderNumber]);

  const copyOrderNumber = () => {
    navigator.clipboard.writeText(orderNumber);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (loading) {
    return (
      <div className="container-app flex items-center justify-center py-20">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-slate-200 border-t-teal-600" />
      </div>
    );
  }

  return (
    <div className="animate-fade-in min-h-screen bg-slate-50">
      <div className="container-app flex flex-col items-center justify-center py-16">
        <div className="w-full max-w-lg rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
            <CheckCircle2 className="h-9 w-9 text-green-600" />
          </div>

          <h1 className="mt-5 text-2xl font-bold text-slate-900">
            Order Confirmed!
          </h1>
          <p className="mt-2 text-sm text-slate-500">
            Your order has been received successfully. We will contact you with
            the order details and delivery information.
          </p>

          <div className="mt-6 rounded-xl bg-slate-50 p-4">
            <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
              Order Number
            </p>
            <div className="mt-1 flex items-center justify-center gap-2">
              <span className="text-lg font-bold text-slate-900">
                {orderNumber}
              </span>
              <button
                onClick={copyOrderNumber}
                className="text-slate-400 hover:text-teal-600"
              >
                <Copy className="h-4 w-4" />
              </button>
            </div>
            {copied && (
              <p className="mt-1 text-xs text-green-600">Copied!</p>
            )}
          </div>

          {order && (
            <div className="mt-4 space-y-2 text-left text-sm">
              <div className="flex justify-between border-b border-slate-100 pb-2">
                <span className="text-slate-500">Customer</span>
                <span className="font-medium text-slate-900">
                  {order.first_name} {order.last_name}
                </span>
              </div>
              <div className="flex justify-between border-b border-slate-100 pb-2">
                <span className="text-slate-500">Total Amount</span>
                <span className="font-medium text-slate-900">
                  {formatINR(Number(order.total_amount))}
                </span>
              </div>
              <div className="flex justify-between border-b border-slate-100 pb-2">
                <span className="text-slate-500">Payment</span>
                <span className="font-medium text-slate-900">
                  {order.payment_method}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Status</span>
                <span className="inline-flex items-center gap-1 rounded-md bg-amber-50 px-2 py-0.5 text-xs font-semibold text-amber-700">
                  <Package className="h-3 w-3" />
                  {order.status}
                </span>
              </div>
            </div>
          )}

          <div className="mt-6 flex flex-col gap-2 sm:flex-row sm:justify-center">
            <Link to="/products" className="btn-primary">
              Continue Shopping
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link to="/" className="btn-secondary">
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
