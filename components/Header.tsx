'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { Search, Menu, X, Globe } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'

const Header = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [language, setLanguage] = useState('ID')
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const navigationItems = [
    { name: 'Beranda', href: '/' },
    { name: 'Profil', href: '/profil' },
    { name: 'Layanan', href: '/layanan' },
    { name: 'Berita', href: '/berita' },
    { name: 'Kontak', href: '/kontak' },
  ]

  const toggleLanguage = () => {
    setLanguage(language === 'ID' ? 'EN' : 'ID')
  }

  return (
    <header className="bg-white shadow-md border-b sticky top-0 z-50">
      

      {/* Main Header */}
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-lg">PKU</span>
            </div>
            <div className="hidden md:block">
              <h1 className="text-lg font-bold text-gray-800 leading-tight">
                DINAS KOMUNIKASI INFORMATIKA
              </h1>
              <p className="text-sm text-gray-600">DAN STATISTIK KOTA PEKANBARU</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navigationItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200 relative group"
              >
                {item.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-200 group-hover:w-full"></span>
              </Link>
            ))}
          </nav>

          {/* Search, Language Switcher, Mobile Menu */}
          <div className="flex items-center space-x-4">
            {/* Search */}
            <div className="relative hidden md:block">
              {isSearchOpen ? (
                <div className="flex items-center">
                  <Input
                    type="text"
                    placeholder="Cari..."
                    className="w-64 pr-10"
                    autoFocus
                  />
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsSearchOpen(false)}
                    className="absolute right-2"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ) : (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsSearchOpen(true)}
                >
                  <Search className="h-4 w-4" />
                </Button>
              )}
            </div>

            {/* Language Switcher */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="flex items-center space-x-1">
                  <Globe className="h-4 w-4" />
                  <span>{language}</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => setLanguage('ID')}>
                  🇮🇩 Bahasa Indonesia
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setLanguage('EN')}>
                  🇺🇸 English
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Mobile Menu */}
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="sm" className="lg:hidden">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-80">
                <SheetHeader>
                  <SheetTitle>Menu Navigasi</SheetTitle>
                </SheetHeader>
                <div className="mt-6 space-y-4">
                  {/* Mobile Search */}
                  <div className="relative px-4">
                    <Input
                      type="text"
                      placeholder="Cari..."
                      className="w-full pr-10"
                    />
                    <Search className="absolute right-7 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  </div>
                  
                  {/* Mobile Navigation */}
                  <nav className="space-y-2 px-4">
                    {navigationItems.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        className="block py-3 px-4 text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </nav>
                  
                  {/* Mobile Language Switcher */}
                  <div className="pt-4 border-t border-gray-200 px-4">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="outline" className="w-full justify-between">
                          <div className="flex items-center gap-2">
                            <Globe className="h-4 w-4" />
                            <span>{language === 'ID' ? 'Bahasa Indonesia' : 'English'}</span>
                          </div>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="w-full">
                        <DropdownMenuItem onClick={() => setLanguage('ID')}>
                          🇮🇩 Bahasa Indonesia
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setLanguage('EN')}>
                          🇺🇸 English
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header