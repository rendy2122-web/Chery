import { NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/db'

export async function GET() {
  try {
    const session = await auth()
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const ownership = await prisma.ownership.findFirst()

    return NextResponse.json(ownership)
  } catch (error) {
    console.error('Error fetching ownership:', error)
    return NextResponse.json({ error: 'Failed to fetch ownership' }, { status: 500 })
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
      warrantyContent,
      serviceContent,
      aftersalesContent,
      sparePartsContent,
      emergencySupport,
      bookingServiceCta,
    } = body

    if (!warrantyContent || !serviceContent || !aftersalesContent || !sparePartsContent || !emergencySupport) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const ownership = await prisma.ownership.create({
      data: {
        warrantyContent,
        serviceContent,
        aftersalesContent,
        sparePartsContent,
        emergencySupport,
        bookingServiceCta,
      },
    })

    return NextResponse.json(ownership, { status: 201 })
  } catch (error) {
    console.error('Error creating ownership:', error)
    return NextResponse.json({ error: 'Failed to create ownership' }, { status: 500 })
  }
}