'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeft, Loader2 } from 'lucide-react'
import Link from 'next/link'

export default function NewOwnershipPage() {
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
      warrantyContent: formData.get('warrantyContent') as string,
      serviceContent: formData.get('serviceContent') as string,
      aftersalesContent: formData.get('aftersalesContent') as string,
      sparePartsContent: formData.get('sparePartsContent') as string,
      emergencySupport: formData.get('emergencySupport') as string,
      bookingServiceCta: formData.get('bookingServiceCta') as string,
    }

    try {
      const res = await fetch('/api/ownership', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error || 'Failed to create ownership content')
      }

      router.push('/admin/ownership')
      router.refresh()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong')
      setSaving(false)
    }
  }

  return (
    <div>
      <div className="mb-6">
        <Link href="/admin/ownership" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-chery-red transition-colors">
          <ArrowLeft className="w-4 h-4" />
          Back to Ownership
        </Link>
      </div>

      <div className="mb-6">
        <h1 className="text-2xl font-heading font-bold text-gray-900">Add Ownership Content</h1>
        <p className="text-gray-500 text-sm mt-1">Create ownership and aftersales content</p>
      </div>

      {error && (
        <div className="mb-6 bg-red-50 border border-red-200 text-red-700 text-sm rounded-xl p-4">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-white rounded-xl border border-gray-200 p-6 space-y-6">
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Warranty Content *</label>
            <textarea name="warrantyContent" required rows={4} className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-chery-red/50" placeholder="Warranty information..." />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Service Content *</label>
            <textarea name="serviceContent" required rows={4} className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-chery-red/50" placeholder="Service information..." />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Aftersales Content *</label>
            <textarea name="aftersalesContent" required rows={4} className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-chery-red/50" placeholder="Aftersales information..." />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Spare Parts Content *</label>
            <textarea name="sparePartsContent" required rows={4} className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-chery-red/50" placeholder="Spare parts information..." />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Emergency Support *</label>
            <textarea name="emergencySupport" required rows={3} className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-chery-red/50" placeholder="Emergency support contact..." />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Booking Service CTA</label>
            <input name="bookingServiceCta" className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-chery-red/50" placeholder="Book Service" />
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-100">
          <Link href="/admin/ownership" className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">
            Cancel
          </Link>
          <button
            type="submit"
            disabled={saving}
            className="inline-flex items-center gap-2 px-6 py-2 bg-chery-red text-white rounded-lg text-sm font-medium hover:bg-chery-red-dark transition-colors disabled:opacity-50"
          >
            {saving && <Loader2 className="w-4 h-4 animate-spin" />}
            {saving ? 'Saving...' : 'Create Ownership Content'}
          </button>
        </div>
      </form>
    </div>
  )
}