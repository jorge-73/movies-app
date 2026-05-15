export const TMDB_BASE_URL = 'https://api.themoviedb.org/3';
export const TMDB_IMAGE_BASE_URL = 'https://image.tmdb.org/t/p';

export const IMAGE_SIZES = {
  poster: {
    small: 'w185',
    medium: 'w342',
    large: 'w500',
    original: 'original',
  },
  backdrop: {
    small: 'w300',
    medium: 'w780',
    large: 'w1280',
    original: 'original',
  },
  profile: {
    small: 'w45',
    medium: 'w185',
    large: 'h632',
    original: 'original',
  },
  logo: {
    small: 'w92',
    medium: 'w154',
    large: 'w500',
    original: 'original',
  },
} as const;

export const DEFAULT_PARAMS = {
  language: 'es-ES',
  region: 'ES',
};

export const SORT_OPTIONS = {
  popular: 'popularity.desc',
  top_rated: 'vote_average.desc',
  upcoming: 'release_date.desc',
  now_playing: 'release_date.desc',
  latest: 'release_date.desc',
} as const;

export const MEDIA_TYPES = {
  MOVIE: 'movie',
  TV: 'tv',
} as const;

export const VIDEO_TYPES = {
  TRAILER: 'Trailer',
  TEASER: 'Teaser',
  CLIP: 'Clip',
  BTS: 'Behind the Scenes',
  FEATURETTE: 'Featurette',
} as const;

export const GENRES = {
  ACTION: 28,
  ADVENTURE: 12,
  ANIMATION: 16,
  COMEDY: 35,
  CRIME: 80,
  DOCUMENTARY: 99,
  DRAMA: 18,
  FAMILY: 10751,
  FANTASY: 14,
  HISTORY: 36,
  HORROR: 27,
  MUSIC: 10402,
  MYSTERY: 9648,
  ROMANCE: 10749,
  SCIENCE_FICTION: 878,
  THRILLER: 53,
  WAR: 10752,
  WESTERN: 37,
} as const;

export const ROUTES = {
  HOME: '/',
  MOVIES: '/movies',
  TV: '/tv',
  SEARCH: '/search',
  FAVORITES: '/favorites',
  WATCHLIST: '/watchlist',
} as const;

export const API_ENDPOINTS = {
  TRENDING: '/trending',
  MOVIE: '/movie',
  TV: '/tv',
  SEARCH: '/search',
  DISCOVER: '/discover',
  GENRE: '/genre',
  PERSON: '/person',
  COLLECTION: '/collection',
} as const;

export const ERROR_MESSAGES = {
  FETCH_ERROR: 'Error al obtener datos. Por favor, inténtalo de nuevo.',
  NETWORK_ERROR: 'Error de conexión. Verifica tu conexión a internet.',
  NOT_FOUND: 'Contenido no encontrado.',
  SERVER_ERROR: 'Error del servidor. Inténtalo más tarde.',
} as const;

export const PLACEHOLDER_IMAGES = {
  POSTER: '/images/placeholder-poster.svg',
  BACKDROP: '/images/placeholder-backdrop.svg',
  AVATAR: '/images/placeholder-avatar.svg',
} as const;