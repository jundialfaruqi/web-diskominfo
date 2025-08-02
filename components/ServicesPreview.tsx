import { ArrowRight, Users, Globe, Shield, MapPin, Clock, CreditCard, Briefcase, Building, GraduationCap, Heart, FileText, XCircle } from 'lucide-react';

export default function ServicesPreview() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Layanan Publik Online
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-6">
            Akses mudah dan cepat untuk berbagai layanan pemerintahan Kota Pekanbaru
          </p>
          
          {/* Service Status Summary */}
          <div className="flex justify-center items-center space-x-6 mb-8">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">6</div>
              <div className="text-sm text-gray-600">Layanan Online</div>
            </div>
            <div className="w-px h-12 bg-gray-300"></div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">8</div>
              <div className="text-sm text-gray-600">Total Layanan</div>
            </div>
            <div className="w-px h-12 bg-gray-300"></div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">24/7</div>
              <div className="text-sm text-gray-600">Akses Portal</div>
            </div>
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {/* e-KTP */}
          <div className="group cursor-pointer transition-all duration-300 hover:shadow-lg border-green-200 hover:border-green-300 bg-white rounded-lg border">
            <div className="p-6 pb-3">
              <div className="flex items-start justify-between">
                <div className="p-3 bg-blue-50 rounded-lg group-hover:bg-blue-100 transition-colors">
                  <div className="text-blue-600">
                    <Users className="h-8 w-8" />
                  </div>
                </div>
                <div className="bg-green-100 text-green-800 hover:bg-green-100 px-2 py-1 rounded-full text-xs font-medium flex items-center">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-1"></div>
                  Online
                </div>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors mt-4 mb-2">
                e-KTP
              </h3>
              <p className="text-sm text-gray-600 line-clamp-2">
                Permohonan dan perpanjangan Kartu Tanda Penduduk elektronik
              </p>
            </div>
            <div className="px-6 pb-6">
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                  Kependudukan
                </span>
                <button className="text-blue-600 hover:text-blue-700 p-0 h-auto">
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Surat Izin Usaha */}
          <div className="group cursor-pointer transition-all duration-300 hover:shadow-lg border-green-200 hover:border-green-300 bg-white rounded-lg border">
            <div className="p-6 pb-3">
              <div className="flex items-start justify-between">
                <div className="p-3 bg-blue-50 rounded-lg group-hover:bg-blue-100 transition-colors">
                  <div className="text-blue-600">
                    <Shield className="h-8 w-8" />
                  </div>
                </div>
                <div className="bg-green-100 text-green-800 hover:bg-green-100 px-2 py-1 rounded-full text-xs font-medium flex items-center">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-1"></div>
                  Online
                </div>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors mt-4 mb-2">
                Surat Izin Usaha
              </h3>
              <p className="text-sm text-gray-600 line-clamp-2">
                Pengurusan izin usaha dan perdagangan online
              </p>
            </div>
            <div className="px-6 pb-6">
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                  Perizinan
                </span>
                <button className="text-blue-600 hover:text-blue-700 p-0 h-auto">
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Akta Kelahiran */}
          <div className="group cursor-pointer transition-all duration-300 hover:shadow-lg border-green-200 hover:border-green-300 bg-white rounded-lg border">
            <div className="p-6 pb-3">
              <div className="flex items-start justify-between">
                <div className="p-3 bg-blue-50 rounded-lg group-hover:bg-blue-100 transition-colors">
                  <div className="text-blue-600">
                    <Users className="h-8 w-8" />
                  </div>
                </div>
                <div className="bg-green-100 text-green-800 hover:bg-green-100 px-2 py-1 rounded-full text-xs font-medium flex items-center">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-1"></div>
                  Online
                </div>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors mt-4 mb-2">
                Akta Kelahiran
              </h3>
              <p className="text-sm text-gray-600 line-clamp-2">
                Permohonan akta kelahiran dan surat keterangan lahir
              </p>
            </div>
            <div className="px-6 pb-6">
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                  Kependudukan
                </span>
                <button className="text-blue-600 hover:text-blue-700 p-0 h-auto">
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>

          {/* IMB */}
          <div className="group cursor-pointer transition-all duration-300 hover:shadow-lg border-yellow-200 hover:border-yellow-300 bg-white rounded-lg border">
            <div className="p-6 pb-3">
              <div className="flex items-start justify-between">
                <div className="p-3 bg-blue-50 rounded-lg group-hover:bg-blue-100 transition-colors">
                  <div className="text-blue-600">
                    <Globe className="h-8 w-8" />
                  </div>
                </div>
                <div className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100 px-2 py-1 rounded-full text-xs font-medium flex items-center">
                  <Clock className="h-3 w-3 mr-1" />
                  Maintenance
                </div>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors mt-4 mb-2">
                IMB
              </h3>
              <p className="text-sm text-gray-600 line-clamp-2">
                Izin Mendirikan Bangunan untuk konstruksi dan renovasi
              </p>
            </div>
            <div className="px-6 pb-6">
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                  Perizinan
                </span>
                <button className="text-blue-600 hover:text-blue-700 p-0 h-auto">
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Surat Domisili */}
          <div className="group cursor-pointer transition-all duration-300 hover:shadow-lg border-green-200 hover:border-green-300 bg-white rounded-lg border">
            <div className="p-6 pb-3">
              <div className="flex items-start justify-between">
                <div className="p-3 bg-blue-50 rounded-lg group-hover:bg-blue-100 transition-colors">
                  <div className="text-blue-600">
                    <MapPin className="h-8 w-8" />
                  </div>
                </div>
                <div className="bg-green-100 text-green-800 hover:bg-green-100 px-2 py-1 rounded-full text-xs font-medium flex items-center">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-1"></div>
                  Online
                </div>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors mt-4 mb-2">
                Surat Domisili
              </h3>
              <p className="text-sm text-gray-600 line-clamp-2">
                Surat keterangan domisili usaha dan tempat tinggal
              </p>
            </div>
            <div className="px-6 pb-6">
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                  Kependudukan
                </span>
                <button className="text-blue-600 hover:text-blue-700 p-0 h-auto">
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Legalisir Ijazah */}
          <div className="group cursor-pointer transition-all duration-300 hover:shadow-lg border-red-200 hover:border-red-300 bg-white rounded-lg border">
            <div className="p-6 pb-3">
              <div className="flex items-start justify-between">
                <div className="p-3 bg-blue-50 rounded-lg group-hover:bg-blue-100 transition-colors">
                  <div className="text-blue-600">
                    <GraduationCap className="h-8 w-8" />
                  </div>
                </div>
                <div className="bg-red-100 text-red-800 hover:bg-red-100 px-2 py-1 rounded-full text-xs font-medium flex items-center">
                  <XCircle className="h-3 w-3 mr-1" />
                  Offline
                </div>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors mt-4 mb-2">
                Legalisir Ijazah
              </h3>
              <p className="text-sm text-gray-600 line-clamp-2">
                Legalisir dokumen pendidikan dan sertifikat
              </p>
            </div>
            <div className="px-6 pb-6">
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                  Pendidikan
                </span>
                <button className="text-blue-600 hover:text-blue-700 p-0 h-auto">
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>

          {/* BPJS Kesehatan */}
          <div className="group cursor-pointer transition-all duration-300 hover:shadow-lg border-green-200 hover:border-green-300 bg-white rounded-lg border">
            <div className="p-6 pb-3">
              <div className="flex items-start justify-between">
                <div className="p-3 bg-blue-50 rounded-lg group-hover:bg-blue-100 transition-colors">
                  <div className="text-blue-600">
                    <Heart className="h-8 w-8" />
                  </div>
                </div>
                <div className="bg-green-100 text-green-800 hover:bg-green-100 px-2 py-1 rounded-full text-xs font-medium flex items-center">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-1"></div>
                  Online
                </div>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors mt-4 mb-2">
                BPJS Kesehatan
              </h3>
              <p className="text-sm text-gray-600 line-clamp-2">
                Pendaftaran dan informasi BPJS Kesehatan
              </p>
            </div>
            <div className="px-6 pb-6">
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                  Kesehatan
                </span>
                <button className="text-blue-600 hover:text-blue-700 p-0 h-auto">
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Surat Keterangan */}
          <div className="group cursor-pointer transition-all duration-300 hover:shadow-lg border-red-200 hover:border-red-300 bg-white rounded-lg border">
            <div className="p-6 pb-3">
              <div className="flex items-start justify-between">
                <div className="p-3 bg-blue-50 rounded-lg group-hover:bg-blue-100 transition-colors">
                  <div className="text-blue-600">
                    <FileText className="h-8 w-8" />
                  </div>
                </div>
                <div className="bg-red-100 text-red-800 hover:bg-red-100 px-2 py-1 rounded-full text-xs font-medium flex items-center">
                  <XCircle className="h-3 w-3 mr-1" />
                  Offline
                </div>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors mt-4 mb-2">
                Surat Keterangan
              </h3>
              <p className="text-sm text-gray-600 line-clamp-2">
                Berbagai surat keterangan resmi dari pemerintah
              </p>
            </div>
            <div className="px-6 pb-6">
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                  Administrasi
                </span>
                <button className="text-blue-600 hover:text-blue-700 p-0 h-auto">
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Portal Layanan Terpadu */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white text-center">
          <h3 className="text-2xl font-bold mb-4">Portal Layanan Terpadu</h3>
          <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
            Akses semua layanan pemerintahan dalam satu platform terintegrasi
          </p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <Users className="h-8 w-8 mx-auto mb-2 text-blue-200" />
              <div className="text-sm">Kependudukan</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <Shield className="h-8 w-8 mx-auto mb-2 text-blue-200" />
              <div className="text-sm">Perizinan</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <Heart className="h-8 w-8 mx-auto mb-2 text-blue-200" />
              <div className="text-sm">Kesehatan</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <GraduationCap className="h-8 w-8 mx-auto mb-2 text-blue-200" />
              <div className="text-sm">Pendidikan</div>
            </div>
          </div>
          
          <button className="bg-white text-blue-600 hover:bg-blue-50 px-8 py-3 rounded-full font-semibold transition-colors inline-flex items-center">
            Buka Portal Layanan
            <ArrowRight className="ml-2 h-5 w-5" />
          </button>
        </div>
      </div>
    </section>
  );
}