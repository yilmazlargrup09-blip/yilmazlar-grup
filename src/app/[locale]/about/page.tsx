import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import About from '@/components/about';
import PageLayout from '@/components/PageLayout';

type Params = {
  locale: string;
};

type SearchParams = { [key: string]: string | string[] | undefined };

type PageProps = {
  params: Params;
  searchParams: SearchParams;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = params;
  const t = await getTranslations({ locale, namespace: 'about' });

  return {
    title: t('metaTitle'),
    description: t('metaDescription'),
    keywords: t('keywords'),
  };
}

export default async function AboutPage({ params }: PageProps) {
  const { locale } = params;
  const t = await getTranslations({ locale, namespace: 'about' });

  return (
    <PageLayout title={t('title')} image={t('mainImage')}>
      <About />
    </PageLayout>
  );
}
