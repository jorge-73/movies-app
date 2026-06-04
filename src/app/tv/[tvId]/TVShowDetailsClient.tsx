'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Navbar } from '@/components/layout/Navbar';
import { getImageUrl, formatDate } from '@/lib/utils';
import { TVShow, Video } from '@/lib/types';
import { FaPlay, FaStar, FaCalendar, FaClock, FaTv, FaPlus, FaThumbsUp, FaTimes } from 'react-icons/fa';

interface TVShowDetailsClientProps {
  show: TVShow;
  videos: Video[];
}

export function TVShowDetailsClient({ show, videos }: TVShowDetailsClientProps) {
  const [showPlayer, setShowPlayer] = useState(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'videos'>('overview');

  const trailer =
    videos.find(v => v.type === 'Trailer' && v.official && v.iso_639_1 === 'en') ||
    videos.find(v => v.type === 'Trailer' && v.iso_639_1 === 'en') ||
    videos.find(v => v.type === 'Trailer' && v.official) ||
    videos[0];

  const runtime = show.episode_run_time?.[0];

  return (
    <main className="min-h-screen bg-cinema-black">
      <Navbar />

      <div className="pt-20 pb-16">
        <div className="relative h-[70vh] min-h-[400px] w-full overflow-hidden">
          <Image
            src={getImageUrl(show.backdrop_path, 'large', 'backdrop')}
            alt={show.name}
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
                  src={getImageUrl(show.poster_path, 'large', 'poster')}
                  alt={show.name}
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
                {show.first_air_date && (
                  <span className="text-gray-300">{show.first_air_date.split('-')[0]}</span>
                )}
                {runtime && (
                  <span className="flex items-center gap-1 text-gray-300">
                    <FaClock />
                    {runtime}m
                  </span>
                )}
                {show.number_of_seasons && (
                  <span className="flex items-center gap-1 text-gray-300">
                    <FaTv />
                    {show.number_of_seasons} {show.number_of_seasons === 1 ? 'temporada' : 'temporadas'}
                  </span>
                )}
                <span className="flex items-center gap-1 text-yellow-400">
                  <FaStar />
                  {show.vote_average?.toFixed(1)}
                </span>
              </div>

              <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">
                {show.name}
              </h1>

              {show.tagline && (
                <p className="text-gray-400 text-lg italic mb-4">&quot;{show.tagline}&quot;</p>
              )}

              <div className="flex flex-wrap gap-2 mb-6">
                {show.genres?.map((genre) => (
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
                  {(['overview', 'videos'] as const).map((tab) => (
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
                      {tab === 'videos' && 'Videos'}
                    </button>
                  ))}
                </div>
              </div>

              {activeTab === 'overview' && (
                <div className="space-y-4">
                  <p className="text-gray-300 text-lg leading-relaxed">
                    {show.overview || 'No hay descripción disponible.'}
                  </p>

                  <div className="grid grid-cols-2 gap-4 mt-6">
                    <div>
                      <span className="text-gray-500 block mb-1">Estado</span>
                      <span className="text-white">{show.status}</span>
                    </div>
                    <div>
                      <span className="text-gray-500 block mb-1">Primera Emisión</span>
                      <span className="text-white">{formatDate(show.first_air_date)}</span>
                    </div>
                    {show.last_air_date && (
                      <div>
                        <span className="text-gray-500 block mb-1">Última Emisión</span>
                        <span className="text-white">{formatDate(show.last_air_date)}</span>
                      </div>
                    )}
                    <div>
                      <span className="text-gray-500 block mb-1">Idioma Original</span>
                      <span className="text-white uppercase">{show.original_language}</span>
                    </div>
                    {show.number_of_seasons && (
                      <div>
                        <span className="text-gray-500 block mb-1">Temporadas</span>
                        <span className="text-white">{show.number_of_seasons}</span>
                      </div>
                    )}
                    {show.number_of_episodes && (
                      <div>
                        <span className="text-gray-500 block mb-1">Episodios</span>
                        <span className="text-white">{show.number_of_episodes}</span>
                      </div>
                    )}
                  </div>

                  {show.networks && show.networks.length > 0 && (
                    <div className="mt-6">
                      <span className="text-gray-500 block mb-3">Cadenas</span>
                      <div className="flex flex-wrap gap-4 items-center">
                        {show.networks.map((network) => (
                          <div key={network.id} className="flex items-center gap-2 bg-gray-800 rounded-lg px-3 py-2">
                            {network.logo_path ? (
                              <Image
                                src={getImageUrl(network.logo_path, 'small', 'logo')}
                                alt={network.name}
                                width={40}
                                height={20}
                                className="object-contain"
                              />
                            ) : (
                              <span className="text-white text-sm">{network.name}</span>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
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
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm">
          <div className="relative w-full max-w-4xl aspect-video mx-4">
            <button
              onClick={() => setShowPlayer(false)}
              className="absolute -top-12 right-0 text-white text-3xl hover:text-gray-300 transition-colors"
            >
              <FaTimes />
            </button>
            <iframe
              src={`https://www.youtube.com/embed/${trailer.key}?autoplay=1&cc_load_policy=1&cc_lang_pref=es`}
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

export default TVShowDetailsClient;
