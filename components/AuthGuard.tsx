"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Cookies from "js-cookie"

interface AuthGuardProps {
  children: React.ReactNode
}

export function AuthGuard({ children }: AuthGuardProps) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null)
  const router = useRouter()

  useEffect(() => {
    const token = Cookies.get('token')
    
    if (!token) {
      // Jika tidak ada token, redirect ke halaman login
      router.push('/dk-login')
      setIsAuthenticated(false)
    } else {
      // Jika ada token, anggap user sudah login
      // Di implementasi nyata, Anda bisa memverifikasi token ke backend
      setIsAuthenticated(true)
    }
  }, [router])

  // Tampilkan loading saat mengecek autentikasi
  if (isAuthenticated === null) {
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