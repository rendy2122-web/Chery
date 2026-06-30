'use client'

import { Shield, Zap, Wifi, Battery, Cpu } from 'lucide-react'
import Link from 'next/link'

export default function TechnologyPage() {
  const technologies = [
    {
      icon: Shield,
      title: 'SHS Safety System',
      description: 'Comprehensive safety with 6 airbags, ABS, EBD, and advanced body structure designed to protect you and your family.',
      features: [
        '6 Airbags (Front, Side, Curtain)',
        'ABS with EBD',
        'ESC & TCS',
        'Reinforced Body Structure',
        'ISOFIX Child Seat Anchors',
        'Tire Pressure Monitoring',
      ],
    },
    {
      icon: Zap,
      title: 'ADAS & Autonomous Features',
      description: 'Advanced driver assistance systems that make every journey safer and more comfortable.',
      features: [
        'Adaptive Cruise Control',
        'Lane Departure Warning',
        'Autonomous Emergency Braking',
        'Blind Spot Detection',
        'Rear Cross Traffic Alert',
        'Driver Attention Monitor',
      ],
    },
    {
      icon: Wifi,
      title: 'Smart Connectivity',
      description: 'Stay connected with cutting-edge infotainment and connectivity features.',
      features: [
        '10.25" Touchscreen Display',
        'Apple CarPlay & Android Auto',
        'Wireless Charging',
        'Bluetooth Connectivity',
        'USB Ports (Front & Rear)',
        'Premium Sound System',
      ],
    },
    {
      icon: Battery,
      title: 'Electric Innovation',
      description: 'Leading the EV revolution with advanced battery technology and efficient powertrains.',
      features: [
        'Long-range Battery',
        'Fast Charging Capability',
        'Regenerative Braking',
        'Battery Management System',
        'Electric Powertrain',
        'Zero Emissions',
      ],
    },
    {
      icon: Cpu,
      title: 'Performance Technology',
      description: 'Engineered for exceptional performance and efficiency.',
      features: [
        'Turbocharged Engine',
        'CVT Transmission',
        'Drive Mode Selector',
        'Eco Mode',
        'Sport Mode',
        'Hill Start Assist',
      ],
    },
  ]

  return (
    <main className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-chery-navy to-chery-navy/90 text-white py-20">
        <div className="container-custom">
          <div className="text-center animate-slide-up">
            <h1 className="font-heading font-bold text-4xl md:text-6xl mb-6">
              Advanced Technology
            </h1>
            <p className="text-xl text-gray-200 max-w-3xl mx-auto">
              Cutting-edge features that keep you safe, connected, and in control
            </p>
          </div>
        </div>
      </section>

      {/* Technology Grid */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {technologies.map((tech, index) => (
              <div
                key={tech.title}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 animate-scale-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-16 h-16 bg-chery-red/10 rounded-xl flex items-center justify-center mb-6">
                  <tech.icon className="h-8 w-8 text-chery-red" />
                </div>
                <h3 className="font-heading font-bold text-2xl mb-4 text-chery-navy">
                  {tech.title}
                </h3>
                <p className="text-gray-600 mb-6">
                  {tech.description}
                </p>
                <ul className="space-y-2">
                  {tech.features.map((feature) => (
                    <li key={feature} className="flex items-start">
                      <span className="text-chery-red mr-2">✓</span>
                      <span className="text-gray-700 text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-chery-navy text-white">
        <div className="container-custom text-center">
          <div className="animate-slide-up">
            <h2 className="font-heading font-bold text-3xl md:text-4xl mb-4">
              Experience the Technology
            </h2>
            <p className="text-xl text-gray-200 mb-8 max-w-2xl mx-auto">
              Visit our showroom and experience Chery's advanced technology firsthand
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact" className="btn-primary inline-flex items-center text-lg">
                Book Test Drive
              </Link>
              <Link href="/models" className="btn-secondary bg-white/10 border-white text-white hover:bg-white hover:text-chery-navy text-lg">
                View Models
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}