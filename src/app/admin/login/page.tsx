import { auth } from '@/lib/auth'
import { redirect } from 'next/navigation'
import LoginClient from './LoginClient'

export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams: { callbackUrl?: string; error?: string }
}) {
  const session = await auth()

  if (session?.user) {
    redirect(searchParams.callbackUrl || '/admin')
  }

  // Map NextAuth error query parameters to user friendly strings
  let initialError = ''
  if (searchParams.error) {
    switch (searchParams.error) {
      case 'MissingCSRF':
        initialError = 'Sesi kedaluwarsa atau tidak valid. Silakan coba kembali.'
        break
      case 'CredentialsSignin':
        initialError = 'Email atau password salah.'
        break
      case 'Configuration':
        initialError = 'Terjadi masalah konfigurasi server login.'
        break
      case 'AccessDenied':
        initialError = 'Akses ditolak.'
        break
      default:
        initialError = 'Terjadi kesalahan sistem saat masuk.'
    }
  }

  return (
    <main className="min-h-screen bg-zinc-950 flex flex-col items-center justify-center px-4 relative overflow-hidden">
      {/* Premium Automotive-style Dark Ambient Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-chery-red/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-[300px] h-[300px] bg-red-800/5 rounded-full blur-[100px] pointer-events-none" />

      {/* Grid Pattern overlay */}
      <div 
        className="absolute inset-0 bg-[linear-gradient(to_right,#1f1f23_1px,transparent_1px),linear-gradient(to_bottom,#1f1f23_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-30 pointer-events-none" 
      />

      <LoginClient 
        callbackUrl={searchParams.callbackUrl || '/admin'} 
        initialError={initialError}
      />
    </main>
  )
}