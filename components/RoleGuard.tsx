"use client"

import { useAuth } from '@/contexts/AuthContext'
import { ReactNode } from 'react'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { AlertTriangle } from 'lucide-react'
import { UnauthorizedError } from '@/components/UnauthorizedError'

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

  if (!hasAccess) {
    return fallback || (
      <UnauthorizedError 
        allowedRoles={allowedRoles}
        allowedPermissions={allowedPermissions}
      />
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