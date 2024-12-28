
import {getTranslations} from 'next-intl/server';
import { Services } from '@/components/Services';
import ProductLayout from '@/components/ProductPageLayout';
import { Metadata, ResolvingMetadata } from 'next';

type Props = {
  params: Promise<{ locale: string }>
}
export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'services' });

  // Optionally access and extend (rather than replace) parent metadata
  const previousKeywords = (await parent).keywords || [];

  return {
    title: t('metaTitle'),
    description: t('metaDescription'),
    keywords: [...previousKeywords],
  };
}

export default async function ServicesPage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'services' });

  return (
    <ProductLayout title={t('title')} subTitle={t('subTitle')} image={t('mainImage')}>
     <Services/>
    </ProductLayout>
  );
}
