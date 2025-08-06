import { useState, useEffect } from 'react'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Permission, PermissionFormData } from '../types'

interface PermissionDialogsProps {
  // Create dialog
  isCreateDialogOpen: boolean
  setIsCreateDialogOpen: (open: boolean) => void
  onCreatePermission: (formData: PermissionFormData) => Promise<boolean>
  
  // Edit dialog
  isEditDialogOpen: boolean
  setIsEditDialogOpen: (open: boolean) => void
  editingPermission: Permission | null
  onEditPermission: (id: number, formData: PermissionFormData) => Promise<boolean>
  
  // Delete dialog
  deletingPermission: Permission | null
  setDeletingPermission: (permission: Permission | null) => void
  onDeletePermission: (id: number) => Promise<boolean>
}

export function PermissionDialogs({
  isCreateDialogOpen,
  setIsCreateDialogOpen,
  onCreatePermission,
  isEditDialogOpen,
  setIsEditDialogOpen,
  editingPermission,
  onEditPermission,
  deletingPermission,
  setDeletingPermission,
  onDeletePermission
}: PermissionDialogsProps) {
  const [createFormData, setCreateFormData] = useState<PermissionFormData>({ name: '' })
  const [editFormData, setEditFormData] = useState<PermissionFormData>({ name: '' })

  const handleCreateSubmit = async () => {
    const success = await onCreatePermission(createFormData)
    if (success) {
      setCreateFormData({ name: '' })
      setIsCreateDialogOpen(false)
    }
  }

  const handleEditSubmit = async () => {
    if (!editingPermission) return
    const success = await onEditPermission(editingPermission.id, editFormData)
    if (success) {
      setEditFormData({ name: '' })
      setIsEditDialogOpen(false)
    }
  }

  const handleDeleteConfirm = async () => {
    if (!deletingPermission) return
    const success = await onDeletePermission(deletingPermission.id)
    if (success) {
      setDeletingPermission(null)
    }
  }

  // Set edit form data when editing permission changes
  useEffect(() => {
    if (editingPermission) {
      setEditFormData({ name: editingPermission.name })
    }
  }, [editingPermission])

  return (
    <>
      {/* Create Dialog */}
      <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Tambah Permission Baru</DialogTitle>
            <DialogDescription>
              Buat permission baru untuk sistem
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="create-name">Nama Permission</Label>
              <Input
                id="create-name"
                value={createFormData.name}
                onChange={(e) => setCreateFormData({ name: e.target.value })}
                placeholder="Contoh: manage users, view reports"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
              Batal
            </Button>
            <Button onClick={handleCreateSubmit}>
              Buat Permission
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Permission</DialogTitle>
            <DialogDescription>
              Perbarui informasi permission
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="edit-name">Nama Permission</Label>
              <Input
                id="edit-name"
                value={editFormData.name}
                onChange={(e) => setEditFormData({ name: e.target.value })}
                placeholder="Contoh: manage users, view reports"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Batal
            </Button>
            <Button onClick={handleEditSubmit}>
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
            <AlertDialogCancel onClick={() => setDeletingPermission(null)}>
              Batal
            </AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteConfirm} className="bg-red-600 hover:bg-red-700">
              Hapus
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}