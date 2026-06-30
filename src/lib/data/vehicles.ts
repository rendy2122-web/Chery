export interface Vehicle {
  id: string
  name: string
  slug: string
  category: 'suv' | 'hybrid' | 'ev'
  price: number
  image: string
  gallery: string[]
  description: string
  shortDescription: string
  specs: {
    engine: string
    power: string
    torque: string
    transmission: string
    seats: number
    fuelType: string
    batteryRange?: string // for EV
  }
  features: string[]
  colors: string[]
  highlights: string[]
}

export const vehicles: Vehicle[] = [
  {
    id: '1',
    name: 'Chery Omoda 5',
    slug: 'omoda-5',
    category: 'suv',
    price: 389000000,
    image: '/images/vehicles/omoda-5.jpg',
    gallery: [
      '/images/vehicles/omoda-5-1.jpg',
      '/images/vehicles/omoda-5-2.jpg',
      '/images/vehicles/omoda-5-3.jpg',
      '/images/vehicles/omoda-5-4.jpg',
    ],
    description: 'Chery Omoda 5 adalah SUV kompak dengan desain futuristik yang menggabungkan gaya dan performa. Dilengkapi dengan teknologi canggih dan fitur keselamatan terdepan.',
    shortDescription: 'SUV Kompak Futuristik',
    specs: {
      engine: '1.5L Turbocharged',
      power: '156 HP',
      torque: '230 Nm',
      transmission: 'CVT',
      seats: 5,
      fuelType: 'Gasoline',
    },
    features: [
      '10.25" Touchscreen Display',
      'Digital Instrument Cluster',
      '360° Camera',
      'Adaptive Cruise Control',
      'Lane Departure Warning',
      'Apple CarPlay & Android Auto',
      'Wireless Charging',
      'Premium Sound System',
    ],
    colors: ['White', 'Black', 'Silver', 'Red', 'Blue'],
    highlights: ['5-Star NCAP Safety', 'Turbocharged Engine', 'Premium Interior'],
  },
  {
    id: '2',
    name: 'Chery Tiggo 5x',
    slug: 'tiggo-5x',
    category: 'suv',
    price: 299000000,
    image: '/images/vehicles/tiggo-5x.jpg',
    gallery: [
      '/images/vehicles/tiggo-5x-1.jpg',
      '/images/vehicles/tiggo-5x-2.jpg',
    ],
    description: 'Chery Tiggo 5x adalah SUV entry-level yang menawarkan nilai terbaik dengan fitur lengkap dan harga terjangkau. Cocok untuk keluarga muda.',
    shortDescription: 'SUV Entry-Level Smart Choice',
    specs: {
      engine: '1.5L Naturally Aspirated',
      power: '116 HP',
      torque: '143 Nm',
      transmission: '5-Speed Manual / CVT',
      seats: 5,
      fuelType: 'Gasoline',
    },
    features: [
      '10.25" Infotainment Screen',
      'Rear Camera',
      'Bluetooth Connectivity',
      'Keyless Entry',
      'Push Start Button',
      'ABS + EBD',
      'Airbags (2)',
      'Electric Power Steering',
    ],
    colors: ['White', 'Black', 'Silver', 'Orange'],
    highlights: ['Affordable Price', 'Low Maintenance', 'Compact Size'],
  },
  {
    id: '3',
    name: 'Chery Tiggo 7 Pro',
    slug: 'tiggo-7-pro',
    category: 'suv',
    price: 459000000,
    image: '/images/vehicles/tiggo-7-pro.jpg',
    gallery: [
      '/images/vehicles/tiggo-7-pro-1.jpg',
      '/images/vehicles/tiggo-7-pro-2.jpg',
      '/images/vehicles/tiggo-7-pro-3.jpg',
    ],
    description: 'Chery Tiggo 7 Pro adalah SUV mid-size yang menggabungkan kemewahan, performa, dan teknologi. Pilihan tepat untuk keluarga modern.',
    shortDescription: 'Mid-Size SUV Premium',
    specs: {
      engine: '1.6L Turbocharged',
      power: '197 HP',
      torque: '290 Nm',
      transmission: '7-Speed DCT',
      seats: 5,
      fuelType: 'Gasoline',
    },
    features: [
      '12.3" Digital Instrument Cluster',
      '12.3" Infotainment Screen',
      '360° Panoramic Camera',
      'Adaptive Cruise Control',
      'Autonomous Emergency Braking',
      'Blind Spot Detection',
      'Premium Leather Seats',
      'Panoramic Sunroof',
    ],
    colors: ['White', 'Black', 'Silver', 'Blue', 'Red'],
    highlights: ['Turbo Power', 'Advanced ADAS', 'Premium Features'],
  },
  {
    id: '4',
    name: 'Chery Tiggo 8 Pro',
    slug: 'tiggo-8-pro',
    category: 'suv',
    price: 599000000,
    image: '/images/vehicles/tiggo-8-pro.jpg',
    gallery: [
      '/images/vehicles/tiggo-8-pro-1.jpg',
      '/images/vehicles/tiggo-8-pro-2.jpg',
      '/images/vehicles/tiggo-8-pro-3.jpg',
    ],
    description: 'Chery Tiggo 8 Pro adalah flagship 7-seater SUV yang menawarkan ruang lega, kemewahan kelas dunia, dan teknologi terkini untuk keluarga besar.',
    shortDescription: 'Flagship 7-Seater SUV',
    specs: {
      engine: '2.0L Turbocharged',
      power: '254 HP',
      torque: '390 Nm',
      transmission: '7-Speed DCT',
      seats: 7,
      fuelType: 'Gasoline',
    },
    features: [
      '24.6" Curved Display',
      'Sony Premium Sound System',
      'Nappa Leather Seats',
      '6-Seat Captain Seat Configuration',
      'Advanced Air Suspension',
      'Traffic Sign Recognition',
      'Night Vision System',
      'Wireless Charging for All Rows',
    ],
    colors: ['White', 'Black', 'Silver', 'Blue'],
    highlights: ['7 Seater', 'Flagship Status', 'Ultimate Luxury'],
  },
  {
    id: '5',
    name: 'Chery Tiggo 8 Pro Hybrid',
    slug: 'tiggo-8-pro-hybrid',
    category: 'hybrid',
    price: 699000000,
    image: '/images/vehicles/tiggo-8-pro-hybrid.jpg',
    gallery: [
      '/images/vehicles/tiggo-8-pro-hybrid-1.jpg',
      '/images/vehicles/tiggo-8-pro-hybrid-2.jpg',
    ],
    description: 'Chery Tiggo 8 Pro Hybrid menggabungkan performa turbocharged dengan efisiensi bahan bakar hybrid. Pilihan premium untuk keluarga yang peduli lingkungan.',
    shortDescription: 'Flagship Hybrid 7-Seater',
    specs: {
      engine: '1.5L Turbo Hybrid',
      power: '190 HP',
      torque: '310 Nm',
      transmission: '8-Speed DCT',
      seats: 7,
      fuelType: 'Hybrid',
      batteryRange: '50 km (electric only)',
    },
    features: [
      '24.6" Curved Display',
      'Sony Premium Sound System',
      'Nappa Leather Seats',
      '6-Seat Captain Seat Configuration',
      'Hybrid Powertrain System',
      'Regenerative Braking',
      'Advanced Air Suspension',
      'Wireless Charging for All Rows',
    ],
    colors: ['White', 'Black', 'Silver', 'Blue'],
    highlights: ['7 Seater', 'Hybrid Efficient', 'Ultimate Luxury'],
  },
  {
    id: '6',
    name: 'Chery eQ1',
    slug: 'eq1',
    category: 'ev',
    price: 399000000,
    image: '/images/vehicles/eq1.jpg',
    gallery: [
      '/images/vehicles/eq1-1.jpg',
      '/images/vehicles/eq1-2.jpg',
    ],
    description: 'Chery eQ1 adalah electric vehicle compact yang ramah lingkungan dengan jarak tempuh hingga 300km. Perfect untuk urban mobility.',
    shortDescription: 'Electric Urban Mobility',
    specs: {
      engine: 'Electric Motor',
      power: '54 HP',
      torque: '150 Nm',
      transmission: 'Single Speed',
      seats: 4,
      fuelType: 'Electric',
      batteryRange: '300 km',
    },
    features: [
      '10" Touchscreen Display',
      'Digital Instrument Cluster',
      'Regenerative Braking',
      'Fast Charging (30-80% in 30 min)',
      'Smartphone App Control',
      'Remote Climate Control',
      'LED Lighting',
      'Compact & Agile Design',
    ],
    colors: ['White', 'Black', 'Pink', 'Green', 'Blue'],
    highlights: ['Zero Emission', 'Low Running Cost', 'Easy to Park'],
  },
]

export const vehicleCategories = [
  { id: 'all', name: 'Semua', count: vehicles.length },
  { id: 'suv', name: 'SUV', count: vehicles.filter(v => v.category === 'suv').length },
  { id: 'hybrid', name: 'Hybrid', count: vehicles.filter(v => v.category === 'hybrid').length },
  { id: 'ev', name: 'Electric', count: vehicles.filter(v => v.category === 'ev').length },
]

export function getVehicleBySlug(slug: string): Vehicle | undefined {
  return vehicles.find(v => v.slug === slug)
}

export function getVehiclesByCategory(category: string): Vehicle[] {
  if (category === 'all') return vehicles
  return vehicles.filter(v => v.category === category)
}