import { auth } from '@/lib/auth'
import { prisma } from '@/lib/db'
import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'
import AdminTable from '../../components/AdminTable'

async function getNews() {
  return prisma.news.findMany({
    orderBy: { createdAt: 'desc' },
    select: {
      id: true,
      title: true,
      slug: true,
      category: true,
      thumbnailUrl: true,
      status: true,
      publishDate: true,
      createdAt: true,
    },
  })
}

async function deleteNews(id: string) {
  'use server'
  try {
    await prisma.news.delete({ where: { id } })
    revalidatePath('/admin/news')
    return { success: true }
  } catch {
    return { error: 'Failed to delete news' }
  }
}

export default async function NewsPage() {
  const session = await auth()
  if (!session?.user) redirect('/admin/login')

  const news = await getNews()

  const data = news.map((n) => ({
    ...n,
    publishDate: n.publishDate?.toISOString() ?? null,
    createdAt: n.createdAt.toISOString(),
  }))

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-heading font-bold text-gray-900">News / Articles</h1>
          <p className="text-gray-500 text-sm mt-1">Manage news and articles</p>
        </div>
      </div>

      <AdminTable
        title="All News"
        data={data}
        columns={[
          { key: 'title', label: 'Title' },
          { key: 'category', label: 'Category' },
          { key: 'status', label: 'Status', format: (v: unknown) => {
              const s = v as string
              return s === 'PUBLISHED' ? 'Published' : 'Draft'
            }
          },
          { key: 'publishDate', label: 'Published', format: (v: unknown) => {
              const d = v as string | null
              return d ? new Date(d).toLocaleDateString('id-ID') : '-'
            }
          },
        ]}
        createHref="/admin/news/new"
        createLabel="Add News"
        rowHref={(n) => `/admin/news/${(n as { id: string }).id}/edit`}
        searchable
        searchPlaceholder="Search news..."
        filterable
        filterField="status"
        filterOptions={[
          { label: 'Published', value: 'PUBLISHED' },
          { label: 'Draft', value: 'DRAFT' },
        ]}
        onDelete={async (item) => {
          const result = await deleteNews(item.id as string)
          if ('error' in result) throw new Error(result.error)
        }}
        deleteField="title"
      />
    </div>
  )
}