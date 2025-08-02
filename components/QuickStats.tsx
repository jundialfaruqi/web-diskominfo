export default function QuickStats() {
  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
          <div className="p-6">
            <div className="text-3xl font-bold text-blue-600 mb-2">25+</div>
            <div className="text-gray-600">Layanan Digital</div>
          </div>
          <div className="p-6">
            <div className="text-3xl font-bold text-blue-600 mb-2">1.2M+</div>
            <div className="text-gray-600">Penduduk Terlayani</div>
          </div>
          <div className="p-6">
            <div className="text-3xl font-bold text-blue-600 mb-2">12</div>
            <div className="text-gray-600">Kecamatan</div>
          </div>
          <div className="p-6">
            <div className="text-3xl font-bold text-blue-600 mb-2">24/7</div>
            <div className="text-gray-600">Layanan Online</div>
          </div>
        </div>
      </div>
    </section>
  );
}