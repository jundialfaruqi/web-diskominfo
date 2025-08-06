"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Users, Search, Plus, RefreshCw, Loader2 } from "lucide-react"
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { toast } from "sonner"
import Cookies from "js-cookie"
import { UserTable } from "@/components/users/UserTable"
import { UserForm } from "@/components/users/UserForm"
import { UserStats } from "@/components/users/UserStats"
import { RoleGuard, ShowForPermissions } from "@/components/RoleGuard"
// import { DebugUserPermissions } from "@/components/DebugUserPermissions"

interface User {
  id: number
  name: string
  email: string
  roles: { id: number; name: string }[]
  department: string
  phone: string
  status: string
  created_at: string
  updated_at: string
}

interface UserStats {
  total_users: number
  active_users: number
  inactive_users: number
  super_admins: number
  editors: number
}

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([])
  const [stats, setStats] = useState<UserStats>({
    total_users: 0,
    active_users: 0,
    inactive_users: 0,
    super_admins: 0,
    editors: 0
  })
  const [isLoading, setIsLoading] = useState(true)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [roleFilter, setRoleFilter] = useState('all')
  const [statusFilter, setStatusFilter] = useState('all')
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [showForm, setShowForm] = useState(false)
  const [editingUser, setEditingUser] = useState<User | null>(null)
  const [showCreateForm, setShowCreateForm] = useState(false)
  const [accessDeniedShown, setAccessDeniedShown] = useState(false)

  const fetchUsers = async (page = 1, search = '', role = '', status = '') => {
    try {
      const token = Cookies.get('token')
      if (!token) {
        toast.error('Token tidak ditemukan. Silakan login kembali.')
        return
      }

      const params = new URLSearchParams({
        page: page.toString(),
        per_page: '10'
      })
      
      if (search) params.append('search', search)
      if (role) params.append('role', role)
      if (status) params.append('status', status)

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BACKEND}/api/users?${params}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json'
        }
      })

      const data = await response.json()

      if (!response.ok) {
        if (response.status === 401) {
          // Token expired atau tidak valid
          Cookies.remove('token')
          toast.error('Sesi Anda telah berakhir. Silakan login kembali.')
          window.location.href = '/dk-login'
          return
        }
        if (response.status === 403) {
          console.error('Access forbidden')
          if (!accessDeniedShown) {
            toast.error('Akses ditolak. Anda tidak memiliki izin untuk melihat halaman ini.')
            setAccessDeniedShown(true)
          }
          return
        }
        toast.error(data.message || 'Gagal mengambil data user')
        setUsers([]) // Kosongkan data jika ada error
        return
      }

      setUsers(data.data.data)
      setCurrentPage(data.data.current_page)
      setTotalPages(data.data.last_page)
    } catch (error) {
      console.error('Error:', error)
      toast.error('Terjadi kesalahan saat mengambil data user')
    }
  }

  const fetchStats = async () => {
    try {
      const token = Cookies.get('token')
      if (!token) return

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BACKEND}/api/users/stats/overview`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json'
        }
      })

      const data = await response.json()

      if (response.ok) {
        setStats(data.data)
      } else if (response.status === 401) {
        // Token expired atau tidak valid
        Cookies.remove('token')
        toast.error('Sesi Anda telah berakhir. Silakan login kembali.')
        window.location.href = '/dk-login'
        return
      } else if (response.status === 403) {
        console.error('Access forbidden')
        if (!accessDeniedShown) {
          toast.error('Akses ditolak. Anda tidak memiliki izin untuk melihat statistik ini.')
          setAccessDeniedShown(true)
        }
        return
      }
    } catch (error) {
      console.error('Error fetching stats:', error)
    }
  }

  const handleRefresh = async () => {
    setIsRefreshing(true)
    await Promise.all([
      fetchUsers(
        currentPage, 
        searchTerm, 
        roleFilter === 'all' ? '' : roleFilter, 
        statusFilter === 'all' ? '' : statusFilter
      ),
      fetchStats()
    ])
    setIsRefreshing(false)
  }

  // Live search effect
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setCurrentPage(1)
      fetchUsers(1, searchTerm, roleFilter === 'all' ? '' : roleFilter, statusFilter === 'all' ? '' : statusFilter)
    }, 500) // Debounce 500ms

    return () => clearTimeout(timeoutId)
  }, [searchTerm])

  const handleFilterChange = (type: 'role' | 'status', value: string) => {
    const filterValue = value === 'all' ? '' : value
    if (type === 'role') {
      setRoleFilter(value)
      fetchUsers(1, searchTerm, filterValue, statusFilter === 'all' ? '' : statusFilter)
    } else {
      setStatusFilter(value)
      fetchUsers(1, searchTerm, roleFilter === 'all' ? '' : roleFilter, filterValue)
    }
    setCurrentPage(1)
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    fetchUsers(
      page, 
      searchTerm, 
      roleFilter === 'all' ? '' : roleFilter, 
      statusFilter === 'all' ? '' : statusFilter
    )
  }

  const handleEdit = (user: User) => {
    setEditingUser(user)
    setShowForm(true)
  }

  const handleDelete = async (userId: number) => {
    try {
      const token = Cookies.get('token')
      if (!token) {
        toast.error('Token tidak ditemukan. Silakan login kembali.')
        return
      }

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BACKEND}/api/users/${userId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json'
        }
      })

      if (response.ok) {
        toast.success('User berhasil dihapus')
        await handleRefresh()
      } else {
        toast.error('Gagal menghapus user')
      }
    } catch (error) {
      console.error('Error deleting user:', error)
      toast.error('Terjadi kesalahan saat menghapus user')
    }
  }

  const handleFormSubmit = async () => {
    setShowForm(false)
    setEditingUser(null)
    await handleRefresh()
  }

  return (
    <RoleGuard allowedPermissions={['view users']}>
      <UsersContent
        users={users}
        setUsers={setUsers}
        stats={stats}
        setStats={setStats}
        isLoading={isLoading}
        setIsLoading={setIsLoading}
        isRefreshing={isRefreshing}
        setIsRefreshing={setIsRefreshing}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        selectedRole={roleFilter}
        setSelectedRole={setRoleFilter}
        selectedStatus={statusFilter}
        setSelectedStatus={setStatusFilter}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalPages={totalPages}
        setTotalPages={setTotalPages}
        showForm={showForm}
        setShowForm={setShowForm}
        editingUser={editingUser}
        setEditingUser={setEditingUser}
        fetchUsers={fetchUsers}
        fetchStats={fetchStats}
        handleRefresh={handleRefresh}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
        handleFormSubmit={handleFormSubmit}
        handleFilterChange={handleFilterChange}
        showCreateForm={showCreateForm}
        setShowCreateForm={setShowCreateForm}
        accessDeniedShown={accessDeniedShown}
        setAccessDeniedShown={setAccessDeniedShown}
        handlePageChange={handlePageChange}
      />
    </RoleGuard>
  )
}

// Komponen terpisah untuk konten yang hanya dimuat setelah permission check
function UsersContent({
  users, setUsers, stats, setStats, isLoading, setIsLoading,
  isRefreshing, setIsRefreshing, searchTerm, setSearchTerm,
  selectedRole, setSelectedRole, selectedStatus, setSelectedStatus,
  currentPage, setCurrentPage, totalPages, setTotalPages,
  showForm, setShowForm, editingUser, setEditingUser,
  fetchUsers, fetchStats, handleRefresh, handleEdit, handleDelete, handleFormSubmit, handleFilterChange,
  showCreateForm, setShowCreateForm, accessDeniedShown, setAccessDeniedShown, handlePageChange
// eslint-disable-next-line @typescript-eslint/no-explicit-any
}: any) {
  
  useEffect(() => {
    // Set page title
    document.title = 'Manajemen Users - Admin Dashboard'
    
    const loadData = async () => {
      setIsLoading(true)
      await Promise.all([
        fetchUsers(),
        fetchStats()
      ])
      setIsLoading(false)
    }
    
    loadData()
  }, [])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    )
  }



  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Manajemen Users</h1>
          <p className="text-muted-foreground">
            Kelola pengguna dan hak akses sistem admin
          </p>
        </div>
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            onClick={handleRefresh}
            disabled={isRefreshing}
            className="flex items-center gap-2"
          >
            <RefreshCw className={`h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
          <ShowForPermissions permissions={['create users']}>
            <Button 
              onClick={() => setShowCreateForm(true)}
              className="flex items-center gap-2"
            >
              <Plus className="h-4 w-4" />
              Tambah User
            </Button>
          </ShowForPermissions>
        </div>
      </div>

      {/* Stats Cards */}
      <UserStats stats={stats} />

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Filter & Pencarian</CardTitle>
          <CardDescription>
            Gunakan filter di bawah untuk mencari user tertentu
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Input Pencarian - Sebelah Kiri */}
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Cari berdasarkan nama, email, atau department..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            
            {/* Filter - Sebelah Kanan */}
            <div className="flex flex-col sm:flex-row gap-4 lg:w-auto">
              <Select value={selectedRole} onValueChange={(value) => handleFilterChange('role', value)}>
                <SelectTrigger className="w-full sm:w-[180px]">
                  <SelectValue placeholder="Filter Role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Semua Role</SelectItem>
                  <SelectItem value="super_admin">Super Admin</SelectItem>
                  <SelectItem value="admin">Admin</SelectItem>
                  <SelectItem value="editor">Editor</SelectItem>
                </SelectContent>
              </Select>
              <Select value={selectedStatus} onValueChange={(value) => handleFilterChange('status', value)}>
                <SelectTrigger className="w-full sm:w-[180px]">
                  <SelectValue placeholder="Filter Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Semua Status</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>

          </div>
        </CardContent>
      </Card>

      {/* Users Table */}
      <Card>
        <CardHeader>
          <CardTitle>Daftar Users</CardTitle>
          <CardDescription>
            Total {stats.total_users} users terdaftar dalam sistem
          </CardDescription>
        </CardHeader>
        <CardContent>
          <UserTable users={users} onRefresh={handleRefresh} />
          
          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between mt-4 pt-4 border-t">
              <div className="text-sm text-muted-foreground whitespace-nowrap">
                Halaman {currentPage} dari {totalPages}
              </div>
              <Pagination className="mx-0 justify-end">
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious 
                      href="#"
                      onClick={(e) => {
                        e.preventDefault()
                        if (currentPage > 1) handlePageChange(currentPage - 1)
                      }}
                      className={currentPage === 1 ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                    />
                  </PaginationItem>
                  
                  {/* First page */}
                  {currentPage > 2 && (
                    <>
                      <PaginationItem>
                        <PaginationLink 
                          href="#"
                          onClick={(e) => {
                            e.preventDefault()
                            handlePageChange(1)
                          }}
                          className="cursor-pointer"
                        >
                          1
                        </PaginationLink>
                      </PaginationItem>
                      {currentPage > 3 && (
                        <PaginationItem>
                          <PaginationEllipsis />
                        </PaginationItem>
                      )}
                    </>
                  )}
                  
                  {/* Previous page */}
                  {currentPage > 1 && (
                    <PaginationItem>
                      <PaginationLink 
                        href="#"
                        onClick={(e) => {
                          e.preventDefault()
                          handlePageChange(currentPage - 1)
                        }}
                        className="cursor-pointer"
                      >
                        {currentPage - 1}
                      </PaginationLink>
                    </PaginationItem>
                  )}
                  
                  {/* Current page */}
                  <PaginationItem>
                    <PaginationLink 
                      href="#"
                      isActive
                      className="cursor-default"
                    >
                      {currentPage}
                    </PaginationLink>
                  </PaginationItem>
                  
                  {/* Next page */}
                  {currentPage < totalPages && (
                    <PaginationItem>
                      <PaginationLink 
                        href="#"
                        onClick={(e) => {
                          e.preventDefault()
                          handlePageChange(currentPage + 1)
                        }}
                        className="cursor-pointer"
                      >
                        {currentPage + 1}
                      </PaginationLink>
                    </PaginationItem>
                  )}
                  
                  {/* Last page */}
                  {currentPage < totalPages - 1 && (
                    <>
                      {currentPage < totalPages - 2 && (
                        <PaginationItem>
                          <PaginationEllipsis />
                        </PaginationItem>
                      )}
                      <PaginationItem>
                        <PaginationLink 
                          href="#"
                          onClick={(e) => {
                            e.preventDefault()
                            handlePageChange(totalPages)
                          }}
                          className="cursor-pointer"
                        >
                          {totalPages}
                        </PaginationLink>
                      </PaginationItem>
                    </>
                  )}
                  
                  <PaginationItem>
                    <PaginationNext 
                      href="#"
                      onClick={(e) => {
                        e.preventDefault()
                        if (currentPage < totalPages) handlePageChange(currentPage + 1)
                      }}
                      className={currentPage === totalPages ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          )}
        </CardContent>
      </Card>

        {/* Create User Form */}
        <UserForm
          isOpen={showCreateForm}
          onClose={() => setShowCreateForm(false)}
          onSuccess={handleRefresh}
          mode="create"
        />
      </div>
    )
  }