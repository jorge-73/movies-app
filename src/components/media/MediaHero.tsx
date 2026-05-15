'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { cn, getImageUrl, getTitle, getReleaseDate, truncateText } from '@/lib/utils';
import { MediaItem, MediaType } from '@/lib/types';
import { FaPlay, FaInfoCircle, FaPlus, FaThumbsUp, FaChevronDown } from 'react-icons/fa';
import { SkeletonHero } from '@/components/ui/Skeleton';
import { TMDbClient } from '@/services/tmdb/client';

const tmdbClient = new TMDbClient();

interface MediaHeroProps {
  className?: string;
}

export function MediaHero({ className }: MediaHeroProps) {
  const [trending, setTrending] = useState<MediaItem[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const fetchTrending = async () => {
      try {
        setLoading(true);
        const response = await tmdbClient.getTrending('movie', 'week', { page: 1 });
        setTrending(response.results.slice(0, 5));
      } catch (error) {
        console.error('Error fetching trending:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTrending();
  }, []);

  useEffect(() => {
    if (trending.length === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % trending.length);
    }, 8000);

    return () => clearInterval(interval);
  }, [trending.length]);

  const currentItem = trending[currentIndex];

  if (loading || !currentItem) {
    return <SkeletonHero />;
  }

  const title = getTitle(currentItem);
  const releaseDate = getReleaseDate(currentItem);
  const year = releaseDate ? releaseDate.split('-')[0] : '';

  return (
    <div
      className={cn('relative h-[85vh] min-h-[500px] w-full overflow-hidden', className)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="absolute inset-0">
        <Image
          src={getImageUrl(currentItem.backdrop_path, 'large', 'backdrop')}
          alt={title}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/50 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-black/30" />
      </div>

      <div className="absolute bottom-0 left-0 w-full pt-32 pb-16 md:pb-24">
        <div className="container mx-auto px-4 md:px-8">
          <div className={cn(
            'max-w-xl transition-all duration-500',
            isHovered ? 'translate-x-4' : ''
          )}>
            <div className="mb-2 flex items-center gap-3">
              <span className="bg-red-600 text-white text-xs font-bold px-2 py-1 rounded">
                TOP #{currentIndex + 1} EN TRENDING
              </span>
              {year && (
                <span className="text-gray-300 text-sm">{year}</span>
              )}
              {currentItem.vote_average > 0 && (
                <span className="flex items-center gap-1 text-yellow-400 text-sm">
                  ★ {currentItem.vote_average.toFixed(1)}
                </span>
              )}
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight">
              {title}
            </h1>

            <p className="text-gray-300 text-base md:text-lg mb-6 line-clamp-3">
              {truncateText(currentItem.overview, 200)}
            </p>

            <div className="flex flex-wrap gap-3">
              <Link
                href={`/movies/${currentItem.id}`}
                className={cn(
                  'flex items-center gap-2 px-6 py-3 rounded font-semibold',
                  'bg-white text-black hover:bg-gray-200 transition-colors duration-200',
                  'focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black'
                )}
              >
                <FaPlay className="text-lg" />
                <span>Reproducir</span>
              </Link>

              <Link
                href={`/movies/${currentItem.id}`}
                className={cn(
                  'flex items-center gap-2 px-6 py-3 rounded font-semibold',
                  'bg-gray-600/70 text-white hover:bg-gray-600/90 transition-colors duration-200',
                  'focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 focus:ring-offset-black'
                )}
              >
                <FaInfoCircle className="text-lg" />
                <span>Más información</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute right-0 top-1/2 -translate-y-1/2 hidden lg:flex flex-col gap-2 pr-4">
        {trending.map((item, index) => (
          <button
            key={item.id}
            onClick={() => setCurrentIndex(index)}
            className={cn(
              'w-12 h-16 rounded overflow-hidden border-2 transition-all duration-200',
              index === currentIndex
                ? 'border-white scale-110'
                : 'border-transparent opacity-60 hover:opacity-100'
            )}
          >
            <Image
              src={getImageUrl(item.backdrop_path, 'small', 'backdrop')}
              alt={getTitle(item)}
              width={48}
              height={64}
              className="w-full h-full object-cover"
            />
          </button>
        ))}
      </div>

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {trending.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={cn(
              'w-2 h-2 rounded-full transition-all duration-300',
              index === currentIndex
                ? 'bg-white w-8'
                : 'bg-gray-500 hover:bg-gray-400'
            )}
            aria-label={`Ir a ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

export default MediaHero;