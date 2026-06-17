export const metadata = {
  title: 'About Our Film Props | Canadian Prop Money',
  description: 'Learn about Canadian Prop Money, established in 2012. We design ultra-realistic, compliant currency props with non-glare coatings and certificates of authenticity.',
  alternates: {
    canonical: 'https://canadianpropmoney.org/about',
  }
};

export default function AboutPage() {
  return (
    <div className="bg-background min-h-screen">
       {/* Hero */}
       <section className="bg-black text-white py-24 md:py-32 relative overflow-hidden">
         <div className="absolute inset-0 bg-[url('/images/hero1.png')] opacity-10 bg-cover bg-center mix-blend-overlay" />
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
            <h1 className="text-5xl md:text-7xl font-light mb-6 tracking-tight uppercase">The Standard in <br/><span className="text-primary font-bold italic">On-Screen Realism</span></h1>
            <p className="text-sm max-w-2xl mx-auto text-gray-400">Supplying the North American film industry with compliant, highly-detailed prop currency since 2018.</p>
         </div>
       </section>

       {/* Stats */}
       <section className="py-12 border-y border-white/5 bg-white/5">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center text-white">
              <div>
                <p className="text-4xl font-mono font-bold mb-1">2M+</p>
                <p className="text-[10px] font-bold uppercase tracking-widest text-gray-500">Notes Printed</p>
              </div>
              <div>
                <p className="text-4xl font-mono font-bold mb-1">150+</p>
                <p className="text-[10px] font-bold uppercase tracking-widest text-gray-500">Major Productions</p>
              </div>
              <div>
                <p className="text-4xl font-mono font-bold mb-1">0</p>
                <p className="text-[10px] font-bold uppercase tracking-widest text-gray-500">Legal Incidents</p>
              </div>
              <div>
                <p className="text-4xl font-mono font-bold mb-1">24hr</p>
                <p className="text-[10px] font-bold uppercase tracking-widest text-gray-500">Dispatch Time</p>
              </div>
           </div>
         </div>
       </section>
       
       <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
         <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div>
               <h2 className="text-4xl font-light text-white uppercase tracking-tight mb-6">Our Story</h2>
               <div className="space-y-4 text-gray-400 text-sm leading-relaxed">
                 <p>Canadian Prop Money began when a local independent film crew couldn&apos;t source realistic Canadian currency that looked good in extreme close-ups without breaking federal laws or stretching their budget.</p>
                 <p>We spent a year reverse-engineering the look of Canadian polymer notes—the color shifts, the micro-textures, the transparency windows—and adapting them into 100% legal, non-spendable formats.</p>
                 <p>Today, we operate industrial offset presses tailored specifically for this niche, supplying everyone from multi-million dollar Netflix original productions to local theatre groups.</p>
               </div>
            </div>
            <div className="bg-white/5 p-8 border border-white/10">
               <div className="border border-green-500/20 bg-green-900/20 p-6 mb-6">
                 <h3 className="font-bold text-green-400 text-sm uppercase tracking-widest mb-2">Certificate of Authenticity</h3>
                 <p className="text-green-200 text-[10px] uppercase leading-snug">Every order includes a physical COA stating the items are props, protecting your production crew from liability.</p>
               </div>
               <div className="border border-white/10 bg-black/40 p-6">
                 <h3 className="font-bold text-white text-sm uppercase tracking-widest mb-2">RCMP Compliant</h3>
                 <p className="text-gray-400 text-[10px] uppercase leading-snug">We maintain strict adherence to section 411 of the Criminal Code of Canada regarding the reproduction of currency.</p>
               </div>
            </div>
         </div>
       </section>
    </div>
  );
}
