import { BLOG_ARTICLES } from '@/lib/blogs';
import { notFound } from 'next/navigation';
import Link from 'next/link';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return BLOG_ARTICLES.map((article) => ({
    slug: article.slug,
  }));
}

export async function generateMetadata({ params }: Props) {
  const resolvedParams = await params;
  const article = BLOG_ARTICLES.find((b) => b.slug === resolvedParams.slug);
  if (!article) return { title: 'Not Found | Canadian Prop Money Systems' };

  return {
    title: `${article.ogTitle || article.title} | Canadian Prop Money`,
    description: article.ogDescription || article.description,
    alternates: {
      canonical: `https://canadianpropmoney.org/blog/${article.slug}`,
    },
    openGraph: {
      title: article.ogTitle || article.title,
      description: article.ogDescription || article.description,
      type: 'article',
      url: `https://canadianpropmoney.org/blog/${article.slug}`,
      images: article.ogImage ? [{ url: article.ogImage }] : [],
    }
  };
}

export default async function BlogArticlePage({ params }: Props) {
  const resolvedParams = await params;
  const article = BLOG_ARTICLES.find((b) => b.slug === resolvedParams.slug);

  if (!article) {
    notFound();
  }

  // Find related articles (the other ones)
  const related = BLOG_ARTICLES.filter(b => b.slug !== article.slug).slice(0, 3);

  return (
    <div className="bg-background min-h-screen pt-12 pb-24 text-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb path */}
        <div className="text-xs uppercase tracking-widest text-gray-500 mb-8 flex items-center gap-2">
          <Link href="/" className="hover:text-primary transition">Home</Link>
          <span>/</span>
          <Link href="/blog" className="hover:text-primary transition">Blog</Link>
          <span>/</span>
          <span className="text-white line-clamp-1">{article.title}</span>
        </div>

        {/* Article Header */}
        <div className="mb-12 border-b border-white/10 pb-8">
          <span className="text-[10px] font-bold text-primary uppercase tracking-widest bg-primary/10 px-3 py-1.5 rounded-sm">Set Reference</span>
          <h1 className="text-4xl sm:text-5xl font-light text-white tracking-tight mt-6 mb-4 leading-tight">{article.title}</h1>
          <p className="text-xs text-gray-500 uppercase tracking-widest font-mono">Published: {article.date} | Prop Journals Section</p>
        </div>

        {/* Scraped Article HTML Body rendered color-safe */}
        <div className="prose prose-invert max-w-none text-gray-300 leading-relaxed space-y-6 text-base tracking-wide
          [&_h1]:text-2xl [&_h1]:font-light [&_h1]:text-white [&_h1]:uppercase [&_h1]:tracking-wide [&_h1]:pt-6
          [&_h2]:text-xl [&_h2]:font-bold [&_h2]:text-white [&_h2]:uppercase [&_h2]:tracking-wide [&_h2]:pt-6 [&_h2]:border-b [&_h2]:border-white/5 [&_h2]:pb-2
          [&_h3]:text-lg [&_h3]:font-bold [&_h3]:text-white [&_h3]:pt-4
          [&_p]:text-gray-400 [&_p]:leading-relaxed
          [&_li]:list-disc [&_li]:ml-6 [&_li]:text-gray-400 [&_li]:pb-1
          [&_strong]:text-white [&_strong]:font-semibold
          [&_a]:text-primary [&_a]:underline
          "
          dangerouslySetInnerHTML={{ __html: article.content }}
        />

        {/* Blog Footer Back block */}
        <div className="mt-16 pt-12 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-6">
          <Link href="/blog" className="px-6 py-3 bg-white/5 border border-white/10 text-xs font-bold uppercase tracking-widest text-white hover:bg-white/15 hover:border-white/20 transition">
            &larr; Back to Journal List
          </Link>
          <Link href="/products" className="px-6 py-3 bg-primary text-white text-xs font-bold uppercase tracking-widest hover:bg-primary/90 transition text-center">
            Express Order Prop Cash &rarr;
          </Link>
        </div>

        {/* Related Posts section */}
        <div className="mt-24 pt-12 border-t border-white/10">
          <h3 className="text-sm font-bold uppercase tracking-widest text-white mb-6">More Production Insights</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
             {related.map(r => (
               <Link key={r.slug} href={`/blog/${r.slug}`} className="block group">
                 <div className="bg-white/5 p-6 border border-white/10 group-hover:border-white/20 transition h-full flex flex-col justify-between">
                   <div>
                     <h4 className="text-base font-light text-white group-hover:text-primary transition line-clamp-2 mb-2">{r.title}</h4>
                     <p className="text-gray-400 text-xs line-clamp-3 leading-relaxed mb-4">{r.description}</p>
                   </div>
                   <span className="text-[9px] font-bold text-primary uppercase tracking-widest group-hover:underline">Read Article &rarr;</span>
                 </div>
               </Link>
             ))}
          </div>
        </div>

      </div>
    </div>
  );
}
