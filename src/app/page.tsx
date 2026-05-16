'use client';

import { useState, useEffect, Suspense } from 'react';
import { MediaHero } from '@/components/media/MediaHero';
import { MediaGrid } from '@/components/media/MediaGrid';
import { Navbar } from '@/components/layout/Navbar';
import { SkeletonGrid, SkeletonHero } from '@/components/ui/Skeleton';
import { MediaItem } from '@/lib/types';
import { TMDbClient } from '@/services/tmdb/client';

const tmdbClient = new TMDbClient();

interface Section {
  title: string;
  mediaType: 'movie' | 'tv';
  color: string;
  items: MediaItem[];
  loading: boolean;
  fetchFn: () => Promise<any>;
}

const ITEMS_PER_SECTION = 12;

function HomeContent() {
  const [sections, setSections] = useState<Section[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAllSections = async () => {
      try {
        const results = await Promise.all([
          tmdbClient.getMovies(1),
          tmdbClient.getTVShows(1),
          tmdbClient.getTopRatedMovies(1),
          tmdbClient.getTopRatedTVShows(1),
          tmdbClient.getUpcomingMovies(1),
          tmdbClient.getOnTheAirTVShows(1),
        ]);

        const sectionsData: Section[] = [
          {
            title: 'Películas Populares',
            mediaType: 'movie',
            color: 'red',
            items: results[0].results.slice(0, ITEMS_PER_SECTION),
            loading: false,
            fetchFn: () => tmdbClient.getMovies(1),
          },
          {
            title: 'Series Populares',
            mediaType: 'tv',
            color: 'blue',
            items: results[1].results.slice(0, ITEMS_PER_SECTION),
            loading: false,
            fetchFn: () => tmdbClient.getTVShows(1),
          },
          {
            title: 'Películas Mejor Valoradas',
            mediaType: 'movie',
            color: 'yellow',
            items: results[2].results.slice(0, ITEMS_PER_SECTION),
            loading: false,
            fetchFn: () => tmdbClient.getTopRatedMovies(1),
          },
          {
            title: 'Series Mejor Valoradas',
            mediaType: 'tv',
            color: 'purple',
            items: results[3].results.slice(0, ITEMS_PER_SECTION),
            loading: false,
            fetchFn: () => tmdbClient.getTopRatedTVShows(1),
          },
          {
            title: 'Próximos Estrenos',
            mediaType: 'movie',
            color: 'green',
            items: results[4].results.slice(0, ITEMS_PER_SECTION),
            loading: false,
            fetchFn: () => tmdbClient.getUpcomingMovies(1),
          },
          {
            title: 'Series en Emisión',
            mediaType: 'tv',
            color: 'orange',
            items: results[5].results.slice(0, ITEMS_PER_SECTION),
            loading: false,
            fetchFn: () => tmdbClient.getOnTheAirTVShows(1),
          },
        ];

        setSections(sectionsData);
      } catch (error) {
        console.error('Error fetching sections:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAllSections();
  }, []);

  const getSectionColor = (color: string) => {
    const colors: Record<string, string> = {
      red: 'bg-red-600',
      blue: 'bg-blue-600',
      yellow: 'bg-yellow-500',
      purple: 'bg-purple-600',
      green: 'bg-green-600',
      orange: 'bg-orange-600',
    };
    return colors[color] || 'bg-red-600';
  };

  return (
    <main className="min-h-screen bg-cinema-black">
      <Navbar />
      
      <Suspense fallback={<SkeletonHero />}>
        <MediaHero />
      </Suspense>

      <div className="relative z-10 pb-16 bg-cinema-black">
        {loading ? (
          <div className="space-y-12 px-4">
            <SkeletonGrid count={12} />
            <SkeletonGrid count={12} />
            <SkeletonGrid count={12} />
          </div>
        ) : (
          sections.map((section, index) => (
            <section key={index} className="mb-12">
              <div className="container mx-auto px-4">
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-6 flex items-center gap-3">
                  <span className={`w-1 h-8 rounded ${getSectionColor(section.color)}`} />
                  {section.title}
                </h2>
                <MediaGrid
                  items={section.items}
                  loading={false}
                  hasMore={false}
                  onLoadMore={() => {}}
                  mediaType={section.mediaType}
                />
              </div>
            </section>
          ))
        )}
      </div>
    </main>
  );
}

export default function HomePage() {
  return <HomeContent />;
}