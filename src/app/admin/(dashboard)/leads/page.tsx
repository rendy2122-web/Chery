import { auth } from '@/lib/auth'
import { prisma } from '@/lib/db'
import { redirect } from 'next/navigation'
import AdminTable from '../../components/AdminTable'

async function getLeads() {
  return prisma.lead.findMany({
    orderBy: { createdAt: 'desc' },
    select: {
      id: true,
      name: true,
      phone: true,
      email: true,
      selectedModel: true,
      selectedDealerId: true,
      status: true,
      sourcePage: true,
      createdAt: true,
    },
  })
}

export default async function LeadsPage() {
  const session = await auth()
  if (!session?.user) redirect('/admin/login')

  const leads = await getLeads()

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-heading font-bold text-gray-900">Test Drive Leads</h1>
          <p className="text-gray-500 text-sm mt-1">Manage test drive requests</p>
        </div>
      </div>

      <AdminTable
        title="All Leads"
        data={leads as Record<string, unknown>[]}
        columns={[
          { key: 'name', label: 'Name' },
          { key: 'phone', label: 'Phone' },
          { key: 'selectedModel', label: 'Model', format: (v: unknown) => v ? String(v) : '-' },
          { key: 'status', label: 'Status' },
          { key: 'createdAt', label: 'Date', format: (v: unknown) => v ? new Date(v as string).toLocaleDateString('id-ID') : '-' },
        ]}
        createHref="/admin/leads/new"
        createLabel="Add Lead"
        rowHref={(l) => `/admin/leads/${(l as { id: string }).id}`}
      />
    </div>
  )
}