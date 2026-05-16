'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { MediaGrid } from '@/components/media/MediaGrid';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { SkeletonGrid } from '@/components/ui/Skeleton';
import { MediaItem } from '@/lib/types';
import { TMDbClient } from '@/services/tmdb/client';
import { FaFilm, FaStar, FaCalendar, FaClock } from 'react-icons/fa';

const tmdbClient = new TMDbClient();

const TABS = [
  { id: 'popular', label: 'Populares', icon: FaFilm },
  { id: 'top_rated', label: 'Mejor Valoradas', icon: FaStar },
  { id: 'upcoming', label: 'Próximamente', icon: FaCalendar },
  { id: 'now_playing', label: 'En Cartelera', icon: FaClock },
] as const;

type TabType = typeof TABS[number]['id'];

function MoviesContent() {
  const searchParams = useSearchParams();
  const initialTab = (searchParams.get('sort') as TabType) || 'popular';
  
  const [activeTab, setActiveTab] = useState<TabType>(initialTab);
  const [items, setItems] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const fetchMovies = async (page: number = 1, tab: TabType = activeTab) => {
    setLoading(true);
    try {
      let response;
      switch (tab) {
        case 'top_rated':
          response = await tmdbClient.getTopRatedMovies(page);
          break;
        case 'upcoming':
          response = await tmdbClient.getUpcomingMovies(page);
          break;
        case 'now_playing':
          response = await tmdbClient.getNowPlayingMovies(page);
          break;
        default:
          response = await tmdbClient.getMovies(page);
      }
      
      if (page === 1) {
        setItems(response.results);
      } else {
        setItems(prev => [...prev, ...response.results]);
      }
      setHasMore(page < response.total_pages);
    } catch (error) {
      console.error('Error fetching movies:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setCurrentPage(1);
    fetchMovies(1, activeTab);
  }, [activeTab]);

  const handleLoadMore = () => {
    if (!loading && hasMore) {
      const nextPage = currentPage + 1;
      setCurrentPage(nextPage);
      fetchMovies(nextPage, activeTab);
    }
  };

  return (
    <div className="min-h-screen bg-cinema-black flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-24 pb-8">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-8">
            Películas
          </h1>

          <div className="flex flex-wrap gap-2 mb-8">
            {TABS.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full font-medium transition-all duration-200 ${
                    activeTab === tab.id
                      ? 'bg-red-600 text-white'
                      : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                  }`}
                >
                  <Icon className="text-sm" />
                  {tab.label}
                </button>
              );
            })}
          </div>

          {loading && items.length === 0 ? (
            <SkeletonGrid count={20} />
          ) : (
            <MediaGrid
              items={items}
              loading={loading}
              hasMore={hasMore}
              onLoadMore={handleLoadMore}
              mediaType="movie"
            />
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default function MoviesPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-cinema-black">
        <Navbar />
        <div className="pt-24">
          <SkeletonGrid count={20} />
        </div>
        <Footer />
      </div>
    }>
      <MoviesContent />
    </Suspense>
  );
}