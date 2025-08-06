import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Key, Edit, Trash2, MoreHorizontal } from 'lucide-react'
import { Permission } from '../types'
import { PermissionPagination } from './PermissionPagination'
import { ShowForPermissions } from '@/components/RoleGuard'

interface PermissionTableProps {
  permissions: Permission[]
  searchTerm: string
  currentPage: number
  totalPages: number
  totalPermissions: number
  onEdit: (permission: Permission) => void
  onDelete: (permission: Permission) => void
  onPageChange: (page: number) => void
}

export function PermissionTable({ permissions, searchTerm, currentPage, totalPages, totalPermissions, onEdit, onDelete, onPageChange }: PermissionTableProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Key className="h-5 w-5" />
          Daftar Permission ({totalPermissions})
        </CardTitle>
        <CardDescription>
          Kelola permission yang tersedia dalam sistem
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Nama Permission</TableHead>
                <TableHead>Tipe</TableHead>
                <TableHead>Guard</TableHead>
                <TableHead>Dibuat</TableHead>
                <ShowForPermissions permissions={['edit permissions', 'delete permissions']}>
                  <TableHead className="w-[70px]">Aksi</TableHead>
                </ShowForPermissions>
              </TableRow>
            </TableHeader>
            <TableBody>
              {permissions.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8">
                    <div className="flex flex-col items-center gap-2">
                      <Key className="h-8 w-8 text-muted-foreground" />
                      <p className="text-muted-foreground">
                        {searchTerm 
                          ? 'Tidak ada permission yang sesuai dengan pencarian'
                          : 'Belum ada permission yang dibuat'
                        }
                      </p>
                    </div>
                  </TableCell>
                </TableRow>
              ) : (
                Array.isArray(permissions) && permissions.map((permission) => {
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
                      <TableCell>
                      <ShowForPermissions permissions={['edit permissions', 'delete permissions']}>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <ShowForPermissions permissions={['edit permissions']}>
                              <DropdownMenuItem onClick={() => onEdit(permission)}>
                                <Edit className="mr-2 h-4 w-4" />
                                Edit
                              </DropdownMenuItem>
                            </ShowForPermissions>
                            <ShowForPermissions permissions={['delete permissions']}>
                              <DropdownMenuItem 
                                onClick={() => onDelete(permission)}
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
                  )
                })
              )}
            </TableBody>
          </Table>
        </div>
        
        {/* Pagination */}
        <PermissionPagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={onPageChange}
        />
      </CardContent>
    </Card>
  )
}