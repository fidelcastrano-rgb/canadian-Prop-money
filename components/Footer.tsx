import Link from 'next/link';

export function Footer() {
  return (
    <footer className="bg-background border-t border-white/5 text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="col-span-1">
             <span className="text-xl font-semibold tracking-tight uppercase text-white mb-4 block">
                CANADIAN PROP <span className="text-primary font-bold">MONEY</span>
              </span>
            <p className="text-xs text-gray-400 mb-6">
              Canada&apos;s most trusted, realistic currency re-printer supplier. Premium modern luxury currency for film, TV, and training.
            </p>
          </div>

          {/* Products */}
          <div>
            <h4 className="text-[10px] text-gray-500 uppercase tracking-widest mb-4">Products</h4>
            <ul className="space-y-2 text-xs text-gray-300">
              <li><Link href="/products" className="hover:text-primary transition">All Prop Money</Link></li>
              <li><Link href="/products" className="hover:text-primary transition">Canadian Dollars</Link></li>
              <li><Link href="/products" className="hover:text-primary transition">US Dollars</Link></li>
              <li><Link href="/products" className="hover:text-primary transition">UK Pounds</Link></li>
              <li><Link href="/products" className="hover:text-primary transition">Australian Dollars</Link></li>
              <li><Link href="/products" className="hover:text-primary transition">Euro</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-[10px] text-gray-500 uppercase tracking-widest mb-4">Company</h4>
            <ul className="space-y-2 text-xs text-gray-300">
              <li><Link href="/about" className="hover:text-primary transition">About Us</Link></li>
              <li><Link href="/contact" className="hover:text-primary transition">Contact Support</Link></li>
              <li><Link href="/faq" className="hover:text-primary transition">FAQs</Link></li>
              <li><Link href="/blog" className="hover:text-primary transition">Blog</Link></li>
              <li><Link href="/track-order" className="hover:text-primary transition">Track Order</Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-[10px] text-gray-500 uppercase tracking-widest mb-4">Legal</h4>
            <ul className="space-y-2 text-xs text-gray-300">
              <li><Link href="/terms" className="hover:text-primary transition">Terms of Use</Link></li>
              <li><Link href="/privacy" className="hover:text-primary transition">Privacy Policy</Link></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/5 text-center text-[10px] text-gray-600 uppercase leading-tight italic">
          <p>&copy; {new Date().getFullYear()} Canadian Prop Money. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
