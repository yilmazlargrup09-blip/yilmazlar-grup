
import { ReactNode } from 'react';
import ProgressiveImage from './ProgressiveImage';
import type { Metadata, ResolvingMetadata } from 'next'
import { getTranslations } from 'next-intl/server';
type Props = {
  children?: ReactNode;
  title: ReactNode;
  image: string;

};
type metaProps={
  params: Promise<{ locale: string }>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}
export async function generateMetadata(
  { params }: metaProps,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'indexPage' });

  // Optionally access and extend (rather than replace) parent metadata
  const previousKeywords = (await parent).keywords || [];

  return {
    title: t('metaTitle'),
    description: t('metaDescription'),
    keywords: [...(t('keywords').split(',').map(keyword => keyword.trim())), ...previousKeywords],
  };
}

export default async  function PageLayout({ children, title, image }: Props) {

  const isVideo = image.toLowerCase().endsWith('.mp4');

  return (
    <div className="min-h-screen bg-white dark:bg-[#363f4b]">
      <section className="py-16 relative h-[300px] md:h-[500px] w-full dark:bg-gray-900">
        <div className="absolute inset-0 overflow-hidden">
          {isVideo ? (
       
              <video
              src={image}
              autoPlay
              loop
              muted
              playsInline
              className="object-cover w-full h-full brightness-50"
            />
         
          ) : (
              <ProgressiveImage
              src={image}
              alt={`Yılmazlar Grup ${title}`}
              fill
              priority
              sizes="100vw"
              className="object-cover brightness-50"
            />
          )}

          <div className="absolute inset-0 flex flex-col items-start justify-center px-4 md:px-16">
            <h1 className="text-3xl md:text-5xl lg:text-7xl font-bold text-white tracking-wider mb-4">
              {title}
            </h1>
            <div className="w-24 md:w-32 h-1 bg-[#ff0505d9]" />
          </div>

        </div>
      </section>
      {/* About Section */}
      <section className='bg-[#f5f7fa] dark:bg-gray-900'>
        <div>
          {children}
        </div>
      </section>
    </div>
  );
}

