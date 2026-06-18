import Link from 'next/link';
import Image from 'next/image';
import { PRODUCTS } from '@/lib/data';
import { ProductCard } from '@/components/ProductCard';
import { 
  ShieldCheck, Zap, Globe, Lock, ChevronDown, CheckCircle, 
  Fingerprint, Search, Eye, Scale, Video, Award, Aperture, 
  Banknote, HelpCircle, FileCheck, Anchor, Truck
} from 'lucide-react';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen font-dm-sans">
      {/* 1. Scrolling Marquee */}
      <div className="bg-primary text-white py-2 overflow-hidden whitespace-nowrap group text-sm font-bold tracking-widest flex">
        <div className="animate-marquee inline-block relative pr-10">
          🔥 FREE SHIPPING TO US & CANADA ON ORDERS OVER $1000 &nbsp; • &nbsp; 🎬 100% LEGAL FOR MOTION PICTURE USE &nbsp; • &nbsp; ⚡ 24HR DISCREET DISPATCH &nbsp; • &nbsp; 🏆 CANADA&apos;S MOST TRUSTED RE-PRINTER 
          &nbsp; • &nbsp; 🔥 FREE SHIPPING TO US & CANADA ON ORDERS OVER $1000 &nbsp; • &nbsp; 🎬 100% LEGAL FOR MOTION PICTURE USE &nbsp; • &nbsp; ⚡ 24HR DISCREET DISPATCH &nbsp; • &nbsp; 🏆 CANADA&apos;S MOST TRUSTED RE-PRINTER
        </div>
      </div>

      {/* 2. Hero Section */}
      <section className="relative pt-16 pb-24 lg:pt-32 lg:pb-32 overflow-hidden bg-background border-b border-white/5">
        <div className="absolute top-0 right-0 w-3/4 h-3/4 bg-primary/5 rounded-bl-[100%] z-0 blur-3xl opacity-50" />
        <div className="absolute top-1/2 left-0 w-1/2 h-1/2 bg-accent/5 rounded-tr-[100%] z-0 blur-3xl opacity-50" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="text-left space-y-8">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 rounded-full shadow-sm">
                <span className="flex h-2 w-2 rounded-full bg-green-500 animate-pulse"></span>
                <span className="text-[10px] font-bold text-gray-200 tracking-widest uppercase">AVAILABLE & IN STOCK GLOBALLY</span>
              </div>
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-light text-white leading-[1.1] tracking-tight">
                Authentic Look. <br />
                <span className="text-primary font-bold italic tracking-tighter">Camera Ready.</span>
              </h1>
              <p className="text-lg text-gray-400 max-w-lg leading-relaxed font-light">
                Canada&apos;s most premium and legally compliant realistic prop money. Engineered from the ground up for film, television, and visual arts professionals who demand absolute perfection on screen and complete peace of mind behind the scenes. 
                <br/><br/>
                Our proprietary printing techniques and unyielding commitment to legal compliance have made us the gold standard in North American production sets. We engineer an illusion that holds up to the most scrutinizing 4K and 8K cinematic lenses.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Link href="/products" className="py-4 px-10 bg-white text-black text-xs font-bold uppercase tracking-widest hover:bg-gray-200 transition-colors text-center border border-white">
                  View Collections
                </Link>
                <Link href="#engineering" className="py-4 px-10 bg-black/50 text-white text-xs font-bold uppercase tracking-widest hover:bg-white/10 transition-colors text-center border border-white/20">
                  Read The Science
                </Link>
              </div>
              <div className="flex items-center gap-6 pt-8 opacity-60 grayscale text-gray-400">
                <span className="text-[10px] uppercase tracking-widest font-bold">Featured On:</span>
                <div className="flex gap-6 font-bold text-lg text-white font-syne">
                  <span>NETFLIX</span>
                  <span>HBO</span>
                  <span>PRIME</span>
                </div>
              </div>
            </div>
            
            <div className="relative flex justify-center lg:justify-end">
               <div className="relative w-full max-w-lg aspect-[4/3] rounded-sm overflow-hidden shadow-[0_0_50px_rgba(220,38,38,0.1)] border border-white/10">
                 <Image src="/hero1.png" alt="Premium Canadian Prop Money Stack" fill className="object-cover hover:scale-105 transition-transform duration-1000" referrerPolicy="no-referrer" priority />
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Horizontal Scroll Strip (Features) */}
      <section className="bg-black py-16 border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12 text-center text-white">
            <div className="group">
               <ShieldCheck className="w-8 h-8 text-primary mx-auto mb-4 group-hover:scale-110 transition-transform duration-300" />
               <h3 className="text-xs font-bold uppercase tracking-widest mb-2 font-syne">100% Legal Framework</h3>
               <p className="text-sm text-gray-500 leading-relaxed font-light">Meticulously engineered and routinely audited to remain fully compliant with strict Canadian federal laws.</p>
            </div>
            <div className="group">
               <Eye className="w-8 h-8 text-primary mx-auto mb-4 group-hover:scale-110 transition-transform duration-300" />
               <h3 className="text-xs font-bold uppercase tracking-widest mb-2 font-syne">Hyper-Realism</h3>
               <p className="text-sm text-gray-500 leading-relaxed font-light">Dual-sided, high-fidelity prints replicating micro-textures designed specifically for extreme close-up shots.</p>
            </div>
             <div className="group">
               <Globe className="w-8 h-8 text-primary mx-auto mb-4 group-hover:scale-110 transition-transform duration-300" />
               <h3 className="text-xs font-bold uppercase tracking-widest mb-2 font-syne">Global Distribution</h3>
               <p className="text-sm text-gray-500 leading-relaxed font-light">Fast, entirely discreet shipping across North America and international destinations directly to your studio.</p>
            </div>
             <div className="group">
               <Lock className="w-8 h-8 text-primary mx-auto mb-4 group-hover:scale-110 transition-transform duration-300" />
               <h3 className="text-xs font-bold uppercase tracking-widest mb-2 font-syne">Encrypted Checkout</h3>
               <p className="text-sm text-gray-500 leading-relaxed font-light">We support secure Cryptocurrency (Bitcoin, ETH), Zelle, Apple Cash & standard E-Transfer payments.</p>
            </div>
        </div>
      </section>

      {/* 4. The Engineering Behind the Illusion */}
      <section id="engineering" className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-16">
            <div className="lg:w-1/2 relative aspect-square w-full max-w-lg mx-auto order-2 lg:order-1">
              <Image src="/images/OIP.webp" alt="Precision printing details" fill className="object-cover shadow-2xl border border-white/5 opacity-90" referrerPolicy="no-referrer" />
              <div className="absolute -bottom-8 -right-8 bg-black p-8 shadow-2xl border border-white/10 max-w-xs hidden md:block">
                <Search className="w-6 h-6 text-primary mb-4" />
                <p className="text-sm font-bold tracking-widest uppercase text-white mb-2 font-syne">Micro-Detailing</p>
                <p className="text-sm text-gray-400 font-light leading-relaxed">Our offset prints maintain complex structural integrity, line density, and absolute color accuracy even when scrutinized under extreme 4K macro lenses.</p>
              </div>
            </div>
            <div className="lg:w-1/2 space-y-6 order-1 lg:order-2">
              <span className="text-[10px] font-bold uppercase tracking-widest text-primary border border-primary/20 px-3 py-1 bg-primary/5">Methodology</span>
              <h2 className="text-4xl lg:text-5xl font-light text-white tracking-tight leading-[1.2]">The Engineering Behind the Cinematic Illusion.</h2>
              
              <div className="space-y-4 text-base text-gray-400 font-light leading-relaxed">
                <p>
                  Creating convincing motion picture currency is an intricate, highly specialized balance between achieving staggering hyper-realism for the camera and adhering to the strict, uncompromising legal constraints set forth by federal authorities. At Canadian Prop Money, we don&apos;t just hit &quot;print&quot; on commercial office equipment. We utilize state-of-the-art, industrial-grade offset presses and specialized, heavyweight textured synthetic paper stocks. Our goal is to replicate the exact dimensions, highly specific color profiles, and overall visual weight of authentic Canadian currency.
                </p>
                <p>
                  When a lead actor holds a stack of our prop money, they immediately feel the physical difference. Authentic Canadian money has transitioned entirely to polymer—a complex, plastic-like material that possesses unique tactile qualities and very specific visual behaviors. Replicating this without actually using federally restricted polymer necessitates intense material engineering. 
                </p>
                <p>
                  We have successfully developed a unique synthetic paper blend that provides a similar rigidity, thickness, and acoustic &quot;snap&quot; to genuine polymer. This ensures that the bills sound absolutely authentic when they are riffled, aggressively counted, or dropped sharply onto a table during a critical scene. This physical accuracy is rarely considered by amateur printers, yet it is absolutely critical for actors who rely on tactile feedback to deliver a convincing, immersive performance.
                </p>
              </div>

              <div className="pt-6 border-t border-white/10 mt-8">
                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="flex gap-4">
                      <Aperture className="w-6 h-6 text-primary shrink-0" />
                      <div>
                        <h4 className="text-sm font-bold text-white uppercase tracking-widest mb-1">Pantone Spot Colors</h4>
                        <p className="text-xs text-gray-500 font-light leading-relaxed">We bypass standard CMYK blending, opting for precise spot-color matching to ensure the iconic hues of Canadian notes remain perfectly accurate.</p>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <CheckCircle className="w-6 h-6 text-primary shrink-0" />
                      <div>
                        <h4 className="text-sm font-bold text-white uppercase tracking-widest mb-1">Acoustic Snap</h4>
                        <p className="text-xs text-gray-500 font-light leading-relaxed">The synthetic fibrous mix guarantees the prop money sounds completely authentic on high-end boom mics during handling.</p>
                      </div>
                    </div>
                 </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. The Science of Color / Lighting */}
      <section className="py-24 bg-black border-y border-white/5 relative overflow-hidden">
         <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-primary/5 to-transparent z-0 blur-3xl opacity-30" />
         
         <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
            <Video className="w-12 h-12 text-primary mx-auto mb-6 opacity-80" />
            <h2 className="text-4xl lg:text-5xl font-light text-white tracking-tight leading-tight mb-8">
               The Science of Color <br/>& On-Set Lighting Response
            </h2>
            <div className="space-y-6 text-base text-gray-400 font-light leading-relaxed text-left md:text-center max-w-3xl mx-auto">
               <p>
                 One of the most persistent, frustrating issues production designers and directors of photography face is the reflective glare of standard printed money under intense studio lighting arrays. Authentic Canadian currency, manufactured using specialized polymer, has distinct light-scattering properties that are notoriously difficult to emulate. Standard glossy paper, or even typical consumer-grade matte paper, fails instantly on camera. It catches the ambient light directly, creating artificial specular hotspots that immediately break the illusion of reality for the audience.
               </p>
               <p>
                 To aggressively combat this, the engineering team at Canadian Prop Money has painstakingly developed a proprietary, multi-layered non-glare finish that actively diffuses harsh lighting. This complex chemical coating is applied during the very final stages of the offset printing process and is specifically formulated to interact seamlessly with professional cinematic lighting setups. 
               </p>
               <p className="text-white font-normal p-6 border-l-2 border-primary bg-white/5 text-left italic">
                 &quot;Whether your Director of Photography is shooting under a blazing 18K HMI on a massive soundstage, utilizing advanced LED volume walls for virtual production, or relying entirely on natural light for a gritty, run-and-gun indie short film—our prop money is engineered to maintain its intended color temperature, depth, and texture without blinding the lens.&quot;
               </p>
               <p>
                 This microscopic diffusion layer also significantly enhances the micro-detailing of our prints. Intricate geometric patterns, complex line work, and the architectural representations on the faces of the bills remain remarkably crisp and easily resolvable, ensuring that your camera sensor captures the immense depth of the engraving-style printing without being overwhelmed by reflection.
               </p>
            </div>
         </div>
      </section>

      {/* 6. Industry Applications */}
      <section className="py-24 bg-background">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16 max-w-3xl mx-auto">
               <span className="text-[10px] font-bold uppercase tracking-widest text-primary border border-primary/20 px-3 py-1 bg-primary/5">Versatility</span>
               <h2 className="text-4xl lg:text-5xl font-light text-white tracking-tight mt-4 mb-6">Industry Applications:<br/>Where Our Props Excel</h2>
               <p className="text-gray-400 font-light leading-relaxed">
                 The sheer versatility, tactile safety, and unparalleled visual quality of our prop currency have led to its widespread adoption across a diverse spectrum of professional and corporate industries.
               </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
               <div className="bg-white/5 border border-white/5 p-8 lg:p-10 hover:border-white/20 transition-colors">
                  <FilmIcon />
                  <h3 className="text-xl font-bold text-white uppercase tracking-widest mb-4 font-syne mt-6">Motion Pictures & Television</h3>
                  <p className="text-sm text-gray-400 font-light leading-relaxed">
                    We are the trusted, go-to source for art directors, production designers, and prop masters working on major streaming platforms, network television series, and theatrical feature films. Our seamlessly believable stacks sit convincingly inside open briefcases, high-security bank vaults, and high-tension dramatic exchange scenes. They are designed to hold up to the scrutiny of sweeping cinematic lenses and extended, unbroken screentime.
                  </p>
               </div>
               
               <div className="bg-white/5 border border-white/5 p-8 lg:p-10 hover:border-white/20 transition-colors">
                  <MusicIcon />
                  <h3 className="text-xl font-bold text-white uppercase tracking-widest mb-4 font-syne mt-6">Music Videos & Media</h3>
                  <p className="text-sm text-gray-400 font-light leading-relaxed">
                    The music industry frequently demands high visual impact to convey themes of success, wealth, and power. Our prop money provides the necessary visual flex needed for high-energy music videos, allowing directors to feature sprawling piles of cash or dynamic, slow-motion &quot;make it rain&quot; sequences without risking the severe safety hazards of having massive amounts of actual, spendable cash unsecured on location.
                  </p>
               </div>

               <div className="bg-white/5 border border-white/5 p-8 lg:p-10 hover:border-white/20 transition-colors">
                  <Aperture className="w-8 h-8 text-primary" />
                  <h3 className="text-xl font-bold text-white uppercase tracking-widest mb-4 font-syne mt-6">Photography & Commercials</h3>
                  <p className="text-sm text-gray-400 font-light leading-relaxed">
                    Still photography requires an entirely different level of perfection; every millimeter of the frame is heavily analyzed in post. Our props are perfect for high-fashion editorial shoots, commercial advertising campaigns, and massive financial service marketing materials. They provide the necessary aesthetic of commerce without the tremendous liability and insurance nightmares associated with renting real currency.
                  </p>
               </div>

               <div className="bg-white/5 border border-white/5 p-8 lg:p-10 hover:border-white/20 transition-colors">
                  <ShieldCheck className="w-8 h-8 text-primary" />
                  <h3 className="text-xl font-bold text-white uppercase tracking-widest mb-4 font-syne mt-6">Financial Training & Security</h3>
                  <p className="text-sm text-gray-400 font-light leading-relaxed">
                    Beyond the entertainment sector, our products serve a vital role in practical education. They are utilized heavily by law enforcement training academies, armored transport security firms, and corporate banking institutions for handling simulations, robbery response tactical training, and visual spatial awareness. Trainees can experience the physical volume and logistics of high-value scenarios safely.
                  </p>
               </div>
            </div>
         </div>
      </section>

      {/* 7. Products Grid */}
      <section className="py-24 bg-black border-y border-white/10" id="products">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="text-center mb-16 max-w-2xl mx-auto">
             <span className="text-[10px] font-bold uppercase tracking-widest text-primary border border-primary/20 px-3 py-1 bg-primary/5">Catalogue</span>
             <h2 className="text-4xl lg:text-5xl font-light text-white mb-6 tracking-tight mt-4">Our Currency Collections</h2>
             <p className="text-gray-400 font-light leading-relaxed">Select from our perfectly replicated Canadian currency sets. Available in individual bundled stacks, massive duffel fills, or production-scale facility bundles.</p>
           </div>
           
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
             {PRODUCTS.map(product => (
               <ProductCard key={product.id} product={product} />
             ))}
           </div>
        </div>
      </section>

      {/* 8. Rigorous Legal Compliance */}
      <section className="py-24 bg-background">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row gap-16 items-center">
               <div className="lg:w-1/2 order-2 lg:order-1 space-y-6">
                  <Scale className="w-10 h-10 text-primary mb-2" />
                  <h2 className="text-4xl lg:text-5xl font-light text-white tracking-tight leading-tight">Rigorous Legal Compliance & Section 411 Alignment.</h2>
                  
                  <div className="space-y-4 text-sm text-gray-400 font-light leading-relaxed">
                     <p>
                       The creation, distribution, and possession of reproduced currency is a heavily monitored, strictly regulated industry across all global jurisdictions. We take our legal responsibilities and the protection of our clients with the absolute utmost seriousness. Ignorance of the law is not a defense, and we proudly ensure our clients never have to worry about the legality of their set decorations.
                     </p>
                     <p>
                       Every single prototype and production design created by Canadian Prop Money is painstakingly analyzed, reviewed by external legal parameters, and continuously updated to ensure complete, unquestionable adherence to <strong className="text-white font-medium">Section 411 of the Criminal Code of Canada</strong>, as well as aligning with the strictest international guidelines for motion picture currency reproduction (including United States Secret Service guidelines for stateside productions importing our products).
                     </p>
                     <p>
                       Our proprietary designs feature an array of mandatory visual alterations that satisfy all legal requirements while maintaining striking cinematic realism. These modifications include necessary dimensional adjustments, altered historical portraits with subtle artistic modifications, fictionalized issuing authorities, modified serial numbers that flag immediately in banking systems, and distinct, legally mandated &quot;FOR MOTION PICTURE USE ONLY&quot; labeling prominent on both the obverse and reverse sides of every bill.
                     </p>
                     <p>
                       Crucially, all sophisticated security features present on real Canadian polymer notes—such as the complex transparent holographic windows, color-shifting metallic inks, and raised tactile micro-printing—are strictly omitted. We replace these with highly detailed, flat-printed representations that look utterly convincing to the camera but possess zero functional security features when handled by authorities.
                     </p>
                  </div>
                  <div className="mt-8 bg-white/5 border border-white/10 p-6 flex gap-4 items-start">
                     <FileCheck className="w-8 h-8 text-primary shrink-0" />
                     <div>
                        <h4 className="text-sm font-bold text-white uppercase tracking-widest mb-2 font-syne">Physical Certificate of Authenticity</h4>
                        <p className="text-xs text-gray-400 font-light leading-relaxed">We provide a formal, physical COA with every bulk order. This document legally validates that the items purchased are strictly novelty props intended for production use, heavily protecting your crew, your production company, and your studio from counterfeit-related investigations, delays, or liabilities.</p>
                     </div>
                  </div>
               </div>

               <div className="lg:w-1/2 order-1 lg:order-2 w-full">
                  <div className="grid grid-cols-2 gap-4">
                     <div className="aspect-[3/4] relative rounded overflow-hidden">
                        <Image src="/images/liko.jpg" alt="Prop money close up" fill className="object-cover opacity-80 mix-blend-luminosity hover:mix-blend-normal transition-all duration-700" referrerPolicy="no-referrer" />
                        <div className="absolute inset-0 border border-white/10"></div>
                     </div>
                     <div className="grid grid-rows-2 gap-4">
                        <div className="relative rounded overflow-hidden bg-white/5 border border-white/10 flex items-center justify-center p-6 text-center">
                           <div>
                              <Fingerprint className="w-8 h-8 text-primary mx-auto mb-3" />
                              <h5 className="text-[10px] font-bold text-white uppercase tracking-widest">Altered Art</h5>
                           </div>
                        </div>
                        <div className="relative rounded overflow-hidden bg-white/5 border border-white/10 flex items-center justify-center p-6 text-center">
                           <div>
                              <Banknote className="w-8 h-8 text-primary mx-auto mb-3" />
                              <h5 className="text-[10px] font-bold text-white uppercase tracking-widest">Modified Dimensions</h5>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </section>

      {/* 9. The Durability Factor */}
      <section className="py-24 bg-black border-y border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-center">
              <div className="lg:col-span-1">
                 <h2 className="text-3xl lg:text-4xl font-light text-white tracking-tight mb-6">The Durability Factor: Built For Action.</h2>
                 <p className="text-sm text-gray-400 font-light leading-relaxed mb-8">
                   Set life is notoriously harsh on props. From being aggressively tossed onto tables during heated dramatic scenes to being forcefully squeezed into duffel bags for getaway sequences, standard commercial paper tears, crumples, flakes, and loses its structural integrity rapidly. This leads to costly continuity errors requiring frequent replacements.
                 </p>
                 <Link href="/about" className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-primary hover:text-white transition">
                   Read our full story &rarr;
                 </Link>
              </div>
              <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
                 <div className="bg-background border border-white/5 p-8">
                    <Anchor className="w-6 h-6 text-white mb-4" />
                    <h3 className="text-sm font-bold uppercase tracking-widest text-white mb-3">Tear Resistance</h3>
                    <p className="text-xs text-gray-500 font-light leading-relaxed">Our proprietary synthetic-blend stock is explicitly engineered to endure the repetitive, demanding physical rigors of multiple takes without flaking apart.</p>
                 </div>
                 <div className="bg-background border border-white/5 p-8">
                    <Zap className="w-6 h-6 text-white mb-4" />
                    <h3 className="text-sm font-bold uppercase tracking-widest text-white mb-3">UV Cured Inks</h3>
                    <p className="text-xs text-gray-500 font-light leading-relaxed">The ink is cured using specialized ultra-violet processes, meaning it heavily resists smudging from sweaty hands and doesn&apos;t crack catastrophically when folded abruptly.</p>
                 </div>
              </div>
           </div>
        </div>
      </section>

      {/* 10. Logistics & Discretion */}
      <section className="py-24 bg-background">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <Truck className="w-12 h-12 text-primary mx-auto mb-6" />
            <h2 className="text-4xl lg:text-5xl font-light text-white tracking-tight leading-tight mb-8 max-w-3xl mx-auto">
               Unmatched Logistics, Complete Discretion, & Global Distribution.
            </h2>
            <div className="space-y-6 text-base text-gray-400 font-light leading-relaxed max-w-4xl mx-auto text-left md:text-center">
               <p>
                 We intimately understand that in the fast-paced, high-stakes world of media production, discretion, reliability, and sheer speed are absolutely paramount. Call times are rigorously fixed, locations are rented by the exhausting hour, and productions simply cannot afford to wait for delayed shipping or unreliable overseas suppliers. 
               </p>
               <p>
                 To aggressively address this, we employ immediate dispatch protocols. The majority of our standard catalogue items are stocked in massive volumes and are typically processed for shipment within hours of order confirmation. We operate out of a highly secure, restricted-access primary distribution annex located in the Greater Toronto Area (GTA), providing us immediate access to major North American logistical networking hubs.
               </p>
               <p>
                 Furthermore, our packaging philosophy is centered entirely around the concept of absolute discretion. We recognize that shipping massive quantities of highly realistic prop money requires specialized handling to avoid alarming couriers, border customs agents, or nosy neighbors. All orders are meticulously vacuum-sealed tightly and shipped in rigorously unmarked, standardized, robust cardboard boxing. There are absolutely zero external logos, no vibrant branding, and no indications whatsoever of the high-value-appearing contents inside. 
               </p>
               <p>
                 From the sprawling soundstages of Hollywood North to remote indie locations, and expanding aggressively out to international studios across Europe, the United Kingdom, and Australia, our battle-tested logistics network ensures your money arrives safely, silently, and precisely when you need it for your first camera setup.
               </p>
            </div>
         </div>
      </section>

      {/* 11. Proven Data / Stats */}
      <section className="py-20 bg-black text-white border-y border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-x divide-white/5">
             <div>
               <p className="text-4xl md:text-5xl font-light text-white mb-2 font-syne">10k+</p>
               <p className="text-gray-500 tracking-widest text-[10px] font-bold uppercase">Orders Shipped Securely</p>
             </div>
             <div>
               <p className="text-4xl md:text-5xl font-light text-white mb-2 font-syne">150+</p>
               <p className="text-gray-500 tracking-widest text-[10px] font-bold uppercase">Major Studios Supplied</p>
             </div>
             <div>
               <p className="text-4xl md:text-5xl font-light text-white mb-2 font-syne">4.9/5</p>
               <p className="text-gray-500 tracking-widest text-[10px] font-bold uppercase">Average Industry Rating</p>
             </div>
             <div>
               <p className="text-4xl md:text-5xl font-light text-white mb-2 font-syne">24h</p>
               <p className="text-gray-500 tracking-widest text-[10px] font-bold uppercase">Average Dispatch Velocity</p>
             </div>
          </div>
        </div>
      </section>

      {/* 12. Expanded FAQ Accordion */}
      <section className="py-24 bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="text-center mb-16">
             <HelpCircle className="w-8 h-8 text-primary mx-auto mb-4" />
             <h2 className="text-4xl lg:text-5xl font-light text-white tracking-tight mb-4">Expanded Operational Database</h2>
             <p className="text-gray-400 font-light">Deep answers regarding our manufacturing process, legal frameworks, and shipping logistics.</p>
           </div>
           <div className="space-y-3">
              {[
                {
                  q: "Is this prop money genuinely legal to possess and use on camera?", 
                  a: "Yes, absolutely. Our prop money is engineered from the ground up strictly for motion picture, television, theatrical, and photography use. It includes vital, un-removable legal disclaimers like “FOR MOTION PICTURE USE ONLY”, altered artwork and portraits, non-standard dimensional sizing, and completely fictionalized serial numbers in direct compliance with federal laws, specifically Section 411 of the Criminal Code of Canada. It passes all legal scrutiny for production use, however, attempting to use it as real currency to defraud any individual or business is a severe federal crime."
                },
                {
                  q: "How fast is shipping to the United States and International locations?", 
                  a: "We offer highly competitive expedited shipping networks. For the United States and Canada, standard secure shipping takes 3-5 business days, while our Express logistical option arrives within 24-48 hours to most metropolitan areas. International shipping out to Europe, the UK, or Australia generally requires 5-7 business days. All shipments are highly secured, reliably tracked, and discreetly packaged without any revealing external branding or logos."
                },
                {
                  q: "Do you offer massive bulk production discounts for large film sets or vault setups?", 
                  a: "Yes, we cater strongly to major productions requiring massive physical volumes of cash for sprawling vault scenes, explosive sequences, or large-scale heist setups. For orders exceeding $5,000, we provide significant custom production quotes and dedicated logistical account management. Please contact our sales team directly via email or our 24/7 WhatsApp line for a detailed, confidential consultation regarding your specific script requirements."
                },
                {
                  q: "What payment methods are securely accepted to maintain our privacy?", 
                  a: "To ensure the absolute fastest processing times and maintain the highest levels of privacy for our production clients, we highly prefer Cryptocurrency transfers (Bitcoin, USDT, Ethereum). We also readily accept domestic Canadian E-Transfer, Zelle and Apple Cash for our US clients, as well as highly secure Credit Card processing via our encrypted merchant gateway."
                },
                {
                  q: "How realistic is the physical texture compared to modern polymer bills?", 
                  a: "Modern Canadian currency utilizes a transparent, highly tactile polymer plastic that is federally restricted and illegal to reproduce precisely. To emulate this without breaking the law, we do not use illegal polymer. Instead, we use a specifically engineered, high-grade textured synthetic paper blend. This replicates the physical stiffness, the distinct crackle, and the weight of new bills, while our proprietary matte coating accurately mimics the visual appearance of polymer on-camera, without causing the severe lighting glare that frequently ruins shots."
                },
                {
                  q: "Are the bills completely double-sided with accurate artwork on the back?", 
                  a: "Yes, all of our prop currency stacks are fully double-sided. Both the obverse (front) and reverse (back) faces feature high-resolution, legally altered artwork mirroring the themes of real currency. This ensures that the bills can be handled dynamically on screen, flipped wildly through the air, scattered across a table, or stuffed carelessly into bags without ever revealing a blank, white back to the viewing audience."
                }
              ].map((faq, idx) => (
                 <details key={idx} className="group bg-white/5 border border-white/5 rounded-none open:bg-white/10 open:border-white/20 transition-all duration-300">
                   <summary className="flex items-center justify-between p-6 lg:p-8 cursor-pointer text-sm font-bold uppercase tracking-widest select-none text-white hover:text-primary transition-colors">
                     <span className="pr-8">{faq.q}</span>
                     <ChevronDown className="w-5 h-5 text-primary shrink-0 group-open:rotate-180 transition-transform duration-300" />
                   </summary>
                   <div className="px-6 lg:px-8 pb-6 lg:pb-8 text-gray-400 text-sm font-light leading-relaxed border-t border-white/5 pt-6">
                     {faq.a}
                   </div>
                 </details>
              ))}
           </div>
        </div>
      </section>

      {/* 13. High-Impact CTA Section */}
      <section className="py-32 bg-primary relative overflow-hidden text-center text-white border-t border-white/10">
        <div className="absolute inset-0 bg-[url('/hero1.png')] opacity-10 bg-cover bg-center mix-blend-multiply" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
        
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
           <Award className="w-16 h-16 mx-auto mb-8 opacity-90" />
           <h2 className="text-4xl md:text-6xl font-light mb-8 tracking-tight font-syne">Ready for your next blockbuster production?</h2>
           <p className="text-lg md:text-xl font-light text-gray-200 mb-12 max-w-3xl mx-auto leading-relaxed">
             Equip your art department and your set with North America&apos;s finest, most legally compliant prop currency. Absolute precision, lightning-fast shipping, and complete operational discretion.
           </p>
           <div className="flex flex-col sm:flex-row justify-center gap-6">
             <Link href="/products" className="bg-white text-black text-xs uppercase tracking-widest font-bold py-5 px-12 hover:bg-gray-200 transition-transform hover:scale-105 shadow-xl shadow-black/20">
               Build Your Cache Now
             </Link>
             <a href="https://wa.me/18437320661" target="_blank" rel="noopener noreferrer" className="bg-transparent border border-white text-white hover:bg-white/10 text-xs uppercase tracking-widest font-bold py-5 px-12 transition-colors flex items-center justify-center gap-3">
               Contact 24/7 Dispatch Team
             </a>
           </div>
        </div>
      </section>
    </div>
  );
}

const FilmIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
    <rect width="18" height="18" x="3" y="3" rx="2"/><path d="M7 3v18"/><path d="M17 3v18"/><path d="M3 7.5h4"/><path d="M3 12h18"/><path d="M3 16.5h4"/><path d="M17 7.5h4"/><path d="M17 16.5h4"/>
  </svg>
)

const MusicIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
    <path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/>
  </svg>
)

