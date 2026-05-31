import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getTVShowById, getTVShowVideos } from '@/services/tmdb/server';
import { TVShowDetailsClient } from './TVShowDetailsClient';

interface Props {
  params: Promise<{ tvId: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  try {
    const { tvId } = await params;
    const show = await getTVShowById(tvId);

    return {
      title: show.name,
      description: show.overview?.slice(0, 160),
      openGraph: {
        title: show.name,
        description: show.overview,
        images: show.backdrop_path
          ? [`https://image.tmdb.org/t/p/w1280${show.backdrop_path}`]
          : [],
        type: 'video.tv_show',
      },
      twitter: {
        card: 'summary_large_image',
        title: show.name,
        description: show.overview?.slice(0, 160),
        images: show.backdrop_path
          ? [`https://image.tmdb.org/t/p/w1280${show.backdrop_path}`]
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
    const { tvId } = await params;

    const [show, videosData] = await Promise.all([
      getTVShowById(tvId),
      getTVShowVideos(tvId),
    ]);

    const videos = videosData.results?.filter(
      (v: { site: string; type: string }) => v.site === 'YouTube' && ['Trailer', 'Teaser'].includes(v.type)
    ) || [];

    return <TVShowDetailsClient show={show} videos={videos} />;
  } catch {
    notFound();
  }
}
