import { NextResponse } from 'next/server'
import { auth } from '@/lib/auth'

export async function POST(request: Request) {
  try {
    const session = await auth()
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { prompt } = body

    if (!prompt || !prompt.trim()) {
      return NextResponse.json({ error: 'Prompt is required' }, { status: 400 })
    }

    // Simulate AI response (in production, integrate with actual AI service)
    const responses = [
      `Based on your request: "${prompt}", here's a suggested content:\n\nChery brings you innovation and excellence in automotive engineering. Our vehicles combine cutting-edge technology with superior design to deliver an exceptional driving experience.`,
      `Here's a compelling copy for your content:\n\nExperience the future of driving with Chery. Our commitment to quality and innovation ensures every journey is safe, comfortable, and exhilarating.`,
      `Suggested content based on your prompt:\n\nDiscover the perfect blend of style, performance, and technology with Chery. Visit your nearest dealer today and take the first step towards your dream vehicle.`,
    ]

    const result = responses[Math.floor(Math.random() * responses.length)]

    return NextResponse.json({ result })
  } catch (error) {
    console.error('Error in AI assistant:', error)
    return NextResponse.json({ error: 'Failed to generate content' }, { status: 500 })
  }
}