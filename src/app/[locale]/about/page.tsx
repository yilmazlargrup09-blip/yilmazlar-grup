import About from '@/components/about';
import PageLayout from '@/components/PageLayout';
import { useTranslations } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';

type Props = {
  params: { locale: string };
};

export default function PathnamesPage({ params: { locale } }: Props) {
  // Enable static rendering
  setRequestLocale(locale);

  const t = useTranslations('about');

  return (
   <PageLayout title={t('title')} image={t('mainImage')}>
    <About/>
    </PageLayout>

  );
}
