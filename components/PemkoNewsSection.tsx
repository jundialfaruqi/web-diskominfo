import { Calendar, ExternalLink, ArrowRight } from 'lucide-react';

export default function PemkoNewsSection() {
  // Data dummy untuk berita Pemko Pekanbaru
  const pemkoNews = [
    {
      id: 1,
      title: "Pemerintah Kota Pekanbaru Luncurkan Program Smart City 2024",
      excerpt: "Walikota Pekanbaru meresmikan program Smart City yang akan mengintegrasikan teknologi digital dalam pelayanan publik untuk meningkatkan kualitas hidup masyarakat.",
      date: "2024-01-15",
      category: "Smart City",
      image: "/api/placeholder/400/250",
      link: "https://pekanbaru.go.id/berita/smart-city-2024"
    },
    {
      id: 2,
      title: "Mal Pelayanan Publik Kota Pekanbaru Raih Penghargaan Terbaik",
      excerpt: "Mal Pelayanan Publik Kota Pekanbaru meraih penghargaan sebagai pelayanan publik terbaik tingkat provinsi berkat inovasi dan kualitas layanan yang prima.",
      date: "2024-01-12",
      category: "Pelayanan Publik",
      image: "/api/placeholder/400/250",
      link: "https://pekanbaru.go.id/berita/mal-pelayanan-terbaik"
    },
    {
      id: 3,
      title: "Festival Budaya Melayu Pekanbaru 2024 Siap Digelar",
      excerpt: "Pemerintah Kota Pekanbaru akan menggelar Festival Budaya Melayu 2024 untuk melestarikan dan mempromosikan kekayaan budaya lokal kepada generasi muda.",
      date: "2024-01-10",
      category: "Budaya",
      image: "/api/placeholder/400/250",
      link: "https://pekanbaru.go.id/berita/festival-budaya-melayu"
    },
    {
      id: 4,
      title: "Pembangunan Infrastruktur Jalan Tol Pekanbaru-Dumai Dipercepat",
      excerpt: "Proyek strategis pembangunan jalan tol Pekanbaru-Dumai memasuki fase percepatan untuk mendukung konektivitas dan pertumbuhan ekonomi daerah.",
      date: "2024-01-08",
      category: "Infrastruktur",
      image: "/api/placeholder/400/250",
      link: "https://pekanbaru.go.id/berita/tol-pekanbaru-dumai"
    },
    {
      id: 5,
      title: "Program Beasiswa Unggulan Kota Pekanbaru Dibuka untuk Mahasiswa Berprestasi",
      excerpt: "Pemerintah Kota Pekanbaru membuka program beasiswa unggulan untuk mendukung pendidikan tinggi mahasiswa berprestasi dari keluarga kurang mampu.",
      date: "2024-01-05",
      category: "Pendidikan",
      image: "/api/placeholder/400/250",
      link: "https://pekanbaru.go.id/berita/beasiswa-unggulan"
    },
    {
      id: 6,
      title: "Revitalisasi Taman Kota untuk Ruang Terbuka Hijau yang Lebih Asri",
      excerpt: "Program revitalisasi taman kota dilakukan untuk menciptakan ruang terbuka hijau yang lebih asri dan nyaman bagi warga Pekanbaru.",
      date: "2024-01-03",
      category: "Lingkungan",
      image: "/api/placeholder/400/250",
      link: "https://pekanbaru.go.id/berita/revitalisasi-taman"
    }
  ];

  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      'Smart City': 'bg-blue-100 text-blue-800',
      'Pelayanan Publik': 'bg-green-100 text-green-800',
      'Budaya': 'bg-purple-100 text-purple-800',
      'Infrastruktur': 'bg-orange-100 text-orange-800',
      'Pendidikan': 'bg-indigo-100 text-indigo-800',
      'Lingkungan': 'bg-emerald-100 text-emerald-800'
    };
    return colors[category] || 'bg-gray-100 text-gray-800';
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('id-ID', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium mb-4">
            <span className="w-2 h-2 bg-blue-600 rounded-full mr-2"></span>
            Berita Pemko
          </div>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Berita Terkini Pemerintah Kota Pekanbaru
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Ikuti perkembangan terbaru dan program-program inovatif Pemerintah Kota Pekanbaru 
            untuk kemajuan dan kesejahteraan masyarakat
          </p>
        </div>

        {/* News Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {pemkoNews.map((news) => (
            <article key={news.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 group">
              {/* Image */}
              <div className="relative h-48 bg-gradient-to-br from-blue-500 to-blue-600 overflow-hidden">
                <div className="absolute inset-0 bg-black bg-opacity-20"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-white text-center">
                    <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-2">
                      <ExternalLink className="w-8 h-8" />
                    </div>
                    <p className="text-sm font-medium">Berita Pemko</p>
                  </div>
                </div>
                <div className="absolute top-4 left-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getCategoryColor(news.category)}`}>
                    {news.category}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex items-center text-sm text-gray-500 mb-3">
                  <Calendar className="w-4 h-4 mr-2" />
                  <span>{formatDate(news.date)}</span>
                </div>
                
                <h3 className="text-lg font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors">
                  {news.title}
                </h3>
                
                <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3">
                  {news.excerpt}
                </p>
                
                <a 
                  href={news.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium text-sm group-hover:translate-x-1 transition-all duration-200"
                >
                  Baca Selengkapnya
                  <ArrowRight className="w-4 h-4 ml-1" />
                </a>
              </div>
            </article>
          ))}
        </div>

        {/* CTA Button */}
        <div className="text-center">
          <a 
            href="https://pekanbaru.go.id/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-8 py-4 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-all duration-200 shadow-lg hover:shadow-xl group"
          >
            <ExternalLink className="w-5 h-5 mr-2" />
            Kunjungi Portal Resmi Pekanbaru.go.id
            <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>
      </div>
    </section>
  );
}