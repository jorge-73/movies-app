import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getMovieById, getMovieVideos } from '@/services/tmdb/server';
import { MovieDetailsClient } from './MovieDetailsClient';

interface Props {
  params: Promise<{ movieId: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  try {
    const { movieId } = await params;
    const movie = await getMovieById(movieId);
    
    return {
      title: movie.title,
      description: movie.overview?.slice(0, 160),
      openGraph: {
        title: movie.title,
        description: movie.overview,
        images: movie.backdrop_path
          ? [`https://image.tmdb.org/t/p/w1280${movie.backdrop_path}`]
          : [],
        type: 'video.movie',
      },
      twitter: {
        card: 'summary_large_image',
        title: movie.title,
        description: movie.overview?.slice(0, 160),
        images: movie.backdrop_path
          ? [`https://image.tmdb.org/t/p/w1280${movie.backdrop_path}`]
          : [],
      },
    };
  } catch {
    return {
      title: 'Película no encontrada',
    };
  }
}

export async function generateStaticParams() {
  return [];
}

export default async function MoviePage({ params }: Props) {
  try {
    const { movieId } = await params;
    
    const [movie, videosData] = await Promise.all([
      getMovieById(movieId),
      getMovieVideos(movieId),
    ]);

    const videos = videosData.results?.filter(
      (v: { site: string; type: string }) => v.site === 'YouTube' && ['Trailer', 'Teaser'].includes(v.type)
    ) || [];

    return <MovieDetailsClient movie={movie} videos={videos} />;
  } catch {
    notFound();
  }
}