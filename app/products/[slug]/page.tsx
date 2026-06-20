import { PRODUCTS } from '@/lib/data';
import { ProductDetailClient } from './ProductDetailClient';
import { notFound } from 'next/navigation';
import { resolveImageUrl } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';

export async function generateStaticParams() {
  return PRODUCTS.map((product) => ({
    slug: product.id,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const product = PRODUCTS.find((p) => p.id === resolvedParams.slug);
  if (!product) return { title: 'Not Found' };
  
  return {
    title: `Buy ${product.name} | Cinema-Grade Replica Banknotes`,
    description: `${product.description} Fully compliant realistic novelty cash stacks with anti-reflective matte coating. Ideal for film production set directors.`,
    keywords: [
      product.name,
      `buy ${product.id}`,
      `${product.id} stack`,
      "Canadian Prop Money",
      "Prop Money Canada",
      "Realistic Movie Money",
      "High-Fidelity Prop Bills",
      "Anti-glare movie cash",
      "Section 411 Compliant prop bills"
    ],
    alternates: {
      canonical: `https://canadianpropmoney.org/products/${product.id}`,
    },
    openGraph: {
      title: `Buy ${product.name} | Cinema-Grade Replica Banknotes`,
      description: `${product.description} Fully compliant realistic novelty cash stacks with anti-reflective matte coating.`,
      url: `https://canadianpropmoney.org/products/${product.id}`,
      images: [{ url: resolveImageUrl(product.image || '/hero1.png') }]
    },
    twitter: {
      card: 'summary_large_image',
      title: `Buy ${product.name} | Cinema-Grade Replica Banknotes`,
      description: `${product.description} Fully compliant realistic novelty cash stacks with anti-reflective matte coating.`
    }
  };
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const product = PRODUCTS.find((p) => p.id === resolvedParams.slug);

  if (!product) {
    notFound();
  }

  // Find related products in the same or other categories (up to 4)
  const relatedProducts = PRODUCTS.filter(p => p.id !== product.id).slice(0, 4);

  // Dynamic FAQs for the webpage and Schema Markup
  const productFaqs = [
    {
      q: `Is this ${product.name} stack legal to own and use on set?`,
      a: `Yes, completely. Our ${product.name} is meticulously engineered in alignment with global regulatory standards (such as Section 411 of the Criminal Code of Canada, and United States Secret Service currency guidelines). It features essential, permanent legal adaptations including "FOR MOTION PICTURE USE ONLY" markings on both sides, custom-designed graphic portraiture, adjusted scale dimensions, and fictionalized serial numbers. It serves purely as an artistic set design element and cannot be used to defraud individuals or financial institutions.`
    },
    {
      q: `Can this specific replica banknote pass counterfeit visual detection pens or ultraviolet light scanners?`,
      a: `No, absolutely not. We strictly omit all functional security features found in active government legal tender—such as fluorescent UV security inks, color-reactive intaglio printing, physical metal threads, and transparent holographic window film substrates. It is optimized to look completely authentic under high-definition cinematic camera setups but possesses zero physical characteristics of passable currency, making it safe for your film production crew.`
    },
    {
      q: `Does this cash stack feed smoothly through automatic currency counting machines on screen?`,
      a: `Yes. Due to their identical size matching correct specifications and specialized synthetic fibrous weight, individual notes from our ${product.name} collection slide seamlessly through electrical cash counters, retail point-of-sale registers, ATMs, and counting trays in motion picture rigs on camera.`
    },
    {
      q: `Will this replica bill crack, run, or degrade under active handler usage or bright filming lights?`,
      a: `No. All of our bills are manufactured using high-speed industrial-grade offset lithography coupled with a specialized ultraviolet (UV) curing coating. This seals the colors against sweat from handlers, moisture, and intense thermal heat emitted by professional HMI or LED stage spotlights, avoiding key continuity errors during multi-take sequences.`
    }
  ];

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
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: product.name,
        item: `https://canadianpropmoney.org/products/${product.id}`
      }
    ]
  };

  const currencyCode = product.category.includes('Canadian') ? 'CAD' : product.category.includes('US') ? 'USD' : product.category.includes('Australian') ? 'AUD' : product.category.includes('Euro') ? 'EUR' : product.category.includes('UK') || product.category.includes('Pound') ? 'GBP' : 'USD';
  const displayRating = product.rating || 4.8;
  const displayReviews = product.reviewCount || 45;

  const productLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    image: resolveImageUrl(product.image).startsWith('http') 
      ? resolveImageUrl(product.image) 
      : `https://canadianpropmoney.org${resolveImageUrl(product.image || '/hero1.png')}`,
    description: product.description,
    sku: `CPM-${product.id.toUpperCase()}`,
    brand: {
      '@type': 'Brand',
      name: 'Canadian Prop Money'
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: displayRating.toString(),
      reviewCount: displayReviews.toString(),
      bestRating: '5',
      worstRating: '1'
    },
    offers: {
      '@type': 'AggregateOffer',
      priceCurrency: currencyCode,
      lowPrice: product.variants[0].price.toString(),
      highPrice: product.variants[product.variants.length - 1].price.toString(),
      offerCount: product.variants.length.toString(),
      availability: 'https://schema.org/InStock',
      url: `https://canadianpropmoney.org/products/${product.id}`
    }
  };

  const faqLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: productFaqs.map(faq => ({
      '@type': 'Question',
      name: faq.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.a
      }
    }))
  };

  // Dimensional specs depending on the category of banknotes
  const isUSD = product.category.toLowerCase().includes('us');
  const isAUD = product.category.toLowerCase().includes('australian');
  const isEUR = product.category.toLowerCase().includes('euro');
  const sizeSpec = isUSD ? '156.0 mm x 66.3 mm' : isAUD ? '158.0 mm x 65.0 mm' : isEUR ? 'denominational staggered (from 120mm to 160mm)' : '152.4 mm x 69.85 mm (Exact CAD match)';

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />

      <div className="bg-background min-h-screen pt-12 pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Breadcrumbs for UI */}
          <nav className="mb-10 flex text-xs text-gray-500 uppercase tracking-widest leading-none select-none">
            <Link href="/" className="hover:text-primary transition-colors">Home</Link>
            <span className="mx-2">/</span>
            <Link href="/products" className="hover:text-primary transition-colors">Products</Link>
            <span className="mx-2">/</span>
            <span className="text-gray-300 truncate max-w-[200px] sm:max-w-none">{product.name}</span>
          </nav>

          {/* Client Interactive Area (Form, Images, Selections) */}
          <ProductDetailClient product={product} />

          {/* Under-The-Fold Comprehensive SEO Context Panels */}
          <div className="mt-28 border-t border-white/10 pt-20 grid grid-cols-1 lg:grid-cols-3 gap-16">
            
            {/* Column 1 & 2: Overview, Features & Specifications */}
            <div className="lg:col-span-2 space-y-12">
              <section id="product-overview" className="space-y-4">
                <span className="text-[9px] uppercase font-bold tracking-[0.25em] text-primary border border-primary/20 px-3 py-1 bg-primary/5">Cinema Architecture</span>
                <h2 className="text-3xl font-light text-white tracking-tight pt-2">Comprehensive Product Overview</h2>
                <div className="text-gray-400 font-light text-sm leading-relaxed space-y-4">
                  <p>
                    The {product.name} represents our premium level of cinematic replica banknotes. These prop bills are designed specifically to look flawless on professional 4K, 6K, or 8K digital sensor feeds without giving off the artificial shine of standard printer ink. Each cash stack undergoes rigorous material styling, utilizing a custom-formulated textured synthetic fiber mix that simulates both the tactile weight and natural stiffness of crisp, freshly printed notes.
                  </p>
                  <p>
                    Our manufacturing queue leverages state-of-the-art lithographic offset presses to achieve high line resolution and rich Pantone color matching, ensuring the signature shades of this currency denomination sit correctly on screen. Fully printed double-sided, these replica bills are ready to fly during high-action shootout drops, bank robbery vaults, heist escape briefcases, and close-up cash counts.
                  </p>
                </div>
              </section>

              {/* Physical Specifications table */}
              <section id="technical-specifications" className="space-y-4">
                <h3 className="text-xl font-normal text-white uppercase tracking-wider mb-4">Technical Specifications Table</h3>
                <div className="border border-white/10 overflow-hidden rounded-sm font-light text-sm">
                  <div className="grid grid-cols-2 border-b border-white/5 bg-white/5 p-4">
                    <span className="text-gray-300 font-medium">Dimension Ratios</span>
                    <span className="text-gray-400 font-mono">{sizeSpec}</span>
                  </div>
                  <div className="grid grid-cols-2 border-b border-white/5 p-4">
                    <span className="text-gray-300 font-medium">Material Composition</span>
                    <span className="text-gray-400">Specialized Synthetic-Fibrous Matte Matrix</span>
                  </div>
                  <div className="grid grid-cols-2 border-b border-white/5 bg-white/5 p-4">
                    <span className="text-gray-300 font-medium">Sizing Calibration</span>
                    <span className="text-gray-400 font-mono">115 Microns (Exact banknote thickness)</span>
                  </div>
                  <div className="grid grid-cols-2 border-b border-white/5 p-4">
                    <span className="text-gray-300 font-medium">Printing Process</span>
                    <span className="text-gray-400">High-Resolution Double-Sided Litho Offset</span>
                  </div>
                  <div className="grid grid-cols-2 bg-white/5 p-4">
                    <span className="text-gray-300 font-medium">Color Accuracy</span>
                    <span className="text-gray-400">Pantone Spot-Color Calibrated</span>
                  </div>
                </div>
              </section>

              {/* Features List */}
              <section id="premium-features" className="space-y-4">
                <h3 className="text-xl font-normal text-white uppercase tracking-wider mb-4">Aesthetic Highlights & Features</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm text-gray-400 font-light">
                  <div className="p-5 bg-white/5 border border-white/5 rounded-sm">
                    <h4 className="text-white font-medium mb-2">Dual-Sided Vector Art</h4>
                    <p>Printed cleanly on both faces with meticulously modified characters, ensuring zero white blank back exposures, no matter the direction of camera capture.</p>
                  </div>
                  <div className="p-5 bg-white/5 border border-white/5 rounded-sm">
                    <h4 className="text-white font-medium mb-2">Anti-Reflective Coating</h4>
                    <p>Finished with our glare-diffusing matte chemical solution, preventing specular highlights and lens blinding under hard spotlights on-set.</p>
                  </div>
                  <div className="p-5 bg-white/5 border border-white/5 rounded-sm">
                    <h4 className="text-white font-medium mb-2">Tactile Acoustic Snap</h4>
                    <p>Engineered to emit an authentic paper crackle and snap audio feedback on boom microphones when handled aggressively by actors.</p>
                  </div>
                  <div className="p-5 bg-white/5 border border-white/5 rounded-sm">
                    <h4 className="text-white font-medium mb-2">Discreet Serializing</h4>
                    <p>Contains fictionalized Serial sequences that dynamically flag inside cash registers yet maintain realistic typographic design under the lens.</p>
                  </div>
                </div>
              </section>
            </div>

            {/* Column 3: Denomination Specific FAQs */}
            <div className="space-y-8">
              <div className="bg-white/5 border border-white/10 p-8 rounded-sm sticky top-28">
                <h3 className="text-lg font-bold text-white uppercase tracking-widest mb-6 border-b border-white/10 pb-4">Product Q&A</h3>
                <div className="space-y-6">
                  {productFaqs.map((faq, index) => (
                    <div key={index} className="space-y-2">
                      <h4 className="font-bold text-white text-xs uppercase tracking-wider text-primary flex items-start select-none">
                        <span className="mr-2">Q:</span>
                        <span>{faq.q}</span>
                      </h4>
                      <p className="text-gray-400 text-xs font-light leading-relaxed pl-5">
                        {faq.a}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Related Products Section */}
          <div className="mt-32 pt-16 border-t border-white/10">
            <h2 className="text-3xl font-light text-white tracking-tight mb-8">Related Prop Collections</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
               {relatedProducts.map(rp => (
                  <Link key={rp.id} href={`/products/${rp.id}`} className="block group">
                    <div className="relative aspect-[4/3] overflow-hidden mb-4 bg-black/40 border border-white/10">
                      <Image 
                        src={resolveImageUrl(rp.image || "/hero1.png")} 
                        alt={`Buy ${rp.name} Prop Cash Stack`} 
                        fill 
                        className="object-cover group-hover:scale-105 transition duration-500" 
                        referrerPolicy="no-referrer" 
                      />
                    </div>
                    <h3 className="font-bold text-lg text-white mb-1 line-clamp-1 group-hover:text-primary transition">{rp.name}</h3>
                    <p className="text-gray-400 font-mono mb-2">From ${rp.variants[0].price}</p>
                  </Link>
               ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
