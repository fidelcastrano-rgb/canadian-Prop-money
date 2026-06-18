'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { 
  CheckCircle, ArrowRight, Shield, AlertTriangle, Copy, Check,
  Send, Coins, Smartphone, Zap, Landmark, CreditCard, Heart
} from 'lucide-react';

const renderPaymentIconByDisplayName = (methodName: string, className = "w-5 h-5 text-primary shrink-0") => {
  const name = (methodName || "").toLowerCase();
  
  if (name.includes('e-transfer')) {
    return <Send className={className} />;
  } else if (name.includes('crypto')) {
    return <Coins className={className} />;
  } else if (name.includes('apple cash')) {
    return <Smartphone className={className} />;
  } else if (name.includes('chime')) {
    return <Smartphone className={className} />;
  } else if (name.includes('zelle')) {
    return <Zap className={className} />;
  } else if (name.includes('bank') || name.includes('payid')) {
    return <Landmark className={className} />;
  } else if (name.includes('credit card') || name.includes('master')) {
    return <CreditCard className={className} />;
  } else if (name.includes('paypal')) {
    return <Heart className={className} />;
  }
  return <Coins className={className} />;
};

interface OrderDetails {
  order_number: string;
  total: number;
  payment_method: string;
  status: string;
  created_at: string;
  customer: {
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    province: string;
    postal_code: string;
    country: string;
  };
  items: Array<{
    product_name: string;
    quantity: number;
    price: number;
  }>;
}

export default function ThankYouClient() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const orderNumber = searchParams ? searchParams.get('order_number') : null;

  const [loading, setLoading] = useState(!!orderNumber);
  const [order, setOrder] = useState<OrderDetails | null>(null);
  const [copied, setCopied] = useState(false);
  const [instructions, setInstructions] = useState('');

  useEffect(() => {
    if (!orderNumber) {
      return;
    }

    async function fetchOrder() {
      try {
        const res = await fetch(`/api/checkout?order_number=${orderNumber}`);
        if (res.ok) {
          const data = await res.json();
          setOrder(data);
          
          // Fetch instructions for this payment method
          const pRes = await fetch('/api/payment-methods');
          if (pRes.ok) {
            const methods = await pRes.json();
            const matching = methods.find((m: any) => m.id === data.payment_method);
            if (matching) {
              setInstructions(matching.instructions);
            }
          }
        }
      } catch (err) {
        console.error('Failed to retrieve order confirmation details:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchOrder();
  }, [orderNumber]);

  const handleCopy = () => {
    if (orderNumber) {
      navigator.clipboard.writeText(orderNumber);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background text-white flex flex-col items-center justify-center p-4">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mb-4" />
        <p className="text-gray-400 font-light uppercase tracking-widest text-xs">Retrieving Order Details...</p>
      </div>
    );
  }

  if (!orderNumber || !order) {
    return (
      <div className="min-h-screen bg-background text-white flex flex-col items-center justify-center p-4 text-center">
        <AlertTriangle className="w-16 h-16 text-yellow-500 mb-4" />
        <h2 className="text-2xl font-light tracking-tight uppercase mb-2">Order Not Located</h2>
        <p className="text-gray-400 text-sm max-w-sm mb-6 leading-relaxed">We could not retrieve details for this session. It might have finished processing or been removed.</p>
        <Link href="/products" className="py-2.5 px-6 bg-white text-black text-xs font-bold uppercase tracking-widest hover:bg-gray-200">
          Return to Shop
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-white py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto space-y-8">
        
        {/* Giant Success Banner */}
        <div className="bg-white/5 border border-white/10 p-8 rounded-2xl text-center space-y-4 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-500 to-teal-500" />
          <CheckCircle className="w-16 h-16 text-emerald-400 mx-auto" />
          
          <div className="space-y-2">
            <h1 className="text-3xl font-light tracking-tight uppercase">Thank you for your order!</h1>
            <p className="text-sm text-gray-400">Our dispatch agents have received your submission and are verifying print batches.</p>
          </div>

          {/* Copyable Order ID Bar */}
          <div className="inline-flex items-center gap-3 bg-black/60 border border-white/10 px-4 py-2.5 rounded-lg font-mono text-sm max-w-full">
            <span className="text-gray-400">Order Number:</span>
            <span className="text-white font-bold">{order.order_number}</span>
            <button 
              onClick={handleCopy}
              className="text-primary hover:text-white transition-colors ml-1 p-0.5"
              title="Copy Order Number"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Payment instructions */}
        <div className="bg-white/5 border border-white/10 p-6 sm:p-8 rounded-2xl shadow-xl space-y-6">
          <div className="flex items-center gap-2.5 text-xs text-primary font-bold uppercase tracking-wider">
            <Shield className="w-5 h-5 text-primary shrink-0" /> Immediate Payment Steps Required
          </div>
          
          <div className="space-y-4 leading-relaxed font-light text-sm">
            <p>
              To complete dispatch and proceed with courier allocation, please render payment using the secure instructions below:
            </p>

            <div className="bg-black/60 border border-primary/20 p-5 rounded-xl font-mono space-y-3 relative overflow-hidden text-sm">
              <div className="absolute top-0 right-0 py-1 px-3 bg-primary/10 border-b border-l border-primary/25 text-[9px] uppercase tracking-widest text-primary font-bold flex items-center gap-1.5 rounded-bl">
                {renderPaymentIconByDisplayName(order.payment_method, "w-3 h-3 text-primary")}
                <span>{order.payment_method.toUpperCase()}</span>
              </div>
              <p className="text-gray-400 uppercase text-[10px] tracking-wider font-bold">Instruction details:</p>
              <p className="text-white leading-relaxed text-xs">
                The payment details for <span className="text-white font-bold font-sans">{order.payment_method}</span> will be emailed to you via WhatsApp or email once we receive your order.
              </p>
              {order.payment_method.toLowerCase().includes('crypto') && (
                <div className="mt-2 p-2 bg-amber-500/10 border border-amber-500/25 rounded">
                  <p className="text-[10px] text-amber-400 font-medium leading-relaxed uppercase tracking-wider font-sans">
                    🔑 Crypto currency is the preferred payment option for those who want to remain anonymous.
                  </p>
                </div>
              )}
              <div className="pt-2 border-t border-white/5 flex justify-between items-center text-xs">
                <span className="text-gray-400">Amount Due:</span>
                <span className="text-emerald-400 font-bold text-base">${order.total.toFixed(2)} CAD</span>
              </div>
            </div>

            <p className="text-xs text-gray-500">
              * Payments are checked every 30 minutes. Once detected, your batch leaves within 24 hours under a tracking label.
            </p>
          </div>
        </div>

        {/* Order Details Accordion */}
        <div className="bg-white/5 border border-white/10 p-6 sm:p-8 rounded-2xl shadow-xl space-y-6">
          <h3 className="text-lg font-light uppercase tracking-tight text-white border-b border-white/10 pb-4">Order Details SUMMARY</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm font-light">
            <div className="space-y-1">
              <span className="block text-[10px] text-gray-500 font-bold uppercase tracking-wider">Delivery Details:</span>
              <p className="text-white font-medium">{order.customer.first_name} {order.customer.last_name}</p>
              <p className="text-gray-400 text-xs">{order.customer.address}, {order.customer.city}</p>
              <p className="text-gray-400 text-xs">{order.customer.province}, {order.customer.postal_code}, {order.customer.country}</p>
            </div>
            <div className="space-y-1">
              <span className="block text-[10px] text-gray-500 font-bold uppercase tracking-wider">Contact Detail:</span>
              <p className="text-gray-400 text-xs">Email: {order.customer.email}</p>
              <p className="text-gray-400 text-xs">Phone: {order.customer.phone}</p>
              <p className="text-gray-400 text-xs">Date: {new Date(order.created_at).toLocaleDateString()}</p>
            </div>
          </div>

          <div className="border-t border-white/5 pt-4">
            <span className="block text-[10px] text-gray-500 font-bold uppercase tracking-wider mb-3">Items Summary:</span>
            <div className="divide-y divide-white/5 font-mono text-xs">
              {order.items.map((item, idx) => (
                <div key={idx} className="py-2.5 flex justify-between items-center">
                  <span className="text-gray-300 font-sans">{item.product_name} <span className="text-gray-500 font-mono text-[10px] ml-1">x{item.quantity}</span></span>
                  <span className="text-emerald-400">${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Actions panel */}
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
          <Link href="/products" className="w-full sm:w-auto py-3 px-6 bg-transparent hover:bg-white/5 border border-white/20 text-white text-xs font-bold uppercase tracking-widest transition text-center">
            Return to Shop
          </Link>
          <Link 
            href={`/track-order?order_number=${order.order_number}&email=${order.customer.email}`}
            className="w-full sm:w-auto py-3 px-8 bg-white hover:bg-gray-200 text-black text-xs font-bold uppercase tracking-widest transition text-center flex items-center justify-center gap-2"
          >
            Track Order Status <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </div>
    </div>
  );
}
