"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Users, Search, Plus, MoreHorizontal, Mail, Phone, Calendar } from "lucide-react"

export default function UsersPage() {
  const users = [
    {
      id: 1,
      name: "Ahmad Rizki",
      email: "ahmad.rizki@pekanbaru.go.id",
      role: "Admin",
      department: "Diskominfotik",
      phone: "0761-123-4567",
      joinDate: "2023-01-15",
      status: "Active",
      avatar: "AR"
    },
    {
      id: 2,
      name: "Siti Nurhaliza",
      email: "siti.nurhaliza@pekanbaru.go.id",
      role: "Editor",
      department: "Humas",
      phone: "0761-234-5678",
      joinDate: "2023-03-20",
      status: "Active",
      avatar: "SN"
    },
    {
      id: 3,
      name: "Budi Santoso",
      email: "budi.santoso@pekanbaru.go.id",
      role: "Operator",
      department: "IT Support",
      phone: "0761-345-6789",
      joinDate: "2023-06-10",
      status: "Active",
      avatar: "BS"
    },
    {
      id: 4,
      name: "Maya Sari",
      email: "maya.sari@pekanbaru.go.id",
      role: "Editor",
      department: "Publikasi",
      phone: "0761-456-7890",
      joinDate: "2023-08-05",
      status: "Inactive",
      avatar: "MS"
    },
    {
      id: 5,
      name: "Dedi Kurniawan",
      email: "dedi.kurniawan@pekanbaru.go.id",
      role: "Admin",
      department: "Diskominfotik",
      phone: "0761-567-8901",
      joinDate: "2023-09-12",
      status: "Active",
      avatar: "DK"
    }
  ]

  const getRoleColor = (role: string) => {
    const colors: { [key: string]: string } = {
      'Admin': 'bg-red-100 text-red-800',
      'Editor': 'bg-blue-100 text-blue-800',
      'Operator': 'bg-green-100 text-green-800'
    }
    return colors[role] || 'bg-gray-100 text-gray-800'
  }

  const getStatusColor = (status: string) => {
    return status === 'Active' 
      ? 'bg-green-100 text-green-800' 
      : 'bg-red-100 text-red-800'
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
        <Button className="flex items-center gap-2 w-full sm:w-auto">
          <Plus className="h-4 w-4" />
          Tambah User Baru
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{users.length}</div>
            <p className="text-xs text-muted-foreground">
              +2 user baru bulan ini
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Users</CardTitle>
            <Users className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{users.filter(u => u.status === 'Active').length}</div>
            <p className="text-xs text-muted-foreground">
              80% dari total users
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Admins</CardTitle>
            <Users className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{users.filter(u => u.role === 'Admin').length}</div>
            <p className="text-xs text-muted-foreground">
              Hak akses penuh
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Editors</CardTitle>
            <Users className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{users.filter(u => u.role === 'Editor').length}</div>
            <p className="text-xs text-muted-foreground">
              Hak akses konten
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filter */}
      <Card>
        <CardHeader>
          <CardTitle>Daftar Users</CardTitle>
          <CardDescription>
            Kelola dan monitor aktivitas pengguna sistem
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input 
                placeholder="Cari berdasarkan nama, email, atau department..." 
                className="pl-10"
              />
            </div>
            <Button variant="outline" className="w-full sm:w-auto">Filter</Button>
          </div>

          {/* Users Table */}
          <div className="space-y-4">
            {users.map((user) => (
              <div key={user.id} className="p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                  {/* User Info */}
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-semibold flex-shrink-0">
                      {user.avatar}
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className="font-semibold truncate">{user.name}</h3>
                      <div className="flex flex-col sm:flex-row sm:items-center text-sm text-gray-500 gap-1 sm:gap-4">
                        <div className="flex items-center">
                          <Mail className="h-3 w-3 mr-1 flex-shrink-0" />
                          <span className="truncate">{user.email}</span>
                        </div>
                        <div className="flex items-center">
                          <Phone className="h-3 w-3 mr-1 flex-shrink-0" />
                          <span>{user.phone}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Department and Actions */}
                  <div className="flex flex-col sm:flex-row sm:items-center gap-4 lg:gap-4">
                    <div className="text-left lg:text-right">
                      <div className="text-sm font-medium">{user.department}</div>
                      <div className="flex items-center text-xs text-gray-500">
                        <Calendar className="h-3 w-3 mr-1" />
                        Bergabung {user.joinDate}
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between sm:justify-start gap-2">
                      <div className="flex items-center gap-2">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRoleColor(user.role)}`}>
                          {user.role}
                        </span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(user.status)}`}>
                          {user.status}
                        </span>
                      </div>
                      
                      <Button variant="ghost" size="sm">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}