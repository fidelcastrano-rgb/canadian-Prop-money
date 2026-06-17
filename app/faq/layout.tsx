import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Legal & Product FAQ | Canadian Prop Money',
  description: 'Find answers about Canadian Prop Money. Read comprehensive information on federal law compliance (Section 457), synthetic polymer paper characteristics, and shipping speeds.',
  alternates: {
    canonical: 'https://canadianpropmoney.org/faq',
  }
};

export default function FAQLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
