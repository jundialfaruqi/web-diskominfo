"use client"

import { useState, useEffect, useRef } from 'react'
import { RoleGuard, ShowForPermissions } from '@/components/RoleGuard'
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
import { Checkbox } from '@/components/ui/checkbox'
import { Plus, Edit, Trash2, Shield, Search, RefreshCw, Loader2, Users, Key, MoreHorizontal } from 'lucide-react'
import { useAuth } from '@/contexts/AuthContext'
import { toast } from 'sonner'

interface Role {
  id: number
  name: string
  guard_name: string
  permissions: Permission[]
  created_at: string
  updated_at: string
}

interface Permission {
  id: number
  name: string
  guard_name: string
  created_at: string
  updated_at: string
}

interface RoleStats {
  total_roles: number
  roles_with_permissions: number
  total_permissions: number
  most_used_permissions: string[]
}

export default function RolesPage() {
  const { token } = useAuth()
  const [roles, setRoles] = useState<Role[]>([])
  const [filteredRoles, setFilteredRoles] = useState<Role[]>([])
  const [permissions, setPermissions] = useState<Permission[]>([])
  const [stats, setStats] = useState<RoleStats>({
    total_roles: 0,
    roles_with_permissions: 0,
    total_permissions: 0,
    most_used_permissions: []
  })
  const [loading, setLoading] = useState(true)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [permissionFilter, setPermissionFilter] = useState('all')
  
  // Dialog states
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [editingRole, setEditingRole] = useState<Role | null>(null)
  const [deletingRole, setDeletingRole] = useState<Role | null>(null)
  
  // Form data
  const [formData, setFormData] = useState({
    name: '',
    permissions: [] as number[]
  })

  // Access denied toast prevention
  const accessDeniedTimestamp = useRef<number>(0)

  // Helper function to show access denied toast with timestamp check
  const showAccessDeniedToast = () => {
    const now = Date.now()
    if (now - accessDeniedTimestamp.current > 5000) { // 5 seconds cooldown
      toast.error('Akses ditolak. Anda tidak memiliki izin untuk mengakses halaman ini.')
      accessDeniedTimestamp.current = now
    }
  }

  // Calculate statistics
  const calculateStats = (rolesData: Role[], permissionsData: Permission[]) => {
    const rolesWithPermissions = rolesData.filter(role => role.permissions && role.permissions.length > 0).length
    
    // Count permission usage
    const permissionCount: { [key: string]: number } = {}
    rolesData.forEach(role => {
      if (role.permissions) {
        role.permissions.forEach(permission => {
          permissionCount[permission.name] = (permissionCount[permission.name] || 0) + 1
        })
      }
    })
    
    // Get most used permissions (top 3)
    const mostUsedPermissions = Object.entries(permissionCount)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 3)
      .map(([name]) => name)
    
    setStats({
      total_roles: rolesData.length,
      roles_with_permissions: rolesWithPermissions,
      total_permissions: permissionsData.length,
      most_used_permissions: mostUsedPermissions
    })
  }

  // Filter roles based on search and permission filter
  const filterRoles = (rolesData: Role[], search: string, permFilter: string) => {
    let filtered = rolesData
    
    // Search filter
    if (search) {
      filtered = filtered.filter(role => 
        role.name.toLowerCase().includes(search.toLowerCase())
      )
    }
    
    // Permission filter
    if (permFilter !== 'all') {
      if (permFilter === 'with_permissions') {
        filtered = filtered.filter(role => role.permissions && role.permissions.length > 0)
      } else if (permFilter === 'without_permissions') {
        filtered = filtered.filter(role => !role.permissions || role.permissions.length === 0)
      } else {
        // Filter by specific permission
        filtered = filtered.filter(role => 
          role.permissions && role.permissions.some(p => p.name === permFilter)
        )
      }
    }
    
    setFilteredRoles(filtered)
  }

  // Fetch roles and permissions
  const fetchData = async () => {
    try {
      const [rolesResponse, permissionsResponse] = await Promise.all([
        fetch(`${process.env.NEXT_PUBLIC_API_BACKEND}/api/roles`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/json'
          }
        }),
        fetch(`${process.env.NEXT_PUBLIC_API_BACKEND}/api/permissions/all`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/json'
          }
        })
      ])

      if (rolesResponse.ok && permissionsResponse.ok) {
        const rolesData = await rolesResponse.json()
        const permissionsData = await permissionsResponse.json()
        
        setRoles(rolesData.data || [])
        setPermissions(Array.isArray(permissionsData.data) ? permissionsData.data : [])
        
        // Calculate stats and filter
        calculateStats(rolesData.data || [], permissionsData.data || [])
        filterRoles(rolesData.data || [], searchTerm, permissionFilter)
      } else {
        if (!rolesResponse.ok) {
          if (rolesResponse.status === 403) {
            console.error('Access forbidden')
            showAccessDeniedToast()
            return
          }
          const rolesError = await rolesResponse.json()
          console.error('Roles API Error:', rolesError)
        }
        if (!permissionsResponse.ok) {
          if (permissionsResponse.status === 403) {
            console.error('Access forbidden')
            showAccessDeniedToast()
            return
          }
          const permissionsError = await permissionsResponse.json()
          console.error('Permissions API Error:', permissionsError)
        }
        toast.error('Gagal memuat data')
      }
    } catch (error) {
      console.error('Error fetching data:', error)
      toast.error('Gagal memuat data')
    } finally {
      setLoading(false)
      setIsRefreshing(false)
    }
  }

  // Handle refresh
  const handleRefresh = async () => {
    setIsRefreshing(true)
    await fetchData()
    toast.success('Data berhasil diperbarui')
  }

  // Handle permission change in form
  const handlePermissionChange = (permissionId: number, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      permissions: checked 
        ? [...prev.permissions, permissionId]
        : prev.permissions.filter(id => id !== permissionId)
    }))
  }

  // Handle create role
  const handleCreateRole = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BACKEND}/api/roles`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          name: formData.name,
          permissions: formData.permissions
        })
      })

      if (response.ok) {
        toast.success('Role berhasil dibuat')
        setIsCreateDialogOpen(false)
        setFormData({ name: '', permissions: [] })
        fetchData()
      } else if (response.status === 403) {
        console.error('Access forbidden')
        showAccessDeniedToast()
      } else {
        const errorData = await response.json()
        toast.error(errorData.message || 'Gagal membuat role')
      }
    } catch (error) {
      console.error('Error creating role:', error)
      toast.error('Gagal membuat role')
    }
  }

  // Handle edit role
  const handleEditRole = async () => {
    if (!editingRole) return

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BACKEND}/api/roles/${editingRole.id}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          name: formData.name,
          permissions: formData.permissions
        })
      })

      if (response.ok) {
        toast.success('Role berhasil diperbarui')
        setIsEditDialogOpen(false)
        setEditingRole(null)
        setFormData({ name: '', permissions: [] })
        fetchData()
      } else if (response.status === 403) {
        console.error('Access forbidden')
        showAccessDeniedToast()
      } else {
        const errorData = await response.json()
        toast.error(errorData.message || 'Gagal memperbarui role')
      }
    } catch (error) {
      console.error('Error updating role:', error)
      toast.error('Gagal memperbarui role')
    }
  }

  // Handle delete role
  // Handle delete role
  const confirmDeleteRole = async () => {
    if (!deletingRole) return

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BACKEND}/api/roles/${deletingRole.id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json'
        }
      })

      if (response.ok) {
        toast.success('Role berhasil dihapus')
        fetchData()
      } else if (response.status === 403) {
        console.error('Access forbidden')
        showAccessDeniedToast()
      } else {
        const errorData = await response.json()
        toast.error(errorData.message || 'Gagal menghapus role')
      }
    } catch (error) {
      console.error('Error deleting role:', error)
      toast.error('Gagal menghapus role')
    } finally {
      setDeletingRole(null)
    }
  }

  // Open edit dialog
  const openEditDialog = (role: Role) => {
    setEditingRole(role)
    setFormData({
      name: role.name,
      permissions: role.permissions ? role.permissions.map(p => p.id) : []
    })
    setIsEditDialogOpen(true)
  }

  // Filter effect
  useEffect(() => {
    filterRoles(roles, searchTerm, permissionFilter)
  }, [searchTerm, permissionFilter, roles])

  // Fetch data when token is available
  useEffect(() => {
    if (token) {
      fetchData()
      document.title = 'Manajemen Role - Admin Panel'
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
    <RoleGuard allowedPermissions={['view roles']}>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Manajemen Role</h1>
            <p className="text-muted-foreground">
              Kelola role dan permission dalam sistem
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
            <ShowForPermissions permissions={['create roles']}>
              <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="flex items-center gap-2">
                    <Plus className="h-4 w-4" />
                    Tambah Role
                  </Button>
                </DialogTrigger>
                <DialogContent>
                <DialogHeader>
                  <DialogTitle>Tambah Role Baru</DialogTitle>
                  <DialogDescription>
                    Buat role baru dengan permission yang sesuai
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="name">Nama Role</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                      placeholder="Masukkan nama role"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label>Permissions</Label>
                    <div className="grid grid-cols-2 gap-2 max-h-60 overflow-y-auto">
                      {Array.isArray(permissions) && permissions.map((permission) => (
                        <div key={permission.id} className="flex items-center space-x-2">
                          <Checkbox
                            id={`permission-${permission.id}`}
                            checked={formData.permissions.includes(permission.id)}
                            onCheckedChange={(checked) => 
                              handlePermissionChange(permission.id, checked as boolean)
                            }
                          />
                          <Label
                            htmlFor={`permission-${permission.id}`}
                            className="text-sm font-normal"
                          >
                            {permission.name}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                    Batal
                  </Button>
                  <Button onClick={handleCreateRole}>
                    Buat Role
                  </Button>
                </DialogFooter>
                </DialogContent>
              </Dialog>
            </ShowForPermissions>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Roles</CardTitle>
              <Shield className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.total_roles}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Roles dengan Permission</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.roles_with_permissions}</div>
            </CardContent>
          </Card>
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
              <CardTitle className="text-sm font-medium">Permission Populer</CardTitle>
              <Key className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-sm">
                {stats.most_used_permissions.length > 0 ? (
                  stats.most_used_permissions.slice(0, 2).map((perm, index) => (
                    <div key={index} className="truncate">{perm}</div>
                  ))
                ) : (
                  <div className="text-muted-foreground">Tidak ada</div>
                )}
              </div>
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
                    placeholder="Cari role berdasarkan nama..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              
              {/* Filter - Sebelah Kanan */}
              <div className="flex flex-col sm:flex-row gap-4 lg:w-auto">
                <Select value={permissionFilter} onValueChange={setPermissionFilter}>
                  <SelectTrigger className="w-full sm:w-[220px]">
                    <SelectValue placeholder="Filter berdasarkan permission" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Semua Role</SelectItem>
                    <SelectItem value="with_permissions">Dengan Permission</SelectItem>
                    <SelectItem value="without_permissions">Tanpa Permission</SelectItem>
                    {Array.isArray(permissions) && permissions.map((permission) => (
                      <SelectItem key={permission.id} value={permission.name}>
                        {permission.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Roles Table */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Daftar Role ({filteredRoles.length})
            </CardTitle>
            <CardDescription>
              Kelola role dan permission yang tersedia dalam sistem
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nama Role</TableHead>
                  <TableHead>Permissions</TableHead>
                  <TableHead>Dibuat</TableHead>
                  <ShowForPermissions permissions={['edit roles', 'delete roles']}>
                    <TableHead className="text-right">Aksi</TableHead>
                  </ShowForPermissions>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredRoles.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center py-8">
                      <div className="flex flex-col items-center gap-2">
                        <Shield className="h-8 w-8 text-muted-foreground" />
                        <p className="text-muted-foreground">
                          {searchTerm || permissionFilter !== 'all' 
                            ? 'Tidak ada role yang sesuai dengan filter'
                            : 'Belum ada role yang dibuat'
                          }
                        </p>
                      </div>
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredRoles.map((role) => (
                    <TableRow key={role.id}>
                      <TableCell className="font-medium">{role.name}</TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          {role.permissions && role.permissions.length > 0 ? (
                            role.permissions.slice(0, 3).map((permission) => (
                              <span
                                key={permission.id}
                                className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-800"
                              >
                                {permission.name}
                              </span>
                            ))
                          ) : (
                            <span className="text-muted-foreground text-sm">Tidak ada permission</span>
                          )}
                          {role.permissions && role.permissions.length > 3 && (
                            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-gray-100 text-gray-800">
                              +{role.permissions.length - 3} lainnya
                            </span>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        {new Date(role.created_at).toLocaleDateString('id-ID')}
                      </TableCell>
                      <TableCell className="text-right">
                        <ShowForPermissions permissions={['edit roles', 'delete roles']}>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" className="h-8 w-8 p-0">
                                <span className="sr-only">Buka menu</span>
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <ShowForPermissions permissions={['edit roles']}>
                                <DropdownMenuItem onClick={() => openEditDialog(role)}>
                                  <Edit className="mr-2 h-4 w-4" />
                                  Edit
                                </DropdownMenuItem>
                              </ShowForPermissions>
                              <ShowForPermissions permissions={['delete roles']}>
                                <DropdownMenuItem 
                                  onClick={() => setDeletingRole(role)}
                                  className="text-red-600"
                                >
                                  <Trash2 className="mr-2 h-4 w-4" />
                                  Hapus
                                </DropdownMenuItem>
                              </ShowForPermissions>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </ShowForPermissions>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Edit Dialog */}
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Role</DialogTitle>
              <DialogDescription>
                Ubah nama role dan permission yang dimiliki
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="edit-name">Nama Role</Label>
                <Input
                  id="edit-name"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="Masukkan nama role"
                />
              </div>
              <div className="grid gap-2">
                <Label>Permissions</Label>
                <div className="grid grid-cols-2 gap-2 max-h-60 overflow-y-auto">
                  {Array.isArray(permissions) && permissions.map((permission) => (
                    <div key={permission.id} className="flex items-center space-x-2">
                      <Checkbox
                        id={`edit-permission-${permission.id}`}
                        checked={formData.permissions.includes(permission.id)}
                        onCheckedChange={(checked) => 
                          handlePermissionChange(permission.id, checked as boolean)
                        }
                      />
                      <Label
                        htmlFor={`edit-permission-${permission.id}`}
                        className="text-sm font-normal"
                      >
                        {permission.name}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                Batal
              </Button>
              <Button onClick={handleEditRole}>
                Simpan Perubahan
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Delete Confirmation Dialog */}
        <AlertDialog open={!!deletingRole} onOpenChange={() => setDeletingRole(null)}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Hapus Role</AlertDialogTitle>
              <AlertDialogDescription>
                Apakah Anda yakin ingin menghapus role "{deletingRole?.name}"? 
                Tindakan ini tidak dapat dibatalkan.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Batal</AlertDialogCancel>
              <AlertDialogAction 
                onClick={confirmDeleteRole}
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