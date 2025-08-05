"use client"

import { AlertTriangle, ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'

interface UnauthorizedErrorProps {
  allowedRoles?: string[]
  allowedPermissions?: string[]
}

export function UnauthorizedError({ allowedRoles = [], allowedPermissions = [] }: UnauthorizedErrorProps) {
  const router = useRouter()

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
        {/* Error Icon */}
        <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <AlertTriangle className="w-10 h-10 text-red-600" />
        </div>
        
        {/* Error Code */}
        <h1 className="text-6xl font-bold text-gray-900 mb-2">403</h1>
        
        {/* Error Title */}
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Forbidden</h2>
        
        {/* Error Description */}
        <p className="text-gray-600 mb-6">
          Access denied.
        </p>
        

        
        {/* Action Buttons */}
        <div className="space-y-3">
          <Button 
            onClick={() => router.back()}
            variant="outline"
            className="w-full"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Kembali
          </Button>
          
          <Button 
            onClick={() => router.push('/admin/dashboard')}
            className="w-full"
          >
            Ke Dashboard
          </Button>
        </div>
      </div>
    </div>
  )
}