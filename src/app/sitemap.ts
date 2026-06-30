import { MetadataRoute } from 'next';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';
export const revalidate = 3600; // optional: cache 1 hour

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://chery.co.id';

  const staticPages: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified: new Date(), changeFrequency: 'daily', priority: 1 },
    { url: `${baseUrl}/models`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${baseUrl}/find-your-chery`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: `${baseUrl}/dealers`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: `${baseUrl}/news`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.7 },
    { url: `${baseUrl}/faq`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
    { url: `${baseUrl}/contact`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
  ];

  try {
    const [vehicles, news, dealers] = await Promise.all([
      prisma.vehicle.findMany({ where: { active: true }, select: { slug: true, updatedAt: true } }),
      prisma.news.findMany({ where: { status: 'PUBLISHED' }, select: { slug: true, publishDate: true } }),
      prisma.dealer.findMany({ where: { active: true }, select: { slug: true, updatedAt: true } }),
    ]);

    return [
      ...staticPages,
      ...vehicles.map((v) => ({
        url: `${baseUrl}/models/${v.slug}`,
        lastModified: v.updatedAt,
        changeFrequency: 'weekly' as const,
        priority: 0.8,
      })),
      ...news.map((n) => ({
        url: `${baseUrl}/news/${n.slug}`,
        lastModified: n.publishDate || new Date(),
        changeFrequency: 'monthly' as const,
        priority: 0.6,
      })),
      ...dealers.map((d) => ({
        url: `${baseUrl}/dealers/${d.slug}`,
        lastModified: d.updatedAt,
        changeFrequency: 'monthly' as const,
        priority: 0.7,
      })),
    ];
  } catch {
    return staticPages;
  }
}