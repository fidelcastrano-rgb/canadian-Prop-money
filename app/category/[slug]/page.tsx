import { PRODUCTS } from '@/lib/data';
import { CATEGORY_SEO } from '@/lib/category-seo';
import { ProductCard } from '@/components/ProductCard';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Link from 'next/link';

export async function generateStaticParams() {
  return Object.keys(CATEGORY_SEO).map((slug) => ({
    slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const seo = CATEGORY_SEO[slug as keyof typeof CATEGORY_SEO];
  if (!seo) return {};

  return {
    title: seo.title,
    description: seo.description,
    alternates: {
      canonical: `https://canadianpropmoney.org/category/${slug}`,
    },
    openGraph: {
      title: seo.title,
      description: seo.description,
      url: `https://canadianpropmoney.org/category/${slug}`,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: seo.title,
      description: seo.description,
    }
  };
}

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const seo = CATEGORY_SEO[slug as keyof typeof CATEGORY_SEO];

  if (!seo) {
    notFound();
  }

  const filteredProducts = PRODUCTS.filter((p) => p.category === seo.name);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: seo.title,
    description: seo.description,
    url: `https://canadianpropmoney.org/category/${slug}`,
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: filteredProducts.map((product, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        url: `https://canadianpropmoney.org/products/${product.id}`
      }))
    }
  };

  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://canadianpropmoney.org/'
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Products',
        item: 'https://canadianpropmoney.org/products'
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: seo.name,
        item: `https://canadianpropmoney.org/category/${slug}`
      }
    ]
  };

  const faqLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: seo.faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer
      }
    }))
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />

      <div className="bg-background min-h-screen pt-12 pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Breadcrumbs */}
          <nav className="mb-8 flex text-xs text-gray-500 uppercase tracking-wider">
            <Link href="/" className="hover:text-primary transition-colors">Home</Link>
            <span className="mx-2">/</span>
            <Link href="/products" className="hover:text-primary transition-colors">Products</Link>
            <span className="mx-2">/</span>
            <span className="text-gray-300">{seo.name}</span>
          </nav>

          {/* Header Section */}
          <div className="mb-12 border-b border-white/10 pb-12">
            <h1 className="text-4xl sm:text-5xl font-light text-white uppercase tracking-tight mb-6">
              {seo.h1}
            </h1>
            <div className="prose prose-invert prose-lg max-w-4xl text-gray-400">
              <p>{seo.intro}</p>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
            
            {/* Left Sidebar (Categories) */}
            <div className="lg:col-span-1 border-r border-white/10 pr-8 hidden lg:block">
              <h3 className="text-xl font-light text-white uppercase tracking-tight mb-6">Categories</h3>
              <ul className="space-y-4">
                <li>
                  <Link href="/products" className="text-gray-400 hover:text-white transition-colors block text-sm uppercase tracking-wider">
                    All Products
                  </Link>
                </li>
                {Object.values(CATEGORY_SEO).map((cat) => (
                  <li key={cat.slug}>
                    <Link 
                      href={`/category/${cat.slug}`} 
                      className={`block text-sm uppercase tracking-wider transition-colors ${slug === cat.slug ? 'text-primary font-medium' : 'text-gray-400 hover:text-white'}`}
                    >
                      {cat.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Right Side (Products + SEO Content) */}
            <div className="lg:col-span-3">
              
              <h2 className="text-2xl font-light text-white uppercase tracking-tight mb-8">
                Popular Products in {seo.name}
              </h2>

              {filteredProducts.length === 0 ? (
                <div className="text-center py-12 border border-dashed border-white/10 rounded">
                  <p className="text-gray-400 text-sm">No products found in this category.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
                  {filteredProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              )}

              {/* Extended SEO Content Sections */}
              <div className="border-t border-white/10 pt-16">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
                  <div>
                    <h2 className="text-2xl font-light text-white uppercase tracking-tight mb-4">Why Choose {seo.name} Prop Money</h2>
                    <p className="text-gray-400 text-sm leading-relaxed mb-4">
                      Our {seo.name} prop money stands out because of our unwavering commitment to quality and legal compliance. Every stack is created with the needs of professional filmmakers and photographers in mind. The intricate designs mimic the real currency flawlessly on camera while adhering to strict legal requirements.
                    </p>
                    <p className="text-gray-400 text-sm leading-relaxed">
                      Whether developing dynamic heist sequences or close-up static shots, these props provide the depth, color accuracy, and texture vital for modern 4K and 8K cinematic productions.
                    </p>
                  </div>
                  <div>
                    <h2 className="text-2xl font-light text-white uppercase tracking-tight mb-4">Features & Benefits</h2>
                    <ul className="space-y-3 text-gray-400 text-sm">
                      <li className="flex items-start">
                        <span className="text-primary mr-2">✓</span>
                        Meticulously color-matched to real {seo.name} denominations.
                      </li>
                      <li className="flex items-start">
                        <span className="text-primary mr-2">✓</span>
                        Anti-glare matte coating for flawless lighting control.
                      </li>
                      <li className="flex items-start">
                        <span className="text-primary mr-2">✓</span>
                        Professionally bundled with authentic-looking bank straps.
                      </li>
                      <li className="flex items-start">
                        <span className="text-primary mr-2">✓</span>
                        Double-sided printing with required legal disclaimers.
                      </li>
                    </ul>
                  </div>
                </div>

                {/* How to choose section */}
                {seo.howToChoose && (
                  <div className="mb-16">
                    <h2 className="text-2xl font-light text-white uppercase tracking-tight mb-4">How to Choose The Right Product</h2>
                    <p className="text-gray-400 text-sm leading-relaxed">
                      {seo.howToChoose}
                    </p>
                  </div>
                )}

                {/* FAQ Section */}
                <h2 className="text-2xl font-light text-white uppercase tracking-tight mb-8">Frequently Asked Questions</h2>
                <div className="space-y-6 max-w-3xl">
                  {seo.faqs.map((faq, index) => (
                    <div key={index} className="bg-white/5 border border-white/10 p-6 rounded-sm">
                      <h3 className="text-lg font-medium text-white mb-2">{faq.question}</h3>
                      <p className="text-gray-400 text-sm leading-relaxed">{faq.answer}</p>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </>
  );
}
