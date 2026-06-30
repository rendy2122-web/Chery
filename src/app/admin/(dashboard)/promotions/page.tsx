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
  await prisma.promotion.delete({ where: { id } })
  revalidatePath('/admin/promotions')
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
          { key: 'active', label: 'Status', formatType: 'boolean' },
          { key: 'createdAt', label: 'Created', formatType: 'date' },
        ]}
        createHref="/admin/promotions/new"
        createLabel="Add Promotion"
        rowHrefPattern="/admin/promotions/{id}/edit"
        rowHrefField="id"
        searchable
        searchPlaceholder="Search promotions..."
        filterable
        filterField="active"
        filterOptions={[
          { label: 'Active', value: 'true' },
          { label: 'Inactive', value: 'false' },
        ]}
        onDelete={deletePromotion}
        deleteField="title"
      />
    </div>
  )
}