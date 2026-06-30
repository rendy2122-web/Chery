import { NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/db'

export async function GET() {
  try {
    const session = await auth()
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const technologies = await prisma.technology.findMany({
      orderBy: { order: 'asc' },
    })

    return NextResponse.json(technologies)
  } catch (error) {
    console.error('Error fetching technologies:', error)
    return NextResponse.json({ error: 'Failed to fetch technologies' }, { status: 500 })
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
      icon,
      imageUrl,
      shortDescription,
      longDescription,
      order,
      active,
    } = body

    if (!title || !slug || !category || !shortDescription) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const technology = await prisma.technology.create({
      data: {
        title,
        slug,
        category,
        icon,
        imageUrl,
        shortDescription,
        longDescription,
        order: order ?? 0,
        active: active ?? true,
      },
    })

    return NextResponse.json(technology, { status: 201 })
  } catch (error) {
    console.error('Error creating technology:', error)
    return NextResponse.json({ error: 'Failed to create technology' }, { status: 500 })
  }
}