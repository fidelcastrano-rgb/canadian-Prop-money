import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Canadian Prop Money',
    short_name: 'Prop Money',
    description: "Canada's Most Trusted Realistic Currency Re-Printer",
    start_url: '/',
    display: 'standalone',
    background_color: '#000000',
    theme_color: '#000000',
    icons: [
      {
        src: '/wunba.webp',
        sizes: '192x192',
        type: 'image/webp',
      },
      {
        src: '/wunba.webp',
        sizes: '512x512',
        type: 'image/webp',
      },
    ],
  };
}
