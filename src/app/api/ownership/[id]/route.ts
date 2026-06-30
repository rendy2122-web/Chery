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

    const ownership = await prisma.ownership.findUnique({
      where: { id: params.id },
    })

    if (!ownership) {
      return NextResponse.json({ error: 'Ownership content not found' }, { status: 404 })
    }

    return NextResponse.json(ownership)
  } catch (error) {
    console.error('Error fetching ownership:', error)
    return NextResponse.json({ error: 'Failed to fetch ownership' }, { status: 500 })
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
      warrantyContent,
      serviceContent,
      aftersalesContent,
      sparePartsContent,
      emergencySupport,
      bookingServiceCta,
    } = body

    const ownership = await prisma.ownership.update({
      where: { id: params.id },
      data: {
        warrantyContent,
        serviceContent,
        aftersalesContent,
        sparePartsContent,
        emergencySupport,
        bookingServiceCta,
      },
    })

    return NextResponse.json(ownership)
  } catch (error) {
    console.error('Error updating ownership:', error)
    return NextResponse.json({ error: 'Failed to update ownership' }, { status: 500 })
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

    await prisma.ownership.delete({
      where: { id: params.id },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting ownership:', error)
    return NextResponse.json({ error: 'Failed to delete ownership' }, { status: 500 })
  }
}