'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { MediaGrid } from '@/components/media/MediaGrid';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { SkeletonGrid } from '@/components/ui/Skeleton';
import { MediaItem } from '@/lib/types';
import { TMDbClient } from '@/services/tmdb/client';
import { FaFilm, FaTv, FaSearch } from 'react-icons/fa';

const tmdbClient = new TMDbClient();

const TABS = [
  { id: 'movie', label: 'Películas', icon: FaFilm },
  { id: 'tv', label: 'Series', icon: FaTv },
] as const;

type TabType = typeof TABS[number]['id'];

function SearchContent() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';

  const [activeTab, setActiveTab] = useState<TabType>('movie');
  const [items, setItems] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);
  const [totalResults, setTotalResults] = useState(0);

  const doSearch = async (page: number = 1, tab: TabType = activeTab) => {
    if (!query.trim()) {
      setItems([]);
      setTotalResults(0);
      setHasMore(false);
      return;
    }

    setLoading(true);
    try {
      const response = await (tab === 'movie'
        ? tmdbClient.searchMovies({ query, page })
        : tmdbClient.searchTVShows({ query, page }));

      if (page === 1) {
        setItems(response.results);
      } else {
        setItems(prev => [...prev, ...response.results]);
      }

      setTotalResults(response.total_results);
      setHasMore(page < response.total_pages);
    } catch (error) {
      console.error('Error searching:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setCurrentPage(1);
    setItems([]);
    doSearch(1, activeTab);
  }, [query, activeTab]);

  const handleLoadMore = () => {
    if (!loading && hasMore) {
      const nextPage = currentPage + 1;
      setCurrentPage(nextPage);
      doSearch(nextPage, activeTab);
    }
  };

  return (
    <div className="min-h-screen bg-cinema-black flex flex-col">
      <Navbar />

      <main className="flex-1 pt-24 pb-8">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-3 mb-6">
            <FaSearch className="text-2xl text-gray-400" />
            <h1 className="text-3xl md:text-4xl font-bold text-white">
              {query ? (
                <>
                  Resultados para: <span className="text-red-500">&quot;{query}&quot;</span>
                </>
              ) : (
                'Buscar'
              )}
            </h1>
          </div>

          {query && !loading && items.length === 0 && (
            <div className="flex flex-col items-center justify-center py-20">
              <FaSearch className="text-6xl text-gray-600 mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">
                No se encontraron resultados
              </h3>
              <p className="text-gray-400">
                Intenta con otros términos de búsqueda
              </p>
            </div>
          )}

          {query && (
            <>
              <div className="flex items-center justify-between mb-6">
                <div className="flex flex-wrap gap-2">
                  {TABS.map((tab) => {
                    const Icon = tab.icon;
                    return (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`flex items-center gap-2 px-4 py-2 rounded-full font-medium transition-all duration-200 ${
                          activeTab === tab.id
                            ? tab.id === 'movie'
                              ? 'bg-red-600 text-white'
                              : 'bg-blue-600 text-white'
                            : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                        }`}
                      >
                        <Icon className="text-sm" />
                        {tab.label}
                      </button>
                    );
                  })}
                </div>
                <span className="text-gray-400 text-sm">
                  {totalResults} {totalResults === 1 ? 'resultado' : 'resultados'}
                </span>
              </div>

              {loading && items.length === 0 ? (
                <SkeletonGrid count={20} />
              ) : (
                <MediaGrid
                  items={items}
                  loading={loading}
                  hasMore={hasMore}
                  onLoadMore={handleLoadMore}
                  mediaType={activeTab}
                />
              )}
            </>
          )}

          {!query && (
            <div className="flex flex-col items-center justify-center py-20">
              <FaSearch className="text-6xl text-gray-600 mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">
                Busca tu contenido favorito
              </h3>
              <p className="text-gray-400">
                Escribe en el campo de búsqueda para encontrar películas y series
              </p>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default function SearchPage() {
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
      <SearchContent />
    </Suspense>
  );
}
