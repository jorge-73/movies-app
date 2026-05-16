'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Navbar } from '@/components/layout/Navbar';
import { MediaCard } from '@/components/media/MediaCard';
import { getImageUrl, formatDate, formatRuntime, getGenreNames } from '@/lib/utils';
import { Movie, Video } from '@/lib/types';
import { FaPlay, FaStar, FaCalendar, FaClock, FaChevronLeft, FaPlus, FaThumbsUp, FaTimes } from 'react-icons/fa';

interface MovieDetailsClientProps {
  movie: Movie;
  videos: Video[];
}

export function MovieDetailsClient({ movie, videos }: MovieDetailsClientProps) {
  const [showPlayer, setShowPlayer] = useState(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'cast' | 'videos'>('overview');

  const trailer = videos.find(v => v.type === 'Trailer' && v.official) || videos[0];

  return (
    <main className="min-h-screen bg-cinema-black">
      <Navbar />
      
      <div className="pt-20 pb-16">
        <div className="relative h-[70vh] min-h-[400px] w-full overflow-hidden">
          <Image
            src={getImageUrl(movie.backdrop_path, 'large', 'backdrop')}
            alt={movie.title}
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-cinema-black via-cinema-black/50 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-cinema-black/90 to-transparent" />
        </div>

        <div className="container mx-auto px-4 -mt-48 relative z-10">
          <div className="flex flex-col md:flex-row gap-8">
            <div className="flex-shrink-0">
              <div className="relative w-[200px] md:w-[280px] rounded-lg overflow-hidden shadow-2xl">
                <Image
                  src={getImageUrl(movie.poster_path, 'large', 'poster')}
                  alt={movie.title}
                  width={280}
                  height={420}
                  className="w-full h-auto"
                  priority
                />
              </div>
            </div>

            <div className="flex-1">
              <div className="flex items-center gap-4 mb-4">
                <span className="bg-red-600 text-white text-sm font-bold px-3 py-1 rounded">
                  PELÍCULA
                </span>
                {movie.release_date && (
                  <span className="text-gray-300">{movie.release_date.split('-')[0]}</span>
                )}
                {movie.runtime && (
                  <span className="flex items-center gap-1 text-gray-300">
                    <FaClock />
                    {formatRuntime(movie.runtime)}
                  </span>
                )}
                <span className="flex items-center gap-1 text-yellow-400">
                  <FaStar />
                  {movie.vote_average?.toFixed(1)}
                </span>
              </div>

              <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">
                {movie.title}
              </h1>

              {movie.tagline && (
                <p className="text-gray-400 text-lg italic mb-4">&quot;{movie.tagline}&quot;</p>
              )}

              <div className="flex flex-wrap gap-2 mb-6">
                {movie.genres?.map((genre) => (
                  <span
                    key={genre.id}
                    className="px-3 py-1 bg-gray-800 text-gray-300 rounded-full text-sm"
                  >
                    {genre.name}
                  </span>
                ))}
              </div>

              <div className="flex flex-wrap gap-4 mb-8">
                {trailer ? (
                  <button
                    onClick={() => setShowPlayer(true)}
                    className="flex items-center gap-2 px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg font-semibold transition-colors"
                  >
                    <FaPlay />
                    Ver Trailer
                  </button>
                ) : (
                  <span className="text-gray-500">No hay trailer disponible</span>
                )}

                <button className="flex items-center gap-2 px-4 py-3 bg-gray-800 hover:bg-gray-700 text-white rounded-lg transition-colors">
                  <FaPlus />
                  Mi lista
                </button>

                <button className="flex items-center gap-2 px-4 py-3 bg-gray-800 hover:bg-gray-700 text-white rounded-lg transition-colors">
                  <FaThumbsUp />
                  Calificar
                </button>
              </div>

              <div className="border-b border-gray-800 mb-6">
                <div className="flex gap-6">
                  {(['overview', 'cast', 'videos'] as const).map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`pb-3 font-medium transition-colors ${
                        activeTab === tab
                          ? 'text-white border-b-2 border-red-600'
                          : 'text-gray-400 hover:text-white'
                      }`}
                    >
                      {tab === 'overview' && 'Sinopsis'}
                      {tab === 'cast' && 'Reparto'}
                      {tab === 'videos' && 'Videos'}
                    </button>
                  ))}
                </div>
              </div>

              {activeTab === 'overview' && (
                <div className="space-y-4">
                  <p className="text-gray-300 text-lg leading-relaxed">
                    {movie.overview || 'No hay descripción disponible.'}
                  </p>
                  
                  <div className="grid grid-cols-2 gap-4 mt-6">
                    <div>
                      <span className="text-gray-500 block mb-1">Estado</span>
                      <span className="text-white">{movie.status}</span>
                    </div>
                    <div>
                      <span className="text-gray-500 block mb-1">Fecha de Estreno</span>
                      <span className="text-white">{formatDate(movie.release_date)}</span>
                    </div>
                    <div>
                      <span className="text-gray-500 block mb-1">Duración</span>
                      <span className="text-white">{formatRuntime(movie.runtime)}</span>
                    </div>
                    <div>
                      <span className="text-gray-500 block mb-1">Idioma Original</span>
                      <span className="text-white uppercase">{movie.original_language}</span>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'videos' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {videos.map((video) => (
                    <div key={video.id} className="bg-gray-800 rounded-lg p-4">
                      <h4 className="text-white font-medium mb-2">{video.name}</h4>
                      <p className="text-gray-400 text-sm">{video.type}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {showPlayer && trailer && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm">
          <div className="relative w-full max-w-4xl aspect-video mx-4">
            <button
              onClick={() => setShowPlayer(false)}
              className="absolute -top-12 right-0 text-white text-3xl hover:text-gray-300 transition-colors"
            >
              <FaTimes />
            </button>
            <iframe
              src={`https://www.youtube.com/embed/${trailer.key}?autoplay=1`}
              className="w-full h-full rounded-lg"
              allow="autoplay; encrypted-media"
              allowFullScreen
            />
          </div>
        </div>
      )}
    </main>
  );
}

export default MovieDetailsClient;