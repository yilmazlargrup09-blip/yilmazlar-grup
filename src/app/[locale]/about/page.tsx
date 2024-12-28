import About from '@/components/about';
import PageLayout from '@/components/PageLayout';
import { useTranslations } from 'next-intl';
import { getTranslations, setRequestLocale } from 'next-intl/server';

type Params = {
  locale: string;
};

type Props = {
  params: Params; // Artık Promise değil, doğrudan nesne.
};

export async function generateMetadata({
  params: { locale },
}: Omit<Props, 'children'>) {
  const t = await getTranslations({ locale, namespace: 'about' });

  return {
    title: t('metaTitle'),
    description: t('metaDescription'),
    keywords: t('keywords'),
  };
}

export default function AboutPage({ params: { locale } }: Props) {
  // Set locale for server-side rendering
  setRequestLocale(locale);

  // useTranslations can be used directly here because AboutPage is not async
  const t = useTranslations('about');

  return (
    <PageLayout title={t('title')} image={t('mainImage')}>
      <About />
    </PageLayout>
  );
}
