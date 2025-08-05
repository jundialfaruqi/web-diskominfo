"use client"

import { useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, FileText, Image, Bell, TrendingUp, Eye } from "lucide-react"

export default function AdminDashboard() {
  useEffect(() => {
    document.title = 'Dashboard - Admin Panel'
  }, [])
  const stats = [
    {
      title: "Total Users",
      value: "1,234",
      description: "+20.1% dari bulan lalu",
      icon: Users,
      trend: "+12%",
      color: "text-blue-600"
    },
    {
      title: "Berita Published",
      value: "89",
      description: "+15.3% dari bulan lalu",
      icon: FileText,
      trend: "+8%",
      color: "text-green-600"
    },
    {
      title: "Galeri Photos",
      value: "456",
      description: "+5.2% dari bulan lalu",
      icon: Image,
      trend: "+3%",
      color: "text-purple-600"
    },
    {
      title: "Pengumuman Aktif",
      value: "23",
      description: "+2.1% dari bulan lalu",
      icon: Bell,
      trend: "+1%",
      color: "text-orange-600"
    },
  ]

  const recentActivities = [
    {
      id: 1,
      action: "Berita baru dipublikasi",
      title: "Program Smart City 2024 Diluncurkan",
      time: "2 jam yang lalu",
      user: "Admin"
    },
    {
      id: 2,
      action: "Pengumuman ditambahkan",
      title: "Pendaftaran Beasiswa Unggulan",
      time: "4 jam yang lalu",
      user: "Editor"
    },
    {
      id: 3,
      action: "Galeri diperbarui",
      title: "Foto Kegiatan Festival Budaya",
      time: "6 jam yang lalu",
      user: "Admin"
    },
    {
      id: 4,
      action: "User baru terdaftar",
      title: "5 user baru bergabung",
      time: "8 jam yang lalu",
      user: "System"
    },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Selamat datang di panel admin Diskominfotik Kota Pekanbaru
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-600 font-medium">{stat.trend}</span> {stat.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
        {/* Recent Activities */}
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Aktivitas Terbaru</CardTitle>
            <CardDescription>
              Aktivitas terbaru di sistem admin
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-start space-x-4">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium leading-none">
                      {activity.action}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {activity.title}
                    </p>
                    <div className="flex items-center text-xs text-muted-foreground">
                      <span>{activity.time}</span>
                      <span className="mx-2">•</span>
                      <span>{activity.user}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Stats */}
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Statistik Cepat</CardTitle>
            <CardDescription>
              Overview performa website
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Eye className="h-4 w-4 text-blue-600" />
                <span className="text-sm font-medium">Page Views</span>
              </div>
              <div className="text-right">
                <div className="text-lg font-bold">12,345</div>
                <div className="text-xs text-green-600">+15.2%</div>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <TrendingUp className="h-4 w-4 text-green-600" />
                <span className="text-sm font-medium">Unique Visitors</span>
              </div>
              <div className="text-right">
                <div className="text-lg font-bold">8,901</div>
                <div className="text-xs text-green-600">+8.7%</div>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <FileText className="h-4 w-4 text-purple-600" />
                <span className="text-sm font-medium">Avg. Session</span>
              </div>
              <div className="text-right">
                <div className="text-lg font-bold">3m 24s</div>
                <div className="text-xs text-red-600">-2.1%</div>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Users className="h-4 w-4 text-orange-600" />
                <span className="text-sm font-medium">Bounce Rate</span>
              </div>
              <div className="text-right">
                <div className="text-lg font-bold">42.3%</div>
                <div className="text-xs text-green-600">-5.4%</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Aksi Cepat</CardTitle>
          <CardDescription>
            Akses cepat ke fungsi admin yang sering digunakan
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <button className="flex items-center space-x-2 p-4 border rounded-lg hover:bg-gray-50 transition-colors">
              <FileText className="h-5 w-5 text-blue-600" />
              <span className="font-medium">Buat Berita Baru</span>
            </button>
            
            <button className="flex items-center space-x-2 p-4 border rounded-lg hover:bg-gray-50 transition-colors">
              <Bell className="h-5 w-5 text-orange-600" />
              <span className="font-medium">Tambah Pengumuman</span>
            </button>
            
            <button className="flex items-center space-x-2 p-4 border rounded-lg hover:bg-gray-50 transition-colors">
              <Image className="h-5 w-5 text-purple-600" />
              <span className="font-medium">Upload Galeri</span>
            </button>
            
            <button className="flex items-center space-x-2 p-4 border rounded-lg hover:bg-gray-50 transition-colors">
              <Users className="h-5 w-5 text-green-600" />
              <span className="font-medium">Kelola Users</span>
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}