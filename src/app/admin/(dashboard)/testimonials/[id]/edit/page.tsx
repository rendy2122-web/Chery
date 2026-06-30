'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeft, Loader2, Star } from 'lucide-react'
import Link from 'next/link'

export default function EditTestimonialPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)
  const [form, setForm] = useState({
    customerName: '',
    location: '',
    modelOwned: '',
    testimonialText: '',
    rating: 5,
    imageUrl: '',
    active: true,
  })

  useEffect(() => {
    fetch(`/api/testimonials/${params.id}`)
      .then(res => res.json())
      .then(data => {
        if (data.error) throw new Error(data.error)
        setForm({
          customerName: data.customerName || '',
          location: data.location || '',
          modelOwned: data.modelOwned || '',
          testimonialText: data.testimonialText || '',
          rating: data.rating ?? 5,
          imageUrl: data.imageUrl || '',
          active: data.active ?? true,
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

    const res = await fetch(`/api/testimonials/${params.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    })

    if (!res.ok) {
      const data = await res.json()
      throw new Error(data.error || 'Failed to update testimonial')
    }

    router.push('/admin/testimonials')
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
        <Link href="/admin/testimonials" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-chery-red transition-colors">
          <ArrowLeft className="w-4 h-4" />
          Back to Testimonials
        </Link>
      </div>

      <div className="mb-6">
        <h1 className="text-2xl font-heading font-bold text-gray-900">Edit Testimonial</h1>
        <p className="text-gray-500 text-sm mt-1">Update customer testimonial</p>
      </div>

      {error && (
        <div className="mb-6 bg-red-50 border border-red-200 text-red-700 text-sm rounded-xl p-4">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-white rounded-xl border border-gray-200 p-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Customer Name *</label>
            <input name="customerName" value={form.customerName} onChange={e => setForm({ ...form, customerName: e.target.value })} required className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-chery-red/50" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
            <input name="location" value={form.location} onChange={e => setForm({ ...form, location: e.target.value })} className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-chery-red/50" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Model Owned</label>
            <input name="modelOwned" value={form.modelOwned} onChange={e => setForm({ ...form, modelOwned: e.target.value })} className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-chery-red/50" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Rating</label>
            <div className="flex items-center gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setForm({ ...form, rating: star })}
                  className="focus:outline-none"
                >
                  <Star className={`w-6 h-6 ${star <= form.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} />
                </button>
              ))}
              <span className="text-sm text-gray-500 ml-2">{form.rating} / 5</span>
            </div>
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">Testimonial Text *</label>
            <textarea name="testimonialText" value={form.testimonialText} onChange={e => setForm({ ...form, testimonialText: e.target.value })} required rows={4} className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-chery-red/50" />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">Image URL</label>
            <input name="imageUrl" value={form.imageUrl} onChange={e => setForm({ ...form, imageUrl: e.target.value })} className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-chery-red/50" />
          </div>
          <div className="flex items-center gap-2">
            <input type="checkbox" name="active" id="active" checked={form.active} onChange={e => setForm({ ...form, active: e.target.checked })} className="w-4 h-4 text-chery-red border-gray-300 rounded focus:ring-chery-red" />
            <label htmlFor="active" className="text-sm font-medium text-gray-700">Active</label>
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-100">
          <Link href="/admin/testimonials" className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">
            Cancel
          </Link>
          <button
            type="submit"
            disabled={saving}
            className="inline-flex items-center gap-2 px-6 py-2 bg-chery-red text-white rounded-lg text-sm font-medium hover:bg-chery-red-dark transition-colors disabled:opacity-50"
          >
            {saving && <Loader2 className="w-4 h-4 animate-spin" />}
            {saving ? 'Saving...' : 'Update Testimonial'}
          </button>
        </div>
      </form>
    </div>
  )
}