import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import {
  MediaResponse,
  Movie,
  TVShow,
  MediaItem,
  MediaCredits,
  MediaVideos,
  MediaImages,
  GenreListResponse,
  TrendingResponse,
  ExternalIds,
  DiscoverParams,
  SearchParams,
  PaginationParams,
} from '@/lib/types';
import { TMDB_BASE_URL, DEFAULT_PARAMS } from '@/lib/constants';

export class TMDbClient {
  private client: AxiosInstance;
  private accessToken: string;

  constructor() {
    this.accessToken = process.env.NEXT_PUBLIC_TMDB_ACCESS_TOKEN || '';
    
    this.client = axios.create({
      baseURL: TMDB_BASE_URL,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.accessToken}`,
      },
    });

    this.client.interceptors.response.use(
      (response) => response,
      (error) => {
        console.error('[TMDB API Error]', error.response?.data || error.message);
        return Promise.reject(error);
      }
    );
  }

  private buildParams(params?: unknown): Record<string, string> {
    const defaultParams = {
      language: DEFAULT_PARAMS.language,
      region: DEFAULT_PARAMS.region,
    };
    
    if (params && typeof params === 'object') {
      return { ...defaultParams, ...params } as Record<string, string>;
    }
    return defaultParams;
  }

  async getTrending(
    mediaType: 'all' | 'movie' | 'tv' | 'person' = 'all',
    timeWindow: 'day' | 'week' = 'week',
    params?: { page?: number }
  ): Promise<TrendingResponse> {
    const response = await this.client.get<TrendingResponse>(
      `/trending/${mediaType}/${timeWindow}`,
      { params: this.buildParams(params) }
    );
    return response.data;
  }

  async getMovies(page: number = 1): Promise<MediaResponse<Movie>> {
    const response = await this.client.get<MediaResponse<Movie>>(
      '/movie/popular',
      { params: this.buildParams({ page }) }
    );
    return response.data;
  }

  async getTVShows(page: number = 1): Promise<MediaResponse<TVShow>> {
    const response = await this.client.get<MediaResponse<TVShow>>(
      '/tv/popular',
      { params: this.buildParams({ page }) }
    );
    return response.data;
  }

  async getMovieDetails(movieId: number): Promise<Movie> {
    const response = await this.client.get<Movie>(
      `/movie/${movieId}`,
      { params: this.buildParams() }
    );
    return response.data;
  }

  async getTVShowDetails(tvId: number): Promise<TVShow> {
    const response = await this.client.get<TVShow>(
      `/tv/${tvId}`,
      { params: this.buildParams() }
    );
    return response.data;
  }

  async searchMovies(params: SearchParams): Promise<MediaResponse<Movie>> {
    const response = await this.client.get<MediaResponse<Movie>>(
      '/search/movie',
      { params: this.buildParams(params) }
    );
    return response.data;
  }

  async searchTVShows(params: SearchParams): Promise<MediaResponse<TVShow>> {
    const response = await this.client.get<MediaResponse<TVShow>>(
      '/search/tv',
      { params: this.buildParams(params) }
    );
    return response.data;
  }

  async searchMulti(query: string, page: number = 1): Promise<MediaResponse<MediaItem>> {
    const response = await this.client.get<MediaResponse<MediaItem>>(
      '/search/multi',
      { params: this.buildParams({ query, page }) }
    );
    return response.data;
  }

  async discoverMovies(params?: DiscoverParams): Promise<MediaResponse<Movie>> {
    const response = await this.client.get<MediaResponse<Movie>>(
      '/discover/movie',
      { params: this.buildParams(params) }
    );
    return response.data;
  }

  async discoverTVShows(params?: DiscoverParams): Promise<MediaResponse<TVShow>> {
    const response = await this.client.get<MediaResponse<TVShow>>(
      '/discover/tv',
      { params: this.buildParams(params) }
    );
    return response.data;
  }

  async getMovieCredits(movieId: number): Promise<MediaCredits> {
    const response = await this.client.get<MediaCredits>(
      `/movie/${movieId}/credits`,
      { params: this.buildParams() }
    );
    return response.data;
  }

  async getTVShowCredits(tvId: number): Promise<MediaCredits> {
    const response = await this.client.get<MediaCredits>(
      `/tv/${tvId}/credits`,
      { params: this.buildParams() }
    );
    return response.data;
  }

  async getMovieVideos(movieId: number): Promise<MediaVideos> {
    const response = await this.client.get<MediaVideos>(
      `/movie/${movieId}/videos`,
      { params: this.buildParams() }
    );
    return response.data;
  }

  async getTVShowVideos(tvId: number): Promise<MediaVideos> {
    const response = await this.client.get<MediaVideos>(
      `/tv/${tvId}/videos`,
      { params: this.buildParams() }
    );
    return response.data;
  }

  async getMovieImages(movieId: number): Promise<MediaImages> {
    const response = await this.client.get<MediaImages>(
      `/movie/${movieId}/images`,
      { params: this.buildParams() }
    );
    return response.data;
  }

  async getTVShowImages(tvId: number): Promise<MediaImages> {
    const response = await this.client.get<MediaImages>(
      `/tv/${tvId}/images`,
      { params: this.buildParams() }
    );
    return response.data;
  }

  async getMovieRecommendations(movieId: number, page: number = 1): Promise<MediaResponse<Movie>> {
    const response = await this.client.get<MediaResponse<Movie>>(
      `/movie/${movieId}/recommendations`,
      { params: this.buildParams({ page }) }
    );
    return response.data;
  }

  async getTVShowRecommendations(tvId: number, page: number = 1): Promise<MediaResponse<TVShow>> {
    const response = await this.client.get<MediaResponse<TVShow>>(
      `/tv/${tvId}/recommendations`,
      { params: this.buildParams({ page }) }
    );
    return response.data;
  }

  async getMovieSimilar(movieId: number, page: number = 1): Promise<MediaResponse<Movie>> {
    const response = await this.client.get<MediaResponse<Movie>>(
      `/movie/${movieId}/similar`,
      { params: this.buildParams({ page }) }
    );
    return response.data;
  }

  async getTVShowSimilar(tvId: number, page: number = 1): Promise<MediaResponse<TVShow>> {
    const response = await this.client.get<MediaResponse<TVShow>>(
      `/tv/${tvId}/similar`,
      { params: this.buildParams({ page }) }
    );
    return response.data;
  }

  async getMovieExternalIds(movieId: number): Promise<ExternalIds> {
    const response = await this.client.get<ExternalIds>(
      `/movie/${movieId}/external_ids`
    );
    return response.data;
  }

  async getTVShowExternalIds(tvId: number): Promise<ExternalIds> {
    const response = await this.client.get<ExternalIds>(
      `/tv/${tvId}/external_ids`
    );
    return response.data;
  }

  async getMovieGenres(): Promise<GenreListResponse> {
    const response = await this.client.get<GenreListResponse>(
      '/genre/movie/list',
      { params: this.buildParams() }
    );
    return response.data;
  }

  async getTVShowGenres(): Promise<GenreListResponse> {
    const response = await this.client.get<GenreListResponse>(
      '/genre/tv/list',
      { params: this.buildParams() }
    );
    return response.data;
  }

  async getTopRatedMovies(page: number = 1): Promise<MediaResponse<Movie>> {
    const response = await this.client.get<MediaResponse<Movie>>(
      '/movie/top_rated',
      { params: this.buildParams({ page }) }
    );
    return response.data;
  }

  async getTopRatedTVShows(page: number = 1): Promise<MediaResponse<TVShow>> {
    const response = await this.client.get<MediaResponse<TVShow>>(
      '/tv/top_rated',
      { params: this.buildParams({ page }) }
    );
    return response.data;
  }

  async getUpcomingMovies(page: number = 1): Promise<MediaResponse<Movie>> {
    const response = await this.client.get<MediaResponse<Movie>>(
      '/movie/upcoming',
      { params: this.buildParams({ page }) }
    );
    return response.data;
  }

  async getNowPlayingMovies(page: number = 1): Promise<MediaResponse<Movie>> {
    const response = await this.client.get<MediaResponse<Movie>>(
      '/movie/now_playing',
      { params: this.buildParams({ page }) }
    );
    return response.data;
  }

  async getAiringTodayTVShows(page: number = 1): Promise<MediaResponse<TVShow>> {
    const response = await this.client.get<MediaResponse<TVShow>>(
      '/tv/airing_today',
      { params: this.buildParams({ page }) }
    );
    return response.data;
  }

  async getOnTheAirTVShows(page: number = 1): Promise<MediaResponse<TVShow>> {
    const response = await this.client.get<MediaResponse<TVShow>>(
      '/tv/on_the_air',
      { params: this.buildParams({ page }) }
    );
    return response.data;
  }
}

export const tmdbClient = new TMDbClient();
export default tmdbClient;