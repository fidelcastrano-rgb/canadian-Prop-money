import { BLOG_ARTICLES } from '@/lib/blogs';
import { resolveImageUrl } from '@/lib/utils';
import Link from 'next/link';
import Image from 'next/image';

export const metadata = {
  title: 'Movie Cash Sourcing & Film Design Blog | Prop Journals',
  description: 'Get the latest guides and tutorials on movie prop cash creation, polymer replication materials, filming compliance regulations, and Hollywood North set designs.',
  keywords: [
    "Prop Money Blog",
    "Movie Cash Guide",
    "Filming Compliance Regulations",
    "How to use Prop Money",
    "Movie Prop Tutorials",
    "Prop Maker Secrets"
  ]
};

export default function BlogPage() {
  return (
    <div className="bg-background min-h-screen pt-12 pb-24 font-dm-sans">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
         <h1 className="text-4xl sm:text-5xl font-light text-white uppercase tracking-tight mb-4">Production Insights & Prop Journals</h1>
         <p className="text-gray-400 max-w-2xl text-sm mb-12 leading-relaxed">
            Get the latest guides and tutorials on movie prop cash creation, polymer replication materials, filming compliance regulations, and Hollywood North set designs.
         </p>
         
         <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {BLOG_ARTICLES.map((post) => (
              <Link key={post.slug} href={`/blog/${post.slug}`} className="group block h-full">
                <div className="bg-white/5 border border-white/10 hover:border-white/20 transition hover:bg-white/[0.07] h-full flex flex-col">
                  <div className="relative aspect-[16/9] w-full overflow-hidden">
                    {post.ogImage && (
                      <Image 
                        src={resolveImageUrl(post.ogImage)} 
                        alt={post.title} 
                        fill 
                        className="object-cover group-hover:scale-105 transition-transform duration-700"
                        referrerPolicy="no-referrer"
                      />
                    )}
                  </div>
                  <div className="p-6 flex flex-col flex-grow">
                    <div className="flex justify-between items-start mb-4">
                      <span className="text-[10px] font-bold text-primary uppercase tracking-widest bg-primary/10 px-2 py-1">Set Resource</span>
                      <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">{post.date}</span>
                    </div>
                    <h2 className="text-xl text-white font-medium tracking-wide mb-3 group-hover:text-primary transition line-clamp-2">{post.title}</h2>
                    <p className="text-gray-400 text-sm mb-6 leading-relaxed line-clamp-3">{post.description}</p>
                    <div className="mt-auto text-primary text-[10px] uppercase tracking-widest font-bold flex items-center gap-1 group-hover:translate-x-1 transition-transform">Read Article &rarr;</div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
       </div>
    </div>
  );
}
