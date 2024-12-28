import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import About from '@/components/about';
import PageLayout from '@/components/PageLayout';

type PageProps = {
  params: { locale: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata({ params: { locale } }: PageProps): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'about' });

  return {
    title: t('metaTitle'),
    description: t('metaDescription'),
    keywords: t('keywords'),
  };
}

export default async function AboutPage({ params: { locale } }: PageProps) {
  const t = await getTranslations({ locale, namespace: 'about' });

  return (
    <PageLayout title={t('title')} image={t('mainImage')}>
      <About />
    </PageLayout>
  );
}

