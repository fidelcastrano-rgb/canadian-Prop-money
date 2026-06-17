import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Track Prop Currency Order | Canadian Prop Money',
  description: 'Canadian Prop Money Cinematic Dispatch Tracking Panel.',
  alternates: {
    canonical: 'https://canadianpropmoney.org/track-order',
  }
};

export default function TrackOrderLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
