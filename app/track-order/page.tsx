import { Suspense } from 'react';
import TrackOrderClient from './TrackOrderClient';

export const metadata = {
  title: 'Track Your Film Prop Shipment | Canadian Prop Money',
  description: 'Query our secure database in real-time. Check production, clearance, and courier dispatch statuses for your cinematic custom replica currency order.',
  alternates: {
    canonical: 'https://canadianpropmoney.org/track-order',
  }
};

export default function TrackOrderPage() {
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
        name: 'Track Order',
        item: 'https://canadianpropmoney.org/track-order'
      }
    ]
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />

      <div className="bg-background min-h-screen pt-12 pb-24 text-white">
        <Suspense fallback={
          <div className="min-h-screen bg-background text-white flex flex-col items-center justify-center p-4">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mb-4" />
            <p className="text-gray-400 font-light uppercase tracking-widest text-xs">Connecting Tracking Panel...</p>
          </div>
        }>
          <TrackOrderClient />
        </Suspense>
      </div>
    </>
  );
}
