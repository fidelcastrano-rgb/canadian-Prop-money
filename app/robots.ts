import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/admin', '/api', '/checkout', '/thank-you'],
    },
    sitemap: 'https://canadianpropmoney.org/sitemap.xml',
  };
}
