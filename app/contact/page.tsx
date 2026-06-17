import { Mail, MessageSquare, MapPin } from 'lucide-react';

export const metadata = {
  title: 'Contact Dispatch & Sales Desk | Canadian Prop Money',
  description: 'Connect with our Canadian Prop Money dispatch desk. Contact sales@canadianpropmoney.org or message us via WhatsApp at +1 (843) 732-0661 for bulk or custom inquiries.',
  alternates: {
    canonical: 'https://canadianpropmoney.org/contact',
  }
};

export default function ContactPage() {
  return (
    <div className="bg-background min-h-screen pt-12 pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-16 text-center max-w-2xl mx-auto">
            <h1 className="text-4xl sm:text-5xl font-light text-white uppercase tracking-tight mb-4">Get in Touch</h1>
            <p className="text-gray-400 text-sm leading-relaxed">
              Our production support team is available 24/7 to assist with urgent orders, custom quotes, and general inquiries.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
             
             {/* WhatsApp Card */}
             <div className="bg-white/5 p-8 border border-white/20 text-center flex flex-col items-center">
                <div className="w-16 h-16 bg-whatsapp/10 flex items-center justify-center mb-6">
                   <MessageSquare className="w-8 h-8 text-whatsapp" />
                </div>
                <h3 className="text-lg uppercase tracking-widest font-bold mb-2 text-white">WhatsApp (Preferred)</h3>
                <p className="text-gray-400 text-sm mb-6">Fastest response time. Available 24/7 for urgent orders and quick questions.</p>
                
                <a href="https://wa.me/18437320661" target="_blank" rel="noopener noreferrer" className="mt-auto w-full border border-whatsapp text-white hover:bg-whatsapp/10 text-xs uppercase tracking-widest font-bold py-4 transition">
                   Chat Now (+1 843 732-0661)
                </a>
                
                <div className="w-full mt-6 bg-black/40 border border-white/5 p-3 text-[10px] uppercase font-bold tracking-widest">
                   <div className="flex justify-between border-b border-white/10 pb-2 mb-2">
                     <span className="text-gray-500">Avg. Response:</span>
                     <span className="text-whatsapp">&lt; 15 mins</span>
                   </div>
                   <div className="flex justify-between">
                     <span className="text-gray-500">Availability:</span>
                     <span className="text-gray-300">24/7</span>
                   </div>
                </div>
             </div>

             {/* Email Card */}
             <div className="bg-white/5 p-8 border border-white/10 text-center flex flex-col items-center">
                <div className="w-16 h-16 bg-white/10 flex items-center justify-center mb-6">
                   <Mail className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-lg uppercase tracking-widest font-bold mb-2 text-white">Email Support</h3>
                <p className="text-gray-400 text-sm mb-6">Best for bulk production quotes, legal inquiries, and general support.</p>
                
                <a href="mailto:sales@canadianpropmoney.org" className="mt-auto w-full bg-white text-black hover:bg-gray-200 text-[10px] sm:text-xs uppercase tracking-widest font-bold py-4 transition">
                   sales@canadianpropmoney.org
                </a>
                
                <div className="w-full mt-6 bg-black/40 border border-white/5 p-3 text-[10px] uppercase font-bold tracking-widest">
                   <div className="flex justify-between border-b border-white/10 pb-2 mb-2">
                     <span className="text-gray-500">Avg. Response:</span>
                     <span className="text-gray-300">&lt; 2 hours</span>
                   </div>
                   <div className="flex justify-between">
                     <span className="text-gray-500">Availability:</span>
                     <span className="text-gray-300">Mon-Fri, 9am-6pm EST</span>
                   </div>
                </div>
             </div>

          </div>

          <div className="mt-20 border-t border-white/10 pt-16 max-w-4xl mx-auto">
             <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="col-span-1 md:col-span-2">
                   <h3 className="text-xs uppercase tracking-widest font-bold mb-4 text-white">Production Facility Location</h3>
                   <div className="flex gap-4">
                      <MapPin className="w-6 h-6 text-primary shrink-0 mt-1" />
                      <p className="text-gray-400 text-sm leading-relaxed">
                        We dispatch all orders globally from our primary printing annex located in the Greater Toronto Area (GTA), Ontario, Canada.<br/><br/>
                        <span className="font-bold text-red-500">In-Store Pickups Not Available:</span> For security and privacy reasons, our facility is strictly closed to the public. All orders must be placed online and will be shipped securely.
                      </p>
                   </div>
                </div>
                <div>
                   <h3 className="text-[10px] font-bold mb-4 border border-white/20 bg-white/5 px-4 py-2 uppercase tracking-widest text-gray-400 inline-block">Shipping Outposts</h3>
                   <ul className="space-y-3 font-mono text-sm text-gray-400">
                     <li className="flex items-center gap-2"><span className="w-2 h-2 bg-green-500"></span> Toronto, ON</li>
                     <li className="flex items-center gap-2"><span className="w-2 h-2 bg-green-500"></span> Vancouver, BC</li>
                     <li className="flex items-center gap-2"><span className="w-2 h-2 bg-green-500"></span> New York (Partner)</li>
                   </ul>
                </div>
             </div>
          </div>
       </div>
    </div>
  );
}
