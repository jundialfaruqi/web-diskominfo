"use client"

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import Cookies from 'js-cookie'
import { useRouter } from 'next/navigation'

interface User {
  id: number
  name: string
  email: string
  department: string
  phone: string
  status: string
  roles: { id: number; name: string }[]
  permissions: { id: number; name: string }[]
  created_at: string
  updated_at: string
}

interface AuthContextType {
  user: User | null
  token: string | null
  isLoading: boolean
  isAuthenticated: boolean
  login: (token: string, userData: User) => void
  logout: () => void
  hasRole: (role: string) => boolean
  hasPermission: (permission: string) => boolean
  hasAnyRole: (roles: string[]) => boolean
  hasAnyPermission: (permissions: string[]) => boolean
  refreshUser: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [token, setToken] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const router = useRouter()

  const validateToken = async () => {
    const cookieToken = Cookies.get('token')
    
    if (!cookieToken) {
      setIsAuthenticated(false)
      setUser(null)
      setToken(null)
      setIsLoading(false)
      return
    }

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BACKEND}/api/user`, {
        headers: {
          'Authorization': `Bearer ${cookieToken}`,
          'Accept': 'application/json'
        }
      })

      if (response.ok) {
        const userData = await response.json()
        setUser(userData.user)
        setToken(cookieToken)
        setIsAuthenticated(true)
      } else {
        // Token tidak valid
        Cookies.remove('token')
        setIsAuthenticated(false)
        setUser(null)
        setToken(null)
      }
    } catch (error) {
      console.error('Token validation error:', error)
      Cookies.remove('token')
      setIsAuthenticated(false)
      setUser(null)
      setToken(null)
    } finally {
      setIsLoading(false)
    }
  }

  const login = (authToken: string, userData: User) => {
    Cookies.set('token', authToken)
    setToken(authToken)
    setUser(userData)
    setIsAuthenticated(true)
    
    // Force multiple re-renders to ensure UI updates
    setTimeout(() => {
      setUser({...userData})
    }, 50)
    
    setTimeout(() => {
      setUser({...userData})
    }, 200)
  }

  const logout = () => {
    Cookies.remove('token')
    setToken(null)
    setUser(null)
    setIsAuthenticated(false)
    router.push('/dk-login')
  }

  const hasRole = (role: string): boolean => {
    return user?.roles?.some(r => r.name === role) || false
  }

  const hasPermission = (permission: string): boolean => {
    return user?.permissions?.some(p => p.name === permission) || false
  }

  const hasAnyRole = (roles: string[]): boolean => {
    return roles.some(role => hasRole(role))
  }

  const hasAnyPermission = (permissions: string[]): boolean => {
    return permissions.some(permission => hasPermission(permission))
  }

  const refreshUser = async () => {
    await validateToken()
  }

  useEffect(() => {
    validateToken()
  }, [])

  const value: AuthContextType = {
    user,
    token,
    isLoading,
    isAuthenticated,
    login,
    logout,
    hasRole,
    hasPermission,
    hasAnyRole,
    hasAnyPermission,
    refreshUser
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}