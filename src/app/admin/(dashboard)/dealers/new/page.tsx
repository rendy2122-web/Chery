'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeft, Loader2 } from 'lucide-react'
import Link from 'next/link'

export default function NewDealerPage() {
  const router = useRouter()
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setSaving(true)
    setError('')

    const form = e.currentTarget
    const formData = new FormData(form)

    const payload = {
      name: formData.get('name') as string,
      slug: formData.get('slug') as string,
      city: formData.get('city') as string,
      address: formData.get('address') as string,
      whatsapp: formData.get('whatsapp') as string,
      phone: formData.get('phone') as string,
      email: formData.get('email') as string,
      businessHours: formData.get('businessHours') as string,
      googleMapsUrl: formData.get('googleMapsUrl') as string,
      imageUrl: formData.get('imageUrl') as string,
      services: formData.get('services') as string,
      branchPromo: formData.get('branchPromo') as string,
      active: formData.get('active') === 'on',
    }

    try {
      const res = await fetch('/api/dealers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error || 'Failed to create dealer')
      }

      router.push('/admin/dealers')
      router.refresh()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong')
      setSaving(false)
    }
  }

  return (
    <div>
      <div className="mb-6">
        <Link href="/admin/dealers" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-chery-red transition-colors">
          <ArrowLeft className="w-4 h-4" />
          Back to Dealers
        </Link>
      </div>

      <div className="mb-6">
        <h1 className="text-2xl font-heading font-bold text-gray-900">Add Dealer</h1>
        <p className="text-gray-500 text-sm mt-1">Create a new dealer/branch</p>
      </div>

      {error && (
        <div className="mb-6 bg-red-50 border border-red-200 text-red-700 text-sm rounded-xl p-4">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-white rounded-xl border border-gray-200 p-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Name *</label>
            <input name="name" required className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-chery-red/50" placeholder="Chery Cibubur" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Slug *</label>
            <input name="slug" required className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-chery-red/50" placeholder="cibubur" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">City *</label>
            <input name="city" required className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-chery-red/50" placeholder="Jakarta" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Phone *</label>
            <input name="phone" required className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-chery-red/50" placeholder="+62 21 1234 5678" />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">Address *</label>
            <textarea name="address" required rows={2} className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-chery-red/50" placeholder="Full address..." />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">WhatsApp</label>
            <input name="whatsapp" className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-chery-red/50" placeholder="+62 812 3456 7890" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
            <input name="email" type="email" className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-chery-red/50" placeholder="cibubur@chery.co.id" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Business Hours</label>
            <input name="businessHours" className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-chery-red/50" placeholder="Mon-Sat: 09:00-18:00" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Google Maps URL</label>
            <input name="googleMapsUrl" className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-chery-red/50" placeholder="https://maps.google.com/..." />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">Image URL *</label>
            <input name="imageUrl" required className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-chery-red/50" placeholder="/images/dealers/cibubur.jpg" />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">Services (one per line)</label>
            <textarea name="services" rows={2} className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-chery-red/50" placeholder="Sales&#10;Service&#10;Parts" />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">Branch Promo</label>
            <textarea name="branchPromo" rows={2} className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-chery-red/50" placeholder="Special promo for this branch..." />
          </div>
          <div className="flex items-center gap-2">
            <input type="checkbox" name="active" id="active" defaultChecked className="w-4 h-4 text-chery-red border-gray-300 rounded focus:ring-chery-red" />
            <label htmlFor="active" className="text-sm font-medium text-gray-700">Active</label>
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-100">
          <Link href="/admin/dealers" className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">
            Cancel
          </Link>
          <button
            type="submit"
            disabled={saving}
            className="inline-flex items-center gap-2 px-6 py-2 bg-chery-red text-white rounded-lg text-sm font-medium hover:bg-chery-red-dark transition-colors disabled:opacity-50"
          >
            {saving && <Loader2 className="w-4 h-4 animate-spin" />}
            {saving ? 'Saving...' : 'Create Dealer'}
          </button>
        </div>
      </form>
    </div>
  )
}