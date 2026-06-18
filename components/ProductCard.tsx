'use client';

import { Product } from '@/lib/store';
import { useCart } from '@/lib/store';
import { resolveImageUrl } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

export function ProductCard({ product }: { product: Product }) {
  const { addToOrder } = useCart();
  const [selectedVariantId, setSelectedVariantId] = useState(product.variants[0].id);
  const [added, setAdded] = useState(false);
  
  const selectedVariant = product.variants.find(v => v.id === selectedVariantId) || product.variants[0];

  const handleAdd = () => {
    addToOrder(product, selectedVariant);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <div className="bg-white/5 border border-white/10 overflow-hidden flex flex-col transition h-full">
      <Link href={`/products/${product.id}`} className="block relative aspect-[4/3] bg-black/40">
        {product.badge && (
          <span className="absolute top-3 left-3 bg-red-600 text-white text-[10px] uppercase tracking-widest font-bold px-2 py-1 shadow z-10">
            {product.badge}
          </span>
        )}
        <Image src={resolveImageUrl(product.image)} alt={product.name} fill className="object-cover" referrerPolicy="no-referrer" />
      </Link>
      
      <div className="p-5 flex flex-col flex-1">
        <span className="text-[10px] font-bold text-gray-500 tracking-[0.2em] uppercase mb-1">{product.category}</span>
        <Link href={`/products/${product.id}`}>
          <h3 className="font-bold text-lg text-white mb-2 line-clamp-1 hover:text-primary transition">{product.name}</h3>
        </Link>
        <p className="text-sm text-gray-400 line-clamp-2 mb-4 flex-1">{product.description}</p>
        
        {/* COA Strip */}
        <div className="bg-green-900/20 border border-green-500/20 p-2 flex items-center justify-center gap-2 mb-4">
           <svg className="w-4 h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
           <span className="text-xs font-semibold text-green-400 uppercase tracking-wider">Includes Legal COA</span>
        </div>

        {/* Variant Selector */}
        <div className="grid grid-cols-2 gap-2 mb-4">
          {product.variants.map(variant => (
            <button
              key={variant.id}
              onClick={() => setSelectedVariantId(variant.id)}
              className={`text-xs font-semibold py-2 px-1 border transition ${
                selectedVariantId === variant.id 
                  ? 'border-primary bg-primary/10 text-white' 
                  : 'border-white/10 text-gray-400 hover:border-white/20 hover:text-white'
              }`}
            >
              {variant.qtyLabel}
              {variant.savingsLabel && (
                <span className="block text-[10px] text-primary mt-0.5">{variant.savingsLabel}</span>
              )}
            </button>
          ))}
        </div>

        <div className="flex items-end justify-between mb-4">
           <div>
             {selectedVariant.originalPrice && (
               <span className="text-xs text-gray-500 line-through mr-2">
                 {product.category.includes('Euro') ? '€' : product.category.includes('UK') || product.category.includes('Pound') ? '£' : '$'}
                 {selectedVariant.originalPrice}
               </span>
             )}
             <span className="font-mono font-bold text-2xl text-white">
               {product.category.includes('Euro') ? '€' : product.category.includes('UK') || product.category.includes('Pound') ? '£' : '$'}
               {selectedVariant.price}
             </span>
             <span className="text-[10px] text-gray-500 ml-1 font-mono">
               {product.category.includes('Canadian') ? 'CAD' : product.category.includes('US') ? 'USD' : product.category.includes('Australian') ? 'AUD' : product.category.includes('Euro') ? 'EUR' : product.category.includes('UK') || product.category.includes('Pound') ? 'GBP' : 'USD'}
             </span>
           </div>
        </div>

        <div className="grid grid-cols-2 gap-2 mt-auto">
          <Link href={`/products/${product.id}`} className="flex items-center justify-center text-center text-xs uppercase tracking-widest font-bold text-white border border-white/20 py-3 hover:bg-white hover:text-black transition">
            Details
          </Link>
          <button 
            onClick={handleAdd}
            className={`text-xs uppercase tracking-widest font-bold py-3 transition ${added ? 'bg-green-500 text-white' : 'bg-white text-black hover:bg-gray-200'}`}
          >
            {added ? '✓ Added' : 'Add to Order'}
          </button>
        </div>
      </div>
    </div>
  );
}
