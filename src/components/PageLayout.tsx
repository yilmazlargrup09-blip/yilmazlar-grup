'use client';

import { ReactNode, useState } from 'react';
import Image from 'next/image';
import { Skeleton } from '@/components/ui/skeleton';

type Props = {
  children?: ReactNode;
  title: ReactNode;
  image: string;
};

export default function PageLayout({ children, title, image }: Props) {
  const [isMediaLoaded, setIsMediaLoaded] = useState(false);
  const isVideo = image.toLowerCase().endsWith('.mp4');

  return (
    <div className="min-h-screen bg-white dark:bg-[#363f4b]">
      <section className="py-16 relative h-[300px] md:h-[500px] w-full dark:bg-gray-900">
        <div className="absolute inset-0 overflow-hidden">
          {isVideo ? (
            <>
              <video
                src={image}
                autoPlay
                loop
                muted
                playsInline
                className={`object-cover rounded-lg w-full h-full brightness-50 ${
                  isMediaLoaded ? 'opacity-100' : 'opacity-0'
                } transition-opacity duration-300`}
                onLoadedData={() => setIsMediaLoaded(true)}
              />
              {!isMediaLoaded && (
                <Skeleton className="w-full h-full rounded-lg bg-gray-100 dark:bg-gray-800" />
              )}
            </>
          ) : (
            <>
              <Image
                src={image}
                alt={`Yılmazlar Grup ${title}`}
                fill
                priority
                className={`object-cover brightness-50 ${
                  isMediaLoaded ? 'opacity-100' : 'opacity-0'
                } transition-opacity duration-300`}
                onLoadingComplete={() => setIsMediaLoaded(true)}
              />
              {!isMediaLoaded && (
                <Skeleton className="w-full h-full bg-gray-100 dark:bg-gray-800" />
              )}
            </>
          )}
          {isMediaLoaded && (
            <div className="absolute inset-0 flex flex-col items-start justify-center px-4 md:px-16">
              <h1 className="text-3xl md:text-5xl lg:text-7xl font-bold text-white tracking-wider mb-4">
                {title}
              </h1>
              <div className="w-24 md:w-32 h-1 bg-[#ff0505d9]" />
            </div>
          )}
        </div>
      </section>
      {/* About Section */}
      <section className='bg-[#f5f7fa] dark:bg-gray-900'>
        <div className="mt-1">
          {isMediaLoaded ? children : (
            <div className="container mx-auto px-4 py-16">
              <Skeleton className="w-full h-64 bg-gray-100 dark:bg-gray-800" />
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

