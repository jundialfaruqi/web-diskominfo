"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Loader2, Eye, EyeOff } from "lucide-react"
import { toast } from "sonner"
import { useAuth } from "@/contexts/AuthContext"

interface User {
  id?: number
  name: string
  email: string
  roles?: { id: number; name: string }[]
  department: string
  phone: string
  status: string
}

interface Role {
  id: number
  name: string
}

interface UserFormProps {
  user?: User
  isOpen: boolean
  onClose: () => void
  onSuccess: () => void
  mode: 'create' | 'edit'
}

export function UserForm({ user, isOpen, onClose, onSuccess, mode }: UserFormProps) {
  const { token } = useAuth()
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    password: '',
    password_confirmation: '',
    role: user?.roles?.[0]?.name || '',
    department: user?.department || '',
    phone: user?.phone || '',
    status: user?.status || 'active'
  })
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [showPassword, setShowPassword] = useState(false)
  const [showPasswordConfirmation, setShowPasswordConfirmation] = useState(false)
  const [roles, setRoles] = useState<Role[]>([])

  // Fetch roles from API
  const fetchRoles = async () => {
    try {
      if (!token) return
      
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BACKEND}/api/roles`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json'
        }
      })
      
      if (response.ok) {
        const data = await response.json()
        setRoles(data.data || [])
      }
    } catch (error) {
      console.error('Error fetching roles:', error)
    }
  }

  // Update formData when user prop changes
  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        email: user.email || '',
        password: '',
        password_confirmation: '',
        role: user.roles?.[0]?.name || '',
        department: user.department || '',
        phone: user.phone || '',
        status: user.status || 'active'
      })
    }
  }, [user])

  // Fetch roles when dialog opens
  useEffect(() => {
    if (isOpen && token) {
      fetchRoles()
    }
  }, [isOpen, token])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setErrors({})

    try {
      if (!token) {
        toast.error('Token tidak ditemukan. Silakan login kembali.')
        return
      }

      const url = mode === 'create' 
        ? `${process.env.NEXT_PUBLIC_API_BACKEND}/api/users`
        : `${process.env.NEXT_PUBLIC_API_BACKEND}/api/users/${user?.id}`
      
      const method = mode === 'create' ? 'POST' : 'PUT'
      
      // For edit mode, only include password if it's filled
      const submitData = { ...formData }
      if (mode === 'edit' && !submitData.password) {
        delete submitData.password
        delete submitData.password_confirmation
      }

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json'
        },
        body: JSON.stringify(submitData)
      })

      const data = await response.json()

      if (!response.ok) {
        if (response.status === 401) {
          // Token expired atau tidak valid
          toast.error('Sesi Anda telah berakhir. Silakan login kembali.')
          window.location.href = '/dk-login'
          return
        }
        if (data.errors) {
          setErrors(data.errors)
        } else {
          toast.error(data.message || 'Terjadi kesalahan')
        }
        return
      }

      // Check success field from response body
      if (!data.success) {
        if (data.errors) {
          setErrors(data.errors)
        } else {
          toast.error(data.message || 'Terjadi kesalahan')
        }
        return
      }

      toast.success(data.message || `User berhasil ${mode === 'create' ? 'ditambahkan' : 'diperbarui'}`)
      onSuccess()
      onClose()
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
        role: 'editor',
        department: '',
        phone: '',
        status: 'active'
      })
    } catch (error) {
      console.error('Error:', error)
      toast.error('Terjadi kesalahan saat menyimpan data')
    } finally {
      setIsLoading(false)
    }
  }

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }))
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {mode === 'create' ? 'Tambah User Baru' : 'Edit User'}
          </DialogTitle>
          <DialogDescription>
            {mode === 'create' 
              ? 'Isi form di bawah untuk menambah user baru.'
              : 'Perbarui informasi user di bawah ini.'
            }
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Nama *</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => handleChange('name', e.target.value)}
              placeholder="Masukkan nama lengkap"
              className={errors.name ? 'border-red-500' : ''}
            />
            {errors.name && <p className="text-sm text-red-500">{errors.name[0]}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email *</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => handleChange('email', e.target.value)}
              placeholder="Masukkan email"
              className={errors.email ? 'border-red-500' : ''}
            />
            {errors.email && <p className="text-sm text-red-500">{errors.email[0]}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">
              Password {mode === 'create' ? '*' : '(Kosongkan jika tidak ingin mengubah)'}
            </Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                value={formData.password}
                onChange={(e) => handleChange('password', e.target.value)}
                placeholder="Masukkan password"
                className={errors.password ? 'border-red-500 pr-10' : 'pr-10'}
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </Button>
            </div>
            {errors.password && <p className="text-sm text-red-500">{errors.password[0]}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="password_confirmation">Konfirmasi Password</Label>
            <div className="relative">
              <Input
                id="password_confirmation"
                type={showPasswordConfirmation ? "text" : "password"}
                value={formData.password_confirmation}
                onChange={(e) => handleChange('password_confirmation', e.target.value)}
                placeholder="Konfirmasi password"
                className={errors.password_confirmation ? 'border-red-500 pr-10' : 'pr-10'}
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                onClick={() => setShowPasswordConfirmation(!showPasswordConfirmation)}
              >
                {showPasswordConfirmation ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </Button>
            </div>
            {errors.password_confirmation && <p className="text-sm text-red-500">{errors.password_confirmation[0]}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="role">Role *</Label>
            <Select value={formData.role} onValueChange={(value) => handleChange('role', value)}>
              <SelectTrigger className={errors.role ? 'border-red-500' : ''}>
                <SelectValue placeholder="Pilih role" />
              </SelectTrigger>
              <SelectContent>
                {roles.map((role) => (
                  <SelectItem key={role.id} value={role.name}>
                    {role.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.role && <p className="text-sm text-red-500">{errors.role[0]}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="department">Department *</Label>
            <Input
              id="department"
              value={formData.department}
              onChange={(e) => handleChange('department', e.target.value)}
              placeholder="Masukkan department"
              className={errors.department ? 'border-red-500' : ''}
            />
            {errors.department && <p className="text-sm text-red-500">{errors.department[0]}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Nomor Telepon</Label>
            <Input
              id="phone"
              value={formData.phone}
              onChange={(e) => handleChange('phone', e.target.value)}
              placeholder="Masukkan nomor telepon"
              className={errors.phone ? 'border-red-500' : ''}
            />
            {errors.phone && <p className="text-sm text-red-500">{errors.phone[0]}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="status">Status *</Label>
            <Select value={formData.status} onValueChange={(value) => handleChange('status', value)}>
              <SelectTrigger className={errors.status ? 'border-red-500' : ''}>
                <SelectValue placeholder="Pilih status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
            {errors.status && <p className="text-sm text-red-500">{errors.status[0]}</p>}
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Batal
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {mode === 'create' ? 'Tambah' : 'Perbarui'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}