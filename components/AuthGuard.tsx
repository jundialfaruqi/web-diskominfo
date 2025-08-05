"use client"

import { useAuth } from '@/contexts/AuthContext'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

interface AuthGuardProps {
  children: React.ReactNode
}

export function AuthGuard({ children }: AuthGuardProps) {
  const { isAuthenticated, isLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/dk-login')
    }
  }, [isAuthenticated, isLoading, router])

  // Tampilkan loading saat mengecek autentikasi
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  // Jika tidak terautentikasi, jangan render children
  if (!isAuthenticated) {
    return null
  }

  // Jika terautentikasi, render children
  return <>{children}</>
}