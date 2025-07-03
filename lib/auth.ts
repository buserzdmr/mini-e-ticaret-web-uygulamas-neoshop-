import { cookies } from 'next/headers'

export interface UserSession {
  id: number
  email: string
  name: string
  role: 'ADMIN' | 'USER'
}

export async function getCurrentUser(): Promise<UserSession | null> {
  try {
    const cookieStore = await cookies()
    const sessionCookie = cookieStore.get('session')
    
    if (!sessionCookie?.value) {
      return null
    }

    const session = JSON.parse(sessionCookie.value) as UserSession
    return session
  } catch (error) {
    console.error('Error getting current user:', error)
    return null
  }
}

export function isAuthenticated(session: UserSession | null): boolean {
  return session !== null
}

export function isAdmin(session: UserSession | null): boolean {
  return session?.role === 'ADMIN'
} 