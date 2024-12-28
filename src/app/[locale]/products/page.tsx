
import { useTranslations } from 'next-intl';
import PageLayout from '@/components/PageLayout';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import ProductPage from '@/components/ProductPage';
import { MapSection } from '@/components/MapSection';
import { Metadata, ResolvingMetadata } from 'next';
type Props = {
  params: Promise<{ locale: string }>
}

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'products' });

  // Optionally access and extend (rather than replace) parent metadata
  const previousKeywords = (await parent).keywords || [];

  return {
    title: t('metaTitle'),
    description: t('metaDescription'),
    keywords: [...(t('keywords').split(',').map(keyword => keyword.trim())), ...previousKeywords],
  };
}

export default async function Products({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = useTranslations('products');
  return (
    <PageLayout title={t('name')} image={t('mainImage')}>
      <ProductPage />
      <MapSection/>
    </PageLayout>
  )
}

