'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import tmdbClient from '@/services/tmdb/client';
import { MediaItem, MediaResponse, Movie, TVShow, MediaVideos } from '@/lib/types';

interface UseMediaOptions {
  initialPage?: number;
  keepPreviousData?: boolean;
}

export function useMovies(options: UseMediaOptions = {}) {
  const { initialPage = 1, keepPreviousData = true } = options;
  const [data, setData] = useState<Movie[]>([]);
  const [page, setPage] = useState(initialPage);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [hasMore, setHasMore] = useState(true);

  const fetchMovies = useCallback(async (pageNum: number) => {
    try {
      setLoading(true);
      const response = await tmdbClient.getMovies(pageNum);
      
      if (keepPreviousData) {
        setData((prev) => (pageNum === 1 ? response.results : [...prev, ...response.results]));
      } else {
        setData(response.results);
      }
      
      setHasMore(pageNum < response.total_pages);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Unknown error'));
    } finally {
      setLoading(false);
    }
  }, [keepPreviousData]);

  useEffect(() => {
    fetchMovies(page);
  }, [page, fetchMovies]);

  const loadMore = useCallback(() => {
    if (!loading && hasMore) {
      setPage((prev) => prev + 1);
    }
  }, [loading, hasMore]);

  const reset = useCallback(() => {
    setPage(1);
    setData([]);
    setHasMore(true);
  }, []);

  return { data, loading, error, hasMore, page, loadMore, reset };
}

export function useTVShows(options: UseMediaOptions = {}) {
  const { initialPage = 1, keepPreviousData = true } = options;
  const [data, setData] = useState<TVShow[]>([]);
  const [page, setPage] = useState(initialPage);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [hasMore, setHasMore] = useState(true);

  const fetchTVShows = useCallback(async (pageNum: number) => {
    try {
      setLoading(true);
      const response = await tmdbClient.getTVShows(pageNum);
      
      if (keepPreviousData) {
        setData((prev) => (pageNum === 1 ? response.results : [...prev, ...response.results]));
      } else {
        setData(response.results);
      }
      
      setHasMore(pageNum < response.total_pages);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Unknown error'));
    } finally {
      setLoading(false);
    }
  }, [keepPreviousData]);

  useEffect(() => {
    fetchTVShows(page);
  }, [page, fetchTVShows]);

  const loadMore = useCallback(() => {
    if (!loading && hasMore) {
      setPage((prev) => prev + 1);
    }
  }, [loading, hasMore]);

  const reset = useCallback(() => {
    setPage(1);
    setData([]);
    setHasMore(true);
  }, []);

  return { data, loading, error, hasMore, page, loadMore, reset };
}

export function useSearchMovies() {
  const [query, setQuery] = useState('');
  const [data, setData] = useState<Movie[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [hasMore, setHasMore] = useState(false);

  const search = useCallback(async (searchQuery: string, pageNum: number = 1) => {
    if (!searchQuery.trim()) {
      setData([]);
      return;
    }

    try {
      setLoading(true);
      const response = await tmdbClient.searchMovies({ query: searchQuery, page: pageNum });
      
      if (pageNum === 1) {
        setData(response.results);
      } else {
        setData((prev) => [...prev, ...response.results]);
      }
      
      setHasMore(pageNum < response.total_pages);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Unknown error'));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      if (query) {
        search(query, 1);
      }
    }, 500);

    return () => clearTimeout(debounceTimer);
  }, [query, search]);

  const loadMore = useCallback(() => {
    if (!loading && hasMore) {
      setPage((prev) => prev + 1);
      search(query, page + 1);
    }
  }, [loading, hasMore, search, query, page]);

  return { 
    query, 
    setQuery, 
    data, 
    loading, 
    error, 
    hasMore, 
    page, 
    loadMore,
    search 
  };
}

export function useSearchTVShows() {
  const [query, setQuery] = useState('');
  const [data, setData] = useState<TVShow[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [hasMore, setHasMore] = useState(false);

  const search = useCallback(async (searchQuery: string, pageNum: number = 1) => {
    if (!searchQuery.trim()) {
      setData([]);
      return;
    }

    try {
      setLoading(true);
      const response = await tmdbClient.searchTVShows({ query: searchQuery, page: pageNum });
      
      if (pageNum === 1) {
        setData(response.results);
      } else {
        setData((prev) => [...prev, ...response.results]);
      }
      
      setHasMore(pageNum < response.total_pages);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Unknown error'));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      if (query) {
        search(query, 1);
      }
    }, 500);

    return () => clearTimeout(debounceTimer);
  }, [query, search]);

  const loadMore = useCallback(() => {
    if (!loading && hasMore) {
      setPage((prev) => prev + 1);
      search(query, page + 1);
    }
  }, [loading, hasMore, search, query, page]);

  return { 
    query, 
    setQuery, 
    data, 
    loading, 
    error, 
    hasMore, 
    page, 
    loadMore,
    search 
  };
}

export function useMediaDetail(mediaType: 'movie' | 'tv', id: number) {
  const [data, setData] = useState<Movie | TVShow | null>(null);
  const [videos, setVideos] = useState<MediaVideos['results']>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        const [detailRes, videosRes] = await Promise.all([
          mediaType === 'movie' 
            ? tmdbClient.getMovieDetails(id) 
            : tmdbClient.getTVShowDetails(id),
          mediaType === 'movie' 
            ? tmdbClient.getMovieVideos(id) 
            : tmdbClient.getTVShowVideos(id),
        ]);
        
        setData(detailRes);
        setVideos(videosRes.results);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Unknown error'));
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchData();
    }
  }, [mediaType, id]);

  return { data, videos, loading, error };
}

export function useTrending() {
  const [data, setData] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await tmdbClient.getTrending('all', 'week', { page: 1 });
        setData(response.results);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Unknown error'));
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { data, loading, error };
}