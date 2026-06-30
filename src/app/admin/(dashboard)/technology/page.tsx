import { auth } from '@/lib/auth'
import { prisma } from '@/lib/db'
import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'
import AdminTable from '../../components/AdminTable'

async function getTechnologies() {
  return prisma.technology.findMany({
    orderBy: { order: 'asc' },
    select: {
      id: true,
      title: true,
      slug: true,
      category: true,
      shortDescription: true,
      order: true,
      active: true,
      createdAt: true,
    },
  })
}

async function deleteTechnology(id: string) {
  'use server'
  await prisma.technology.delete({ where: { id } })
  revalidatePath('/admin/technology')
}

export default async function TechnologyPage() {
  const session = await auth()
  if (!session?.user) redirect('/admin/login')

  const technologies = await getTechnologies()

  const data = technologies.map((t) => ({
    ...t,
    createdAt: t.createdAt.toISOString(),
  }))

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-heading font-bold text-gray-900">Technology</h1>
          <p className="text-gray-500 text-sm mt-1">Manage technology content</p>
        </div>
      </div>

      <AdminTable
        title="All Technologies"
        data={data}
        columns={[
          { key: 'title', label: 'Title' },
          { key: 'category', label: 'Category' },
          { key: 'order', label: 'Order' },
          { key: 'active', label: 'Status', formatType: 'boolean' },
        ]}
        createHref="/admin/technology/new"
        createLabel="Add Technology"
        rowHrefPattern="/admin/technology/{id}/edit"
        rowHrefField="id"
        searchable
        searchPlaceholder="Search technology..."
        filterable
        filterField="category"
        filterOptions={[
          { label: 'CSH/Hybrid', value: 'CSH' },
          { label: 'ADAS', value: 'ADAS' },
          { label: 'Safety', value: 'SAFETY' },
          { label: 'EV/BEV', value: 'EV' },
          { label: 'Smart Cabin', value: 'SMART_CABIN' },
        ]}
        onDelete={deleteTechnology}
        deleteField="title"
      />
    </div>
  )
}