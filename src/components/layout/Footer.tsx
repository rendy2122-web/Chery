'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Car, Facebook, Instagram, Youtube, Mail, Phone, MapPin } from 'lucide-react'

const footerLinks = {
  models: [
    { name: 'SUV', href: '/models?category=suv' },
    { name: 'Hybrid', href: '/models?category=hybrid' },
    { name: 'Electric', href: '/models?category=ev' },
    { name: 'Compare Models', href: '/compare' },
  ],
  services: [
    { name: 'Find Your Chery', href: '/find-your-chery' },
    { name: 'Financing', href: '/financing' },
    { name: 'Test Drive', href: '/contact' },
    { name: 'Ownership', href: '/ownership' },
  ],
  company: [
    { name: 'About Us', href: '/about' },
    { name: 'Technology', href: '/technology' },
    { name: 'News', href: '/news' },
    { name: 'Careers', href: '/careers' },
  ],
  support: [
    { name: 'Contact Us', href: '/contact' },
    { name: 'Dealers', href: '/dealers' },
    { name: 'FAQ', href: '/faq' },
    { name: 'Privacy Policy', href: '/privacy' },
  ],
}

const socialLinks = [
  { name: 'Facebook', icon: Facebook, href: 'https://facebook.com/cheryindonesia' },
  { name: 'Instagram', icon: Instagram, href: 'https://instagram.com/cheryindonesia' },
  { name: 'YouTube', icon: Youtube, href: 'https://youtube.com/cheryindonesia' },
]

export default function Footer() {
  return (
    <footer className="bg-chery-navy text-white">
      <div className="container-custom py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center space-x-2 mb-6">
              <Car className="h-10 w-10 text-chery-red" />
              <span className="font-heading font-bold text-3xl">
                CHERY
              </span>
            </Link>
            <p className="text-gray-300 mb-6 max-w-md">
              Experience the future of driving with Chery. Innovation, safety, and style in every journey.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-chery-red mt-1 flex-shrink-0" />
                <p className="text-gray-300 text-sm">
                  Jl. Sudirman No. 123, Jakarta Pusat 10110
                </p>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-chery-red flex-shrink-0" />
                <a href="tel:+622112345678" className="text-gray-300 hover:text-white transition-colors">
                  +62 21 1234 5678
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-chery-red flex-shrink-0" />
                <a href="mailto:info@chery.co.id" className="text-gray-300 hover:text-white transition-colors">
                  info@chery.co.id
                </a>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex space-x-4 mt-6">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-white/10 hover:bg-chery-red transition-colors flex items-center justify-center"
                >
                  <social.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Models Links */}
          <div>
            <h3 className="font-heading font-semibold text-lg mb-4">Models</h3>
            <ul className="space-y-3">
              {footerLinks.models.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-300 hover:text-chery-red transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services Links */}
          <div>
            <h3 className="font-heading font-semibold text-lg mb-4">Services</h3>
            <ul className="space-y-3">
              {footerLinks.services.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-300 hover:text-chery-red transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="font-heading font-semibold text-lg mb-4">Company</h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-300 hover:text-chery-red transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h3 className="font-heading font-semibold text-lg mb-4">Support</h3>
            <ul className="space-y-3">
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-300 hover:text-chery-red transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Newsletter */}
        <div className="border-t border-gray-700 mt-12 pt-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="font-heading font-semibold text-xl mb-2">
                Subscribe to Our Newsletter
              </h3>
              <p className="text-gray-300">
                Get the latest updates on new models, promotions, and automotive insights.
              </p>
            </div>
            <form className="flex gap-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:border-chery-red"
              />
              <button
                type="submit"
                className="btn-primary whitespace-nowrap"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400 text-sm">
          <p>© {new Date().getFullYear()} Chery Indonesia. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}