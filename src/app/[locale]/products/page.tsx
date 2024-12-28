
import { useTranslations } from 'next-intl';
import PageLayout from '@/components/PageLayout';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import ProductPage from '@/components/ProductPage';
import { MapSection } from '@/components/MapSection';
import { Metadata } from 'next';
type Props = {
  params: { locale: string };
};
export async function generateMetadata({ params: { locale } }: Props): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'products' });

  return {
    title: t('metaTitle'),  
    description: t('metaDescription'),
    keywords:t('keywords')
  };
}
export default function Products({ params: { locale } }: Props) {
  setRequestLocale(locale);
  const t = useTranslations('products');
  return (
    <PageLayout title={t('name')} image={t('mainImage')}>
      <ProductPage />
      <MapSection/>
    </PageLayout>
  )
}

