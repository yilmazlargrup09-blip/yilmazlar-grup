import About from '@/components/about';
import PageLayout from '@/components/PageLayout';
import { useTranslations } from 'next-intl';
import { getTranslations, setRequestLocale } from 'next-intl/server';

type Params = {
  locale: string;
};

type Props = {
  params: Promise<Params>; // Promise olarak tanımlandı.
};

export async function generateMetadata({
  params,
}: Omit<Props, 'children'>) {
  const { locale } = await params; // Promise çözülüyor.
  const t = await getTranslations({ locale, namespace: 'about' });

  return {
    title: t('metaTitle'),
    description: t('metaDescription'),
    keywords: t('keywords'),
  };
}

export default async function AboutPage({ params }: Props) {
  const { locale } = await params; // Promise çözülüyor.

  // Enable static rendering
  setRequestLocale(locale);

  const t = useTranslations('about');

  return (
    <PageLayout title={t('title')} image={t('mainImage')}>
      <About />
    </PageLayout>
  );
}
