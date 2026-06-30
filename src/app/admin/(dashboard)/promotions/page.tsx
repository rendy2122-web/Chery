import { auth } from '@/lib/auth'
import { prisma } from '@/lib/db'
import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'
import AdminTable from '../../components/AdminTable'

async function getPromotions() {
  return prisma.promotion.findMany({
    orderBy: { createdAt: 'desc' },
    select: {
      id: true,
      title: true,
      slug: true,
      imageUrl: true,
      active: true,
      createdAt: true,
    },
  })
}

async function deletePromotion(id: string) {
  'use server'
  try {
    await prisma.promotion.delete({ where: { id } })
    revalidatePath('/admin/promotions')
    return { success: true }
  } catch {
    return { error: 'Failed to delete promotion' }
  }
}

export default async function PromotionsPage() {
  const session = await auth()
  if (!session?.user) redirect('/admin/login')

  const promotions = await getPromotions()

  const data = promotions.map((p) => ({
    ...p,
    createdAt: p.createdAt.toISOString(),
  }))

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-heading font-bold text-gray-900">Promotions</h1>
          <p className="text-gray-500 text-sm mt-1">Manage promotional campaigns</p>
        </div>
      </div>

      <AdminTable
        title="All Promotions"
        data={data}
        columns={[
          { key: 'title', label: 'Title' },
          { key: 'active', label: 'Status', format: (v: unknown) => v ? 'Active' : 'Inactive' },
          { key: 'createdAt', label: 'Created', format: (v: unknown) => {
              const d = v as string
              return d ? new Date(d).toLocaleDateString('id-ID') : '-'
            }
          },
        ]}
        createHref="/admin/promotions/new"
        createLabel="Add Promotion"
        rowHref={(p) => `/admin/promotions/${(p as { id: string }).id}/edit`}
        searchable
        searchPlaceholder="Search promotions..."
        filterable
        filterField="active"
        filterOptions={[
          { label: 'Active', value: 'true' },
          { label: 'Inactive', value: 'false' },
        ]}
        onDelete={async (item) => {
          const result = await deletePromotion(item.id as string)
          if ('error' in result) throw new Error(result.error)
        }}
        deleteField="title"
      />
    </div>
  )
}