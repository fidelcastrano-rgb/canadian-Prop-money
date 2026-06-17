export const metadata = {
  title: 'Terms of Use | Canadian Prop Money',
  description: 'Terms and conditions for purchasing from Canadian Prop Money.',
  robots: { index: false, follow: false },
};

export default function TermsPage() {
  return (
    <div className="bg-background min-h-screen pt-12 pb-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
         <h1 className="text-4xl sm:text-5xl font-light text-white uppercase tracking-tight mb-8">Terms of Use</h1>
         <div className="prose prose-lg prose-invert text-gray-400 max-w-none">
            <p className="text-sm">Last updated: June 2026</p>
            
            <h2 className="text-xl font-bold text-white mt-8 mb-4 tracking-wide">1. Agreement of Use</h2>
            <p className="text-sm leading-relaxed">By purchasing from Canadian Prop Money, you agree to these Terms of Use. Our products are designed for entertainment, artistic production, and photographic use.</p>
            
            <h2 className="text-xl font-bold text-white mt-8 mb-4 tracking-wide">2. Refunds & Replacements</h2>
            <p className="text-sm leading-relaxed">All sales are final once dispatched. If a package is confirmed lost by the carrier, we will reshoot the order at no additional cost. We do not accept returns for change of mind due to the specific nature of these products.</p>
            
            <h2 className="text-xl font-bold text-white mt-8 mb-4 tracking-wide">3. Liability</h2>
            <p className="text-sm leading-relaxed">Canadian Prop Money holds no liability for any repercussions arising from the misuse of our products. You, the buyer, assume all responsibility for how the products are utilized after delivery.</p>
          </div>
      </div>
    </div>
  );
}
