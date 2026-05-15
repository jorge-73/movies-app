import { type ClassValue, clsx } from 'clsx';
import { IMAGE_SIZES, TMDB_IMAGE_BASE_URL } from './constants';

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

export function getImageUrl(
  path: string | null,
  size: keyof typeof IMAGE_SIZES.poster = 'medium',
  type: 'poster' | 'backdrop' | 'profile' | 'logo' = 'poster'
): string {
  if (!path) return '/images/no-image.svg';
  return `${TMDB_IMAGE_BASE_URL}/${IMAGE_SIZES[type][size]}${path}`;
}

export function formatDate(dateString: string | undefined): string {
  if (!dateString) return 'N/A';
  try {
    return new Date(dateString).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  } catch {
    return dateString;
  }
}

export function formatRuntime(minutes: number | undefined): string {
  if (!minutes) return 'N/A';
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
}

export function formatRating(rating: number | undefined): string {
  if (rating === undefined || rating === null) return 'N/A';
  return rating.toFixed(1);
}

export function formatVoteCount(count: number | undefined): string {
  if (!count) return '0';
  if (count >= 1000000) {
    return `${(count / 1000000).toFixed(1)}M`;
  }
  if (count >= 1000) {
    return `${(count / 1000).toFixed(1)}K`;
  }
  return count.toString();
}

export function truncateText(text: string | undefined, maxLength: number): string {
  if (!text) return '';
  if (text.length <= maxLength) return text;
  return `${text.slice(0, maxLength)}...`;
}

export function getTitle(item: { title?: string; name?: string }): string {
  return item.title || item.name || 'Sin título';
}

export function getMediaType(item: { media_type?: string }): 'movie' | 'tv' {
  return item.media_type === 'tv' ? 'tv' : 'movie';
}

export function getReleaseDate(item: { release_date?: string; first_air_date?: string }): string {
  return item.release_date || item.first_air_date || '';
}

export function generateMediaSlug(id: number, title: string): string {
  return `${id}-${title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')}`;
}

export function debounce<T extends (...args: Parameters<T>) => ReturnType<T>>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeoutId: NodeJS.Timeout | null = null;
  return (...args: Parameters<T>) => {
    if (timeoutId) clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), wait);
  };
}

export function throttle<T extends (...args: Parameters<T>) => ReturnType<T>>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle = false;
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

export function getYearFromDate(dateString: string | undefined): string {
  if (!dateString) return '';
  return dateString.split('-')[0];
}

export function getGenreNames(genres: { id: number; name: string }[] | undefined): string {
  if (!genres || genres.length === 0) return 'N/A';
  return genres.map((g) => g.name).join(', ');
}

export function isValidMediaType(type: string): type is 'movie' | 'tv' {
  return type === 'movie' || type === 'tv';
}

export function getEndpointByMediaType(mediaType: 'movie' | 'tv'): string {
  return mediaType === 'movie' ? '/movie' : '/tv';
}