'use client';

import { PRODUCTS } from '@/lib/data';
import { ProductCard } from '@/components/ProductCard';

export default function ProductsClient() {
  return (
    <>
      {/* Product Grid */}
      {PRODUCTS.length === 0 ? (
        <div className="text-center py-12 border border-dashed border-white/10 rounded">
          <p className="text-gray-400 text-sm">No products found.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {PRODUCTS.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </>
  );
}
