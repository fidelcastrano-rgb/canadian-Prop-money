import ProductsClient from './ProductsClient';

export const metadata = {
  title: 'All Products | Canadian Prop Money',
  description: 'Browse our full collection of premium Canadian prop currency. Stacks and bundles available.',
};

export default function ProductsPage() {
  return (
    <div className="bg-background min-h-screen pt-12 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <h1 className="text-4xl sm:text-5xl font-light text-white uppercase tracking-tight mb-4">Shop All Money</h1>
          <p className="text-gray-400 text-sm max-w-2xl">
            High-fidelity Canadian replica currency designed for on-camera realism. Filter by series or browse our complete collection below.
          </p>
        </div>

        <ProductsClient />
      </div>
    </div>
  );
}
