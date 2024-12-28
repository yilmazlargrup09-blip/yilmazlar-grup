import type { Metadata, ResolvingMetadata } from 'next'
import About from '@/components/about';
import PageLayout from '@/components/PageLayout';
import { getTranslations } from 'next-intl/server';

type Props = {
  params: Promise<{ locale: string }>
}

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'about' });

  // Optionally access and extend (rather than replace) parent metadata
  const previousKeywords = (await parent).keywords || [];

  return {
    title: t('metaTitle'),
    description: t('metaDescription'),
    keywords: [...(t('keywords').split(',').map(keyword => keyword.trim())), ...previousKeywords],
  };
}

export default async function AboutPage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'about' });

  return (
    <PageLayout title={t('title')} image={t('mainImage')}>
      <About />
    </PageLayout>
  );
}

