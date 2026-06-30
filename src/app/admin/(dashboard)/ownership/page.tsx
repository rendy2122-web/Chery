import { auth } from '@/lib/auth'
import { prisma } from '@/lib/db'
import { redirect } from 'next/navigation'
import { ArrowLeft, Loader2 } from 'lucide-react'
import Link from 'next/link'

async function getOwnership() {
  return prisma.ownership.findFirst()
}

export default async function OwnershipPage() {
  const session = await auth()
  if (!session?.user) redirect('/admin/login')

  const ownership = await getOwnership()

  if (!ownership) {
    return (
      <div>
        <div className="mb-6">
          <h1 className="text-2xl font-heading font-bold text-gray-900">Ownership</h1>
          <p className="text-gray-500 text-sm mt-1">Manage ownership content</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
          <p className="text-gray-500 mb-4">No ownership content yet</p>
          <Link href="/admin/ownership/new" className="inline-flex items-center gap-2 px-4 py-2 bg-chery-red text-white rounded-lg text-sm font-medium hover:bg-chery-red-dark transition-colors">
            Create Ownership Content
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-heading font-bold text-gray-900">Ownership</h1>
        <p className="text-gray-500 text-sm mt-1">Manage ownership content</p>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-500 mb-1">Warranty Content</label>
            <p className="text-gray-900 whitespace-pre-wrap">{ownership.warrantyContent || '-'}</p>
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-500 mb-1">Service Content</label>
            <p className="text-gray-900 whitespace-pre-wrap">{ownership.serviceContent || '-'}</p>
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-500 mb-1">Aftersales Content</label>
            <p className="text-gray-900 whitespace-pre-wrap">{ownership.aftersalesContent || '-'}</p>
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-500 mb-1">Spare Parts Content</label>
            <p className="text-gray-900 whitespace-pre-wrap">{ownership.sparePartsContent || '-'}</p>
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-500 mb-1">Emergency Support</label>
            <p className="text-gray-900 whitespace-pre-wrap">{ownership.emergencySupport || '-'}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-500 mb-1">Booking Service CTA</label>
            <p className="text-gray-900">{ownership.bookingServiceCta || '-'}</p>
          </div>
        </div>

        <div className="mt-6 pt-6 border-t border-gray-100">
          <Link href={`/admin/ownership/${ownership.id}/edit`} className="inline-flex items-center gap-2 px-4 py-2 bg-chery-red text-white rounded-lg text-sm font-medium hover:bg-chery-red-dark transition-colors">
            Edit Ownership Content
          </Link>
        </div>
      </div>
    </div>
  )
}