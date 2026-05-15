'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { FaSearch, FaBell, FaUser, FaFilm, FaTv, FaHome, FaSignInAlt, FaUserPlus } from 'react-icons/fa';
import { IoIosArrowDown } from 'react-icons/io';

const navLinks = [
  { href: '/', label: 'Inicio', icon: FaHome },
  { href: '/movies', label: 'Películas', icon: FaFilm },
  { href: '/tv', label: 'Series', icon: FaTv },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearch = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/search?q=${encodeURIComponent(searchQuery)}`;
    }
  }, [searchQuery]);

  return (
    <nav
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        scrolled
          ? 'bg-gradient-to-b from-black/95 via-black/90 to-black/80 backdrop-blur-md shadow-lg'
          : 'bg-gradient-to-b from-black/80 to-transparent'
      )}
    >
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          <div className="flex items-center gap-8">
            <Link
              href="/"
              className="text-2xl md:text-3xl font-bold text-red-600 tracking-tight"
            >
              MovieDB
            </Link>

            <div className="hidden lg:flex items-center gap-6">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    'text-sm font-medium transition-colors duration-200',
                    pathname === link.href
                      ? 'text-white font-semibold'
                      : 'text-gray-300 hover:text-white'
                  )}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          <div className="hidden md:flex items-center gap-6">
            {searchOpen ? (
              <form onSubmit={handleSearch} className="relative">
                <input
                  type="text"
                  placeholder="Buscar películas, series..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  autoFocus
                  className={cn(
                    'w-64 px-4 py-2 pl-10 rounded-full',
                    'bg-gray-800/80 border border-gray-600 text-white',
                    'placeholder-gray-400 focus:outline-none focus:border-red-500',
                    'transition-all duration-300'
                  )}
                  onBlur={() => !searchQuery && setSearchOpen(false)}
                />
                <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              </form>
            ) : (
              <button
                onClick={() => setSearchOpen(true)}
                className="text-gray-300 hover:text-white transition-colors"
                aria-label="Buscar"
              >
                <FaSearch className="text-lg" />
              </button>
            )}

            <button
              className="text-gray-300 hover:text-white transition-colors"
              aria-label="Notificaciones"
            >
              <FaBell className="text-lg" />
            </button>

            <div className="flex items-center gap-2 cursor-pointer group">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-red-600 to-red-800 flex items-center justify-center">
                <FaUser className="text-white text-sm" />
              </div>
              <IoIosArrowDown className="text-gray-400 text-xs group-hover:rotate-180 transition-transform" />
            </div>
          </div>

          <button
            className="md:hidden text-white text-xl"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Menu"
          >
            {mobileMenuOpen ? '✕' : '☰'}
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-800">
            <div className="flex flex-col gap-4">
              {searchOpen ? (
                <form onSubmit={handleSearch} className="relative">
                  <input
                    type="text"
                    placeholder="Buscar..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full px-4 py-2 pl-10 rounded-full bg-gray-800 border border-gray-600 text-white"
                  />
                  <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                </form>
              ) : (
                <button
                  onClick={() => setSearchOpen(true)}
                  className="flex items-center gap-2 text-gray-300"
                >
                  <FaSearch />
                  <span>Buscar</span>
                </button>
              )}

              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    'text-gray-300 hover:text-white transition-colors',
                    pathname === link.href && 'text-white font-semibold'
                  )}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}

              <div className="flex items-center gap-4 pt-2 border-t border-gray-800">
                <Link
                  href="/login"
                  className="flex items-center gap-2 text-gray-300 hover:text-white"
                >
                  <FaSignInAlt />
                  <span>Iniciar sesión</span>
                </Link>
                <Link
                  href="/register"
                  className="flex items-center gap-2 text-gray-300 hover:text-white"
                >
                  <FaUserPlus />
                  <span>Registrarse</span>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;