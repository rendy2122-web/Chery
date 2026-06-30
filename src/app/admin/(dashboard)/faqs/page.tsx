import { auth } from '@/lib/auth'
import { prisma } from '@/lib/db'
import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'
import AdminTable from '../../components/AdminTable'

async function getFaqs() {
  return prisma.faq.findMany({
    orderBy: { order: 'asc' },
    select: {
      id: true,
      question: true,
      category: true,
      order: true,
      active: true,
      createdAt: true,
    },
  })
}

async function deleteFaq(id: string) {
  'use server'
  try {
    await prisma.faq.delete({ where: { id } })
    revalidatePath('/admin/faqs')
    return { success: true }
  } catch {
    return { error: 'Failed to delete FAQ' }
  }
}

export default async function FaqsPage() {
  const session = await auth()
  if (!session?.user) redirect('/admin/login')

  const faqs = await getFaqs()

  const data = faqs.map((f) => ({
    ...f,
    createdAt: f.createdAt.toISOString(),
  }))

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-heading font-bold text-gray-900">FAQ</h1>
          <p className="text-gray-500 text-sm mt-1">Manage frequently asked questions</p>
        </div>
      </div>

      <AdminTable
        title="All FAQs"
        data={data}
        columns={[
          { key: 'question', label: 'Question' },
          { key: 'category', label: 'Category' },
          { key: 'order', label: 'Order' },
          { key: 'active', label: 'Status', format: (v: unknown) => v ? 'Active' : 'Inactive' },
        ]}
        createHref="/admin/faqs/new"
        createLabel="Add FAQ"
        rowHref={(f) => `/admin/faqs/${(f as { id: string }).id}/edit`}
        searchable
        searchPlaceholder="Search FAQs..."
        filterable
        filterField="active"
        filterOptions={[
          { label: 'Active', value: 'true' },
          { label: 'Inactive', value: 'false' },
        ]}
        onDelete={async (item) => {
          const result = await deleteFaq(item.id as string)
          if ('error' in result) throw new Error(result.error)
        }}
        deleteField="question"
      />
    </div>
  )
}