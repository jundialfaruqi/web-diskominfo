"use client"

import { useState, useEffect } from 'react'
import { RoleGuard } from '@/components/RoleGuard'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { Plus, Edit, Trash2, Key, Search, RefreshCw, Loader2, Shield, Users, MoreHorizontal } from 'lucide-react'
import { useAuth } from '@/contexts/AuthContext'
import { toast } from 'sonner'

interface Permission {
  id: number
  name: string
  guard_name: string
  created_at: string
  updated_at: string
}

interface PermissionStats {
  total_permissions: number
  system_permissions: number
  custom_permissions: number
  recent_permissions: number
}

export default function PermissionsPage() {
  const { token } = useAuth()
  const [permissions, setPermissions] = useState<Permission[]>([])
  const [filteredPermissions, setFilteredPermissions] = useState<Permission[]>([])
  const [stats, setStats] = useState<PermissionStats>({
    total_permissions: 0,
    system_permissions: 0,
    custom_permissions: 0,
    recent_permissions: 0
  })
  const [loading, setLoading] = useState(true)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [typeFilter, setTypeFilter] = useState('all')
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [editingPermission, setEditingPermission] = useState<Permission | null>(null)
  const [deletingPermission, setDeletingPermission] = useState<Permission | null>(null)
  const [formData, setFormData] = useState({
    name: ''
  })

  // Calculate statistics
  const calculateStats = (permissionsData: Permission[]) => {
    const now = new Date()
    const oneWeekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
    
    const systemPermissions = permissionsData.filter(p => 
      p.name.includes('view') || p.name.includes('create') || p.name.includes('edit') || p.name.includes('delete')
    ).length
    
    const recentPermissions = permissionsData.filter(p => 
      new Date(p.created_at) > oneWeekAgo
    ).length
    
    setStats({
      total_permissions: permissionsData.length,
      system_permissions: systemPermissions,
      custom_permissions: permissionsData.length - systemPermissions,
      recent_permissions: recentPermissions
    })
  }

  // Filter permissions based on search and type filter
  const filterPermissions = (permissionsData: Permission[], search: string, typeFilter: string) => {
    let filtered = permissionsData
    
    // Search filter
    if (search) {
      filtered = filtered.filter(permission => 
        permission.name.toLowerCase().includes(search.toLowerCase())
      )
    }
    
    // Type filter
    if (typeFilter !== 'all') {
      const now = new Date()
      const oneWeekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
      
      if (typeFilter === 'system') {
        filtered = filtered.filter(p => 
          p.name.includes('view') || p.name.includes('create') || p.name.includes('edit') || p.name.includes('delete')
        )
      } else if (typeFilter === 'custom') {
        filtered = filtered.filter(p => 
          !(p.name.includes('view') || p.name.includes('create') || p.name.includes('edit') || p.name.includes('delete'))
        )
      } else if (typeFilter === 'recent') {
        filtered = filtered.filter(p => new Date(p.created_at) > oneWeekAgo)
      }
    }
    
    setFilteredPermissions(filtered)
  }

  // Fetch permissions
  const fetchPermissions = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BACKEND}/api/permissions`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json'
        }
      })

      if (response.ok) {
        const data = await response.json()
        const permissionsData = data.data || []
        setPermissions(permissionsData)
        
        // Calculate stats and filter
        calculateStats(permissionsData)
        filterPermissions(permissionsData, searchTerm, typeFilter)
      } else {
        const errorData = await response.json()
        console.error('API Error:', errorData)
        toast.error('Gagal memuat data permissions')
      }
    } catch (error) {
      console.error('Error fetching permissions:', error)
      toast.error('Gagal memuat data permissions')
    } finally {
      setLoading(false)
      setIsRefreshing(false)
    }
  }

  // Handle refresh
  const handleRefresh = async () => {
    setIsRefreshing(true)
    await fetchPermissions()
    toast.success('Data berhasil diperbarui')
  }

  // Handle create permission
  const handleCreatePermission = async () => {
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
        setIsCreateDialogOpen(false)
        setFormData({ name: '' })
        fetchPermissions()
      } else {
        const errorData = await response.json()
        toast.error(errorData.message || 'Gagal membuat permission')
      }
    } catch (error) {
      console.error('Error creating permission:', error)
      toast.error('Gagal membuat permission')
    }
  }

  // Handle edit permission
  const handleEditPermission = async () => {
    if (!editingPermission) return

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BACKEND}/api/permissions/${editingPermission.id}`, {
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
        setIsEditDialogOpen(false)
        setEditingPermission(null)
        setFormData({ name: '' })
        fetchPermissions()
      } else {
        const errorData = await response.json()
        toast.error(errorData.message || 'Gagal memperbarui permission')
      }
    } catch (error) {
      console.error('Error updating permission:', error)
      toast.error('Gagal memperbarui permission')
    }
  }

  // Handle delete permission
  const confirmDeletePermission = async () => {
    if (!deletingPermission) return

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BACKEND}/api/permissions/${deletingPermission.id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json'
        }
      })

      if (response.ok) {
        toast.success('Permission berhasil dihapus')
        fetchPermissions()
      } else {
        const errorData = await response.json()
        toast.error(errorData.message || 'Gagal menghapus permission')
      }
    } catch (error) {
      console.error('Error deleting permission:', error)
      toast.error('Gagal menghapus permission')
    } finally {
      setDeletingPermission(null)
    }
  }

  // Open edit dialog
  const openEditDialog = (permission: Permission) => {
    setEditingPermission(permission)
    setFormData({ name: permission.name })
    setIsEditDialogOpen(true)
  }

  // Filter effect
  useEffect(() => {
    filterPermissions(permissions, searchTerm, typeFilter)
  }, [searchTerm, typeFilter, permissions])

  // Fetch data when token is available
  useEffect(() => {
    if (token) {
      fetchPermissions()
      document.title = 'Manajemen Permission - Admin Panel'
    }
  }, [token])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    )
  }

  return (
    <RoleGuard allowedRoles={['super_admin']}>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Manajemen Permission</h1>
            <p className="text-muted-foreground">
              Kelola permission yang tersedia dalam sistem
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
            <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
              <DialogTrigger asChild>
                <Button className="flex items-center gap-2">
                  <Plus className="h-4 w-4" />
                  Tambah Permission
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Tambah Permission Baru</DialogTitle>
                  <DialogDescription>
                    Buat permission baru untuk sistem
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="name">Nama Permission</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                      placeholder="Contoh: manage users, view reports"
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                    Batal
                  </Button>
                  <Button onClick={handleCreatePermission}>
                    Buat Permission
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Permissions</CardTitle>
              <Key className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.total_permissions}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Permission Sistem</CardTitle>
              <Shield className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.system_permissions}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Permission Kustom</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.custom_permissions}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Permission Terbaru</CardTitle>
              <Key className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.recent_permissions}</div>
              <p className="text-xs text-muted-foreground">7 hari terakhir</p>
            </CardContent>
          </Card>
        </div>

        {/* Filter & Search */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Search className="h-5 w-5" />
              Filter & Pencarian
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col lg:flex-row gap-4">
              {/* Input Pencarian - Sebelah Kiri */}
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Cari permission berdasarkan nama..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              
              {/* Filter - Sebelah Kanan */}
              <div className="flex flex-col sm:flex-row gap-4 lg:w-auto">
                <Select value={typeFilter} onValueChange={setTypeFilter}>
                  <SelectTrigger className="w-full sm:w-[200px]">
                    <SelectValue placeholder="Filter berdasarkan tipe" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Semua Permission</SelectItem>
                    <SelectItem value="system">Permission Sistem</SelectItem>
                    <SelectItem value="custom">Permission Kustom</SelectItem>
                    <SelectItem value="recent">Permission Terbaru</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Permissions Table */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Key className="h-5 w-5" />
              Daftar Permission ({filteredPermissions.length})
            </CardTitle>
            <CardDescription>
              Kelola permission yang tersedia dalam sistem
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Nama Permission</TableHead>
                  <TableHead>Tipe</TableHead>
                  <TableHead>Guard</TableHead>
                  <TableHead>Dibuat</TableHead>
                  <TableHead className="text-right">Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredPermissions.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-8">
                      <div className="flex flex-col items-center gap-2">
                        <Key className="h-8 w-8 text-muted-foreground" />
                        <p className="text-muted-foreground">
                          {searchTerm || typeFilter !== 'all' 
                            ? 'Tidak ada permission yang sesuai dengan filter'
                            : 'Belum ada permission yang dibuat'
                          }
                        </p>
                      </div>
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredPermissions.map((permission) => {
                    const isSystemPermission = permission.name.includes('view') || 
                                             permission.name.includes('create') || 
                                             permission.name.includes('edit') || 
                                             permission.name.includes('delete')
                    
                    return (
                      <TableRow key={permission.id}>
                        <TableCell className="font-mono text-sm">{permission.id}</TableCell>
                        <TableCell className="font-medium">{permission.name}</TableCell>
                        <TableCell>
                          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs ${
                            isSystemPermission 
                              ? 'bg-blue-100 text-blue-800' 
                              : 'bg-green-100 text-green-800'
                          }`}>
                            {isSystemPermission ? 'Sistem' : 'Kustom'}
                          </span>
                        </TableCell>
                        <TableCell className="font-mono text-sm">{permission.guard_name}</TableCell>
                        <TableCell>
                          {new Date(permission.created_at).toLocaleDateString('id-ID')}
                        </TableCell>
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" className="h-8 w-8 p-0">
                                <span className="sr-only">Buka menu</span>
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem onClick={() => openEditDialog(permission)}>
                                <Edit className="mr-2 h-4 w-4" />
                                Edit
                              </DropdownMenuItem>
                              <DropdownMenuItem 
                                onClick={() => setDeletingPermission(permission)}
                                className="text-red-600"
                              >
                                <Trash2 className="mr-2 h-4 w-4" />
                                Hapus
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    )
                  })
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Edit Dialog */}
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Permission</DialogTitle>
              <DialogDescription>
                Ubah nama permission
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="edit-name">Nama Permission</Label>
                <Input
                  id="edit-name"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="Contoh: manage users, view reports"
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                Batal
              </Button>
              <Button onClick={handleEditPermission}>
                Simpan Perubahan
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Delete Confirmation Dialog */}
        <AlertDialog open={!!deletingPermission} onOpenChange={() => setDeletingPermission(null)}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Hapus Permission</AlertDialogTitle>
              <AlertDialogDescription>
                Apakah Anda yakin ingin menghapus permission "{deletingPermission?.name}"? 
                Tindakan ini tidak dapat dibatalkan.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Batal</AlertDialogCancel>
              <AlertDialogAction 
                onClick={confirmDeletePermission}
                className="bg-red-600 hover:bg-red-700"
              >
                Hapus
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </RoleGuard>
  )
}