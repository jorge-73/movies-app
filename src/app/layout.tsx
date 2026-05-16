import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Toaster } from 'react-hot-toast';
import { Footer } from '@/components/layout/Footer';
import './globals.css';

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: {
    default: 'MovieDB - Películas y Series Online',
    template: '%s | MovieDB',
  },
  description: 'Descubre las mejores películas y series de TV. Explora trailers, detalles, recomendaciones y más en MovieDB.',
  keywords: ['películas', 'series', 'tv', 'cine', 'streaming', 'tmdb', 'recomendaciones'],
  authors: [{ name: 'MovieDB Team' }],
  creator: 'MovieDB',
  publisher: 'MovieDB',
  metadataBase: new URL('https://moviedb.vercel.app'),
  openGraph: {
    type: 'website',
    locale: 'es_ES',
    url: 'https://moviedb.vercel.app',
    siteName: 'MovieDB',
    title: 'MovieDB - Películas y Series Online',
    description: 'Descubre las mejores películas y series de TV. Explora trailers, detalles, recomendaciones y más.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'MovieDB',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MovieDB - Películas y Series Online',
    description: 'Descubre las mejores películas y series de TV.',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" data-theme="cinema" className={inter.variable}>
      <head>
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="preconnect" href="https://image.tmdb.org" />
        <link rel="dns-prefetch" href="https://image.tmdb.org" />
      </head>
      <body className="font-sans bg-cinema-black text-white min-h-screen flex flex-col">
        {children}
        <Footer />
        <Toaster
          position="bottom-center"
          reverseOrder={false}
          toastOptions={{
            duration: 3000,
            style: {
              background: '#1f1f1f',
              color: '#fff',
              border: '1px solid #333',
            },
            success: {
              iconTheme: {
                primary: '#22c55e',
                secondary: '#fff',
              },
            },
            error: {
              iconTheme: {
                primary: '#ef4444',
                secondary: '#fff',
              },
            },
          }}
        />
      </body>
    </html>
  );
}