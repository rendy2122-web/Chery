'use client'

import { MapPin, Phone, Mail, Clock, Navigation } from 'lucide-react'
import Link from 'next/link'

export default function DealersPage() {
  const dealers = [
    {
      id: 'cibubur',
      name: 'Chery Cibubur',
      location: 'Jakarta',
      address: 'Jl. Alternatif Cibubur No. 123, Cibubur, Jakarta Timur 13750',
      phone: '+62 21 1234 5678',
      email: 'cibubur@chery.co.id',
      hours: 'Mon-Fri: 9:00-18:00, Sat-Sun: 9:00-17:00',
      coordinates: { lat: -6.3264, lng: 106.9156 },
    },
    {
      id: 'makassar',
      name: 'Chery Makassar',
      location: 'Sulawesi Selatan',
      address: 'Jl. Sultan Alauddin No. 456, Makassar, Sulawesi Selatan 90231',
      phone: '+62 411 1234 567',
      email: 'makassar@chery.co.id',
      hours: 'Mon-Fri: 9:00-18:00, Sat-Sun: 9:00-17:00',
      coordinates: { lat: -5.1477, lng: 119.4327 },
    },
    {
      id: 'pare-pare',
      name: 'Chery Pare-pare',
      location: 'Sulawesi Selatan',
      address: 'Jl. Jenderal Sudirman No. 789, Pare-pare, Sulawesi Selatan 91123',
      phone: '+62 421 1234 567',
      email: 'parepare@chery.co.id',
      hours: 'Mon-Fri: 9:00-18:00, Sat-Sun: 9:00-17:00',
      coordinates: { lat: -4.0139, lng: 119.6254 },
    },
  ]

  return (
    <main className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-chery-navy to-chery-navy/90 text-white py-20">
        <div className="container-custom">
          <div className="text-center animate-slide-up">
            <h1 className="font-heading font-bold text-4xl md:text-6xl mb-6">
              Our Dealerships
            </h1>
            <p className="text-xl text-gray-200 max-w-3xl mx-auto">
              Visit our showrooms across Indonesia for test drives, consultations, and premium service
            </p>
          </div>
        </div>
      </section>

      {/* Dealers Grid */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {dealers.map((dealer, index) => (
              <div
                key={dealer.id}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 animate-scale-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-16 h-16 bg-chery-red/10 rounded-full flex items-center justify-center mb-6">
                  <MapPin className="h-8 w-8 text-chery-red" />
                </div>
                
                <h3 className="font-heading font-bold text-2xl mb-2 text-chery-navy">
                  {dealer.name}
                </h3>
                <p className="text-gray-600 mb-6">{dealer.location}</p>

                <div className="space-y-4 mb-6">
                  <div className="flex items-start">
                    <MapPin className="h-5 w-5 text-chery-red mr-3 mt-0.5 flex-shrink-0" />
                    <p className="text-gray-700 text-sm">{dealer.address}</p>
                  </div>
                  
                  <div className="flex items-center">
                    <Phone className="h-5 w-5 text-chery-red mr-3 flex-shrink-0" />
                    <a href={`tel:${dealer.phone}`} className="text-gray-700 hover:text-chery-red transition-colors">
                      {dealer.phone}
                    </a>
                  </div>

                  <div className="flex items-center">
                    <Mail className="h-5 w-5 text-chery-red mr-3 flex-shrink-0" />
                    <a href={`mailto:${dealer.email}`} className="text-gray-700 hover:text-chery-red transition-colors">
                      {dealer.email}
                    </a>
                  </div>

                  <div className="flex items-start">
                    <Clock className="h-5 w-5 text-chery-red mr-3 mt-0.5 flex-shrink-0" />
                    <p className="text-gray-700 text-sm">{dealer.hours}</p>
                  </div>
                </div>

                <div className="flex flex-col gap-3">
                  <Link
                    href={`/contact?dealer=${dealer.id}`}
                    className="btn-primary inline-flex items-center justify-center"
                  >
                    <Phone className="mr-2 h-4 w-4" />
                    Contact This Dealer
                  </Link>
                  <a
                    href={`https://www.google.com/maps?q=${dealer.coordinates.lat},${dealer.coordinates.lng}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-secondary inline-flex items-center justify-center"
                  >
                    <Navigation className="mr-2 h-4 w-4" />
                    Get Directions
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="text-center mb-16 animate-slide-up">
            <h2 className="font-heading font-bold text-3xl md:text-4xl text-chery-navy mb-4">
              Find Us on the Map
            </h2>
            <p className="text-lg text-gray-600">
              All our dealerships are strategically located for your convenience
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-4 animate-scale-in">
            <div className="relative h-96 bg-gray-200 rounded-xl overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="h-16 w-16 text-chery-red mx-auto mb-4" />
                  <p className="text-gray-700 font-semibold text-lg">Interactive Map</p>
                  <p className="text-gray-600 text-sm mt-2">
                    Google Maps integration coming soon
                  </p>
                  <p className="text-gray-500 text-xs mt-2">
                    Add your Google Maps API key to enable maps
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-chery-navy text-white">
        <div className="container-custom text-center">
          <div className="animate-slide-up">
            <h2 className="font-heading font-bold text-3xl md:text-4xl mb-4">
              Can't Find a Dealer Near You?
            </h2>
            <p className="text-xl text-gray-200 mb-8 max-w-2xl mx-auto">
              Contact our main office and we'll help you find the nearest Chery dealership
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="tel:+622112345678" className="btn-primary inline-flex items-center text-lg">
                <Phone className="mr-2 h-5 w-5" />
                Call Us
              </a>
              <Link href="/contact" className="btn-secondary bg-white/10 border-white text-white hover:bg-white hover:text-chery-navy text-lg">
                Send Message
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}