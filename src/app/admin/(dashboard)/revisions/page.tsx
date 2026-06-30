import { auth } from '@/lib/auth'
import { prisma } from '@/lib/db'
import { redirect } from 'next/navigation'
import AdminTable from '../../components/AdminTable'

async function getRevisions() {
  return prisma.revision.findMany({
    orderBy: { createdAt: 'desc' },
    take: 100,
    select: {
      id: true,
      entityType: true,
      entityId: true,
      userName: true,
      action: true,
      oldValue: true,
      newValue: true,
      createdAt: true,
    },
  })
}

export default async function RevisionsPage() {
  const session = await auth()
  if (!session?.user) redirect('/admin/login')

  const revisions = await getRevisions()

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-heading font-bold text-gray-900">Revision History</h1>
        <p className="text-gray-500 text-sm mt-1">Track all content changes</p>
      </div>

      <AdminTable
        title="All Revisions"
        data={revisions as Record<string, unknown>[]}
        columns={[
          { key: 'entityType', label: 'Entity Type' },
          { key: 'userName', label: 'User' },
          { key: 'action', label: 'Action' },
          { key: 'createdAt', label: 'Date', formatType: 'datetime' },
        ]}
        createHref=""
        createLabel=""
        rowHrefPattern="#"
      />
    </div>
  )
}