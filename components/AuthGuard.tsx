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
    const validateToken = async () => {
      const token = Cookies.get('token')
      
      if (!token) {
        // Jika tidak ada token, redirect ke halaman login
        router.push('/dk-login')
        setIsAuthenticated(false)
        return
      }

      try {
        // Verifikasi token ke backend
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_BACKEND}/api/user`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/json'
          }
        })

        if (response.ok) {
          setIsAuthenticated(true)
        } else {
          // Token tidak valid, hapus dan redirect
          Cookies.remove('token')
          router.push('/dk-login')
          setIsAuthenticated(false)
        }
      } catch (error) {
        // Error saat validasi, anggap token tidak valid
        console.error('Token validation error:', error)
        Cookies.remove('token')
        router.push('/dk-login')
        setIsAuthenticated(false)
      }
    }
    
    validateToken()
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