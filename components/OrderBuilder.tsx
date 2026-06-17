'use client';

import { useCart } from '@/lib/store';
import { ShoppingCart, X, MessageSquare, Mail, ShieldCheck } from 'lucide-react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export function OrderBuilder() {
  const { items, removeItem, totalItems, totalPrice } = useCart();
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  if (totalItems === 0) return null;

  const getCurrencySymbolByCat = (category: string) => {
    if (category.includes('Euro') || category.includes('EUR')) return '€';
    if (category.includes('UK') || category.includes('Pound') || category.includes('GBP')) return '£';
    return '$';
  };

  const getCurrencyCodeByCat = (category: string) => {
    if (category.includes('Canadian')) return 'CAD';
    if (category.includes('US')) return 'USD';
    if (category.includes('Australian')) return 'AUD';
    if (category.includes('Euro')) return 'EUR';
    if (category.includes('UK') || category.includes('Pound')) return 'GBP';
    return 'USD';
  };

  const generateOrderMessage = () => {
    let msg = 'Hello! I would like to place an order:\n\n';
    items.forEach(item => {
      const sym = getCurrencySymbolByCat(item.product.category);
      const code = getCurrencyCodeByCat(item.product.category);
      msg += `- ${item.product.name} (${item.variant.qtyLabel}) x${item.qty} = ${sym}${item.variant.price * item.qty} ${code}\n`;
    });
    msg += `\nTotal across selected currencies. Please let me know the next steps.`;
    return encodeURIComponent(msg);
  };

  const handleWhatsApp = () => {
    window.open(`https://wa.me/18437320661?text=${generateOrderMessage()}`, '_blank');
  };

  const handleEmail = () => {
    window.location.href = `mailto:sales@canadianpropmoney.org?subject=New Order Enquiry&body=${generateOrderMessage()}`;
  };

  return (
    <div className={`fixed bottom-6 right-6 z-50 transition-transform duration-300 ${totalItems > 0 ? 'translate-y-0' : 'translate-y-[150%]'}`}>
      {!isOpen ? (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-gray-900 border border-btn-primary/50 text-white p-4 rounded-full shadow-lg flex items-center justify-center relative hover:bg-gray-800 transition"
        >
          <ShoppingCart className="w-6 h-6 text-btn-primary" />
          <span className="absolute -top-2 -right-2 bg-btn-primary text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center">
            {totalItems}
          </span>
        </button>
      ) : (
        <div className="bg-gray-900 border border-btn-primary text-white rounded-xl shadow-2xl p-5 w-80 mb-2 flex flex-col">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-syne font-bold text-lg">Your Order</h3>
            <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-white">
              <X className="w-5 h-5" />
            </button>
          </div>
          
          <div className="flex-1 overflow-y-auto max-h-60 space-y-3 mb-4">
            {items.map(item => {
              const sym = getCurrencySymbolByCat(item.product.category);
              const code = getCurrencyCodeByCat(item.product.category);
              return (
                <div key={item.key} className="flex justify-between items-start border-b border-gray-800 pb-2">
                  <div>
                    <p className="font-semibold text-sm">{item.product.name}</p>
                    <p className="text-xs text-gray-400">{item.variant.qtyLabel} x{item.qty}</p>
                  </div>
                  <div className="flex flex-col items-end">
                    <p className="font-bold text-sm font-mono">{sym}{item.variant.price * item.qty} <span className="text-[9px] text-gray-500">{code}</span></p>
                    <button onClick={() => removeItem(item.key)} className="text-xs text-red-400 hover:text-red-300 mt-1">Remove</button>
                  </div>
                </div>
              );
            })}
          </div>
          
          <div className="border-t border-gray-800 pt-3 mb-4 flex justify-between items-center font-bold">
            <span>Items:</span>
            <span className="text-xl text-btn-primary">{totalItems}</span>
          </div>
          
          <div className="space-y-2">
            <button 
              onClick={() => {
                setIsOpen(false);
                router.push('/checkout');
              }}
              className="w-full bg-white hover:bg-gray-200 text-black font-extrabold py-3 px-4 rounded-lg flex items-center justify-center gap-2 transition uppercase text-xs tracking-widest cursor-pointer"
            >
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" /> Proceed to Secure Checkout
            </button>
            <div className="flex items-center gap-2 py-1 text-center justify-center">
              <span className="h-px bg-gray-800 flex-1" />
              <span className="text-[10px] text-gray-500 uppercase tracking-widest font-mono">Alternative Channels</span>
              <span className="h-px bg-gray-800 flex-1" />
            </div>
            <button 
              onClick={handleWhatsApp}
              className="w-full bg-[#128C7E] hover:bg-[#128C7E]/90 text-white font-bold py-2.5 px-4 rounded-lg flex items-center justify-center gap-2 transition text-xs"
            >
              <MessageSquare className="w-4 h-4" /> Order via WhatsApp
            </button>
            <button 
              onClick={handleEmail}
              className="w-full bg-transparent border border-gray-700 hover:bg-gray-800 text-white font-semibold py-2.5 px-4 rounded-lg flex items-center justify-center gap-2 transition text-xs"
            >
              <Mail className="w-4 h-4" /> Order via Email
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
