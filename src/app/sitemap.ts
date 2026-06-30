import { MetadataRoute } from 'next';
import { prisma } from '@/lib/prisma';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://chery.co.id';

  // Static pages
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/models`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/find-your-chery`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/dealers`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/news`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/faq`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
  ];

  try {
    // Dynamic pages from database
    const [vehicles, news, dealers] = await Promise.all([
      prisma.vehicle.findMany({
        where: { active: true },
        select: { slug: true, updatedAt: true },
      }),
      prisma.news.findMany({
        where: { status: 'PUBLISHED' },
        select: { slug: true, publishDate: true },
      }),
      prisma.dealer.findMany({
        where: { active: true },
        select: { slug: true, updatedAt: true },
      }),
    ]);

    const vehiclePages = vehicles.map((vehicle) => ({
      url: `${baseUrl}/models/${vehicle.slug}`,
      lastModified: vehicle.updatedAt,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    }));

    const newsPages = news.map((article) => ({
      url: `${baseUrl}/news/${article.slug}`,
      lastModified: article.publishDate || new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    }));

    const dealerPages = dealers.map((dealer) => ({
      url: `${baseUrl}/dealers/${dealer.slug}`,
      lastModified: dealer.updatedAt,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    }));

    return [...staticPages, ...vehiclePages, ...newsPages, ...dealerPages];
  } catch (error) {
    console.error('Error generating sitemap:', error);
    return staticPages;
  }
}