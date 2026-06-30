import { NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/db'

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await auth()
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const technology = await prisma.technology.findUnique({
      where: { id: params.id },
    })

    if (!technology) {
      return NextResponse.json({ error: 'Technology not found' }, { status: 404 })
    }

    return NextResponse.json(technology)
  } catch (error) {
    console.error('Error fetching technology:', error)
    return NextResponse.json({ error: 'Failed to fetch technology' }, { status: 500 })
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
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

    const technology = await prisma.technology.update({
      where: { id: params.id },
      data: {
        title,
        slug,
        category,
        icon,
        imageUrl,
        shortDescription,
        longDescription,
        order,
        active,
      },
    })

    return NextResponse.json(technology)
  } catch (error) {
    console.error('Error updating technology:', error)
    return NextResponse.json({ error: 'Failed to update technology' }, { status: 500 })
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await auth()
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    await prisma.technology.delete({
      where: { id: params.id },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting technology:', error)
    return NextResponse.json({ error: 'Failed to delete technology' }, { status: 500 })
  }
}