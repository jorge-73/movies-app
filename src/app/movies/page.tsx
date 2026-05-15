'use client';

import { Suspense } from 'react';
import { MoviesContent } from './MoviesContent';

function MoviesLoading() {
  return (
    <div className="min-h-screen bg-cinema-black pt-24">
      <div className="container mx-auto px-4">
        <div className="h-12 w-48 bg-gray-800 rounded animate-pulse mb-8" />
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
          {Array.from({ length: 20 }).map((_, i) => (
            <div key={i} className="aspect-[2/3] bg-gray-800 rounded-lg animate-pulse" />
          ))}
        </div>
      </div>
    </div>
  );
}

export default function MoviesPage() {
  return (
    <Suspense fallback={<MoviesLoading />}>
      <MoviesContent />
    </Suspense>
  );
}