import { auth } from '@/lib/auth'
import { prisma } from '@/lib/db'
import { redirect } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'

async function getLead(id: string) {
  return prisma.lead.findUnique({
    where: { id },
  })
}

export default async function LeadDetailPage({ params }: { params: { id: string } }) {
  const session = await auth()
  if (!session?.user) redirect('/admin/login')

  const lead = await getLead(params.id)

  if (!lead) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">Lead not found</p>
        <Link href="/admin/leads" className="text-chery-red hover:underline mt-2 inline-block">
          Back to Leads
        </Link>
      </div>
    )
  }

  return (
    <div>
      <div className="mb-6">
        <Link href="/admin/leads" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-chery-red transition-colors">
          <ArrowLeft className="w-4 h-4" />
          Back to Leads
        </Link>
      </div>

      <div className="mb-6">
        <h1 className="text-2xl font-heading font-bold text-gray-900">Lead Detail</h1>
        <p className="text-gray-500 text-sm mt-1">View test drive request details</p>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-500 mb-1">Name</label>
            <p className="text-gray-900 font-medium">{lead.name}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-500 mb-1">Phone</label>
            <p className="text-gray-900 font-medium">{lead.phone}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-500 mb-1">Email</label>
            <p className="text-gray-900">{lead.email || '-'}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-500 mb-1">Selected Model</label>
            <p className="text-gray-900">{lead.selectedModel || '-'}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-500 mb-1">Status</label>
            <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
              lead.status === 'NEW' ? 'bg-blue-100 text-blue-800' :
              lead.status === 'CONTACTED' ? 'bg-yellow-100 text-yellow-800' :
              lead.status === 'TEST_DRIVE_SCHEDULED' ? 'bg-purple-100 text-purple-800' :
              'bg-gray-100 text-gray-800'
            }`}>
              {lead.status}
            </span>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-500 mb-1">Source Page</label>
            <p className="text-gray-900">{lead.sourcePage || '-'}</p>
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-500 mb-1">Message</label>
            <p className="text-gray-900 whitespace-pre-wrap">{lead.message || '-'}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-500 mb-1">Created At</label>
            <p className="text-gray-900">{new Date(lead.createdAt).toLocaleString('id-ID')}</p>
          </div>
        </div>
      </div>
    </div>
  )
}