import { auth } from '@/lib/auth'
import { prisma } from '@/lib/db'
import { redirect } from 'next/navigation'
import { ArrowLeft, Loader2 } from 'lucide-react'
import Link from 'next/link'

async function getFinancing() {
  return prisma.financing.findFirst()
}

export default async function FinancingPage() {
  const session = await auth()
  if (!session?.user) redirect('/admin/login')

  const financing = await getFinancing()

  if (!financing) {
    return (
      <div>
        <div className="mb-6">
          <h1 className="text-2xl font-heading font-bold text-gray-900">Financing</h1>
          <p className="text-gray-500 text-sm mt-1">Manage financing settings</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
          <p className="text-gray-500 mb-4">No financing settings yet</p>
          <Link href="/admin/financing/new" className="inline-flex items-center gap-2 px-4 py-2 bg-chery-red text-white rounded-lg text-sm font-medium hover:bg-chery-red-dark transition-colors">
            Create Financing Settings
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-heading font-bold text-gray-900">Financing</h1>
        <p className="text-gray-500 text-sm mt-1">Manage financing settings</p>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-500 mb-1">Default Interest Rate</label>
            <p className="text-gray-900 font-medium">{financing.defaultInterestRate}%</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-500 mb-1">Admin Fee Note</label>
            <p className="text-gray-900">{financing.adminFeeNote || '-'}</p>
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-500 mb-1">Tenor Options</label>
            <p className="text-gray-900">{financing.tenorOptions || '-'}</p>
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-500 mb-1">DP Options</label>
            <p className="text-gray-900">{financing.dpOptions || '-'}</p>
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-500 mb-1">Disclaimer Text</label>
            <p className="text-gray-900 whitespace-pre-wrap">{financing.disclaimerText || '-'}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-500 mb-1">CTA Label</label>
            <p className="text-gray-900">{financing.ctaLabel || '-'}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-500 mb-1">CTA URL</label>
            <p className="text-gray-900">{financing.ctaUrl || '-'}</p>
          </div>
        </div>

        <div className="mt-6 pt-6 border-t border-gray-100">
          <Link href={`/admin/financing/${financing.id}/edit`} className="inline-flex items-center gap-2 px-4 py-2 bg-chery-red text-white rounded-lg text-sm font-medium hover:bg-chery-red-dark transition-colors">
            Edit Financing Settings
          </Link>
        </div>
      </div>
    </div>
  )
}