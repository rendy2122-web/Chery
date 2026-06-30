import type { Metadata } from 'next'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import './globals.css'

const inter = { variable: 'font-inter' }
const plusJakarta = { variable: 'font-plus-jakarta' }
const spaceGrotesk = { variable: 'font-space-grotesk' }

export const metadata: Metadata = {
  metadataBase: new URL('https://chery.co.id'),
  title: 'CHERY Indonesia — Experience the Future of Driving',
  description: 'Official Chery Indonesia website. Discover our lineup of innovative SUVs, Hybrid, and Electric vehicles. Book a test drive today.',
  keywords: 'Chery, Chery Indonesia, mobil Chery, SUV, Hybrid, Electric Vehicle, Omoda 5, Tiggo 5x, Tiggo 7 Pro, Tiggo 8 Pro',
  authors: [{ name: 'Chery Indonesia' }],
  openGraph: {
    type: 'website',
    locale: 'id_ID',
    url: 'https://chery.co.id',
    siteName: 'Chery Indonesia',
    title: 'CHERY Indonesia — Experience the Future of Driving',
    description: 'Discover Chery\'s innovative lineup of SUVs, Hybrid, and Electric vehicles. Innovation meets excellence.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Chery Indonesia',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CHERY Indonesia — Experience the Future of Driving',
    description: 'Discover Chery\'s innovative lineup of SUVs, Hybrid, and Electric vehicles.',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
  },
}

import { headers } from 'next/headers'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const headersList = headers()
  const pathname = headersList.get('x-pathname') || ''
  const isAdmin = pathname.startsWith('/admin')

  return (
    <html lang="id" className={`${inter.variable} ${plusJakarta.variable} ${spaceGrotesk.variable}`}>
      <body className="font-sans antialiased">
        {!isAdmin && <Header />}
        <main className="min-h-screen">
          {children}
        </main>
        {!isAdmin && <Footer />}
      </body>
    </html>
  )
}