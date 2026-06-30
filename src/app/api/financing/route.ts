import { NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/db'

export async function GET() {
  try {
    const session = await auth()
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const financing = await prisma.financing.findFirst()

    return NextResponse.json(financing)
  } catch (error) {
    console.error('Error fetching financing:', error)
    return NextResponse.json({ error: 'Failed to fetch financing' }, { status: 500 })
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
      defaultInterestRate,
      tenorOptions,
      dpOptions,
      adminFeeNote,
      disclaimerText,
      ctaLabel,
      ctaUrl,
    } = body

    if (!defaultInterestRate || !tenorOptions || !dpOptions) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const financing = await prisma.financing.create({
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

    return NextResponse.json(financing, { status: 201 })
  } catch (error) {
    console.error('Error creating financing:', error)
    return NextResponse.json({ error: 'Failed to create financing' }, { status: 500 })
  }
}