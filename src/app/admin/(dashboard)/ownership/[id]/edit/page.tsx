'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeft, Loader2 } from 'lucide-react'
import Link from 'next/link'

export default function EditOwnershipPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)
  const [form, setForm] = useState({
    warrantyContent: '',
    serviceContent: '',
    aftersalesContent: '',
    sparePartsContent: '',
    emergencySupport: '',
    bookingServiceCta: '',
  })

  useEffect(() => {
    fetch(`/api/ownership/${params.id}`)
      .then(res => res.json())
      .then(data => {
        if (data.error) throw new Error(data.error)
        setForm({
          warrantyContent: data.warrantyContent || '',
          serviceContent: data.serviceContent || '',
          aftersalesContent: data.aftersalesContent || '',
          sparePartsContent: data.sparePartsContent || '',
          emergencySupport: data.emergencySupport || '',
          bookingServiceCta: data.bookingServiceCta || '',
        })
        setLoading(false)
      })
      .catch(err => {
        setError(err.message)
        setLoading(false)
      })
  }, [params.id])

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setSaving(true)
    setError('')

    const res = await fetch(`/api/ownership/${params.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    })

    if (!res.ok) {
      const data = await res.json()
      throw new Error(data.error || 'Failed to update ownership content')
    }

    router.push('/admin/ownership')
    router.refresh()
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="w-8 h-8 animate-spin text-chery-red" />
      </div>
    )
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
        <h1 className="text-2xl font-heading font-bold text-gray-900">Edit Ownership Content</h1>
        <p className="text-gray-500 text-sm mt-1">Update ownership and aftersales content</p>
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
            <textarea name="warrantyContent" value={form.warrantyContent} onChange={e => setForm({ ...form, warrantyContent: e.target.value })} required rows={4} className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-chery-red/50" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Service Content *</label>
            <textarea name="serviceContent" value={form.serviceContent} onChange={e => setForm({ ...form, serviceContent: e.target.value })} required rows={4} className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-chery-red/50" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Aftersales Content *</label>
            <textarea name="aftersalesContent" value={form.aftersalesContent} onChange={e => setForm({ ...form, aftersalesContent: e.target.value })} required rows={4} className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-chery-red/50" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Spare Parts Content *</label>
            <textarea name="sparePartsContent" value={form.sparePartsContent} onChange={e => setForm({ ...form, sparePartsContent: e.target.value })} required rows={4} className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-chery-red/50" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Emergency Support *</label>
            <textarea name="emergencySupport" value={form.emergencySupport} onChange={e => setForm({ ...form, emergencySupport: e.target.value })} required rows={3} className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-chery-red/50" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Booking Service CTA</label>
            <input name="bookingServiceCta" value={form.bookingServiceCta} onChange={e => setForm({ ...form, bookingServiceCta: e.target.value })} className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-chery-red/50" />
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
            {saving ? 'Saving...' : 'Update Ownership Content'}
          </button>
        </div>
      </form>
    </div>
  )
}