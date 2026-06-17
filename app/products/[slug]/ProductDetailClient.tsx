'use client';

import { Product, useCart } from '@/lib/store';
import Image from 'next/image';
import { useState } from 'react';
import { ShieldCheck, Info, Package, Truck, MessageSquare, Mail } from 'lucide-react';

export function ProductDetailClient({ product }: { product: Product }) {
  const { addToOrder } = useCart();
  const [selectedVariantId, setSelectedVariantId] = useState(product.variants[0].id);
  const [added, setAdded] = useState(false);
  const [activeTab, setActiveTab] = useState<'contents' | 'storage' | 'supply'>('contents');

  const selectedVariant = product.variants.find(v => v.id === selectedVariantId) || product.variants[0];

  const handleAdd = () => {
    addToOrder(product, selectedVariant);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };
  
  const generateWaLink = () => {
    const text = encodeURIComponent(`Hi, I'd like to order: ${product.name} - ${selectedVariant.qtyLabel} ($${selectedVariant.price})`);
    return `https://wa.me/18437320661?text=${text}`;
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
      {/* Left: Images */}
      <div className="space-y-4 lg:sticky lg:top-28 self-start">
        <div className="relative aspect-[4/3] overflow-hidden bg-black/40 border border-white/5 shadow-2xl">
          {product.badge && (
             <span className="absolute top-4 left-4 z-10 bg-red-600 text-white text-[10px] uppercase tracking-widest font-bold px-3 py-1.5 shadow-lg">
               {product.badge}
             </span>
          )}
          <Image src={product.image} alt={product.name} fill className="object-cover" referrerPolicy="no-referrer" priority />
        </div>
        <div className="grid grid-cols-3 gap-4">
          <div className="relative aspect-[4/3] overflow-hidden bg-white/5 border border-primary cursor-pointer">
             <Image src={product.image} alt={`${product.name} view 1`} fill className="object-cover" referrerPolicy="no-referrer" />
          </div>
          <div className="relative aspect-[4/3] overflow-hidden bg-black/40 border border-white/10 cursor-pointer opacity-70 hover:opacity-100 transition">
             <Image src={product.image} alt={`${product.name} view 2`} fill className="object-cover" referrerPolicy="no-referrer" />
          </div>
          <div className="relative aspect-[4/3] overflow-hidden bg-black/40 border border-white/10 cursor-pointer opacity-70 hover:opacity-100 transition">
             <Image src={product.image} alt={`${product.name} view 3`} fill className="object-cover" referrerPolicy="no-referrer" />
          </div>
        </div>
      </div>

      {/* Right: Info */}
      <div className="flex flex-col">
        <div className="mb-2">
           <span className="text-[10px] font-bold text-gray-500 tracking-[0.2em] uppercase">{product.category}</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-light text-white uppercase tracking-tight mb-4">{product.name}</h1>
        
        <div className="flex flex-wrap items-center gap-4 mb-6">
           <div className="flex items-center">
             {selectedVariant.originalPrice && (
               <span className="text-xl text-gray-500 line-through mr-3">
                 {product.category.includes('Euro') ? '€' : product.category.includes('UK') || product.category.includes('Pound') ? '£' : '$'}
                 {selectedVariant.originalPrice}
               </span>
             )}
             <span className="font-mono font-light text-4xl text-white">
               {product.category.includes('Euro') ? '€' : product.category.includes('UK') || product.category.includes('Pound') ? '£' : '$'}
               {selectedVariant.price}
             </span>
             <span className="text-xs text-gray-500 font-mono ml-2 self-end mb-1">
               {product.category.includes('Canadian') ? 'CAD' : product.category.includes('US') ? 'USD' : product.category.includes('Australian') ? 'AUD' : product.category.includes('Euro') ? 'EUR' : product.category.includes('UK') || product.category.includes('Pound') ? 'GBP' : 'USD'}
             </span>
           </div>
           <div className="inline-flex items-center gap-2 px-3 py-1 bg-green-900/20 border border-green-500/20 rounded-sm">
             <span className="flex h-2 w-2 rounded-full bg-green-500"></span>
             <span className="text-[10px] font-bold text-green-400 uppercase tracking-widest">IN STOCK</span>
           </div>
        </div>

        <p className="text-sm text-gray-400 leading-relaxed mb-8 max-w-2xl">{product.description}</p>

        {/* Variants */}
        <div className="mb-8">
          <h3 className="text-xs font-bold text-white uppercase tracking-widest mb-3">Select Size/Quantity</h3>
          <div className="grid grid-cols-2 gap-3">
            {product.variants.map(variant => (
              <button
                key={variant.id}
                onClick={() => setSelectedVariantId(variant.id)}
                className={`relative px-4 py-4 border-2 text-left transition ${
                  selectedVariantId === variant.id 
                    ? 'border-primary bg-primary/10' 
                    : 'border-white/10 hover:border-white/20'
                }`}
              >
                <span className={`block text-xs font-bold uppercase tracking-widest mb-1 ${selectedVariantId === variant.id ? 'text-primary' : 'text-white'}`}>
                  {variant.qtyLabel}
                </span>
                <span className="block text-sm text-gray-500 font-mono">
                  {product.category.includes('Euro') ? '€' : product.category.includes('UK') || product.category.includes('Pound') ? '£' : '$'}
                  {variant.price}
                </span>
                {variant.savingsLabel && (
                  <span className="absolute top-0 right-0 -translate-y-1/2 translate-x-3 bg-red-600 text-white text-[9px] uppercase tracking-widest font-bold px-2 py-0.5 shadow">
                    {variant.savingsLabel}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="space-y-3 mb-10">
           <button 
             onClick={handleAdd}
             className={`w-full text-xs uppercase tracking-widest font-bold py-4 px-8 transition ${
               added ? 'bg-green-500 text-white' : 'bg-white text-black hover:bg-gray-200'
             }`}
           >
             {added ? '✓ Added to Cart' : 'Add to Order'}
           </button>
           <a 
             href={generateWaLink()}
             target="_blank"
             rel="noopener noreferrer"
             className="w-full bg-whatsapp hover:bg-whatsapp/90 text-white text-xs uppercase tracking-widest font-bold py-4 px-8 flex items-center justify-center gap-2 transition"
           >
             <MessageSquare className="w-4 h-4" /> Express Order (WhatsApp)
           </a>
        </div>

        {/* Info Boxes */}
        <div className="space-y-4 mb-10">
          <div className="bg-white/5 border-l-4 border-white/20 p-4">
             <div className="flex gap-3">
                <Info className="w-6 h-6 text-white shrink-0" />
                <div>
                   <h4 className="text-xs font-bold text-white uppercase tracking-widest mb-1">How Ordering Works</h4>
                   <p className="text-[10px] text-gray-400 uppercase leading-snug">Add items to your cart, submit your order enquiry, and we will email/WhatsApp you a secure payment link via Crypto, Zelle, or E-Transfer.</p>
                </div>
             </div>
          </div>
        </div>

        {/* Tabs */}
        <div>
           <div className="flex gap-6 border-b border-white/10 mb-6">
              {[
                {id: 'contents', label: 'Package Contents'},
                {id: 'storage', label: 'Storage & Care'},
                {id: 'supply', label: 'Supply Chain'}
              ].map(tab => (
                 <button
                   key={tab.id}
                   onClick={() => setActiveTab(tab.id as any)}
                   className={`pb-3 text-[10px] uppercase tracking-widest font-bold transition relative ${
                     activeTab === tab.id ? 'text-primary' : 'text-gray-500 hover:text-white'
                   }`}
                 >
                   {tab.label}
                   {activeTab === tab.id && (
                     <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"></span>
                   )}
                 </button>
              ))}
           </div>
           <div className="text-gray-400 text-sm leading-relaxed">
              {activeTab === 'contents' && (
                <ul className="space-y-3">
                  <li className="flex items-center gap-2"><Package className="w-4 h-4 text-gray-400" /> Securely banded stacks or bundles</li>
                  <li className="flex items-center gap-2"><ShieldCheck className="w-4 h-4 text-gray-400" /> Certificate of Authenticity (COA) for Legal Compliance</li>
                  <li className="flex items-center gap-2"><Truck className="w-4 h-4 text-gray-400" /> Discreet, unmarked outer packaging</li>
                </ul>
              )}
              {activeTab === 'storage' && (
                <p>Keep your prop currency in a cool, dry place. Avoid prolonged exposure to direct sunlight to maintain the vibrancy of the non-glossy ink. Our polymer mockups are water-resistant but should be kept away from extreme heat sources.</p>
              )}
              {activeTab === 'supply' && (
                <p>All items are printed and dispatched from our primary facility in Toronto, Canada. We utilize expedited logistics networks for lightning-fast deliveries to productions in Vancouver, LA, NYC, and Atlanta.</p>
              )}
           </div>
        </div>
      </div>
    </div>
  );
}
