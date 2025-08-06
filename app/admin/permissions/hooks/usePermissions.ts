import { useState, useEffect, useRef } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { toast } from 'sonner'
import { Permission, PermissionStats, PermissionFormData } from '../types'

export function usePermissions() {
  const { token } = useAuth()
  const [permissions, setPermissions] = useState<Permission[]>([])
  const [stats, setStats] = useState<PermissionStats>({
    total_permissions: 0,
    system_permissions: 0,
    custom_permissions: 0,
    recent_permissions: 0
  })
  const [loading, setLoading] = useState(true)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const searchTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [totalPermissions, setTotalPermissions] = useState(0)
  const [perPage, setPerPage] = useState(10)
  const [accessDeniedShown, setAccessDeniedShown] = useState(false)
  const accessDeniedTimestamp = useRef<number>(0)

  // Helper function to show access denied toast only once per session
  const showAccessDeniedToast = () => {
    const now = Date.now()
    if (!accessDeniedShown && (now - accessDeniedTimestamp.current) > 5000) {
      toast.error('Akses ditolak. Anda tidak memiliki izin untuk mengakses halaman ini.')
      setAccessDeniedShown(true)
      accessDeniedTimestamp.current = now
    }
  }

  // Fetch permission statistics
  const fetchStats = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BACKEND}/api/permissions/stats/overview`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json'
        }
      })

      if (response.ok) {
        const data = await response.json()
        setStats(data.data)
      } else if (response.status === 403) {
        console.error('Access forbidden')
        showAccessDeniedToast()
      } else {
        console.error('Failed to fetch permission statistics')
      }
    } catch (error) {
      console.error('Error fetching permission statistics:', error)
    }
  }

  // Fetch permissions
  const fetchPermissions = async (page = 1, search = '') => {
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        per_page: perPage.toString()
      })
      
      if (search) {
        params.append('search', search)
      }
      
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BACKEND}/api/permissions?${params}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json'
        }
      })

      if (response.ok) {
        const data = await response.json()
        const permissionsData = data.data?.data || []
        const pagination = data.data
        
        setPermissions(Array.isArray(permissionsData) ? permissionsData : [])
        setCurrentPage(pagination?.current_page || 1)
        setTotalPages(pagination?.last_page || 1)
        setTotalPermissions(pagination?.total || 0)
      } else if (response.status === 403) {
        console.error('Access forbidden')
        showAccessDeniedToast()
      } else {
        const errorData = await response.json()
        console.error('API Error:', errorData)
        toast.error('Gagal memuat data permissions')
      }
    } catch (error) {
      console.error('Error fetching permissions:', error)
      if (error instanceof TypeError && error.message.includes('fetch')) {
        toast.error('Gagal memuat data permissions')
      }
    } finally {
      setLoading(false)
      setIsRefreshing(false)
    }
  }

  // Handle refresh
  const handleRefresh = async () => {
    setIsRefreshing(true)
    await Promise.all([
      fetchPermissions(currentPage, searchTerm),
      fetchStats()
    ])
    toast.success('Data berhasil diperbarui')
  }

  // Handle page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    fetchPermissions(page, searchTerm)
  }

  // Handle per page change
  const handlePerPageChange = (newPerPage: number) => {
    setPerPage(newPerPage)
    setCurrentPage(1)
  }

  // Handle search with debounce
  useEffect(() => {
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current)
    }
    
    if (permissions.length > 0 || searchTerm !== '') {
      searchTimeoutRef.current = setTimeout(() => {
        setCurrentPage(1)
        fetchPermissions(1, searchTerm)
      }, 500)
    }
    
    return () => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current)
      }
    }
  }, [searchTerm])

  // Effect to fetch data when currentPage or perPage changes
  useEffect(() => {
    if (token && currentPage && !loading) {
      fetchPermissions(currentPage, searchTerm)
    }
  }, [currentPage, perPage])

  // Fetch data when token is available
  useEffect(() => {
    if (token) {
      const loadData = async () => {
        setLoading(true)
        await Promise.all([
          fetchStats(),
          fetchPermissions(1, '')
        ])
        setLoading(false)
      }
      loadData()
    }
  }, [token])

  // Create permission
  const createPermission = async (formData: PermissionFormData) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BACKEND}/api/permissions`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          name: formData.name
        })
      })

      if (response.ok) {
        toast.success('Permission berhasil dibuat')
        await Promise.all([
          fetchPermissions(),
          fetchStats()
        ])
        return true
      } else {
        const errorData = await response.json()
        toast.error(errorData.message || 'Gagal membuat permission')
        return false
      }
    } catch (error) {
      console.error('Error creating permission:', error)
      toast.error('Gagal membuat permission')
      return false
    }
  }

  // Update permission
  const updatePermission = async (id: number, formData: PermissionFormData) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BACKEND}/api/permissions/${id}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          name: formData.name
        })
      })

      if (response.ok) {
        toast.success('Permission berhasil diperbarui')
        await Promise.all([
          fetchPermissions(),
          fetchStats()
        ])
        return true
      } else {
        const errorData = await response.json()
        toast.error(errorData.message || 'Gagal memperbarui permission')
        return false
      }
    } catch (error) {
      console.error('Error updating permission:', error)
      toast.error('Gagal memperbarui permission')
      return false
    }
  }

  // Delete permission
  const deletePermission = async (id: number) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BACKEND}/api/permissions/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json'
        }
      })

      if (response.ok) {
        toast.success('Permission berhasil dihapus')
        await Promise.all([
          fetchPermissions(),
          fetchStats()
        ])
        return true
      } else {
        const errorData = await response.json()
        toast.error(errorData.message || 'Gagal menghapus permission')
        return false
      }
    } catch (error) {
      console.error('Error deleting permission:', error)
      toast.error('Gagal menghapus permission')
      return false
    }
  }

  return {
    // State
    permissions,
    stats,
    loading,
    isRefreshing,
    searchTerm,
    setSearchTerm,
    currentPage,
    totalPages,
    totalPermissions,
    perPage,
    
    // Actions
    handleRefresh,
    handlePageChange,
    handlePerPageChange,
    createPermission,
    updatePermission,
    deletePermission
  }
}