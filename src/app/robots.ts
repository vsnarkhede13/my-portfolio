import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: '/private/', // If you ever have a hidden folder
    },
    sitemap: 'https://yourdomain.com/sitemap.xml',
  };
}