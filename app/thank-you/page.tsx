import { Suspense } from 'react';
import ThankYouClient from './ThankYouClient';

export const metadata = {
  title: 'Order Processing Confirmation | Canadian Prop Money',
  description: 'Your realistic prop currency order has been registered in our CAD dispatch system.',
  robots: { index: false, follow: false },
};

export default function ThankYouPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-background text-white flex flex-col items-center justify-center p-4">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mb-4" />
        <p className="text-gray-400 font-light uppercase tracking-widest text-xs">Loading Order Processing Dashboard...</p>
      </div>
    }>
      <ThankYouClient />
    </Suspense>
  );
}
