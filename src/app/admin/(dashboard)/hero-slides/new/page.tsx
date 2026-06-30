'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeft, Loader2 } from 'lucide-react'
import Link from 'next/link'
import FormField from '../../../components/FormField'
import { useToast } from '../../../components/Toast'

export default function NewHeroSlidePage() {
  const router = useRouter()
  const { addToast } = useToast()
  const [saving, setSaving] = useState(false)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setSaving(true)

    const form = e.currentTarget
    const formData = new FormData(form)

    const payload = {
      type: formData.get('type') as string,
      title: formData.get('title') as string,
      subtitle: formData.get('subtitle') as string,
      description: formData.get('description') as string,
      mediaUrl: formData.get('mediaUrl') as string,
      ctaLabel: formData.get('ctaLabel') as string,
      ctaUrl: formData.get('ctaUrl') as string,
      order: parseInt(formData.get('order') as string || '0'),
      active: formData.get('active') === 'on',
      startDate: formData.get('startDate') as string || null,
      endDate: formData.get('endDate') as string || null,
      duration: parseInt(formData.get('duration') as string || '6000'),
    }

    try {
      const res = await fetch('/api/hero-slides', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error || 'Failed to create slide')
      }

      addToast('success', 'Hero slide created successfully')
      router.push('/admin/hero-slides')
      router.refresh()
    } catch (err) {
      addToast('error', err instanceof Error ? err.message : 'Something went wrong')
      setSaving(false)
    }
  }

  return (
    <div>
      <div className="mb-6">
        <Link href="/admin/hero-slides" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-chery-red transition-colors">
          <ArrowLeft className="w-4 h-4" />
          Back to Slides
        </Link>
      </div>

      <div className="mb-6">
        <h1 className="text-2xl font-heading font-bold text-gray-900">Add Hero Slide</h1>
        <p className="text-gray-500 text-sm mt-1">Create a new hero slideshow slide</p>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-xl border border-gray-200 p-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            name="type"
            label="Type"
            type="select"
            required
            options={[
              { label: 'Image', value: 'IMAGE' },
              { label: 'Video', value: 'VIDEO' },
              { label: 'Copy/Text Only', value: 'COPY' },
            ]}
            defaultValue="IMAGE"
          />

          <FormField
            name="order"
            label="Order"
            type="number"
            defaultValue={0}
            helperText="Lower numbers appear first"
            validation={[
              { type: 'min', value: 0, message: 'Order must be 0 or higher' },
            ]}
          />

          <div className="md:col-span-2">
            <FormField
              name="title"
              label="Title"
              placeholder="Experience the Future"
              validation={[
                { type: 'maxLength', value: 200, message: 'Title must be under 200 characters' },
              ]}
            />
          </div>

          <div className="md:col-span-2">
            <FormField
              name="subtitle"
              label="Subtitle"
              placeholder="Discover the all-new Chery"
              validation={[
                { type: 'maxLength', value: 300, message: 'Subtitle must be under 300 characters' },
              ]}
            />
          </div>

          <div className="md:col-span-2">
            <FormField
              name="description"
              label="Description"
              type="textarea"
              rows={3}
              placeholder="Detailed description..."
              validation={[
                { type: 'maxLength', value: 500, message: 'Description must be under 500 characters' },
              ]}
            />
          </div>

          <div className="md:col-span-2">
            <FormField
              name="mediaUrl"
              label="Media URL"
              type="url"
              required
              placeholder="https://example.com/image.jpg"
              validation={[
                { type: 'required', message: 'Media URL is required' },
                { type: 'url', message: 'Must be a valid URL starting with http:// or https://' },
              ]}
            />
          </div>

          <FormField
            name="ctaLabel"
            label="CTA Label"
            placeholder="Book Test Drive"
            validation={[
              { type: 'maxLength', value: 100, message: 'CTA label must be under 100 characters' },
            ]}
          />

          <FormField
            name="ctaUrl"
            label="CTA URL"
            type="url"
            placeholder="/test-drive"
            validation={[
              { type: 'url', message: 'Must be a valid URL or path starting with /' },
            ]}
          />

          <FormField
            name="active"
            label="Active"
            type="checkbox"
            placeholder="Slide is active"
            defaultValue={true}
          />

          <FormField
            name="startDate"
            label="Start Date"
            type="datetime-local"
            helperText="Leave empty to start immediately"
          />

          <FormField
            name="endDate"
            label="End Date"
            type="datetime-local"
            helperText="Leave empty for no end date"
          />

          <FormField
            name="duration"
            label="Duration (milliseconds)"
            type="number"
            defaultValue={6000}
            helperText="Time before auto-advance (6000 = 6 seconds)"
            validation={[
              { type: 'min', value: 1000, message: 'Minimum duration is 1000ms (1 second)' },
              { type: 'max', value: 30000, message: 'Maximum duration is 30000ms (30 seconds)' },
            ]}
          />
        </div>

        <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-100">
          <Link href="/admin/hero-slides" className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">
            Cancel
          </Link>
          <button
            type="submit"
            disabled={saving}
            className="inline-flex items-center gap-2 px-6 py-2 bg-chery-red text-white rounded-lg text-sm font-medium hover:bg-chery-red-dark transition-colors disabled:opacity-50"
          >
            {saving && <Loader2 className="w-4 h-4 animate-spin" />}
            {saving ? 'Creating...' : 'Create Slide'}
          </button>
        </div>
      </form>
    </div>
  )
}