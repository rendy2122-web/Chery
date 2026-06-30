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

    const dealer = await prisma.dealer.findUnique({
      where: { id: params.id },
    })

    if (!dealer) {
      return NextResponse.json({ error: 'Dealer not found' }, { status: 404 })
    }

    return NextResponse.json(dealer)
  } catch (error) {
    console.error('Error fetching dealer:', error)
    return NextResponse.json({ error: 'Failed to fetch dealer' }, { status: 500 })
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
      name,
      slug,
      city,
      address,
      whatsapp,
      phone,
      email,
      businessHours,
      googleMapsUrl,
      imageUrl,
      services,
      branchPromo,
      active,
    } = body

    const dealer = await prisma.dealer.update({
      where: { id: params.id },
      data: {
        name,
        slug,
        city,
        address,
        whatsapp,
        phone,
        email,
        businessHours,
        googleMapsUrl,
        imageUrl,
        services,
        branchPromo,
        active,
      },
    })

    return NextResponse.json(dealer)
  } catch (error) {
    console.error('Error updating dealer:', error)
    return NextResponse.json({ error: 'Failed to update dealer' }, { status: 500 })
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

    await prisma.dealer.delete({
      where: { id: params.id },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting dealer:', error)
    return NextResponse.json({ error: 'Failed to delete dealer' }, { status: 500 })
  }
}