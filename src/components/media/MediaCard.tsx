'use client';

import { memo, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { cn, getImageUrl, getTitle, getReleaseDate, formatRating } from '@/lib/utils';
import { MediaItem, MediaType } from '@/lib/types';
import { FaStar, FaPlay } from 'react-icons/fa';

interface MediaCardProps {
  item: MediaItem;
  priority?: boolean;
  showRating?: boolean;
  showTitle?: boolean;
  size?: 'small' | 'medium' | 'large';
  className?: string;
}

function MediaCardComponent({
  item,
  priority = false,
  showRating = true,
  showTitle = true,
  size = 'medium',
  className,
}: MediaCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const title = getTitle(item);
  const releaseDate = getReleaseDate(item);
  const year = releaseDate ? releaseDate.split('-')[0] : '';

  const posterSizes = {
    small: 185,
    medium: 342,
    large: 500,
  };

  const heightSizes = {
    small: 278,
    medium: 513,
    large: 750,
  };

  return (
    <Link
      href={`/${item.media_type}/${item.id}`}
      className={cn(
        'group relative block overflow-hidden rounded-lg transition-all duration-300',
        'hover:scale-105 hover:z-20 hover:shadow-2xl hover:shadow-red-500/20',
        'focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-gray-900',
        className
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className={cn(
          'relative w-full',
          size === 'small' && 'w-[140px]',
          size === 'medium' && 'w-[180px] md:w-[230px]',
          size === 'large' && 'w-[250px]'
        )}
      >
        <div
          className={cn(
            'relative overflow-hidden rounded-lg',
            size === 'small' && 'aspect-[2/3] h-[210px]',
            size === 'medium' && 'aspect-[2/3] h-[270px] md:h-[345px]',
            size === 'large' && 'aspect-[2/3] h-[375px]'
          )}
        >
          {isLoading && (
            <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900 animate-pulse" />
          )}
          <Image
            src={getImageUrl(item.poster_path, 'large', 'poster')}
            alt={title}
            fill
            sizes={
              size === 'small'
                ? '140px'
                : size === 'medium'
                ? '(max-width: 768px) 180px, 230px'
                : '250px'
            }
            priority={priority}
            className={cn(
              'object-cover transition-all duration-500',
              'group-hover:scale-110',
              isLoading ? 'opacity-0' : 'opacity-100'
            )}
            onLoad={() => setIsLoading(false)}
          />
          
          <div className={cn(
            'absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent',
            'opacity-0 group-hover:opacity-100 transition-opacity duration-300'
          )} />

          <div
            className={cn(
              'absolute bottom-0 left-0 right-0 p-3 translate-y-full',
              'group-hover:translate-y-0 transition-transform duration-300 ease-out'
            )}
          >
            <div className="flex items-center justify-center gap-3">
              <button
                className={cn(
                  'flex items-center justify-center w-12 h-12 rounded-full',
                  'bg-red-600 hover:bg-red-700 text-white',
                  'transition-colors duration-200 shadow-lg'
                )}
                aria-label="Play"
                onClick={(e) => e.preventDefault()}
              >
                <FaPlay className="ml-1" />
              </button>
            </div>
          </div>
        </div>

        {showRating && item.vote_average > 0 && (
          <div className="absolute top-2 right-2 flex items-center gap-1 bg-black/70 backdrop-blur-sm px-2 py-1 rounded-md">
            <FaStar className="text-yellow-400 text-xs" />
            <span className="text-white text-xs font-medium">
              {formatRating(item.vote_average)}
            </span>
          </div>
        )}

        {item.media_type && (
          <div className="absolute top-2 left-2">
            <span className={cn(
              'px-2 py-1 rounded-md text-xs font-medium uppercase tracking-wider',
              item.media_type === 'movie'
                ? 'bg-red-600 text-white'
                : 'bg-blue-600 text-white'
            )}>
              {item.media_type === 'movie' ? 'Movie' : 'TV'}
            </span>
          </div>
        )}
      </div>

      {showTitle && (
        <div className="mt-2 px-1">
          <h3 className="text-white font-medium text-sm line-clamp-2 group-hover:text-red-400 transition-colors">
            {title}
          </h3>
          {year && (
            <span className="text-gray-400 text-xs">{year}</span>
          )}
        </div>
      )}
    </Link>
  );
}

export const MediaCard = memo(
  MediaCardComponent,
  (prevProps, nextProps) => {
    return prevProps.item.id === nextProps.item.id &&
      prevProps.item.poster_path === nextProps.item.poster_path;
  }
);

MediaCard.displayName = 'MediaCard';

export default MediaCard;