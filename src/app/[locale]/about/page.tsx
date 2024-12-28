import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import About from '@/components/about';
import PageLayout from '@/components/PageLayout';

type Props = {
  params: { locale: string };
};

export async function generateMetadata({ params: { locale } }: Props): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'about' });

  return {
    title: t('metaTitle'),
    description: t('metaDescription'),
    keywords: t('keywords'),
  };
}

export default async function AboutPage({ params: { locale } }: Props) {
  const t = await getTranslations({ locale, namespace: 'about' });

  return (
    <PageLayout title={t('title')} image={t('mainImage')}>
      <About />
    </PageLayout>
  );
}

