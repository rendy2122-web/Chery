export interface Dealer {
  id: string
  name: string
  slug: string
  city: string
  address: string
  phone: string
  whatsapp: string
  email: string
  hours: {
    weekday: string
    weekend: string
  }
  coordinates: {
    lat: number
    lng: number
  }
  image: string
  services: string[]
  description: string
}

export const dealers: Dealer[] = [
  {
    id: '1',
    name: 'Chery Cibubur',
    slug: 'cibubur',
    city: 'Cibubur, Jakarta',
    address: 'Jl. Raya Bogor KM. 28, Cibubur, Jakarta Timur 13750',
    phone: '+62 21 1234 5678',
    whatsapp: '+6281234567890',
    email: 'cibubur@chery.co.id',
    hours: {
      weekday: 'Senin - Jumat: 09:00 - 18:00',
      weekend: 'Sabtu - Minggu: 09:00 - 17:00',
    },
    coordinates: {
      lat: -6.3565,
      lng: 106.8912,
    },
    image: '/images/dealers/cibubur.jpg',
    services: [
      'Test Drive',
      'Sales',
      'After Sales Service',
      'Spare Parts',
      'Warranty Claims',
      'Body & Paint',
    ],
    description: 'Dealer Chery terbesar di Jakarta Timur dengan showroom modern dan fasilitas service lengkap.',
  },
  {
    id: '2',
    name: 'Chery Makassar',
    slug: 'makassar',
    city: 'Makassar, Sulawesi Selatan',
    address: 'Jl. Sultan Alauddin No. 123, Makassar, Sulawesi Selatan 90231',
    phone: '+62 411 1234 567',
    whatsapp: '+6281234567891',
    email: 'makassar@chery.co.id',
    hours: {
      weekday: 'Senin - Jumat: 08:30 - 17:30',
      weekend: 'Sabtu - Minggu: 09:00 - 16:00',
    },
    coordinates: {
      lat: -5.1476,
      lng: 119.4327,
    },
    image: '/images/dealers/makassar.jpg',
    services: [
      'Test Drive',
      'Sales',
      'After Sales Service',
      'Spare Parts',
      'Warranty Claims',
    ],
    description: 'Dealer resmi Chery untuk wilayah Sulawesi dengan layanan prima dan tim sales profesional.',
  },
  {
    id: '3',
    name: 'Chery Pare-pare',
    slug: 'pare-pare',
    city: 'Pare-pare, Sulawesi Selatan',
    address: 'Jl. Jenderal Sudirman No. 45, Pare-pare, Sulawesi Selatan 91123',
    phone: '+62 421 1234 567',
    whatsapp: '+6281234567892',
    email: 'parepare@chery.co.id',
    hours: {
      weekday: 'Senin - Jumat: 08:00 - 17:00',
      weekend: 'Sabtu: 09:00 - 15:00',
    },
    coordinates: {
      lat: -4.0139,
      lng: 119.6254,
    },
    image: '/images/dealers/pare-pare.jpg',
    services: [
      'Test Drive',
      'Sales',
      'After Sales Service',
      'Spare Parts',
    ],
    description: 'Dealer Chery di Pare-pare yang melayani kebutuhan mobil Chery untuk wilayah Sulawesi Selatan.',
  },
]

export const cities = [
  'Jakarta',
  'Surabaya',
  'Bandung',
  'Medan',
  'Semarang',
  'Makassar',
  'Palembang',
  'Tangerang',
  'Bekasi',
  'Bogor',
  'Depok',
  'Pare-pare',
]

export function getDealerBySlug(slug: string): Dealer | undefined {
  return dealers.find(d => d.slug === slug)
}

export function getDealersByCity(city: string): Dealer[] {
  return dealers.filter(d => d.city.toLowerCase().includes(city.toLowerCase()))
}

export function getAllDealers(): Dealer[] {
  return dealers
}