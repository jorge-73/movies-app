'use client';

import { useState, useCallback, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { Navbar } from '@/components/layout/Navbar';
import { MediaGrid } from '@/components/media/MediaGrid';
import { useMovies, useSearchMovies } from '@/hooks/useMedia';
import { MediaItem } from '@/lib/types';

export function MoviesContent() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get('q') || '';
  
  const [activeTab, setActiveTab] = useState<'popular' | 'top_rated' | 'upcoming'>('popular');
  const [searchMode, setSearchMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState(initialQuery);

  const { data: movies, loading, hasMore, loadMore } = useMovies({
    initialPage: 1,
    keepPreviousData: true,
  });

  const searchHook = useSearchMovies();

  useEffect(() => {
    if (initialQuery) {
      setSearchMode(true);
      setSearchQuery(initialQuery);
    }
  }, [initialQuery]);

  const handleSearchChange = useCallback((query: string) => {
    setSearchQuery(query);
    setSearchMode(!!query);
    if (query) {
      searchHook.search(query, 1);
    }
  }, [searchHook]);

  const handleTabChange = useCallback((tab: 'popular' | 'top_rated' | 'upcoming') => {
    setActiveTab(tab);
    setSearchMode(false);
    setSearchQuery('');
  }, []);

  return (
    <main className="min-h-screen bg-cinema-black">
      <Navbar />
      
      <div className="pt-24 pb-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4">
            <h1 className="text-3xl md:text-4xl font-bold text-white">
              Películas
            </h1>

            <div className="flex gap-2">
              {(['popular', 'top_rated', 'upcoming'] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => handleTabChange(tab)}
                  className={`px-4 py-2 rounded-full font-medium transition-all duration-200 ${
                    activeTab === tab && !searchMode
                      ? 'bg-red-600 text-white'
                      : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                  }`}
                >
                  {tab === 'popular' && 'Populares'}
                  {tab === 'top_rated' && 'Mejor valoradas'}
                  {tab === 'upcoming' && 'Próximamente'}
                </button>
              ))}
            </div>
          </div>
        </div>

        <MediaGrid
          items={searchMode ? searchHook.data as MediaItem[] : movies as MediaItem[]}
          loading={searchMode ? searchHook.loading : loading}
          hasMore={searchMode ? searchHook.hasMore : hasMore}
          onLoadMore={searchMode ? searchHook.loadMore : loadMore}
          mediaType="movie"
          isSearch={searchMode}
          searchQuery={searchQuery}
          onSearchChange={handleSearchChange}
        />
      </div>
    </main>
  );
}