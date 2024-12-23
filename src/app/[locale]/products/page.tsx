
import Image from 'next/image'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl';
import PageLayout from '@/components/PageLayout';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import ProductPage from '@/components/ProductPage';
import { MapSection } from '@/components/MapSection';
type Props = {
  params: { locale: string };
};
// export async function generateMetadata({
//   params: { locale }
// }: Omit<Props, 'children'>) {
//   const t = await getTranslations({ locale, namespace: 'about' });

//   return {
//     title: t('metaTitle'),  
//     description: t('metaDescription')  
//   };
// }
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

