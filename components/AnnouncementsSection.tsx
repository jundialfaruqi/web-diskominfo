export default function AnnouncementsSection() {
  return (
    <section className="py-16 bg-yellow-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Pengumuman Penting
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Informasi penting dan mendesak untuk masyarakat Kota Pekanbaru
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Urgent Announcement */}
          <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-lg shadow-md">
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <span className="inline-flex items-center justify-center w-8 h-8 bg-red-100 rounded-full">
                  <span className="text-red-600 text-lg">⚠️</span>
                </span>
              </div>
              <div className="ml-4">
                <div className="flex items-center mb-2">
                  <span className="bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded-full mr-2">
                    MENDESAK
                  </span>
                  <span className="text-sm text-gray-500">20 Januari 2024</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  Pemadaman Listrik Terjadwal Area Pusat Kota
                </h3>
                <p className="text-gray-600 text-sm mb-3">
                  Akan dilakukan pemadaman listrik terjadwal pada tanggal 25 Januari 2024 pukul 08.00-16.00 WIB di area pusat kota untuk maintenance infrastruktur.
                </p>
                <button className="text-red-600 font-medium text-sm hover:underline">
                  Baca Selengkapnya →
                </button>
              </div>
            </div>
          </div>

          {/* Important Notice */}
          <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-lg shadow-md">
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <span className="inline-flex items-center justify-center w-8 h-8 bg-blue-100 rounded-full">
                  <span className="text-blue-600 text-lg">📢</span>
                </span>
              </div>
              <div className="ml-4">
                <div className="flex items-center mb-2">
                  <span className="bg-blue-500 text-white text-xs font-semibold px-2 py-1 rounded-full mr-2">
                    PENTING
                  </span>
                  <span className="text-sm text-gray-500">18 Januari 2024</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  Perpanjangan Masa Berlaku KTP Elektronik
                </h3>
                <p className="text-gray-600 text-sm mb-3">
                  Pemerintah Kota Pekanbaru mengumumkan perpanjangan otomatis masa berlaku e-KTP hingga 31 Desember 2024 untuk semua warga.
                </p>
                <button className="text-blue-600 font-medium text-sm hover:underline">
                  Baca Selengkapnya →
                </button>
              </div>
            </div>
          </div>

          {/* Service Update */}
          <div className="bg-green-50 border-l-4 border-green-500 p-6 rounded-lg shadow-md">
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <span className="inline-flex items-center justify-center w-8 h-8 bg-green-100 rounded-full">
                  <span className="text-green-600 text-lg">🔄</span>
                </span>
              </div>
              <div className="ml-4">
                <div className="flex items-center mb-2">
                  <span className="bg-green-500 text-white text-xs font-semibold px-2 py-1 rounded-full mr-2">
                    UPDATE
                  </span>
                  <span className="text-sm text-gray-500">16 Januari 2024</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  Maintenance Sistem Layanan Online
                </h3>
                <p className="text-gray-600 text-sm mb-3">
                  Sistem layanan online akan mengalami maintenance pada Minggu, 21 Januari 2024 pukul 01.00-05.00 WIB. Mohon maaf atas ketidaknyamanannya.
                </p>
                <button className="text-green-600 font-medium text-sm hover:underline">
                  Baca Selengkapnya →
                </button>
              </div>
            </div>
          </div>

          {/* General Info */}
          <div className="bg-purple-50 border-l-4 border-purple-500 p-6 rounded-lg shadow-md">
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <span className="inline-flex items-center justify-center w-8 h-8 bg-purple-100 rounded-full">
                  <span className="text-purple-600 text-lg">📋</span>
                </span>
              </div>
              <div className="ml-4">
                <div className="flex items-center mb-2">
                  <span className="bg-purple-500 text-white text-xs font-semibold px-2 py-1 rounded-full mr-2">
                    INFO
                  </span>
                  <span className="text-sm text-gray-500">15 Januari 2024</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  Pendaftaran Program Beasiswa Mahasiswa Berprestasi
                </h3>
                <p className="text-gray-600 text-sm mb-3">
                  Dibuka pendaftaran beasiswa untuk mahasiswa berprestasi asal Kota Pekanbaru. Pendaftaran dibuka hingga 31 Januari 2024.
                </p>
                <button className="text-purple-600 font-medium text-sm hover:underline">
                  Baca Selengkapnya →
                </button>
              </div>
            </div>
          </div>
        </div>
        
        {/* View All Announcements Button */}
        <div className="text-center mt-8">
          <button className="bg-yellow-500 hover:bg-yellow-600 text-white px-8 py-3 rounded-lg font-semibold transition-colors">
            Lihat Semua Pengumuman
          </button>
        </div>
      </div>
    </section>
  );
}