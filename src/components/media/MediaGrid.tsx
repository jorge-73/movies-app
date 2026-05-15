'use client';

import { useCallback, useState, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { cn } from '@/lib/utils';
import { MediaItem, MediaType } from '@/lib/types';
import { MediaCard } from './MediaCard';
import { SkeletonGrid } from '@/components/ui/Skeleton';
import { FaChevronLeft, FaChevronRight, FaSearch, FaTimes } from 'react-icons/fa';

interface MediaGridProps {
  items: MediaItem[];
  loading: boolean;
  hasMore: boolean;
  onLoadMore: () => void;
  mediaType: MediaType;
  isSearch?: boolean;
  searchQuery?: string;
  onSearchChange?: (query: string) => void;
  className?: string;
}

export function MediaGrid({
  items,
  loading,
  hasMore,
  onLoadMore,
  mediaType,
  isSearch = false,
  searchQuery = '',
  onSearchChange,
  className,
}: MediaGridProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [localSearchQuery, setLocalSearchQuery] = useState(searchQuery);
  
  const { ref: loadMoreRef, inView } = useInView({
    threshold: 0,
    rootMargin: '100px',
  });

  useEffect(() => {
    if (inView && hasMore && !loading) {
      onLoadMore();
    }
  }, [inView, hasMore, loading, onLoadMore]);

  useEffect(() => {
    setLocalSearchQuery(searchQuery);
  }, [searchQuery]);

  const handlePrevPage = useCallback(() => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  }, [currentPage]);

  const handleNextPage = useCallback(() => {
    if (hasMore) {
      setCurrentPage((prev) => prev + 1);
      onLoadMore();
    }
  }, [hasMore, onLoadMore]);

  const handleClearSearch = useCallback(() => {
    setLocalSearchQuery('');
    onSearchChange?.('');
  }, [onSearchChange]);

  const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setLocalSearchQuery(value);
    onSearchChange?.(value);
  }, [onSearchChange]);

  return (
    <div className={cn('min-h-screen bg-gray-900', className)}>
      <div className="sticky top-0 z-30 bg-gray-900/95 backdrop-blur-md border-b border-gray-800">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              {isSearch ? (
                <button
                  onClick={handlePrevPage}
                  disabled={currentPage === 1 || loading}
                  className="btn btn-outline btn-sm disabled:opacity-50"
                >
                  <FaChevronLeft className="text-white" />
                </button>
              ) : null}
              
              {isSearch && (
                <span className="text-white font-medium">
                  Página {currentPage}
                </span>
              )}

              {isSearch ? (
                <button
                  onClick={handleNextPage}
                  disabled={!hasMore || loading}
                  className="btn btn-outline btn-sm disabled:opacity-50"
                >
                  <FaChevronRight className="text-white" />
                </button>
              ) : null}
            </div>

            {onSearchChange && (
              <div className="relative w-full md:w-80">
                <input
                  type="text"
                  placeholder={`Buscar ${mediaType === 'movie' ? 'películas' : 'series'}...`}
                  value={localSearchQuery}
                  onChange={handleSearchChange}
                  className={cn(
                    'w-full px-4 py-2 pl-10 pr-10 rounded-full',
                    'bg-gray-800 border border-gray-700 text-white',
                    'placeholder-gray-400 focus:outline-none focus:border-red-500',
                    'transition-colors duration-200'
                  )}
                />
                <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                {localSearchQuery && (
                  <button
                    onClick={handleClearSearch}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                  >
                    <FaTimes />
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {items.length === 0 && !loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <FaSearch className="text-6xl text-gray-600 mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">
              {isSearch ? 'No se encontraron resultados' : 'No hay contenido disponible'}
            </h3>
            <p className="text-gray-400">
              {isSearch ? 'Intenta con otros términos de búsqueda' : 'Vuelve más tarde'}
            </p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
              {items.map((item, index) => (
                <MediaCard
                  key={`${item.id}-${index}`}
                  item={item}
                  priority={index < 6}
                  size="medium"
                />
              ))}
              
              {loading && (
                <>
                  <SkeletonCard />
                  <SkeletonCard />
                  <SkeletonCard />
                  <SkeletonCard />
                  <SkeletonCard />
                  <SkeletonCard />
                </>
              )}
            </div>

            {!isSearch && hasMore && (
              <div ref={loadMoreRef} className="flex justify-center py-8">
                {loading && (
                  <div className="flex items-center gap-2 text-white">
                    <span className="loading loading-spinner loading-md text-red-600" />
                    <span>Cargando más...</span>
                  </div>
                )}
              </div>
            )}

            {isSearch && hasMore && (
              <div ref={loadMoreRef} className="flex justify-center py-8">
                {loading && (
                  <span className="loading loading-spinner loading-lg text-red-600" />
                )}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

function SkeletonCard() {
  return (
    <div className="w-[180px] md:w-[230px]">
      <div className="aspect-[2/3] rounded-lg bg-gray-800 animate-pulse" />
      <div className="mt-2 h-4 w-3/4 rounded bg-gray-800 animate-pulse" />
    </div>
  );
}

export default MediaGrid;