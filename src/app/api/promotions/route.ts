import { NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/db'

export async function GET() {
  try {
    const session = await auth()
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const promotions = await prisma.promotion.findMany({
      orderBy: { createdAt: 'desc' },
    })

    return NextResponse.json(promotions)
  } catch (error) {
    console.error('Error fetching promotions:', error)
    return NextResponse.json({ error: 'Failed to fetch promotions' }, { status: 500 })
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
      imageUrl,
      description,
      relatedModel,
      startDate,
      endDate,
      terms,
      ctaLabel,
      ctaUrl,
      active,
    } = body

    if (!title || !slug || !imageUrl || !description || !startDate || !endDate) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const promotion = await prisma.promotion.create({
      data: {
        title,
        slug,
        imageUrl,
        description,
        relatedModel,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        terms,
        ctaLabel,
        ctaUrl,
        active: active ?? true,
      },
    })

    return NextResponse.json(promotion, { status: 201 })
  } catch (error) {
    console.error('Error creating promotion:', error)
    return NextResponse.json({ error: 'Failed to create promotion' }, { status: 500 })
  }
}