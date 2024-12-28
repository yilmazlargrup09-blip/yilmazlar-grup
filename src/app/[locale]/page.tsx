import type { Metadata, ResolvingMetadata } from 'next'
import { getTranslations } from 'next-intl/server';
import Hero from '@/components/Hero';
import { Services } from '@/components/Services';
import { Franchises } from '@/components/Franchises';
import PartnersSection from '@/components/PartnersSection';
import { MapSection } from '@/components/MapSection';

type Props = {
  params: Promise<{ locale: string }>
}

export async function generateMetadata(
  { params }: Props,
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

export default async function IndexPage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'indexPage' });

  return (
    <main className="min-h-screen bg-gray-900">
      <Hero />
      <Franchises />
      <Services />
      <MapSection />
      <PartnersSection />
    </main>
  );
}

