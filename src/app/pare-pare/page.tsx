'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, MapPin, Phone, Mail, Clock, Navigation, Car, Shield, Award, Users } from 'lucide-react'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const fadeInUp: any = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] } },
}

const services = [
  { icon: Car, title: 'New Vehicle Sales', desc: 'Explore our complete lineup of Chery vehicles with competitive pricing and flexible financing options.' },
  { icon: Car, title: 'Test Drives', desc: 'Schedule a test drive and experience the thrill of driving a Chery firsthand.' },
  { icon: Shield, title: 'After-Sales Service', desc: 'Professional maintenance and repair services by certified technicians.' },
  { icon: Award, title: 'Genuine Parts', desc: 'Original Chery parts to ensure optimal performance and longevity.' },
  { icon: Users, title: 'Financing Assistance', desc: 'Expert guidance to help you secure the best financing deal.' },
  { icon: Navigation, title: 'Trade-In Program', desc: 'Get the best value for your current vehicle with our trade-in program.' },
]

const whyChooseUs = [
  { title: 'Expert Team', desc: 'Our knowledgeable sales and service team is ready to assist you with professionalism and dedication.' },
  { title: 'Modern Showroom', desc: 'Visit our state-of-the-art showroom with the latest Chery models on display.' },
  { title: 'Customer First', desc: 'Your satisfaction is our priority. We go above and beyond to exceed your expectations.' },
]

export default function PareparePage() {
  return (
    <main className="min-h-screen pt-20">
      {/* Hero */}
      <section className="bg-gradient-to-br from-chery-navy via-chery-navy-2 to-black text-white py-24 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-chery-red/30 rounded-full blur-[150px]" />
          <div className="absolute bottom-1/4 left-1/4 w-64 h-64 bg-chery-gold/20 rounded-full blur-[100px]" />
        </div>
        <div className="container-custom relative z-10">
          <motion.div
            initial="hidden"
            animate="visible"
            className="text-center max-w-4xl mx-auto"
          >
            <motion.div variants={fadeInUp}>
              <span className="inline-flex items-center gap-2 bg-chery-red/10 border border-chery-red/20 text-chery-red text-sm font-medium px-4 py-2 rounded-full mb-6">
                <MapPin className="h-4 w-4" />
                Dealer Location
              </span>
            </motion.div>
            <motion.h1 
              variants={fadeInUp}
              className="font-display font-bold text-5xl md:text-6xl lg:text-7xl mb-6"
            >
              Chery Pare-pare
            </motion.h1>
            <motion.p 
              variants={fadeInUp}
              className="text-xl text-gray-300 max-w-2xl mx-auto"
            >
              Your trusted Chery dealership in Pare-pare, Sulawesi Selatan. Experience premium automotive service and the latest Chery models.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Dealer Info + Map */}
      <section className="section-padding bg-surface-muted">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Info Card */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="bg-white rounded-card p-8 md:p-10 shadow-card"
            >
              <h2 className="font-heading font-bold text-3xl text-text-primary mb-8">
                Dealer Information
              </h2>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-chery-red/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <MapPin className="h-6 w-6 text-chery-red" />
                  </div>
                  <div>
                    <h3 className="font-heading font-semibold text-lg text-text-primary mb-1">Address</h3>
                    <p className="text-text-secondary">
                      Jl. Hasanuddin No. 45<br />
                      Pare-pare, Sulawesi Selatan 91123<br />
                      Indonesia
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-chery-red/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Phone className="h-6 w-6 text-chery-red" />
                  </div>
                  <div>
                    <h3 className="font-heading font-semibold text-lg text-text-primary mb-1">Phone</h3>
                    <a href="tel:+624211234567" className="text-chery-red hover:underline">+62 421 1234 567</a>
                    <p className="text-sm text-text-muted mt-1">Sales & Service</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-chery-red/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Mail className="h-6 w-6 text-chery-red" />
                  </div>
                  <div>
                    <h3 className="font-heading font-semibold text-lg text-text-primary mb-1">Email</h3>
                    <a href="mailto:parepare@chery.co.id" className="text-chery-red hover:underline">parepare@chery.co.id</a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-chery-red/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Clock className="h-6 w-6 text-chery-red" />
                  </div>
                  <div>
                    <h3 className="font-heading font-semibold text-lg text-text-primary mb-1">Operating Hours</h3>
                    <p className="text-text-secondary">
                      Monday - Friday: 8:00 - 17:00<br />
                      Saturday: 8:00 - 14:00
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-8 flex flex-col gap-3">
                <Link href="/contact?dealer=pare-pare" className="btn-primary inline-flex items-center justify-center">
                  <Phone className="mr-2 h-5 w-5" />
                  Contact This Dealer
                </Link>
                <a
                  href="https://www.google.com/maps?q=-4.0139,119.6254"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary inline-flex items-center justify-center"
                >
                  <Navigation className="mr-2 h-5 w-5" />
                  Get Directions
                </a>
              </div>
            </motion.div>

            {/* Map Placeholder */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="bg-white rounded-card p-8 shadow-card"
            >
              <h2 className="font-heading font-bold text-2xl text-text-primary mb-6">Location</h2>
              <div className="relative h-96 bg-surface-muted rounded-2xl overflow-hidden flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="h-16 w-16 text-chery-red/40 mx-auto mb-4" />
                  <p className="text-text-primary font-semibold text-lg">Pare-pare, Sulawesi Selatan</p>
                  <p className="text-text-secondary text-sm mt-2">Strategically located for easy access</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            className="text-center mb-16"
          >
            <motion.h2 variants={fadeInUp} className="font-heading font-bold text-4xl md:text-5xl text-text-primary mb-4">
              Our Services
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-body-l text-text-secondary max-w-2xl mx-auto">
              Comprehensive automotive services to meet all your needs
            </motion.p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, i) => (
              <motion.div
                key={service.title}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
                custom={i}
                className="bg-surface-muted rounded-card p-8 hover:bg-chery-red/5 transition-all duration-300 group"
              >
                <div className="w-14 h-14 bg-chery-red/10 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <service.icon className="h-7 w-7 text-chery-red" />
                </div>
                <h3 className="font-heading font-bold text-xl text-text-primary mb-3">{service.title}</h3>
                <p className="text-text-secondary text-body-s">{service.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="section-padding bg-chery-navy text-white">
        <div className="container-custom">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            className="text-center mb-16"
          >
            <motion.h2 variants={fadeInUp} className="font-heading font-bold text-4xl md:text-5xl mb-4">
              Why Choose Chery Pare-pare?
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-xl text-gray-300 max-w-2xl mx-auto">
              We're committed to providing an exceptional car buying experience
            </motion.p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {whyChooseUs.map((item, i) => (
              <motion.div
                key={item.title}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
                custom={i}
                className="bg-white/5 backdrop-blur-sm rounded-card p-8 hover:bg-white/10 transition-all duration-300"
              >
                <h3 className="font-heading font-bold text-xl mb-3">{item.title}</h3>
                <p className="text-gray-300">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-gradient-to-br from-chery-red via-chery-red to-chery-navy text-white">
        <div className="container-custom text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.h2 variants={fadeInUp} className="font-heading font-bold text-3xl md:text-4xl mb-4">
              Ready to Visit Chery Pare-pare?
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-xl text-gray-200 mb-8 max-w-2xl mx-auto">
              Schedule your visit today and discover your perfect Chery
            </motion.p>
            <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact?dealer=pare-pare" className="btn-white text-lg inline-flex items-center">
                <Phone className="mr-2 h-5 w-5" />
                Contact Us
              </Link>
              <a href="tel:+624211234567" className="btn-outline-light text-lg">
                Call Now
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </main>
  )
}