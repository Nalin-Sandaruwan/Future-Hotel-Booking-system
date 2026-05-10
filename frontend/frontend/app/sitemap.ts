import { MetadataRoute } from 'next';
import { suites } from '@/lib/data/suites';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://coastalcove.com';

  // Dynamic suite routes
  const suiteUrls = suites.map((suite) => ({
    url: `${baseUrl}/suites/${suite.id}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  // Static routes
  const staticUrls = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/suites`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/story`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/gallery`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.6,
    },
    {
      url: `${baseUrl}/wellness`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    },
  ];

  return [...staticUrls, ...suiteUrls];
}
