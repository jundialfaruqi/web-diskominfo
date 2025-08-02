export default function NewsSection() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Berita Terkini
          </h2>
          <p className="text-gray-600">
            Informasi dan berita terbaru dari Dinas Kominfotik Kota Pekanbaru
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <article className="bg-gray-50 rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
            <div className="h-48 bg-gradient-to-r from-blue-400 to-blue-600"></div>
            <div className="p-6">
              <div className="text-sm text-gray-500 mb-2">15 Januari 2024</div>
              <h3 className="text-lg font-semibold mb-2">
                Peluncuran Sistem Informasi Terpadu Kota Pekanbaru
              </h3>
              <p className="text-gray-600 text-sm">
                Sistem baru untuk meningkatkan pelayanan publik...
              </p>
            </div>
          </article>
          
          <article className="bg-gray-50 rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
            <div className="h-48 bg-gradient-to-r from-green-400 to-green-600"></div>
            <div className="p-6">
              <div className="text-sm text-gray-500 mb-2">12 Januari 2024</div>
              <h3 className="text-lg font-semibold mb-2">
                Workshop Digital Literacy untuk UMKM
              </h3>
              <p className="text-gray-600 text-sm">
                Pelatihan literasi digital untuk pelaku usaha...
              </p>
            </div>
          </article>
          
          <article className="bg-gray-50 rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
            <div className="h-48 bg-gradient-to-r from-purple-400 to-purple-600"></div>
            <div className="p-6">
              <div className="text-sm text-gray-500 mb-2">10 Januari 2024</div>
              <h3 className="text-lg font-semibold mb-2">
                Update Data Statistik Kependudukan Q4 2023
              </h3>
              <p className="text-gray-600 text-sm">
                Data terbaru jumlah penduduk dan demografi...
              </p>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}