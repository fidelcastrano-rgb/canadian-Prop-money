export const metadata = {
  title: 'Privacy Policy | Canadian Prop Money',
  description: 'Privacy policy for Canadian Prop Money customers.',
  robots: { index: false, follow: false },
};

export default function PrivacyPage() {
  return (
    <div className="bg-background min-h-screen pt-12 pb-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
         <h1 className="text-4xl sm:text-5xl font-light text-white uppercase tracking-tight mb-8">Privacy Policy</h1>
         <div className="prose prose-lg prose-invert text-gray-400 max-w-none">
           <p className="text-sm">Last updated: June 2026</p>
           
           <h2 className="text-xl font-bold text-white mt-8 mb-4 tracking-wide">1. Data Collection</h2>
           <p className="text-sm leading-relaxed">We collect essential information required to process and ship your orders, including your name, email address, shipping address, and phone number. We do NOT store full payment processing details on our servers.</p>
           
           <h2 className="text-xl font-bold text-white mt-8 mb-4 tracking-wide">2. Discreet Operation</h2>
           <p className="text-sm leading-relaxed">Your privacy is our priority. Customer data is encrypted and is never sold to third parties. We utilize discreet shipping practices and do not include promotional materials that identify the nature of our business on outer packaging.</p>

           <h2 className="text-xl font-bold text-white mt-8 mb-4 tracking-wide">3. Communication</h2>
           <p className="text-sm leading-relaxed">By providing your email or WhatsApp number, you consent to receive order updates, tracking information, and essential communications regarding your purchase. We do not engage in persistent unsolicited marketing.</p>
           
           <h2 className="text-xl font-bold text-white mt-8 mb-4 tracking-wide">4. Law Enforcement Inquiries</h2>
           <p className="text-sm leading-relaxed">While we respect your privacy, we will comply fully with valid subpoenas or official requests from law enforcement agencies regarding investigations into the illicit use of our products to pass as real currency.</p>
         </div>
      </div>
    </div>
  );
}
