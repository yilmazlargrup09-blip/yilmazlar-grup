import About from '@/components/about';
import PageLayout from '@/components/PageLayout';
import { useTranslations } from 'next-intl';
import {setRequestLocale } from 'next-intl/server';

type Props = {
  params: { locale: string };
};
// export async function generateMetadata({
//   params: { locale }
// }: Omit<Props, 'children'>) {
//   const t = await getTranslations({ locale, namespace: 'about' });

//   return {
//     title: t('metaTitle'),  
//     description: t('metaDescription'),
//     keywords:t('keywords')
//   };
// }
export default function AboutPage({ params: { locale } }: Props) {
  // Enable static rendering
  setRequestLocale(locale);

  const t = useTranslations('about');

  return (
    <PageLayout title={t('title')} image={t('mainImage')}>
      <About />
    </PageLayout>

  );
}
