import { auth } from '@/lib/auth'
import { prisma } from '@/lib/db'
import { redirect } from 'next/navigation'
import AdminTable from '../../components/AdminTable'

export default async function FaqPage() {
  const session = await auth()
  if (!session?.user) redirect('/admin/login')

  const faqs = await prisma.faq.findMany({
    orderBy: { order: 'asc' },
  })

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-heading font-bold text-gray-900">FAQ</h1>
        <p className="text-gray-500 text-sm mt-1">Manage frequently asked questions</p>
      </div>
      <AdminTable
        title="All FAQs"
        data={faqs as any}
        columns={[
          { key: 'question', label: 'Question' },
          { key: 'category', label: 'Category' },
          { key: 'active', label: 'Status', format: (v: any) => v ? 'Active' : 'Inactive' },
        ]}
        createHref="/admin/faq/new"
        createLabel="Add FAQ"
        rowHref={(v: any) => `/admin/faq/${v.id}/edit`}
      />
    </div>
  )
}
