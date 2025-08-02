import { ArrowRight, Users, Globe, Shield, Zap } from 'lucide-react';

export default function HeroSection() {
  return (
    <section className="relative min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900">
      {/* Deep Blue Background Elements */}
      <div className="absolute inset-0">
        {/* Enhanced Dark Blue Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-tr from-blue-800/40 via-transparent to-indigo-700/30"></div>
        <div className="absolute inset-0 bg-gradient-to-bl from-transparent via-blue-700/20 to-slate-800/35"></div>
        
        {/* Colorful Floating geometric shapes */}
        <div className="absolute top-20 left-10 w-32 h-32 bg-blue-400/20 rounded-full blur-xl animate-pulse shadow-2xl shadow-blue-500/30"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-cyan-400/25 rounded-full blur-lg animate-bounce shadow-xl shadow-cyan-400/40"></div>
        <div className="absolute bottom-40 left-1/4 w-40 h-40 bg-indigo-500/20 rounded-full blur-2xl animate-pulse delay-1000 shadow-2xl shadow-indigo-500/30"></div>
        <div className="absolute bottom-20 right-1/3 w-28 h-28 bg-blue-300/25 rounded-full blur-xl animate-bounce delay-500 shadow-xl shadow-blue-300/40"></div>
        
        {/* Additional Blue Accent Elements */}
        <div className="absolute top-1/3 left-1/2 w-20 h-20 bg-sky-400/15 rounded-full blur-lg animate-pulse delay-700"></div>
        <div className="absolute top-2/3 right-1/4 w-36 h-36 bg-blue-600/10 rounded-full blur-2xl animate-bounce delay-300"></div>
        
        {/* Blue Geometric Patterns */}
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-10 left-1/3 w-2 h-20 bg-blue-400/30 rotate-45 blur-sm"></div>
          <div className="absolute bottom-32 right-1/5 w-3 h-24 bg-cyan-400/25 rotate-12 blur-sm"></div>
          <div className="absolute top-1/2 left-10 w-1 h-16 bg-indigo-400/35 -rotate-12 blur-sm"></div>
        </div>
        
        {/* Enhanced Grid pattern overlay with blue tint */}
        <div className="absolute inset-0 opacity-30">
          <div className="w-full h-full" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%2360a5fa' fill-opacity='0.08'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }}></div>
        </div>
        
        {/* Blue Light Rays */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-blue-400 via-transparent to-transparent"></div>
          <div className="absolute top-0 right-1/3 w-px h-full bg-gradient-to-b from-cyan-400 via-transparent to-transparent"></div>
          <div className="absolute top-0 left-2/3 w-px h-full bg-gradient-to-b from-indigo-400 via-transparent to-transparent"></div>
        </div>
      </div>
      
      {/* Content */}
       <div className="relative z-10 container mx-auto px-4 py-12 lg:py-16">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="text-white transition-all duration-1000 opacity-100 translate-y-0">
              {/* Logo and Badge */}
              <div className="flex items-center mb-6">
                <div className="relative">
                  <div className="w-20 h-20 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl flex items-center justify-center shadow-2xl">
                    <Globe className="h-10 w-10 text-white" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                    <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                  </div>
                </div>
                <div className="ml-4">
                  <div className="bg-blue-500/20 backdrop-blur-sm px-3 py-1 rounded-full text-sm text-blue-200 border border-blue-400/30">
                    🏛️ Pemerintah Kota Pekanbaru
                  </div>
                </div>
              </div>
              
              <h1 className="text-2xl lg:text-3xl font-bold mb-4 text-blue-200">
                Dinas Komunikasi dan Informatika
              </h1>
              
              <h2 className="text-4xl lg:text-6xl font-bold mb-6 leading-tight">
                <span className="bg-gradient-to-r from-white via-blue-100 to-blue-200 bg-clip-text text-transparent">
                  Smart City
                </span>
                <br />
                <span className="bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400 bg-clip-text text-transparent">
                  Pekanbaru
                </span>
              </h2>
              
              <p className="text-lg lg:text-xl text-slate-300 mb-8 leading-relaxed">
                Membangun ekosistem digital yang terintegrasi untuk mewujudkan 
                <span className="text-yellow-400 font-semibold"> pelayanan publik yang cerdas</span>, 
                transparan, dan berkelanjutan di era digital.
              </p>

              {/* Feature highlights */}
              <div className="flex flex-wrap gap-4 mb-8">
                <div className="flex items-center bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20">
                  <Zap className="h-4 w-4 text-green-400 mr-2" />
                  <span className="text-sm text-white">24/7 Online</span>
                </div>
                <div className="flex items-center bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20">
                  <Shield className="h-4 w-4 text-blue-400 mr-2" />
                  <span className="text-sm text-white">Aman & Terpercaya</span>
                </div>
                <div className="flex items-center bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20">
                  <Users className="h-4 w-4 text-purple-400 mr-2" />
                  <span className="text-sm text-white">1.1M+ Warga</span>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <button className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white font-semibold px-8 py-4 text-lg shadow-2xl transform hover:scale-105 transition-all duration-300 rounded-full flex items-center justify-center">
                  <Globe className="mr-2 h-5 w-5" />
                  Portal Layanan
                  <ArrowRight className="ml-2 h-5 w-5" />
                </button>
                <button className="border-2 border-white/30 text-white hover:bg-white hover:text-slate-900 px-8 py-4 text-lg backdrop-blur-sm bg-white/10 transform hover:scale-105 transition-all duration-300 rounded-full flex items-center justify-center">
                  <Shield className="mr-2 h-5 w-5" />
                  Info Publik
                </button>
              </div>
            </div>

            {/* Right Content - Visual Elements */}
            <div className="relative transition-all duration-1000 delay-300 opacity-100 translate-x-0">
              {/* Main visual card */}
              <div className="relative">
                <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/20 shadow-2xl">
                  <div className="text-center mb-6">
                    <h3 className="text-2xl font-bold text-white mb-2">Dashboard Smart City</h3>
                    <p className="text-slate-300">Real-time monitoring & analytics</p>
                  </div>
                  
                  {/* Stats Grid */}
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="bg-gradient-to-br from-blue-500/20 to-blue-600/20 rounded-2xl p-4 border border-blue-400/30">
                      <div className="text-3xl font-bold text-blue-300 mb-1">12</div>
                      <div className="text-sm text-slate-300">Kecamatan</div>
                    </div>
                    <div className="bg-gradient-to-br from-green-500/20 to-green-600/20 rounded-2xl p-4 border border-green-400/30">
                      <div className="text-3xl font-bold text-green-300 mb-1">98%</div>
                      <div className="text-sm text-slate-300">Uptime</div>
                    </div>
                    <div className="bg-gradient-to-br from-purple-500/20 to-purple-600/20 rounded-2xl p-4 border border-purple-400/30">
                      <div className="text-3xl font-bold text-purple-300 mb-1">1.1M+</div>
                      <div className="text-sm text-slate-300">Penduduk</div>
                    </div>
                    <div className="bg-gradient-to-br from-orange-500/20 to-orange-600/20 rounded-2xl p-4 border border-orange-400/30">
                      <div className="text-3xl font-bold text-orange-300 mb-1">50+</div>
                      <div className="text-sm text-slate-300">Layanan</div>
                    </div>
                  </div>
                  
                  {/* Status indicator */}
                  <div className="flex items-center justify-center">
                    <div className="flex items-center bg-green-500/20 px-4 py-2 rounded-full border border-green-400/30">
                      <div className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></div>
                      <span className="text-green-300 text-sm font-medium">Semua Sistem Aktif</span>
                    </div>
                  </div>
                </div>
                
                {/* Floating elements */}
                <div className="absolute -top-4 -right-4 w-8 h-8 bg-yellow-500 rounded-full animate-bounce"></div>
                <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-blue-500 rounded-full animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}