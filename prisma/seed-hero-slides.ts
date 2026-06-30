import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('Seeding hero slides...')

  // Clear existing slides
  await prisma.heroSlide.deleteMany()

  // Create 6 hero slides
  const now = new Date()
  const slides = [
    {
      type: 'COPY',
      title: 'Experience the Future of Driving',
      subtitle: 'Global Automotive Innovation',
      description: 'Innovation meets excellence. Discover Chery\'s lineup of revolutionary vehicles engineered for the modern world — where advanced technology, intelligent safety, and bold design converge.',
      mediaUrl: '',
      ctaLabel: 'Book Test Drive',
      ctaUrl: '/contact',
      order: 1,
      active: true,
      startDate: new Date(now).toISOString(),
      endDate: null,
    },
    {
      type: 'IMAGE',
      title: 'Powerful Performance',
      subtitle: 'Engineered for Excellence',
      description: 'Feel the thrill of driving with Chery\'s advanced powertrain technology.',
      mediaUrl: '/images/hero/car-showcase.jpg',
      ctaLabel: 'Explore Models',
      ctaUrl: '/models',
      order: 2,
      active: true,
      startDate: new Date(now).toISOString(),
      endDate: null,
    },
    {
      type: 'IMAGE',
      title: 'Global Recognition',
      subtitle: 'Award-Winning Design',
      description: 'Internationally acclaimed for design, safety, and innovation.',
      mediaUrl: 'https://www.cheryinternational.com/data/cms/archive/202605(4)/root1779330261424031.jpeg',
      ctaLabel: 'Learn More',
      ctaUrl: '/technology',
      order: 3,
      active: true,
      startDate: new Date(now).toISOString(),
      endDate: null,
    },
    {
      type: 'IMAGE',
      title: 'Advanced Technology',
      subtitle: 'Smart & Connected',
      description: 'Cutting-edge infotainment and driver assistance systems.',
      mediaUrl: 'https://www.cheryinternational.com/data/cms/archive/202511(3)/root1762934983194661.jpg',
      ctaLabel: 'Discover Technology',
      ctaUrl: '/technology',
      order: 4,
      active: true,
      startDate: new Date(now).toISOString(),
      endDate: null,
    },
    {
      type: 'IMAGE',
      title: 'Safety First',
      subtitle: '5-Star NCAP Rated',
      description: 'Comprehensive safety with advanced ADAS and protective features.',
      mediaUrl: 'https://www.cheryinternational.com/data/cms/archive/202304(5)/2256/root1755240629281624.jpg',
      ctaLabel: 'Explore Safety',
      ctaUrl: '/technology',
      order: 5,
      active: true,
      startDate: new Date(now).toISOString(),
      endDate: null,
    },
    {
      type: 'VIDEO',
      title: 'Experience Chery',
      subtitle: 'Watch the Story',
      description: 'See the passion, precision, and innovation behind every Chery vehicle.',
      mediaUrl: 'https://www.cheryinternational.com/data/cms/archive/202508(5)/2454/root1763477845863187.mp4',
      ctaLabel: 'Watch More',
      ctaUrl: 'https://www.youtube.com/@CheryOfficial',
      order: 6,
      active: true,
      startDate: new Date(now).toISOString(),
      endDate: null,
    },
  ]

  for (const slide of slides) {
    await prisma.heroSlide.create({
      data: slide,
    })
    console.log(`✓ Created slide: ${slide.title}`)
  }

  console.log('\n✅ Hero slides seeded successfully!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })