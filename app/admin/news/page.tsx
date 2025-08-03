"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { FileText, Search, Plus, MoreHorizontal, Calendar, Eye, Edit, Trash2 } from "lucide-react"

export default function NewsPage() {
  const news = [
    {
      id: 1,
      title: "Pemerintah Kota Pekanbaru Luncurkan Program Smart City 2024",
      excerpt: "Walikota Pekanbaru meresmikan program Smart City yang akan mengintegrasikan teknologi digital dalam pelayanan publik...",
      author: "Ahmad Rizki",
      category: "Smart City",
      status: "Published",
      publishDate: "2024-01-15",
      views: 1250,
      featured: true
    },
    {
      id: 2,
      title: "Mal Pelayanan Publik Kota Pekanbaru Raih Penghargaan Terbaik",
      excerpt: "Mal Pelayanan Publik Kota Pekanbaru meraih penghargaan sebagai pelayanan publik terbaik tingkat provinsi...",
      author: "Siti Nurhaliza",
      category: "Pelayanan Publik",
      status: "Published",
      publishDate: "2024-01-12",
      views: 890,
      featured: false
    },
    {
      id: 3,
      title: "Festival Budaya Melayu Pekanbaru 2024 Siap Digelar",
      excerpt: "Pemerintah Kota Pekanbaru akan menggelar Festival Budaya Melayu 2024 untuk melestarikan dan mempromosikan...",
      author: "Maya Sari",
      category: "Budaya",
      status: "Draft",
      publishDate: "2024-01-10",
      views: 0,
      featured: true
    },
    {
      id: 4,
      title: "Pembangunan Infrastruktur Jalan Tol Pekanbaru-Dumai Dipercepat",
      excerpt: "Proyek strategis pembangunan jalan tol Pekanbaru-Dumai memasuki fase percepatan untuk mendukung konektivitas...",
      author: "Budi Santoso",
      category: "Infrastruktur",
      status: "Published",
      publishDate: "2024-01-08",
      views: 2100,
      featured: false
    },
    {
      id: 5,
      title: "Program Beasiswa Unggulan Kota Pekanbaru Dibuka",
      excerpt: "Pemerintah Kota Pekanbaru membuka program beasiswa unggulan untuk mendukung pendidikan tinggi mahasiswa...",
      author: "Dedi Kurniawan",
      category: "Pendidikan",
      status: "Scheduled",
      publishDate: "2024-01-20",
      views: 0,
      featured: false
    }
  ]

  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      'Smart City': 'bg-blue-100 text-blue-800',
      'Pelayanan Publik': 'bg-green-100 text-green-800',
      'Budaya': 'bg-purple-100 text-purple-800',
      'Infrastruktur': 'bg-orange-100 text-orange-800',
      'Pendidikan': 'bg-indigo-100 text-indigo-800'
    }
    return colors[category] || 'bg-gray-100 text-gray-800'
  }

  const getStatusColor = (status: string) => {
    const colors: { [key: string]: string } = {
      'Published': 'bg-green-100 text-green-800',
      'Draft': 'bg-yellow-100 text-yellow-800',
      'Scheduled': 'bg-blue-100 text-blue-800'
    }
    return colors[status] || 'bg-gray-100 text-gray-800'
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('id-ID', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Manajemen Berita</h1>
          <p className="text-muted-foreground">
            Kelola konten berita dan artikel untuk website
          </p>
        </div>
        <Button className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Buat Berita Baru
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Berita</CardTitle>
            <FileText className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{news.length}</div>
            <p className="text-xs text-muted-foreground">
              +3 berita bulan ini
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Published</CardTitle>
            <FileText className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{news.filter(n => n.status === 'Published').length}</div>
            <p className="text-xs text-muted-foreground">
              Berita yang sudah dipublikasi
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Draft</CardTitle>
            <FileText className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{news.filter(n => n.status === 'Draft').length}</div>
            <p className="text-xs text-muted-foreground">
              Berita dalam proses
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Views</CardTitle>
            <Eye className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{news.reduce((sum, n) => sum + n.views, 0).toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              Total pembaca
            </p>
          </CardContent>
        </Card>
      </div>

      {/* News Management */}
      <Card>
        <CardHeader>
          <CardTitle>Daftar Berita</CardTitle>
          <CardDescription>
            Kelola dan monitor konten berita website
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-2 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input 
                placeholder="Cari berdasarkan judul, kategori, atau penulis..." 
                className="pl-10"
              />
            </div>
            <Button variant="outline">Filter</Button>
            <Button variant="outline">Export</Button>
          </div>

          {/* News List */}
          <div className="space-y-4">
            {news.map((article) => (
              <div key={article.id} className="flex items-start justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <h3 className="font-semibold text-lg line-clamp-1">{article.title}</h3>
                    {article.featured && (
                      <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-full font-medium">
                        Featured
                      </span>
                    )}
                  </div>
                  
                  <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                    {article.excerpt}
                  </p>
                  
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <span>Oleh: {article.author}</span>
                    <div className="flex items-center">
                      <Calendar className="h-3 w-3 mr-1" />
                      {formatDate(article.publishDate)}
                    </div>
                    <div className="flex items-center">
                      <Eye className="h-3 w-3 mr-1" />
                      {article.views.toLocaleString()} views
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4 ml-4">
                  <div className="text-right">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(article.category)}`}>
                      {article.category}
                    </span>
                    <div className="mt-1">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(article.status)}`}>
                        {article.status}
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-1">
                    <Button variant="ghost" size="sm">
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
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