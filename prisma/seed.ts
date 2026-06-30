import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seed...');

  // Create admin user
  const hashedPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD || 'admin123', 10);
  
  const admin = await prisma.user.upsert({
    where: { email: process.env.ADMIN_EMAIL || 'admin@chery.com' },
    update: {},
    create: {
      email: process.env.ADMIN_EMAIL || 'admin@chery.com',
      name: 'Admin User',
      password: hashedPassword,
      role: 'SUPER_ADMIN',
      active: true,
    },
  });

  console.log('✅ Admin user created:', admin.email);

  // Create sample vehicles
  const vehicles = [
    {
      name: 'Chery Tiggo 7 Pro',
      slug: 'tiggo-7-pro',
      category: 'SUV',
      priceFrom: 350000000,
      description: 'SUV premium dengan teknologi canggih dan desain yang elegan.',
      shortDescription: 'SUV premium untuk keluarga modern',
      exteriorImage: '/images/vehicles/tiggo-7-pro/exterior.jpg',
      interiorImage: '/images/vehicles/tiggo-7-pro/interior.jpg',
      gallery: JSON.stringify(['/images/vehicles/tiggo-7-pro/gallery1.jpg']),
      keyFeatures: JSON.stringify(['Panoramic Sunroof', 'ADAS', '12.3" Touchscreen']),
      specifications: JSON.stringify({
        engine: '1.5L Turbo',
        power: '150 HP',
        torque: '210 Nm',
        transmission: 'CVT',
        seats: 5,
      }),
      safetyFeatures: JSON.stringify(['ABS', 'EBD', 'ESC', '6 Airbags']),
      technologyFeatures: JSON.stringify(['Apple CarPlay', 'Android Auto', '360 Camera']),
      brochureUrl: '/brochures/tiggo-7-pro.pdf',
      testDriveCta: 'Test Drive',
      active: true,
      order: 1,
    },
    {
      name: 'Chery Tiggo 8 Pro',
      slug: 'tiggo-8-pro',
      category: 'SUV',
      priceFrom: 450000000,
      description: 'SUV 7-seater dengan ruang lega dan kenyamanan maksimal.',
      shortDescription: 'SUV 7-seater untuk keluarga besar',
      exteriorImage: '/images/vehicles/tiggo-8-pro/exterior.jpg',
      interiorImage: '/images/vehicles/tiggo-8-pro/interior.jpg',
      gallery: JSON.stringify(['/images/vehicles/tiggo-8-pro/gallery1.jpg']),
      keyFeatures: JSON.stringify(['7 Seater', 'Leather Seats', 'Premium Sound']),
      specifications: JSON.stringify({
        engine: '2.0L Turbo',
        power: '190 HP',
        torque: '290 Nm',
        transmission: '7-Speed DCT',
        seats: 7,
      }),
      safetyFeatures: JSON.stringify(['ABS', 'EBD', 'ESC', '8 Airbags', 'TPMS']),
      technologyFeatures: JSON.stringify(['12.8" Touchscreen', 'Bose Audio', 'HUD']),
      brochureUrl: '/brochures/tiggo-8-pro.pdf',
      testDriveCta: 'Test Drive',
      active: true,
      order: 2,
    },
    {
      name: 'Chery Omoda 5',
      slug: 'omoda-5',
      category: 'SUV',
      priceFrom: 300000000,
      description: 'SUV stylish dengan desain futuristik dan performa tangguh.',
      shortDescription: 'SUV stylish untuk generasi muda',
      exteriorImage: '/images/vehicles/omoda-5/exterior.jpg',
      interiorImage: '/images/vehicles/omoda-5/interior.jpg',
      gallery: JSON.stringify(['/images/vehicles/omoda-5/gallery1.jpg']),
      keyFeatures: JSON.stringify(['Sport Design', 'Digital Cockpit', 'Fast Charging']),
      specifications: JSON.stringify({
        engine: '1.5L Turbo',
        power: '156 HP',
        torque: '230 Nm',
        transmission: 'CVT',
        seats: 5,
      }),
      safetyFeatures: JSON.stringify(['ABS', 'EBD', 'ESC', '6 Airbags']),
      technologyFeatures: JSON.stringify(['10.25" Touchscreen', 'Digital Cluster', 'Wireless Charging']),
      brochureUrl: '/brochures/omoda-5.pdf',
      testDriveCta: 'Test Drive',
      active: true,
      order: 3,
    },
  ];

  for (const vehicle of vehicles) {
    await prisma.vehicle.upsert({
      where: { slug: vehicle.slug },
      update: {},
      create: vehicle,
    });
  }

  console.log('✅ Sample vehicles created');

  // Create sample dealers
  const dealers = [
    {
      name: 'Chery Jakarta Selatan',
      slug: 'chery-jaksel',
      city: 'Jakarta',
      address: 'Jl. Sudirman No. 123, Jakarta Selatan',
      whatsapp: '6281234567890',
      phone: '021-1234567',
      email: 'jaksel@chery.com',
      businessHours: 'Senin - Sabtu: 09:00 - 18:00',
      googleMapsUrl: 'https://maps.google.com/example1',
      imageUrl: '/images/dealers/jaksel.jpg',
      services: JSON.stringify(['Sales', 'Service', 'Parts', 'Financing']),
      branchPromo: 'Promo khusus bulan ini!',
      active: true,
      order: 1,
    },
    {
      name: 'Chery Jakarta Barat',
      slug: 'chery-jakbar',
      city: 'Jakarta',
      address: 'Jl. Gatot Subroto No. 456, Jakarta Barat',
      whatsapp: '6281234567891',
      phone: '021-7654321',
      email: 'jakbar@chery.com',
      businessHours: 'Senin - Sabtu: 09:00 - 18:00',
      googleMapsUrl: 'https://maps.google.com/example2',
      imageUrl: '/images/dealers/jakbar.jpg',
      services: JSON.stringify(['Sales', 'Service', 'Parts']),
      branchPromo: 'Gratis service 1 tahun!',
      active: true,
      order: 2,
    },
    {
      name: 'Chery Bandung',
      slug: 'chery-bandung',
      city: 'Bandung',
      address: 'Jl. Dago No. 789, Bandung',
      whatsapp: '6281234567892',
      phone: '022-1234567',
      email: 'bandung@chery.com',
      businessHours: 'Senin - Sabtu: 09:00 - 17:00',
      googleMapsUrl: 'https://maps.google.com/example3',
      imageUrl: '/images/dealers/bandung.jpg',
      services: JSON.stringify(['Sales', 'Service', 'Parts', 'Financing']),
      branchPromo: 'DP mulai 10%!',
      active: true,
      order: 3,
    },
  ];

  for (const dealer of dealers) {
    await prisma.dealer.upsert({
      where: { slug: dealer.slug },
      update: {},
      create: dealer,
    });
  }

  console.log('✅ Sample dealers created');

  // Create sample hero content
  const hero = await prisma.hero.upsert({
    where: { id: 'hero-main' },
    update: {},
    create: {
      id: 'hero-main',
      title: 'Experience the Future of Driving',
      subtitle: 'Chery - Inovasi dan Kualitas Tanpa Batas',
      ctaPrimary: 'Lihat Model',
      ctaSecondary: 'Test Drive',
      imageUrl: '/images/hero/hero-main.jpg',
      active: true,
    },
  });

  console.log('✅ Hero content created');

  // Create sample hero slides
  const heroSlides = [
    {
      type: 'IMAGE',
      title: 'Tiggo 7 Pro',
      subtitle: 'SUV Premium Keluarga',
      description: 'Rasakan kemewahan dan kenyamanan',
      mediaUrl: '/images/hero/slide1.jpg',
      ctaLabel: 'Pelajari Lebih Lanjut',
      ctaUrl: '/models/tiggo-7-pro',
      order: 1,
      active: true,
      duration: 6000,
    },
    {
      type: 'IMAGE',
      title: 'Omoda 5',
      subtitle: 'Stylish & Futuristic',
      description: 'Desain yang menginspirasi',
      mediaUrl: '/images/hero/slide2.jpg',
      ctaLabel: 'Lihat Detail',
      ctaUrl: '/models/omoda-5',
      order: 2,
      active: true,
      duration: 6000,
    },
  ];

  for (const slide of heroSlides) {
    await prisma.heroSlide.create({
      data: slide,
    });
  }

  console.log('✅ Hero slides created');

  // Create sample FAQs
  const faqs = [
    {
      question: 'Bagaimana cara melakukan test drive?',
      answer: 'Anda dapat melakukan test drive dengan menghubungi dealer terdekat atau mengisi form di website.',
      category: 'Sales',
      order: 1,
      active: true,
    },
    {
      question: 'Apakah tersedia simulasi kredit?',
      answer: 'Ya, kami menyediakan simulasi kredit online. Hubungi kami untuk informasi lebih lanjut.',
      category: 'Financing',
      order: 2,
      active: true,
    },
    {
      question: 'Berapa garansi kendaraan Chery?',
      answer: 'Kendaraan Chery dilengkapi garansi 3 tahun atau 100.000 km, mana yang tercapai lebih dahulu.',
      category: 'Service',
      order: 3,
      active: true,
    },
  ];

  for (const faq of faqs) {
    await prisma.faq.create({
      data: faq,
    });
  }

  console.log('✅ Sample FAQs created');

  // Create sample testimonials
  const testimonials = [
    {
      customerName: 'Budi Santoso',
      location: 'Jakarta',
      modelOwned: 'Tiggo 7 Pro',
      testimonialText: 'Mobil yang sangat nyaman dan hemat bahan bakar. Pelayanan dealer juga memuaskan!',
      rating: 5,
      imageUrl: '/images/testimonials/budi.jpg',
      active: true,
    },
    {
      customerName: 'Siti Nurhaliza',
      location: 'Bandung',
      modelOwned: 'Omoda 5',
      testimonialText: 'Desainnya keren dan teknologi yang ditawarkan sangat lengkap. Sangat recommended!',
      rating: 5,
      imageUrl: '/images/testimonials/siti.jpg',
      active: true,
    },
  ];

  for (const testimonial of testimonials) {
    await prisma.testimonial.create({
      data: testimonial,
    });
  }

  console.log('✅ Sample testimonials created');

  // Create sample ownership content
  const ownership = await prisma.ownership.upsert({
    where: { id: 'ownership-main' },
    update: {},
    create: {
      id: 'ownership-main',
      warrantyContent: 'Garansi 3 tahun atau 100.000 km',
      serviceContent: 'Service berkala setiap 5.000 km atau 6 bulan',
      aftersalesContent: 'Layanan after sales 24/7 di seluruh Indonesia',
      sparePartsContent: 'Suku cadang original dengan harga terjangkau',
      emergencySupport: 'Layanan darurat 24 jam',
      bookingServiceCta: 'Booking Service',
    },
  });

  console.log('✅ Ownership content created');

  // Create sample financing info
  const financing = await prisma.financing.upsert({
    where: { id: 'financing-main' },
    update: {},
    create: {
      id: 'financing-main',
      defaultInterestRate: 3.5,
      tenorOptions: JSON.stringify(['12 bulan', '24 bulan', '36 bulan', '48 bulan', '60 bulan']),
      dpOptions: JSON.stringify(['10%', '20%', '30%', '40%']),
      adminFeeNote: 'Biaya admin Rp 1.500.000',
      disclaimerText: 'Suku bunga dapat berubah sesuai kebijakan perusahaan',
      ctaLabel: 'Simulasi Kredit',
      ctaUrl: '/financing',
    },
  });

  console.log('✅ Financing info created');

  // Create sample technology content
  const technologies = [
    {
      title: 'Advanced Driver Assistance',
      slug: 'adas',
      category: 'Safety',
      icon: 'Shield',
      imageUrl: '/images/technology/adas.jpg',
      shortDescription: 'Sistem bantuan pengemudi cerdas untuk keselamatan maksimal',
      longDescription: 'Teknologi ADAS (Advanced Driver Assistance System) membantu Anda berkendara dengan aman dan nyaman.',
      order: 1,
      active: true,
    },
    {
      title: 'Connected Car',
      slug: 'connected-car',
      category: 'Technology',
      icon: 'Wifi',
      imageUrl: '/images/technology/connected.jpg',
      shortDescription: 'Konektivitas penuh untuk pengalaman berkendara modern',
      longDescription: 'Tetap terhubung dengan mobil Anda dimana saja melalui aplikasi smartphone.',
      order: 2,
      active: true,
    },
  ];

  for (const tech of technologies) {
    await prisma.technology.upsert({
      where: { slug: tech.slug },
      update: {},
      create: tech,
    });
  }

  console.log('✅ Sample technologies created');

  // Create sample promotions
  const promotions = [
    {
      title: 'Promo Akhir Tahun',
      slug: 'promo-akhir-tahun',
      imageUrl: '/images/promotions/akhir-tahun.jpg',
      description: 'Dapatkan diskon hingga Rp 50 juta + aksesori gratis',
      relatedModel: 'Tiggo 7 Pro',
      startDate: new Date('2024-12-01'),
      endDate: new Date('2024-12-31'),
      terms: 'Syarat dan ketentuan berlaku',
      ctaLabel: 'Lihat Promo',
      ctaUrl: '/promotions/akhir-tahun',
      active: true,
    },
  ];

  for (const promo of promotions) {
    await prisma.promotion.upsert({
      where: { slug: promo.slug },
      update: {},
      create: promo,
    });
  }

  console.log('✅ Sample promotions created');

  // Create sample news
  const news = [
    {
      title: 'Chery Resmi Luncurkan Tiggo 7 Pro di Indonesia',
      slug: 'luncuran-tiggo-7-pro',
      category: 'Launch',
      thumbnailUrl: '/images/news/tiggo-7-pro-launch.jpg',
      excerpt: 'SUV premium ini diharapkan menjadi pemain utama di segmennya.',
      contentBody: 'Jakarta - Chery secara resmi meluncurkan Tiggo 7 Pro di Indonesia...',
      author: 'Admin',
      publishDate: new Date('2024-01-15'),
      seoTitle: 'Luncuran Chery Tiggo 7 Pro di Indonesia',
      seoDescription: 'Chery resmi meluncurkan SUV premium Tiggo 7 Pro di pasar Indonesia.',
      status: 'PUBLISHED',
    },
  ];

  for (const item of news) {
    await prisma.news.upsert({
      where: { slug: item.slug },
      update: {},
      create: item,
    });
  }

  console.log('✅ Sample news created');

  // Create sample quiz questions
  const quizQuestion = await prisma.quizQuestion.create({
    data: {
      question: 'Bagaimana Anda menggunakan mobil sehari-hari?',
      order: 1,
      active: true,
      answers: {
        create: [
          {
            answer: 'Untuk keluarga dan perjalanan jauh',
            mappedModel: 'Tiggo 8 Pro',
            order: 1,
          },
          {
            answer: 'Untuk kota dan gaya hidup urban',
            mappedModel: 'Omoda 5',
            order: 2,
          },
          {
            answer: 'Untuk performa dan keserbagunaan',
            mappedModel: 'Tiggo 7 Pro',
            order: 3,
          },
        ],
      },
    },
  });

  console.log('✅ Sample quiz created');

  // Create sample final CTA
  const finalCta = await prisma.finalCta.upsert({
    where: { id: 'final-cta-main' },
    update: {},
    create: {
      id: 'final-cta-main',
      headline: 'Siap untuk Pengalaman Berkendara Baru?',
      subheadline: 'Jadwalkan test drive Anda sekarang',
      ctaLabel: 'Test Drive Sekarang',
      ctaUrl: '/contact',
      backgroundImage: '/images/cta/background.jpg',
      active: true,
    },
  });

  console.log('✅ Final CTA created');

  console.log('🎉 Database seeded successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });