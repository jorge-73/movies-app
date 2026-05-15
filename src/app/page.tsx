'use client';

import { useState, useEffect } from 'react';
import { MediaHero } from '@/components/media/MediaHero';
import { MediaGrid } from '@/components/media/MediaGrid';
import { Navbar } from '@/components/layout/Navbar';
import { SkeletonGrid, SkeletonHero } from '@/components/ui/Skeleton';
import { MediaItem } from '@/lib/types';
import { TMDbClient } from '@/services/tmdb/client';

const tmdbClient = new TMDbClient();

function HomeContent() {
  const [movies, setMovies] = useState<MediaItem[]>([]);
  const [tvShows, setTvShows] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [moviesRes, tvRes] = await Promise.all([
          tmdbClient.getMovies(1),
          tmdbClient.getTVShows(1),
        ]);
        setMovies(moviesRes.results.slice(0, 6));
        setTvShows(tvRes.results.slice(0, 6));
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <main className="min-h-screen bg-cinema-black">
      <Navbar />
      
      <Suspense fallback={<SkeletonHero />}>
        <MediaHero />
      </Suspense>

      <div className="relative z-10 -mt-32 pb-16">
        <section className="mb-12">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-6 flex items-center gap-3">
              <span className="w-1 h-8 bg-red-600 rounded" />
              Películas Populares
            </h2>
            {loading ? (
              <SkeletonGrid count={6} />
            ) : (
              <MediaGrid
                items={movies}
                loading={false}
                hasMore={false}
                onLoadMore={() => {}}
                mediaType="movie"
              />
            )}
          </div>
        </section>

        <section className="mb-12">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-6 flex items-center gap-3">
              <span className="w-1 h-8 bg-blue-600 rounded" />
              Series Populares
            </h2>
            {loading ? (
              <SkeletonGrid count={6} />
            ) : (
              <MediaGrid
                items={tvShows}
                loading={false}
                hasMore={false}
                onLoadMore={() => {}}
                mediaType="tv"
              />
            )}
          </div>
        </section>
      </div>
    </main>
  );
}

import { Suspense } from 'react';

export default function HomePage() {
  return <HomeContent />;
}