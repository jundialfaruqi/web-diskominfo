import { Phone, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-white py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo dan Deskripsi */}
          <div>
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mr-3">
                <span className="text-white font-bold text-xl">DK</span>
              </div>
              <div>
                <h3 className="font-bold text-lg">Diskominfotik</h3>
                <p className="text-sm text-gray-300">Kota Pekanbaru</p>
              </div>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed">
              Melayani masyarakat dengan teknologi informasi terdepan untuk kemajuan Kota Pekanbaru yang lebih baik.
            </p>
          </div>
          
          {/* Link Penting */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Link Penting</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-300 hover:text-blue-400 transition-colors text-sm">
                  Layanan Online
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-blue-400 transition-colors text-sm">
                  Informasi Publik
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-blue-400 transition-colors text-sm">
                  Pengumuman
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-blue-400 transition-colors text-sm">
                  Berita Terkini
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-blue-400 transition-colors text-sm">
                  Kontak Kami
                </a>
              </li>
            </ul>
          </div>
          
          {/* Layanan */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Layanan Unggulan</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-300 hover:text-blue-400 transition-colors text-sm">
                  E-Government
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-blue-400 transition-colors text-sm">
                  Smart City
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-blue-400 transition-colors text-sm">
                  Data & Statistik
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-blue-400 transition-colors text-sm">
                  Infrastruktur IT
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-blue-400 transition-colors text-sm">
                  Keamanan Siber
                </a>
              </li>
            </ul>
          </div>
          
          {/* Social Media & Kontak */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Ikuti Kami</h4>
            <div className="flex space-x-4 mb-6">
              <a href="#" className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors">
                <svg className="w-5 h-5 fill-white" viewBox="0 0 24 24">
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                </svg>
              </a>
              <a href="#" className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors">
                <svg className="w-5 h-5 fill-white" viewBox="0 0 24 24">
                  <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z"/>
                </svg>
              </a>
              <a href="#" className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors">
                <svg className="w-5 h-5 fill-white" viewBox="0 0 24 24">
                  <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24.009c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641.001 12.017.001z"/>
                </svg>
              </a>
              <a href="#" className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors">
                <svg className="w-5 h-5 fill-white" viewBox="0 0 24 24">
                  <path d="M12.036 6.803c-2.871 0-5.197 2.325-5.197 5.196s2.326 5.196 5.197 5.196 5.197-2.325 5.197-5.196-2.326-5.196-5.197-5.196zm0 8.568c-1.859 0-3.372-1.513-3.372-3.372s1.513-3.372 3.372-3.372 3.372 1.513 3.372 3.372-1.513 3.372-3.372 3.372zm6.61-8.789c0 .67-.544 1.214-1.214 1.214s-1.214-.544-1.214-1.214.544-1.214 1.214-1.214 1.214.544 1.214 1.214zm3.439 1.232c-.077-1.626-.448-3.067-1.638-4.257-1.19-1.19-2.631-1.561-4.257-1.638-1.678-.095-6.708-.095-8.386 0-1.626.077-3.067.448-4.257 1.638-1.19 1.19-1.561 2.631-1.638 4.257-.095 1.678-.095 6.708 0 8.386.077 1.626.448 3.067 1.638 4.257 1.19 1.19 2.631 1.561 4.257 1.638 1.678.095 6.708.095 8.386 0 1.626-.077 3.067-.448 4.257-1.638 1.19-1.19 1.561-2.631 1.638-4.257.095-1.678.095-6.708 0-8.386zm-2.162 10.185c-.359.9-.896 1.437-1.796 1.796-1.243.493-4.191.379-5.563.379s-4.32.114-5.563-.379c-.9-.359-1.437-.896-1.796-1.796-.493-1.243-.379-4.191-.379-5.563s-.114-4.32.379-5.563c.359-.9.896-1.437 1.796-1.796 1.243-.493 4.191-.379 5.563-.379s4.32-.114 5.563.379c.9.359 1.437.896 1.796 1.796.493 1.243.379 4.191.379 5.563s.114 4.32-.379 5.563z"/>
                </svg>
              </a>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center text-sm text-gray-300">
                <Phone className="w-4 h-4 mr-2" />
                <span>(0761) 123-4567</span>
              </div>
              <div className="flex items-center text-sm text-gray-300">
                <Mail className="w-4 h-4 mr-2" />
                <span>info@diskominfotik.pekanbaru.go.id</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Divider */}
        <div className="border-t border-gray-700 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-sm text-gray-400 mb-4 md:mb-0">
              <p>&copy; 2024 Dinas Komunikasi Informatika dan Statistik Kota Pekanbaru. All rights reserved.</p>
            </div>
            <div className="flex space-x-6 text-sm">
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                Terms of Service
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                Disclaimer
              </a>
            </div>
          </div>
          

        </div>
      </div>
    </footer>
  );
}