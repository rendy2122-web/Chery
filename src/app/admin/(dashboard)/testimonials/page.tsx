import { auth } from '@/lib/auth'
import { prisma } from '@/lib/db'
import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'
import AdminTable from '../../components/AdminTable'

async function getTestimonials() {
  return prisma.testimonial.findMany({
    orderBy: { createdAt: 'desc' },
    select: {
      id: true,
      customerName: true,
      location: true,
      modelOwned: true,
      testimonialText: true,
      rating: true,
      imageUrl: true,
      active: true,
      createdAt: true,
    },
  })
}

async function deleteTestimonial(id: string) {
  'use server'
  try {
    await prisma.testimonial.delete({ where: { id } })
    revalidatePath('/admin/testimonials')
    return { success: true }
  } catch {
    return { error: 'Failed to delete testimonial' }
  }
}

export default async function TestimonialsPage() {
  const session = await auth()
  if (!session?.user) redirect('/admin/login')

  const testimonials = await getTestimonials()

  const data = testimonials.map((t) => ({
    ...t,
    createdAt: t.createdAt.toISOString(),
  }))

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-heading font-bold text-gray-900">Testimonials</h1>
          <p className="text-gray-500 text-sm mt-1">Manage customer testimonials</p>
        </div>
      </div>

      <AdminTable
        title="All Testimonials"
        data={data}
        columns={[
          { key: 'customerName', label: 'Customer Name' },
          { key: 'modelOwned', label: 'Model' },
          { key: 'rating', label: 'Rating', format: (v: unknown) => `${v} ★` },
          { key: 'active', label: 'Status', format: (v: unknown) => v ? 'Active' : 'Inactive' },
        ]}
        createHref="/admin/testimonials/new"
        createLabel="Add Testimonial"
        rowHref={(t) => `/admin/testimonials/${(t as { id: string }).id}/edit`}
        searchable
        searchPlaceholder="Search testimonials..."
        filterable
        filterField="active"
        filterOptions={[
          { label: 'Active', value: 'true' },
          { label: 'Inactive', value: 'false' },
        ]}
        onDelete={async (item) => {
          const result = await deleteTestimonial(item.id as string)
          if ('error' in result) throw new Error(result.error)
        }}
        deleteField="customerName"
      />
    </div>
  )
}