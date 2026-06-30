'use client'

import React, { useState } from 'react'
import { Mail, Lock, Eye, EyeOff, AlertCircle, Loader2 } from 'lucide-react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'

interface LoginClientProps {
  callbackUrl: string
  initialError?: string
}

export default function LoginClient({ callbackUrl, initialError }: LoginClientProps) {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(initialError || '')

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    try {
      const res = await signIn('credentials', {
        email,
        password,
        redirect: false,
      })

      if (res?.error) {
        if (res.error.includes('CredentialsSignin')) {
          setError('Email atau password salah. Silakan periksa kembali.')
        } else {
          setError('Gagal masuk. Silakan periksa koneksi Anda.')
        }
        setIsLoading(false)
      } else {
        router.push(callbackUrl)
        router.refresh()
      }
    } catch (err) {
      setError('Terjadi kesalahan yang tidak terduga.')
      setIsLoading(false)
    }
  }

  return (
    <div className="w-full max-w-md">
      {/* Decorative Brand Header */}
      <div className="text-center mb-8">
        <div className="mb-4">
          <img 
            src="https://cheryidn.sgp1.cdn.digitaloceanspaces.com/prod/logo.webp" 
            alt="Chery Logo" 
            className="w-20 h-20 object-contain mx-auto"
          />
        </div>
        <h1 className="text-3xl font-extrabold text-white tracking-tight">
          CHERY <span className="text-chery-red">PORTAL</span>
        </h1>
        <p className="text-zinc-400 mt-2 text-sm">
          Akses dashboard administrasi Dealer Chery
        </p>
      </div>

      {/* Main Glassmorphic Form Card */}
      <div className="bg-zinc-900/60 backdrop-blur-xl border border-zinc-800/80 p-8 rounded-3xl shadow-2xl relative overflow-hidden">
        {/* Glow overlay */}
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-red-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-zinc-500/5 rounded-full blur-3xl pointer-events-none" />

        {error && (
          <div className="mb-6 flex items-start gap-3 p-4 bg-red-500/10 border border-red-500/20 text-red-400 text-sm rounded-xl animate-shake">
            <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
          <div>
            <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">
              Alamat Email
            </label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />
              <input
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="nama@chery.co.id"
                required
                disabled={isLoading}
                className="w-full pl-12 pr-4 py-3.5 bg-zinc-950/50 border border-zinc-800 rounded-xl text-white placeholder-zinc-600 focus:outline-none focus:ring-2 focus:ring-chery-red/30 focus:border-chery-red transition-all duration-200 disabled:opacity-55"
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider">
                Kata Sandi
              </label>
            </div>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                disabled={isLoading}
                className="w-full pl-12 pr-12 py-3.5 bg-zinc-950/50 border border-zinc-800 rounded-xl text-white placeholder-zinc-600 focus:outline-none focus:ring-2 focus:ring-chery-red/30 focus:border-chery-red transition-all duration-200 disabled:opacity-55"
              />
              <button
                type="button"
                tabIndex={-1}
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-white transition-colors"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-red-600 to-chery-red hover:from-red-500 hover:to-red-600 text-white font-semibold py-3.5 px-6 rounded-xl transition-all duration-300 transform active:scale-[0.98] flex items-center justify-center gap-2 shadow-lg shadow-red-600/10 hover:shadow-red-600/25 disabled:opacity-50 disabled:pointer-events-none disabled:transform-none"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>Memproses...</span>
              </>
            ) : (
              <span>Masuk Portal</span>
            )}
          </button>
        </form>
      </div>
    </div>
  )
}
