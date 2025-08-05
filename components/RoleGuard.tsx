"use client"

import { useAuth } from '@/contexts/AuthContext'
import { ReactNode, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { AlertTriangle } from 'lucide-react'

interface RoleGuardProps {
  children: ReactNode
  allowedRoles?: string[]
  allowedPermissions?: string[]
  requireAll?: boolean // true = harus punya semua role/permission, false = cukup salah satu
  fallback?: ReactNode
  redirectTo?: string
}

export function RoleGuard({ 
  children, 
  allowedRoles = [], 
  allowedPermissions = [],
  requireAll = false,
  fallback,
  redirectTo
}: RoleGuardProps) {
  const { user, isLoading, isAuthenticated, hasAnyRole, hasAnyPermission, hasRole, hasPermission } = useAuth()
  const router = useRouter()

  // Tampilkan loading saat mengecek autentikasi
  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  // Jika tidak terautentikasi
  if (!isAuthenticated || !user) {
    if (redirectTo) {
      window.location.href = redirectTo
      return null
    }
    
    return fallback || (
      <Alert className="border-red-200 bg-red-50">
        <AlertTriangle className="h-4 w-4 text-red-600" />
        <AlertDescription className="text-red-800">
          Anda harus login untuk mengakses halaman ini.
        </AlertDescription>
      </Alert>
    )
  }

  // Cek role dan permission
  let hasAccess = true

  if (allowedRoles.length > 0 || allowedPermissions.length > 0) {
    if (requireAll) {
      // Harus punya semua role dan permission yang diminta
      const hasAllRoles = allowedRoles.length === 0 || allowedRoles.every(role => hasRole(role))
      const hasAllPermissions = allowedPermissions.length === 0 || allowedPermissions.every(permission => hasPermission(permission))
      hasAccess = hasAllRoles && hasAllPermissions
    } else {
      // Cukup punya salah satu role atau permission
      let hasRoleAccess = false
      let hasPermissionAccess = false
      
      if (allowedRoles.length > 0) {
        hasRoleAccess = hasAnyRole(allowedRoles)
      }
      
      if (allowedPermissions.length > 0) {
        hasPermissionAccess = hasAnyPermission(allowedPermissions)
      }
      
      // Jika ada role dan permission yang diminta, salah satu harus terpenuhi
      // Jika hanya ada role atau permission, yang ada harus terpenuhi
      if (allowedRoles.length > 0 && allowedPermissions.length > 0) {
        hasAccess = hasRoleAccess || hasPermissionAccess
      } else if (allowedRoles.length > 0) {
        hasAccess = hasRoleAccess
      } else if (allowedPermissions.length > 0) {
        hasAccess = hasPermissionAccess
      }
    }
  }

  // Debug log
  console.log('RoleGuard Debug:', {
    user: user,
    isLoading,
    isAuthenticated,
    userRoles: user?.roles?.map(r => r.name),
    userPermissions: user?.permissions?.map(p => p.name),
    allowedRoles,
    allowedPermissions,
    hasAccess,
    redirectTo,
    pathname: window.location.pathname
  })





  // Handle redirect dengan useEffect
  useEffect(() => {
    if (!isLoading && isAuthenticated && !hasAccess && redirectTo) {
      console.log('Performing redirect to:', redirectTo)
      router.replace(redirectTo)
    }
  }, [isLoading, isAuthenticated, hasAccess, redirectTo, router])

  if (!hasAccess) {
    if (redirectTo) {
      // Tampilkan loading saat redirect
      return (
        <div className="flex items-center justify-center p-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      )
    }

    return fallback || (
      <Alert className="border-red-200 bg-red-50">
        <AlertTriangle className="h-4 w-4 text-red-600" />
        <AlertDescription className="text-red-800">
          Anda tidak memiliki akses untuk melihat halaman ini.
          {allowedRoles.length > 0 && (
            <div className="mt-2">
              <strong>Role yang dibutuhkan:</strong> {allowedRoles.join(', ')}
            </div>
          )}
          {allowedPermissions.length > 0 && (
            <div className="mt-2">
              <strong>Permission yang dibutuhkan:</strong> {allowedPermissions.join(', ')}
            </div>
          )}
        </AlertDescription>
      </Alert>
    )
  }

  return <>{children}</>
}

// Helper components untuk role-based rendering
export function ShowForRoles({ roles, children }: { roles: string[], children: ReactNode }) {
  const { hasAnyRole } = useAuth()
  return hasAnyRole(roles) ? <>{children}</> : null
}

export function ShowForPermissions({ permissions, children }: { permissions: string[], children: ReactNode }) {
  const { hasAnyPermission } = useAuth()
  return hasAnyPermission(permissions) ? <>{children}</> : null
}

export function HideForRoles({ roles, children }: { roles: string[], children: ReactNode }) {
  const { hasAnyRole } = useAuth()
  return !hasAnyRole(roles) ? <>{children}</> : null
}

export function HideForPermissions({ permissions, children }: { permissions: string[], children: ReactNode }) {
  const { hasAnyPermission } = useAuth()
  return !hasAnyPermission(permissions) ? <>{children}</> : null
}