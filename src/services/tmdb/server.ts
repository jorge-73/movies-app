import { MediaResponse, Movie, TVShow } from '@/lib/types';
import { TMDB_BASE_URL } from '@/lib/constants';

const getHeaders = () => {
  const token = process.env.NEXT_PUBLIC_TMDB_ACCESS_TOKEN;
  return {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  };
};

export async function getMovies(page: number = 1): Promise<MediaResponse<Movie>> {
  const response = await fetch(
    `${TMDB_BASE_URL}/movie/popular?language=es-ES&region=ES&page=${page}`,
    {
      headers: getHeaders(),
      next: { revalidate: 3600 },
    }
  );

  if (!response.ok) {
    throw new Error('Failed to fetch movies');
  }

  return response.json();
}

export async function getTVShows(page: number = 1): Promise<MediaResponse<TVShow>> {
  const response = await fetch(
    `${TMDB_BASE_URL}/tv/popular?language=es-ES&region=ES&page=${page}`,
    {
      headers: getHeaders(),
      next: { revalidate: 3600 },
    }
  );

  if (!response.ok) {
    throw new Error('Failed to fetch TV shows');
  }

  return response.json();
}

export async function getMovieById(id: string): Promise<Movie> {
  const response = await fetch(
    `${TMDB_BASE_URL}/movie/${id}?language=es-ES`,
    {
      headers: getHeaders(),
      next: { revalidate: 3600 },
    }
  );

  if (!response.ok) {
    throw new Error('Failed to fetch movie');
  }

  return response.json();
}

export async function getTVShowById(id: string): Promise<TVShow> {
  const response = await fetch(
    `${TMDB_BASE_URL}/tv/${id}?language=es-ES`,
    {
      headers: getHeaders(),
      next: { revalidate: 3600 },
    }
  );

  if (!response.ok) {
    throw new Error('Failed to fetch TV show');
  }

  return response.json();
}

export async function getMovieVideos(movieId: string) {
  const response = await fetch(
    `${TMDB_BASE_URL}/movie/${movieId}/videos?language=es-ES`,
    {
      headers: getHeaders(),
      next: { revalidate: 3600 },
    }
  );

  if (!response.ok) {
    return { results: [] };
  }

  return response.json();
}

export async function getTVShowVideos(tvId: string) {
  const response = await fetch(
    `${TMDB_BASE_URL}/tv/${tvId}/videos?language=es-ES`,
    {
      headers: getHeaders(),
      next: { revalidate: 3600 },
    }
  );

  if (!response.ok) {
    return { results: [] };
  }

  return response.json();
}

export async function searchMovies(query: string, page: number = 1): Promise<MediaResponse<Movie>> {
  const response = await fetch(
    `${TMDB_BASE_URL}/search/movie?query=${encodeURIComponent(query)}&language=es-ES&page=${page}`,
    {
      headers: getHeaders(),
      next: { revalidate: 1800 },
    }
  );

  if (!response.ok) {
    throw new Error('Failed to search movies');
  }

  return response.json();
}

export async function searchTVShows(query: string, page: number = 1): Promise<MediaResponse<TVShow>> {
  const response = await fetch(
    `${TMDB_BASE_URL}/search/tv?query=${encodeURIComponent(query)}&language=es-ES&page=${page}`,
    {
      headers: getHeaders(),
      next: { revalidate: 1800 },
    }
  );

  if (!response.ok) {
    throw new Error('Failed to search TV shows');
  }

  return response.json();
}

export async function getTopRatedMovies(page: number = 1): Promise<MediaResponse<Movie>> {
  const response = await fetch(
    `${TMDB_BASE_URL}/movie/top_rated?language=es-ES&region=ES&page=${page}`,
    {
      headers: getHeaders(),
      next: { revalidate: 3600 },
    }
  );

  if (!response.ok) {
    throw new Error('Failed to fetch top rated movies');
  }

  return response.json();
}

export async function getUpcomingMovies(page: number = 1): Promise<MediaResponse<Movie>> {
  const response = await fetch(
    `${TMDB_BASE_URL}/movie/upcoming?language=es-ES&region=ES&page=${page}`,
    {
      headers: getHeaders(),
      next: { revalidate: 3600 },
    }
  );

  if (!response.ok) {
    throw new Error('Failed to fetch upcoming movies');
  }

  return response.json();
}