import { auth } from '@/lib/auth'
import { prisma } from '@/lib/db'
import { redirect } from 'next/navigation'
import AdminTable from '../../components/AdminTable'

async function getApprovals() {
  // For now, we'll show news items that are in DRAFT status
  // In a real approval workflow, you'd have a separate Approval model
  return prisma.news.findMany({
    where: { status: 'DRAFT' },
    orderBy: { createdAt: 'desc' },
    select: {
      id: true,
      title: true,
      category: true,
      author: true,
      createdAt: true,
    },
  })
}

export default async function ApprovalsPage() {
  const session = await auth()
  if (!session?.user) redirect('/admin/login')

  const approvals = await getApprovals()

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-heading font-bold text-gray-900">Approval Workflow</h1>
        <p className="text-gray-500 text-sm mt-1">Review and approve content</p>
      </div>

      <AdminTable
        title="Pending Approvals"
        data={approvals as Record<string, unknown>[]}
        columns={[
          { key: 'title', label: 'Title' },
          { key: 'category', label: 'Category' },
          { key: 'author', label: 'Author' },
          { key: 'createdAt', label: 'Submitted', format: (v: unknown) => v ? new Date(v as string).toLocaleDateString('id-ID') : '-' },
        ]}
        createHref=""
        createLabel=""
        rowHref={(n) => `/admin/news/${(n as { id: string }).id}/edit`}
      />
    </div>
  )
}