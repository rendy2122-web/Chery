import { auth } from '@/lib/auth'
import { prisma } from '@/lib/db'
import { redirect } from 'next/navigation'
import AdminTable from '../../components/AdminTable'

async function getMedia() {
  return prisma.media.findMany({
    orderBy: { createdAt: 'desc' },
    select: {
      id: true,
      filename: true,
      originalName: true,
      mimeType: true,
      size: true,
      url: true,
      altText: true,
      caption: true,
      createdAt: true,
    },
  })
}

export default async function MediaPage() {
  const session = await auth()
  if (!session?.user) redirect('/admin/login')

  const media = await getMedia()

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-heading font-bold text-gray-900">Media Library</h1>
        <p className="text-gray-500 text-sm mt-1">Manage images and videos</p>
      </div>

      <AdminTable
        title="All Media"
        data={media as Record<string, unknown>[]}
        columns={[
          { key: 'originalName', label: 'File Name' },
          { key: 'mimeType', label: 'Type' },
          { key: 'size', label: 'Size', format: (v: unknown) => `${(v as number / 1024).toFixed(1)} KB` },
          { key: 'createdAt', label: 'Uploaded', format: (v: unknown) => v ? new Date(v as string).toLocaleDateString('id-ID') : '-' },
        ]}
        createHref="/admin/media/new"
        createLabel="Upload Media"
        rowHref={(m) => `/admin/media/${(m as { id: string }).id}/edit`}
      />
    </div>
  )
}