'use client';

import Link from 'next/link';
import { FaGithub, FaTwitter, FaInstagram, FaFacebook, FaYoutube } from 'react-icons/fa';
import { FaFilm, FaHeart } from 'react-icons/fa6';

export function Footer() {
  const currentYear = new Date().getFullYear();

  const links = {
    explorar: [
      { label: 'Películas Populares', href: '/movie' },
      { label: 'Series Populares', href: '/tv' },
      { label: 'Películas Mejor Valoradas', href: '/movie?sort=top_rated' },
      { label: 'Series Mejor Valoradas', href: '/tv?sort=top_rated' },
    ],
    recursos: [
      { label: 'API de TMDB', href: 'https://www.themoviedb.org/', external: true },
      { label: 'Documentación', href: 'https://developers.themoviedb.org/', external: true },
      { label: 'Términos de Uso', href: '#' },
      { label: 'Política de Privacidad', href: '#' },
    ],
    comunidad: [
      { label: 'GitHub', href: 'https://github.com/jorge-73/movies-app', external: true },
      { label: 'Reportar Error', href: 'https://github.com/jorge-73/movies-app/issues', external: true },
      { label: 'Sugerencias', href: 'mailto:jorge_ap_73@hotmail.com' },
    ],
  };

  return (
    <footer className="bg-cinema-black border-t border-gray-800 mt-auto">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <FaFilm className="text-red-600 text-2xl" />
              <span className="text-2xl font-bold text-white">MovieDB</span>
            </Link>
            <p className="text-gray-400 text-sm">
              Tu plataforma de películas y series favorita. Descubre el mejor contenido de entretenimiento.
            </p>
            <div className="flex gap-4">
              <a
                href="https://github.com/jorge-73/movies-app"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="GitHub"
              >
                <FaGithub className="text-xl" />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="Twitter"
              >
                <FaTwitter className="text-xl" />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="Instagram"
              >
                <FaInstagram className="text-xl" />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="Facebook"
              >
                <FaFacebook className="text-xl" />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="YouTube"
              >
                <FaYoutube className="text-xl" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Explorar</h3>
            <ul className="space-y-2">
              {links.explorar.map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-red-500 transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Recursos</h3>
            <ul className="space-y-2">
              {links.recursos.map((link, index) => (
                <li key={index}>
                  {link.external ? (
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-red-500 transition-colors text-sm"
                    >
                      {link.label}
                    </a>
                  ) : (
                    <Link
                      href={link.href}
                      className="text-gray-400 hover:text-red-500 transition-colors text-sm"
                    >
                      {link.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Comunidad</h3>
            <ul className="space-y-2">
              {links.comunidad.map((link, index) => (
                <li key={index}>
                  {link.href.startsWith('http') || link.href.startsWith('mailto') ? (
                    <a
                      href={link.href}
                      target={link.href.startsWith('http') ? '_blank' : undefined}
                      rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                      className="text-gray-400 hover:text-red-500 transition-colors text-sm"
                    >
                      {link.label}
                    </a>
                  ) : (
                    <Link
                      href={link.href}
                      className="text-gray-400 hover:text-red-500 transition-colors text-sm"
                    >
                      {link.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-400 text-sm">
            © {currentYear} MovieDB. Todos los derechos reservados.
          </p>
          <p className="text-gray-400 text-sm flex items-center gap-1">
            Hecho con <FaHeart className="text-red-500 text-xs" /> usando TMDB API
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;