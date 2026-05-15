'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Navbar } from '@/components/layout/Navbar';
import { getImageUrl, formatDate, getGenreNames } from '@/lib/utils';
import { TVShow, Video } from '@/lib/types';
import { FaPlay, FaStar, FaCalendar, FaFilm, FaPlus, FaThumbsUp, FaUsers } from 'react-icons/fa';

interface TVShowDetailsClientProps {
  serie: TVShow;
  videos: Video[];
}

export function TVShowDetailsClient({ serie, videos }: TVShowDetailsClientProps) {
  const [showPlayer, setShowPlayer] = useState(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'seasons' | 'videos'>('overview');

  const trailer = videos.find(v => v.type === 'Trailer' && v.official) || videos[0];

  return (
    <main className="min-h-screen bg-cinema-black">
      <Navbar />
      
      <div className="pt-20">
        <div className="relative h-[70vh] min-h-[400px] w-full overflow-hidden">
          <Image
            src={getImageUrl(serie.backdrop_path, 'large', 'backdrop')}
            alt={serie.name}
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
                  src={getImageUrl(serie.poster_path, 'large', 'poster')}
                  alt={serie.name}
                  width={280}
                  height={420}
                  className="w-full h-auto"
                  priority
                />
              </div>
            </div>

            <div className="flex-1">
              <div className="flex items-center gap-4 mb-4">
                <span className="bg-blue-600 text-white text-sm font-bold px-3 py-1 rounded">
                  SERIE
                </span>
                {serie.first_air_date && (
                  <span className="text-gray-300">{serie.first_air_date.split('-')[0]}</span>
                )}
                {serie.number_of_episodes && (
                  <span className="flex items-center gap-1 text-gray-300">
                    <FaFilm />
                    {serie.number_of_episodes} episodios
                  </span>
                )}
                {serie.number_of_seasons && (
                  <span className="text-gray-400">{serie.number_of_seasons} temporadas</span>
                )}
                <span className="flex items-center gap-1 text-yellow-400">
                  <FaStar />
                  {serie.vote_average?.toFixed(1)}
                </span>
              </div>

              <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">
                {serie.name}
              </h1>

              {serie.tagline && (
                <p className="text-gray-400 text-lg italic mb-4">&quot;{serie.tagline}&quot;</p>
              )}

              <div className="flex flex-wrap gap-2 mb-6">
                {serie.genres?.map((genre) => (
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
                    className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors"
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
                  {(['overview', 'seasons', 'videos'] as const).map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`pb-3 font-medium transition-colors ${
                        activeTab === tab
                          ? 'text-white border-b-2 border-blue-600'
                          : 'text-gray-400 hover:text-white'
                      }`}
                    >
                      {tab === 'overview' && 'Sinopsis'}
                      {tab === 'seasons' && 'Temporadas'}
                      {tab === 'videos' && 'Videos'}
                    </button>
                  ))}
                </div>
              </div>

              {activeTab === 'overview' && (
                <div className="space-y-4">
                  <p className="text-gray-300 text-lg leading-relaxed">
                    {serie.overview || 'No hay descripción disponible.'}
                  </p>
                  
                  <div className="grid grid-cols-2 gap-4 mt-6">
                    <div>
                      <span className="text-gray-500 block mb-1">Estado</span>
                      <span className="text-white">{serie.status}</span>
                    </div>
                    <div>
                      <span className="text-gray-500 block mb-1">Primera Emisión</span>
                      <span className="text-white">{formatDate(serie.first_air_date)}</span>
                    </div>
                    {serie.last_air_date && (
                      <div>
                        <span className="text-gray-500 block mb-1">Última Emisión</span>
                        <span className="text-white">{formatDate(serie.last_air_date)}</span>
                      </div>
                    )}
                    <div>
                      <span className="text-gray-500 block mb-1">Idioma Original</span>
                      <span className="text-white uppercase">{serie.original_language}</span>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'seasons' && (
                <div className="space-y-3">
                  {serie.number_of_seasons ? (
                    Array.from({ length: serie.number_of_seasons }, (_, i) => (
                      <div
                        key={i}
                        className="flex items-center justify-between p-4 bg-gray-800 rounded-lg"
                      >
                        <span className="text-white font-medium">Temporada {i + 1}</span>
                        <span className="text-gray-400">Ver episodios</span>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-400">No hay información de temporadas disponible.</p>
                  )}
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
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90">
          <div className="w-full max-w-4xl aspect-video">
            <iframe
              src={`https://www.youtube.com/embed/${trailer.key}?autoplay=1`}
              className="w-full h-full"
              allow="autoplay; encrypted-media"
              allowFullScreen
            />
            <button
              onClick={() => setShowPlayer(false)}
              className="absolute top-4 right-4 text-white text-2xl"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </main>
  );
}

export default TVShowDetailsClient;