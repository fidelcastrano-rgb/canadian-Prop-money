import type {Metadata} from 'next';
import { Syne, DM_Sans } from 'next/font/google';
import './globals.css';

import { CartProvider } from '@/lib/store';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { WhatsAppFloat } from '@/components/WhatsAppFloat';
import { OrderBuilder } from '@/components/OrderBuilder';

const syne = Syne({ subsets: ['latin'], variable: '--font-syne' });
const dmSans = DM_Sans({ subsets: ['latin'], variable: '--font-dm-sans' });

export const metadata: Metadata = {
  title: 'Hollywood-Grade Movie Cash | Canadian Prop Money Systems',
  description: "Canada's Most Trusted Realistic Currency Re-Printer Supplier. Buy high-fidelity polymer movie prop money stacks with tactile alterations & non-glare coatings.",
  keywords: [
    "Canadian Prop Money", 
    "Prop Money Canada", 
    "Movie Cash", 
    "Legal Prop Bills", 
    "Polymer Prop Money", 
    "Realistic Canadian Money", 
    "Fake Money for Film", 
    "Prop Money for Music Videos", 
    "High-Fidelity Prop Currency",
    "Section 411 Compliant Prop Money"
  ],
  metadataBase: new URL('https://canadianpropmoney.org'),
  alternates: {
    canonical: 'https://canadianpropmoney.org',
  },
  openGraph: {
    title: 'Hollywood-Grade Movie Cash | Canadian Prop Money Systems',
    description: "Canada's Most Trusted Realistic Currency Re-Printer Supplier. Buy high-fidelity polymer movie prop money stacks with tactile alterations & non-glare coatings.",
    url: 'https://canadianpropmoney.org',
    type: 'website',
    images: [{ url: '/wunba.webp' }]
  },
  twitter: {
    card: 'summary_large_image',
    images: ['/wunba.webp'],
  },
  icons: {
    icon: [
      { url: '/wunba.webp', type: 'image/webp' }
    ],
    shortcut: '/wunba.webp',
    apple: '/wunba.webp',
  }
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en" className={`${syne.variable} ${dmSans.variable}`}>
      <body className="font-dm-sans min-h-screen flex flex-col" suppressHydrationWarning>
        <CartProvider>
          <Navbar />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
          <OrderBuilder />
          <WhatsAppFloat />
        </CartProvider>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "Canadian Prop Money",
              "url": "https://canadianpropmoney.org",
              "logo": "https://canadianpropmoney.org/wunba.webp",
              "description": "Canada's Most Trusted Realistic Currency Re-Printer Supplier. Buy high-fidelity polymer movie prop money stacks with tactile alterations & non-glare coatings.",
              "contactPoint": {
                "@type": "ContactPoint",
                "telephone": "+1-843-732-0661",
                "contactType": "customer service",
                "contactOption": "TollFree",
                "areaServed": ["CA", "US"],
                "availableLanguage": "en"
              }
            })
          }}
        />
      </body>
    </html>
  );
}
