import ProductsClient from './ProductsClient';
import Link from 'next/link';
import { CATEGORY_SEO } from '@/lib/category-seo';
import { PRODUCTS } from '@/lib/data';

export const metadata = {
  title: 'Shop All Prop Money | Cinema-Grade Replica Banknotes',
  description: 'Explore Canada’s largest selection of premium, dual-sided realistic prop money bundles. Perfect for 4K video shoots, movies, or bank training setups.',
  alternates: {
    canonical: 'https://canadianpropmoney.org/products',
  }
};

export default function ProductsPage() {
  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://canadianpropmoney.org'
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Products',
        item: 'https://canadianpropmoney.org/products'
      }
    ]
  };

  const collectionLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Cinema-Grade Premium Prop Money Collection',
    description: 'A comprehensive collection of ultra-realistic, legally compliant motion picture currency replica stacks including CAD, USD, AUD, and EUR.',
    url: 'https://canadianpropmoney.org/products',
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: PRODUCTS.map((product, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        url: `https://canadianpropmoney.org/products/${product.id}`
      }))
    }
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionLd) }} />
      
      <div className="bg-background min-h-screen pt-12 pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <h1 className="text-4xl sm:text-5xl font-light text-white uppercase tracking-tight mb-4">Shop All Money</h1>
            <p className="text-gray-400 text-sm max-w-2xl mb-8">
              High-fidelity Canadian replica currency designed for on-camera realism. Filter by series or browse our complete collection below.
            </p>

            <div className="flex gap-2 py-4 border-y border-white/5 overflow-x-auto scrollbar-hide">
               <Link href="/products" className="px-6 py-2 text-[10px] uppercase tracking-widest font-bold whitespace-nowrap transition cursor-pointer bg-white text-black">
                 All Products
               </Link>
               {Object.values(CATEGORY_SEO).map(cat => (
                 <Link 
                   key={cat.slug} 
                   href={`/category/${cat.slug}`}
                   className="px-6 py-2 text-[10px] uppercase tracking-widest font-bold whitespace-nowrap transition cursor-pointer bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:border-white/20"
                 >
                   {cat.name}
                 </Link>
               ))}
            </div>
          </div>

          <ProductsClient />
        </div>
      </div>
    </>
  );
}
