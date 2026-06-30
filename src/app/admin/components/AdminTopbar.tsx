'use client'

import { ChevronDown, Bell, User } from 'lucide-react'
import { useState } from 'react'

interface TopbarProps {
  user: {
    name: string
    email: string
    role: string
  }
}

export default function AdminTopbar({ user }: TopbarProps) {
  const [profileOpen, setProfileOpen] = useState(false)

  return (
    <header className="fixed top-0 right-0 left-0 lg:left-[260px] z-20 h-[64px] bg-white/80 backdrop-blur-lg border-b border-gray-200">
      <div className="flex items-center justify-end h-full px-6 gap-4">
        {/* Notification */}
        <button className="relative p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-all">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-chery-red rounded-full" />
        </button>

        {/* Profile Dropdown */}
        <div className="relative">
          <button
            onClick={() => setProfileOpen(!profileOpen)}
            className="flex items-center gap-3 p-2 rounded-xl hover:bg-gray-50 transition-all"
          >
            <div className="w-[32px] h-[32px] bg-chery-red/10 rounded-full flex items-center justify-center">
              <User className="w-4 h-4 text-chery-red" />
            </div>
            <div className="hidden sm:block text-left">
              <p className="text-sm font-medium text-gray-900">{user.name}</p>
              <p className="text-xs text-gray-400">{user.role.replace('_', ' ')}</p>
            </div>
            <ChevronDown className="w-4 h-4 text-gray-400 hidden sm:block" />
          </button>

          {profileOpen && (
            <>
              <div
                className="fixed inset-0 z-10"
                onClick={() => setProfileOpen(false)}
              />
              <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-xl border border-gray-200 z-20 py-2">
                <div className="px-4 py-3 border-b border-gray-100">
                  <p className="text-sm font-medium text-gray-900">{user.name}</p>
                  <p className="text-xs text-gray-400">{user.email}</p>
                </div>
                <div className="px-4 py-2">
                  <p className="text-xs text-gray-400 uppercase tracking-wider">Role</p>
                  <p className="text-sm font-medium text-gray-700">{user.role.replace('_', ' ')}</p>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  )
}