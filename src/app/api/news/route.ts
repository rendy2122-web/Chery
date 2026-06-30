import { NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/db'

export async function GET() {
  try {
    const session = await auth()
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const news = await prisma.news.findMany({
      orderBy: { createdAt: 'desc' },
    })

    return NextResponse.json(news)
  } catch (error) {
    console.error('Error fetching news:', error)
    return NextResponse.json({ error: 'Failed to fetch news' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const session = await auth()
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const {
      title,
      slug,
      category,
      thumbnailUrl,
      excerpt,
      contentBody,
      author,
      publishDate,
      seoTitle,
      seoDescription,
      status,
    } = body

    if (!title || !slug || !category || !thumbnailUrl || !excerpt || !contentBody || !author || !status) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const news = await prisma.news.create({
      data: {
        title,
        slug,
        category,
        thumbnailUrl,
        excerpt,
        contentBody,
        author,
        publishDate: publishDate ? new Date(publishDate) : undefined,
        seoTitle,
        seoDescription,
        status,
      },
    })

    return NextResponse.json(news, { status: 201 })
  } catch (error) {
    console.error('Error creating news:', error)
    return NextResponse.json({ error: 'Failed to create news' }, { status: 500 })
  }
}