'use client';

import { useState } from 'react';
import { PRODUCTS } from '@/lib/data';
import { ProductCard } from '@/components/ProductCard';

export default function ProductsClient() {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Canadian Dollars', 'US Dollars', 'UK Pounds', 'Australian Dollars', 'Euro'];

  const filteredProducts = selectedCategory === 'All'
    ? PRODUCTS
    : PRODUCTS.filter(p => p.category === selectedCategory);

  return (
    <>
      {/* Sticky Filter Bar */}
      <div className="sticky top-20 z-30 bg-background/80 backdrop-blur-md border-y border-white/5 py-4 mb-12 -mx-4 px-4 sm:mx-0 sm:px-0 sm:bg-transparent sm:border-0 sm:backdrop-blur-none sm:py-0">
         <div className="flex gap-2 overflow-x-auto pb-2 sm:pb-0 scrollbar-hide">
           {categories.map((cat) => (
             <button
               key={cat}
               onClick={() => setSelectedCategory(cat)}
               className={`px-6 py-2 text-[10px] uppercase tracking-widest font-bold whitespace-nowrap transition cursor-pointer ${
                 selectedCategory === cat
                   ? 'bg-white text-black'
                   : 'bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:border-white/20'
               }`}
             >
               {cat === 'All' ? 'All Products' : cat}
             </button>
           ))}
         </div>
      </div>

      {/* Product Grid */}
      {filteredProducts.length === 0 ? (
        <div className="text-center py-12 border border-dashed border-white/10 rounded">
          <p className="text-gray-400 text-sm">No products found in this category.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </>
  );
}
