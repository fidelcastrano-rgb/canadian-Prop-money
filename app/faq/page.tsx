import { FAQClient } from './FAQClient';
import { FAQS } from './faqData';

export const metadata = {
  title: 'Compliant Prop Money Support & FAQs | Canadian Prop Money',
  description: 'Have questions about Bank of Canada regulations, RCMP compliance, shipping, bulk discounts, or polymer matte quality? Read our comprehensive cinematic prop currency FAQ.',
  keywords: [
    "Prop Money Rules",
    "Fake Money Laws Canada",
    "Is Prop Money Illegal",
    "RCMP Prop Money Rules",
    "Prop Maker Compliance",
    "Bank of Canada Prop Regulations",
    "Section 411 Valid Dummy Cash"
  ],
  alternates: {
    canonical: 'https://canadianpropmoney.org/faq',
  }
};

export default function FAQPage() {
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
        name: 'FAQs',
        item: 'https://canadianpropmoney.org/faq'
      }
    ]
  };

  const faqPageLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQS.map(faq => ({
      '@type': 'Question',
      name: faq.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.a
      }
    }))
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqPageLd) }} />

      <div className="bg-background min-h-screen pt-12 pb-24">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-12">
              <h1 className="text-4xl sm:text-5xl font-light text-white tracking-tight mb-4 uppercase">Support & FAQs</h1>
              <p className="text-gray-400 max-w-2xl text-sm leading-relaxed">
                Check regulations and legal guides on movie prop money use. Query billing and dispatch specifications or connect direct to our sales desk.
              </p>
            </div>

            <FAQClient />
         </div>
      </div>
    </>
  );
}
