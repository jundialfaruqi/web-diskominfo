import { Camera, Eye } from 'lucide-react';

export default function GallerySection() {
  const galleryItems = [
    {
      id: 1,
      title: "Workshop Digital Literacy",
      description: "Pelatihan literasi digital untuk masyarakat Kota Pekanbaru",
      image: "/api/placeholder/400/300",
      date: "15 Januari 2024",
      category: "Pelatihan"
    },
    {
      id: 2,
      title: "Launching Smart City Dashboard",
      description: "Peluncuran dashboard Smart City untuk monitoring kota",
      image: "/api/placeholder/400/300",
      date: "22 Januari 2024",
      category: "Teknologi"
    },
    {
      id: 3,
      title: "Sosialisasi E-Government",
      description: "Sosialisasi layanan pemerintahan elektronik kepada ASN",
      image: "/api/placeholder/400/300",
      date: "28 Januari 2024",
      category: "Sosialisasi"
    },
    {
      id: 4,
      title: "Rapat Koordinasi IT",
      description: "Koordinasi pengembangan infrastruktur IT kota",
      image: "/api/placeholder/400/300",
      date: "5 Februari 2024",
      category: "Koordinasi"
    },
    {
      id: 5,
      title: "Cyber Security Training",
      description: "Pelatihan keamanan siber untuk pegawai pemerintahan",
      image: "/api/placeholder/400/300",
      date: "12 Februari 2024",
      category: "Keamanan"
    },
    {
      id: 6,
      title: "Digital Innovation Summit",
      description: "Summit inovasi digital untuk kemajuan kota",
      image: "/api/placeholder/400/300",
      date: "20 Februari 2024",
      category: "Inovasi"
    }
  ];

  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      'Pelatihan': 'bg-blue-100 text-blue-800',
      'Teknologi': 'bg-green-100 text-green-800',
      'Sosialisasi': 'bg-purple-100 text-purple-800',
      'Koordinasi': 'bg-orange-100 text-orange-800',
      'Keamanan': 'bg-red-100 text-red-800',
      'Inovasi': 'bg-yellow-100 text-yellow-800'
    };
    return colors[category] || 'bg-gray-100 text-gray-800';
  };

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <Camera className="w-8 h-8 text-blue-600 mr-3" />
            <h2 className="text-3xl font-bold text-gray-900">Galeri Kegiatan</h2>
          </div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Dokumentasi berbagai kegiatan dan program Dinas Komunikasi Informatika dan Statistik Kota Pekanbaru
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {galleryItems.map((item) => (
            <div key={item.id} className="group relative bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              {/* Image Container */}
              <div className="relative h-48 bg-gradient-to-br from-blue-100 to-blue-200 overflow-hidden">
                {/* Placeholder for image */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <Camera className="w-16 h-16 text-blue-400" />
                </div>
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center">
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <button className="bg-white text-gray-900 px-4 py-2 rounded-full flex items-center space-x-2 hover:bg-gray-100 transition-colors">
                      <Eye className="w-4 h-4" />
                      <span className="text-sm font-medium">Lihat Detail</span>
                    </button>
                  </div>
                </div>
                
                {/* Category Badge */}
                <div className="absolute top-3 left-3">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(item.category)}`}>
                    {item.category}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="mb-2">
                  <span className="text-sm text-blue-600 font-medium">{item.date}</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                  {item.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center">
          <button className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium inline-flex items-center space-x-2">
            <Camera className="w-5 h-5" />
            <span>Lihat Semua Galeri</span>
          </button>
        </div>
      </div>
    </section>
  );
}