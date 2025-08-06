"use client"

import { useState, useEffect } from 'react'
import { RoleGuard, ShowForPermissions } from '@/components/RoleGuard'
import { Button } from '@/components/ui/button'
import { Plus, RefreshCw, Loader2 } from 'lucide-react'
import { DialogTrigger } from '@/components/ui/dialog'
import { usePermissions } from './hooks/usePermissions'
import { Permission } from './types'
import {
  PermissionStats,
  PermissionFilters,
  PermissionTable,
  PermissionDialogs
} from './components'

export default function PermissionsPage() {
  const {
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
    handleRefresh,
    handlePageChange,
    handlePerPageChange,
    createPermission,
    updatePermission,
    deletePermission
  } = usePermissions()

  // Dialog states
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [editingPermission, setEditingPermission] = useState<Permission | null>(null)
  const [deletingPermission, setDeletingPermission] = useState<Permission | null>(null)

  // Set document title
  useEffect(() => {
    document.title = 'Manajemen Permission - Admin Panel'
  }, [])

  // Handle edit permission
  const handleEditPermission = (permission: Permission) => {
    setEditingPermission(permission)
    setIsEditDialogOpen(true)
  }

  // Handle delete permission
  const handleDeletePermission = (permission: Permission) => {
    setDeletingPermission(permission)
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    )
  }

  return (
    <RoleGuard allowedPermissions={['view permissions']}>
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
            <ShowForPermissions permissions={['create permissions']}>
              <Button 
                className="flex items-center gap-2"
                onClick={() => setIsCreateDialogOpen(true)}
              >
                <Plus className="h-4 w-4" />
                Tambah Permission
              </Button>
            </ShowForPermissions>
          </div>
        </div>

        {/* Statistics Cards */}
        <PermissionStats stats={stats} />

        {/* Filter & Search */}
        <PermissionFilters
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          perPage={perPage}
          onPerPageChange={handlePerPageChange}
        />

        {/* Permissions Table */}
        <PermissionTable
          permissions={permissions}
          searchTerm={searchTerm}
          currentPage={currentPage}
          totalPages={totalPages}
          totalPermissions={totalPermissions}
          onEdit={handleEditPermission}
          onDelete={handleDeletePermission}
          onPageChange={handlePageChange}
        />

        {/* Dialogs */}
        <PermissionDialogs
          isCreateDialogOpen={isCreateDialogOpen}
          setIsCreateDialogOpen={setIsCreateDialogOpen}
          onCreatePermission={createPermission}
          isEditDialogOpen={isEditDialogOpen}
          setIsEditDialogOpen={setIsEditDialogOpen}
          editingPermission={editingPermission}
          onEditPermission={updatePermission}
          deletingPermission={deletingPermission}
          setDeletingPermission={setDeletingPermission}
          onDeletePermission={deletePermission}
        />
      </div>
    </RoleGuard>
  )
}