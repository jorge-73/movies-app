import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getTVShowById, getTVShowVideos } from '@/services/tmdb/server';
import { TVShowDetailsClient } from './TVShowDetailsClient';

interface Props {
  params: Promise<{ serieId: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  try {
    const { serieId } = await params;
    const serie = await getTVShowById(serieId);
    
    return {
      title: serie.name,
      description: serie.overview?.slice(0, 160),
      openGraph: {
        title: serie.name,
        description: serie.overview,
        images: serie.backdrop_path
          ? [`https://image.tmdb.org/t/p/w1280${serie.backdrop_path}`]
          : [],
        type: 'video.tv_show',
      },
      twitter: {
        card: 'summary_large_image',
        title: serie.name,
        description: serie.overview?.slice(0, 160),
        images: serie.backdrop_path
          ? [`https://image.tmdb.org/t/p/w1280${serie.backdrop_path}`]
          : [],
      },
    };
  } catch {
    return {
      title: 'Serie no encontrada',
    };
  }
}

export async function generateStaticParams() {
  return [];
}

export default async function TVShowPage({ params }: Props) {
  try {
    const { serieId } = await params;
    
    const [serie, videosData] = await Promise.all([
      getTVShowById(serieId),
      getTVShowVideos(serieId),
    ]);

    const videos = videosData.results?.filter(
      (v: { site: string; type: string }) => v.site === 'YouTube' && ['Trailer', 'Teaser'].includes(v.type)
    ) || [];

    return <TVShowDetailsClient serie={serie} videos={videos} />;
  } catch {
    notFound();
  }
}