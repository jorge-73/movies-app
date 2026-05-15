export type MediaType = 'movie' | 'tv';

export interface MediaItem {
  id: number;
  title?: string;
  name?: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  vote_average: number;
  vote_count: number;
  release_date?: string;
  first_air_date?: string;
  media_type: MediaType;
  adult?: boolean;
  original_language?: string;
  genre_ids?: number[];
  popularity?: number;
}

export interface Movie extends MediaItem {
  title: string;
  release_date: string;
  media_type: 'movie';
  runtime?: number;
  genres?: Genre[];
  tagline?: string;
  status?: string;
  budget?: number;
  revenue?: number;
  homepage?: string;
  production_companies?: ProductionCompany[];
}

export interface TVShow extends MediaItem {
  name: string;
  first_air_date: string;
  media_type: 'tv';
  number_of_seasons?: number;
  number_of_episodes?: number;
  episode_run_time?: number[];
  genres?: Genre[];
  tagline?: string;
  status?: string;
  homepage?: string;
  in_production?: boolean;
  last_air_date?: string;
  networks?: Network[];
}

export interface Genre {
  id: number;
  name: string;
}

export interface ProductionCompany {
  id: number;
  name: string;
  logo_path?: string;
  origin_country?: string;
}

export interface Network {
  id: number;
  name: string;
  logo_path?: string;
  origin_country?: string;
}

export interface MediaCredits {
  id: number;
  cast: CastMember[];
  crew: CrewMember[];
}

export interface CastMember {
  id: number;
  name: string;
  character?: string;
  profile_path?: string;
  order?: number;
}

export interface CrewMember {
  id: number;
  name: string;
  job: string;
  department?: string;
  profile_path?: string;
}

export interface MediaVideos {
  id: number;
  results: Video[];
}

export interface Video {
  id: string;
  key: string;
  name: string;
  site: string;
  type: string;
  official: boolean;
  published_at: string;
}

export interface MediaImages {
  id: number;
  backdrops: Image[];
  logos: Image[];
  posters: Image[];
}

export interface Image {
  file_path: string;
  width: number;
  height: number;
  aspect_ratio?: number;
  vote_average?: number;
  vote_count?: number;
}

export interface MediaResponse<T> {
  page: number;
  results: T[];
  total_pages: number;
  total_results: number;
}

export interface PaginationParams {
  page?: number;
  language?: string;
  region?: string;
}

export interface DiscoverParams extends PaginationParams {
  sort_by?: string;
  with_genres?: string;
  'release_date.gte'?: string;
  'release_date.lte'?: string;
  'vote_count.gte'?: number;
  'vote_count.lte'?: number;
  'vote_average.gte'?: number;
  'vote_average.lte'?: number;
}

export interface SearchParams extends PaginationParams {
  query: string;
  include_adult?: boolean;
}

export interface TrendingResponse {
  page: number;
  results: MediaItem[];
  total_pages: number;
  total_results: number;
}

export interface GenreListResponse {
  genres: Genre[];
}

export interface ExternalIds {
  imdb_id?: string;
  facebook_id?: string;
  instagram_id?: string;
  twitter_id?: string;
}