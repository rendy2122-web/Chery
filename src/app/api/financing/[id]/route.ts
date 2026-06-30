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

    const financing = await prisma.financing.findUnique({
      where: { id: params.id },
    })

    if (!financing) {
      return NextResponse.json({ error: 'Financing not found' }, { status: 404 })
    }

    return NextResponse.json(financing)
  } catch (error) {
    console.error('Error fetching financing:', error)
    return NextResponse.json({ error: 'Failed to fetch financing' }, { status: 500 })
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
      defaultInterestRate,
      tenorOptions,
      dpOptions,
      adminFeeNote,
      disclaimerText,
      ctaLabel,
      ctaUrl,
    } = body

    const financing = await prisma.financing.update({
      where: { id: params.id },
      data: {
        defaultInterestRate,
        tenorOptions,
        dpOptions,
        adminFeeNote,
        disclaimerText,
        ctaLabel,
        ctaUrl,
      },
    })

    return NextResponse.json(financing)
  } catch (error) {
    console.error('Error updating financing:', error)
    return NextResponse.json({ error: 'Failed to update financing' }, { status: 500 })
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

    await prisma.financing.delete({
      where: { id: params.id },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting financing:', error)
    return NextResponse.json({ error: 'Failed to delete financing' }, { status: 500 })
  }
}