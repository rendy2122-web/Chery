'use client'

import { Suspense, useState } from 'react'
import { Calendar, Phone, Mail, MapPin, Clock, Send, Check } from 'lucide-react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { cn } from '@/lib/utils/cn'

export default function ContactPage() {
  return (
    <Suspense fallback={<div className="min-h-screen pt-20 flex items-center justify-center"><div className="w-8 h-8 border-2 border-chery-red border-t-transparent rounded-full animate-spin" /></div>}>
      <ContactContent />
    </Suspense>
  )
}

function ContactContent() {
  const searchParams = useSearchParams()
  const selectedModel = searchParams.get('model') || ''
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    interest: selectedModel || 'test-drive',
    message: '',
    preferredDate: '',
    preferredTime: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000))

    setIsSubmitting(false)
    setIsSubmitted(true)

    // Reset form after 5 seconds
    setTimeout(() => {
      setIsSubmitted(false)
      setFormData({
        name: '',
        email: '',
        phone: '',
        interest: 'test-drive',
        message: '',
        preferredDate: '',
        preferredTime: '',
      })
    }, 5000)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  return (
    <main className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-chery-navy to-chery-navy/90 text-white py-20">
        <div className="container-custom">
          <div className="text-center max-w-4xl mx-auto animate-slide-up">
            <div className="w-20 h-20 bg-chery-red/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <Calendar className="h-10 w-10 text-chery-red" />
            </div>
            <h1 className="font-heading font-bold text-4xl md:text-6xl mb-6">
              Get in Touch
            </h1>
            <p className="text-xl text-gray-200 mb-8">
              Ready to experience Chery? Book a test drive, request a quote, or simply ask us anything. Our team is here to help.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Contact Info */}
            <div className="lg:col-span-1">
              <div className="animate-slide-up">
                <h2 className="font-heading font-bold text-2xl md:text-3xl text-chery-navy mb-8">
                  Contact Information
                </h2>

                <div className="space-y-6">
                  <div className="bg-white rounded-2xl p-6 shadow-lg">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-chery-red/10 rounded-full flex items-center justify-center flex-shrink-0">
                        <Phone className="h-6 w-6 text-chery-red" />
                      </div>
                      <div>
                        <h3 className="font-heading font-semibold text-lg text-chery-navy mb-1">
                          Call Us
                        </h3>
                        <a href="tel:+622112345678" className="text-gray-600 hover:text-chery-red transition-colors">
                          +62 21 1234 5678
                        </a>
                        <p className="text-sm text-gray-500 mt-1">
                          Mon-Fri: 9am-6pm
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-2xl p-6 shadow-lg">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-chery-red/10 rounded-full flex items-center justify-center flex-shrink-0">
                        <Mail className="h-6 w-6 text-chery-red" />
                      </div>
                      <div>
                        <h3 className="font-heading font-semibold text-lg text-chery-navy mb-1">
                          Email Us
                        </h3>
                        <a href="mailto:info@chery.co.id" className="text-gray-600 hover:text-chery-red transition-colors">
                          info@chery.co.id
                        </a>
                        <p className="text-sm text-gray-500 mt-1">
                          We reply within 24 hours
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-2xl p-6 shadow-lg">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-chery-red/10 rounded-full flex items-center justify-center flex-shrink-0">
                        <MapPin className="h-6 w-6 text-chery-red" />
                      </div>
                      <div>
                        <h3 className="font-heading font-semibold text-lg text-chery-navy mb-1">
                          Visit Us
                        </h3>
                        <p className="text-gray-600">
                          Jl. Sudirman No. 123<br />
                          Jakarta Pusat 10110
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-2xl p-6 shadow-lg">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-chery-red/10 rounded-full flex items-center justify-center flex-shrink-0">
                        <Clock className="h-6 w-6 text-chery-red" />
                      </div>
                      <div>
                        <h3 className="font-heading font-semibold text-lg text-chery-navy mb-1">
                          Business Hours
                        </h3>
                        <p className="text-gray-600">
                          Mon-Fri: 9:00 - 18:00<br />
                          Sat-Sun: 9:00 - 17:00
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Quick Links */}
                <div className="mt-8">
                  <h3 className="font-heading font-semibold text-lg text-chery-navy mb-4">
                    Quick Links
                  </h3>
                  <div className="space-y-2">
                    <Link href="/dealers" className="block text-gray-600 hover:text-chery-red transition-colors">
                      Find a Dealer →
                    </Link>
                    <Link href="/financing" className="block text-gray-600 hover:text-chery-red transition-colors">
                      Financing Options →
                    </Link>
                    <Link href="/models" className="block text-gray-600 hover:text-chery-red transition-colors">
                      View All Models →
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-10 animate-slide-up" style={{ animationDelay: '0.1s' }}>
                {!isSubmitted ? (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <h2 className="font-heading font-bold text-2xl md:text-3xl text-chery-navy mb-2">
                        {selectedModel ? `Inquire About ${selectedModel}` : 'Send Us a Message'}
                      </h2>
                      <p className="text-gray-600 mb-8">
                        Fill out the form below and we'll get back to you within 24 hours.
                      </p>
                    </div>

                    {/* Name & Email */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-chery-red focus:outline-none transition-colors"
                          placeholder="John Doe"
                        />
                      </div>

                      <div>
                        <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-chery-red focus:outline-none transition-colors"
                          placeholder="john@example.com"
                        />
                      </div>
                    </div>

                    {/* Phone & Interest */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-2">
                          Phone Number *
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-chery-red focus:outline-none transition-colors"
                          placeholder="+62 812 3456 7890"
                        />
                      </div>

                      <div>
                        <label htmlFor="interest" className="block text-sm font-semibold text-gray-700 mb-2">
                          I'm Interested In
                        </label>
                        <select
                          id="interest"
                          name="interest"
                          value={formData.interest}
                          onChange={handleChange}
                          className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-chery-red focus:outline-none transition-colors"
                        >
                          <option value="test-drive">Book Test Drive</option>
                          <option value="quote">Request a Quote</option>
                          <option value="general">General Inquiry</option>
                          <option value="service">Service & Maintenance</option>
                          <option value="parts">Spare Parts</option>
                        </select>
                      </div>
                    </div>

                    {/* Preferred Date & Time */}
                    {formData.interest === 'test-drive' && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label htmlFor="preferredDate" className="block text-sm font-semibold text-gray-700 mb-2">
                            Preferred Date
                          </label>
                          <input
                            type="date"
                            id="preferredDate"
                            name="preferredDate"
                            value={formData.preferredDate}
                            onChange={handleChange}
                            min={new Date().toISOString().split('T')[0]}
                            className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-chery-red focus:outline-none transition-colors"
                          />
                        </div>

                        <div>
                          <label htmlFor="preferredTime" className="block text-sm font-semibold text-gray-700 mb-2">
                            Preferred Time
                          </label>
                          <select
                            id="preferredTime"
                            name="preferredTime"
                            value={formData.preferredTime}
                            onChange={handleChange}
                            className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-chery-red focus:outline-none transition-colors"
                          >
                            <option value="">Select a time</option>
                            <option value="morning">Morning (9am - 12pm)</option>
                            <option value="afternoon">Afternoon (12pm - 3pm)</option>
                            <option value="evening">Evening (3pm - 6pm)</option>
                          </select>
                        </div>
                      </div>
                    )}

                    {/* Message */}
                    <div>
                      <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-2">
                        Message (Optional)
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        rows={5}
                        className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-chery-red focus:outline-none transition-colors resize-none"
                        placeholder="Tell us more about what you're looking for..."
                      />
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className={cn(
                        'w-full btn-primary inline-flex items-center justify-center text-lg',
                        isSubmitting && 'opacity-50 cursor-not-allowed'
                      )}
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send className="mr-2 h-5 w-5" />
                          Send Message
                        </>
                      )}
                    </button>
                  </form>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Success Modal */}
      {isSubmitted && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-8 max-w-md w-full text-center animate-scale-in">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Check className="h-10 w-10 text-green-600" />
            </div>
            <h3 className="font-heading font-bold text-2xl text-chery-navy mb-4">
              Message Sent!
            </h3>
            <p className="text-gray-600 mb-6">
              Thank you for contacting us. Our team will get back to you within 24 hours.
            </p>
            <button
              onClick={() => setIsSubmitted(false)}
              className="btn-primary"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </main>
  )
}