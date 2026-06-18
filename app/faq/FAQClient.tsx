'use client';

import { useState } from 'react';
import { ChevronDown, Search } from 'lucide-react';
import { FAQS, CATEGORIES } from './faqData';

export function FAQClient() {
  const [search, setSearch] = useState('');
  const [activeCat, setActiveCat] = useState('All');

  const filteredFaqs = FAQS.filter(faq => {
    const matchesSearch = faq.q.toLowerCase().includes(search.toLowerCase()) || faq.a.toLowerCase().includes(search.toLowerCase());
    const matchesCat = activeCat === 'All' || faq.cat === activeCat;
    return matchesSearch && matchesCat;
  });

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
       <div className="lg:col-span-1">
          <div className="sticky top-28 bg-white/5 border border-white/10 p-4">
             <h2 className="text-[10px] font-bold text-white uppercase tracking-widest mb-4 px-3">Categories</h2>
             <ul className="space-y-1">
               {CATEGORIES.map(cat => (
                  <li key={cat}>
                     <button 
                       onClick={() => setActiveCat(cat)}
                       className={`w-full text-left px-3 py-2 text-[10px] uppercase tracking-widest font-bold transition ${
                         activeCat === cat ? 'bg-primary text-white' : 'text-gray-400 hover:bg-white/10 hover:text-white'
                       }`}
                     >
                       {cat}
                     </button>
                  </li>
               ))}
             </ul>
          </div>
       </div>
       
       <div className="lg:col-span-3 space-y-4">
          <div className="relative max-w-xl mb-8">
             <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5" />
             <input 
               type="text" 
               placeholder="Search FAQs..." 
               value={search}
               onChange={(e) => setSearch(e.target.value)}
               className="w-full pl-12 pr-4 py-4 bg-transparent border border-white/10 focus:border-white focus:ring-1 focus:ring-white outline-none transition text-white text-sm"
             />
          </div>

          {filteredFaqs.length > 0 ? (
            filteredFaqs.map((faq, idx) => (
              <details key={idx} className="group bg-white/5 border border-white/10 open:bg-black/40 transition">
                <summary className="flex items-center justify-between p-6 cursor-pointer text-sm font-bold uppercase tracking-widest select-none text-white">
                  {faq.q}
                  <ChevronDown className="w-5 h-5 text-gray-500 group-open:rotate-180 transition" />
                </summary>
                <div className="px-6 pb-6 text-gray-400 text-sm leading-relaxed border-t border-white/5 pt-4">
                  {faq.a}
                   <div className="mt-4 inline-block px-2 py-1 bg-white/10 text-[9px] uppercase tracking-widest font-bold text-gray-400">
                     {faq.cat}
                   </div>
                </div>
              </details>
            ))
          ) : (
            <div className="text-center py-12 bg-white/5 border border-white/10">
               <p className="text-gray-500 text-xs font-bold uppercase tracking-widest">No FAQs found for your search.</p>
            </div>
          )}
       </div>
    </div>
  );
}
