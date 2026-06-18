'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Package, Truck, Search, Calendar, ChevronRight, AlertTriangle, ShieldCheck, Mail, Phone, MapPin, Hourglass } from 'lucide-react';

interface TimelineStep {
  id: string;
  status: string;
  created_at: string;
}

interface OrderData {
  id: string;
  order_number: string;
  subtotal: number;
  shipping: number;
  discount: number;
  total: number;
  status: string;
  payment_method: string;
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
    id: string;
    product_name: string;
    quantity: number;
    price: number;
  }>;
  history: TimelineStep[];
}

export default function TrackOrderClient() {
  const searchParams = useSearchParams();
  const initialOrderNumber = searchParams ? searchParams.get('order_number') : '';
  const initialEmail = searchParams ? searchParams.get('email') : '';

  const [orderNumber, setOrderNumber] = useState(initialOrderNumber || '');
  const [email, setEmail] = useState(initialEmail || '');
  const [loading, setLoading] = useState(false);
  const [order, setOrder] = useState<OrderData | null>(null);
  const [searched, setSearched] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const fetchTracking = async (searchNum: string, searchEmail: string) => {
    if (!searchNum.trim()) {
      setErrorMsg('Please supply a valid order number');
      return;
    }
    if (!searchEmail.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(searchEmail)) {
      setErrorMsg('Please supply a valid email address');
      return;
    }

    setLoading(true);
    setErrorMsg('');
    setSearched(true);

    try {
      const res = await fetch(`/api/checkout?order_number=${encodeURIComponent(searchNum.trim())}&email=${encodeURIComponent(searchEmail.trim())}`);
      if (res.ok) {
        const data = await res.json();
        setOrder(data);
      } else {
        const errData = await res.json();
        setOrder(null);
        setErrorMsg(errData.error || 'No matching order was located in our system databases.');
      }
    } catch (err) {
      console.error(err);
      setErrorMsg('We encountered an unexpected error querying the database. Please try again.');
      setOrder(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (initialOrderNumber && initialEmail) {
      Promise.resolve().then(() => {
        fetchTracking(initialOrderNumber, initialEmail);
      });
    }
  }, [initialOrderNumber, initialEmail]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchTracking(orderNumber, email);
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'pending': return 'text-amber-400 bg-amber-400/10 border-amber-400/25';
      case 'processing': return 'text-blue-400 bg-blue-400/10 border-blue-400/25';
      case 'shipped': return 'text-orange-400 bg-orange-400/10 border-orange-400/25';
      case 'completed': return 'text-green-400 bg-green-400/10 border-green-400/25';
      case 'cancelled': return 'text-red-400 bg-red-400/10 border-red-400/25';
      default: return 'text-gray-400 bg-gray-400/10 border-gray-400/25';
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6">
      
      {/* Breadcrumb paths */}
      <div className="text-xs uppercase tracking-widest text-gray-500 mb-8 flex items-center gap-2">
        <Link href="/" className="hover:text-primary transition">Home</Link>
        <span>/</span>
        <span className="text-white">Track Order</span>
      </div>

      {/* Header Block */}
      <div className="mb-12 text-center sm:text-left">
        <h1 className="text-4xl sm:text-5xl font-light text-white uppercase tracking-tight mb-4">Dispatcher Tracking</h1>
        <p className="text-gray-400 max-w-lg text-sm leading-relaxed font-light">
           Query database states in real-time to track local active cinematic print batches, Certificate of Authenticity (COA) compliance clearances, and courier parcels.
        </p>
      </div>

      {/* Query Input Box */}
      <div className="bg-white/5 border border-white/10 p-6 sm:p-8 rounded-xl shadow-2xl relative mb-8">
        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-[100%] pointer-events-none" />
        
        <h2 className="text-lg font-light tracking-wide text-white uppercase mb-4 flex items-center gap-2.5">
          <Search className="w-5 h-5 text-primary" /> Track Prop Dispatch
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[9px] uppercase tracking-wider text-gray-400 font-bold mb-1.5">Order Number *</label>
              <input 
                type="text" 
                value={orderNumber}
                onChange={(e) => setOrderNumber(e.target.value)}
                placeholder="e.g. CPM-2026-000001" 
                className="w-full bg-black/50 border border-white/15 px-4 py-3 text-sm tracking-widest uppercase font-mono placeholder:text-gray-600 focus:outline-none focus:border-primary text-white" 
              />
            </div>
            <div>
              <label className="block text-[9px] uppercase tracking-wider text-gray-400 font-bold mb-1.5">Billing Email *</label>
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="e.g. francis@cinemascope-studios.ca" 
                className="w-full bg-black/50 border border-white/15 px-4 py-3 text-sm placeholder:text-gray-600 focus:outline-none focus:border-primary text-white" 
              />
            </div>
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full sm:w-auto px-8 py-3.5 bg-white text-black font-bold uppercase text-xs tracking-widest hover:bg-gray-200 transition disabled:bg-gray-700 disabled:text-gray-400"
          >
            {loading ? 'Searching...' : 'Query Databases'}
          </button>
        </form>

        {errorMsg && (
          <div className="mt-5 p-4 bg-red-950/30 border border-red-500/30 rounded text-xs text-red-300 flex items-center gap-2.5">
            <AlertTriangle className="w-5 h-5 text-red-400 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}
      </div>

      {/* Dynamic Search Results */}
      {searched && !loading && order && (
        <div className="space-y-8 animate-fade-in">
          
          {/* Status Header */}
          <div className="bg-white/5 border border-white/10 p-6 rounded-xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <span className="text-[10px] uppercase font-bold text-gray-500 block">Current Status:</span>
              <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border mt-1 ${getStatusColor(order.status)}`}>
                ● {order.status}
              </span>
            </div>
            <div className="text-left sm:text-right font-mono text-xs text-gray-400">
              <p>Order Placed: {new Date(order.created_at).toLocaleString()}</p>
              <p className="mt-1">Order Ref: <span className="text-white font-bold">{order.order_number}</span></p>
            </div>
          </div>

          {/* Timeline progression */}
          <div className="bg-white/5 border border-white/10 p-6 sm:p-8 rounded-xl space-y-6">
            <h3 className="text-xs font-bold uppercase tracking-widest text-primary border-b border-white/10 pb-3">Order History Timeline</h3>
            
            <div className="relative pl-6 space-y-8 border-l border-white/10 ml-3">
              {order.history && order.history.length > 0 ? (
                order.history.map((step, idx) => (
                  <div key={idx} className="relative">
                    {/* Node circle */}
                    <span className="absolute -left-[31px] top-1.5 h-4 w-4 bg-primary border bg-black border-primary flex items-center justify-center rounded-full">
                      <span className="h-1.5 w-1.5 bg-primary rounded-full" />
                    </span>
                    <div className="text-sm font-bold uppercase tracking-wider text-white">
                      {step.status}
                    </div>
                    <div className="text-[11px] font-mono text-gray-400 mt-1">
                      Timeline Cleared: {new Date(step.created_at).toLocaleString()}
                    </div>
                  </div>
                ))
              ) : (
                <div className="relative">
                  <span className="absolute -left-[31px] top-1.5 h-4 w-4 bg-amber-400 border bg-black border-amber-400 flex items-center justify-center rounded-full">
                    <span className="h-1.5 w-1.5 bg-amber-400 rounded-full" />
                  </span>
                  <div className="text-sm font-bold uppercase tracking-wider text-white">
                    Order Received
                  </div>
                  <div className="text-[11px] font-mono text-gray-400 mt-1">
                    Batch registered in memory store.
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Order Details SUMMARY */}
          <div className="bg-white/5 border border-white/10 p-6 sm:p-8 rounded-xl space-y-6 text-sm font-light">
            <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400 border-b border-white/10 pb-3">Order Specs &amp; Items</h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 leading-relaxed">
              <div className="space-y-1 bg-black/30 p-4 rounded border border-white/5">
                <span className="text-[9px] uppercase font-bold text-gray-500 block mb-1">Shipping Destination:</span>
                <p className="font-semibold text-white text-xs uppercase tracking-wide">{order.customer.first_name} {order.customer.last_name}</p>
                <p className="text-gray-400 text-xs">{order.customer.address}, {order.customer.city}</p>
                <p className="text-gray-400 text-xs">{order.customer.province}, {order.customer.postal_code}, {order.customer.country}</p>
              </div>
              <div className="space-y-1 bg-black/30 p-4 rounded border border-white/5">
                <span className="text-[9px] uppercase font-bold text-gray-500 block mb-1">Billing Details &amp; Contact:</span>
                <p className="text-gray-400 text-xs flex items-center gap-1.5"><Mail className="w-3.5 h-3.5 text-primary shrink-0" /> {order.customer.email}</p>
                <p className="text-gray-400 text-xs flex items-center gap-1.5 mt-1"><Phone className="w-3.5 h-3.5 text-primary shrink-0" /> {order.customer.phone}</p>
                <p className="text-gray-400 text-xs flex items-center gap-1.5 mt-1"><Hourglass className="w-3.5 h-3.5 text-primary shrink-0" /> Pay option: <span className="text-white font-mono uppercase text-[10px] font-bold">{order.payment_method}</span></p>
              </div>
            </div>

            <div>
              <span className="text-[9px] uppercase font-bold text-gray-500 block mb-2">Print items in this batch:</span>
              <div className="divide-y divide-white/5 font-mono text-xs bg-black/20 p-4 rounded border border-white/5">
                {order.items.map((item, idx) => (
                  <div key={idx} className="py-2.5 flex justify-between items-center first:pt-0 last:pb-0">
                    <span className="text-gray-300 font-sans text-xs">{item.product_name} <span className="text-gray-500 font-mono text-[10px] ml-1">x{item.quantity}</span></span>
                    <span className="text-emerald-400">${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
                
                <div className="border-t border-white/10 pt-3 mt-3 flex justify-between font-bold text-sm text-white">
                  <span className="font-sans uppercase text-xs tracking-wider">Gross Total:</span>
                  <span className="text-emerald-400">${order.total.toFixed(2)} CAD</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      )}

    </div>
  );
}
