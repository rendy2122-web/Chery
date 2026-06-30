import 'next-auth'

declare module 'next-auth' {
  interface User {
    role: string
    dealerId?: string | null
  }

  interface Session {
    user: {
      id: string
      email: string
      name: string
      role: string
      dealerId?: string | null
    }
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id: string
    role: string
    dealerId?: string | null
  }
}