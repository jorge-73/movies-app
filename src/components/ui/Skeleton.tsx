'use client';

import { cn } from '@/lib/utils';

interface SkeletonProps {
  className?: string;
}

export function Skeleton({ className }: SkeletonProps) {
  return (
    <div
      className={cn(
        'animate-pulse rounded-md bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800',
        'bg-[length:200%_100%]',
        className
      )}
    />
  );
}

interface SkeletonCardProps {
  variant?: 'poster' | 'backdrop' | 'profile';
}

export function SkeletonCard({ variant = 'poster' }: SkeletonCardProps) {
  const dimensions = {
    poster: 'w-[230px] h-[345px]',
    backdrop: 'w-full h-[200px]',
    profile: 'w-[100px] h-[100px] rounded-full',
  };

  return (
    <div className={cn('rounded-lg overflow-hidden', dimensions[variant])}>
      <Skeleton className="w-full h-full" />
    </div>
  );
}

export function SkeletonGrid({ count = 20 }: { count?: number }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 p-4">
      {Array.from({ length: count }).map((_, i) => (
        <SkeletonCard key={i} variant="poster" />
      ))}
    </div>
  );
}

export function SkeletonMediaCard() {
  return (
    <div className="group relative overflow-hidden rounded-lg transition-transform duration-300 hover:scale-105 hover:z-10">
      <Skeleton className="w-[230px] h-[345px]" />
    </div>
  );
}

export function SkeletonHero() {
  return (
    <div className="relative h-[85vh] w-full overflow-hidden">
      <Skeleton className="absolute inset-0" />
      <div className="absolute bottom-32 left-8 md:left-16 space-y-4 max-w-2xl">
        <Skeleton className="h-12 w-3/4" />
        <Skeleton className="h-6 w-full" />
        <Skeleton className="h-6 w-2/3" />
        <div className="flex gap-4">
          <Skeleton className="h-12 w-32" />
          <Skeleton className="h-12 w-32" />
        </div>
      </div>
    </div>
  );
}

export function SkeletonText({ lines = 3 }: { lines?: number }) {
  return (
    <div className="space-y-3">
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton
          key={i}
          className={cn('h-4', i === lines - 1 ? 'w-2/3' : 'w-full')}
        />
      ))}
    </div>
  );
}

export function SkeletonMediaDetails() {
  return (
    <div className="flex flex-col md:flex-row gap-8 p-6">
      <Skeleton className="w-[300px] h-[450px] rounded-lg" />
      <div className="flex-1 space-y-4">
        <Skeleton className="h-10 w-3/4" />
        <SkeletonText lines={4} />
        <div className="flex gap-4">
          <Skeleton className="h-12 w-32" />
          <Skeleton className="h-12 w-32" />
        </div>
      </div>
    </div>
  );
}