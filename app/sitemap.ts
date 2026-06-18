import { MetadataRoute } from 'next';
import { PRODUCTS } from '@/lib/data';
import { CATEGORY_SEO } from '@/lib/category-seo';
import { BLOG_ARTICLES } from '@/lib/blogs';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://canadianpropmoney.org';

  // Core Pages
  const pages = [
    '',
    '/about',
    '/contact',
    '/faq',
    '/products',
    '/blog',
    '/privacy',
    '/terms',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1.0 : 0.8,
  }));

  // Categories
  const categoryPages = Object.keys(CATEGORY_SEO).map((slug) => ({
    url: `${baseUrl}/category/${slug}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'weekly' as const,
    priority: 0.9,
  }));

  // Products
  const productPages = PRODUCTS.map((product) => ({
    url: `${baseUrl}/products/${product.id}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  // Blog Posts
  const blogPages = BLOG_ARTICLES.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.date).toISOString(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  return [...pages, ...categoryPages, ...productPages, ...blogPages];
}
