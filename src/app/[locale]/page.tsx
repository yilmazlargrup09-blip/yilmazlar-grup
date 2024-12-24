
import { getTranslations, setRequestLocale } from 'next-intl/server';
import Hero from '@/components/Hero';
import { Services } from '@/components/Services';
import { Franchises } from '@/components/Franchises';
import PartnersSection from '@/components/PartnersSection';
import { MapSection } from '@/components/MapSection';

type Props = {
  params: { locale: string };
};

export async function generateMetadata({
  params: { locale }
}: Omit<Props, 'children'>) {
  const t = await getTranslations({ locale, namespace: 'indexPage' });

  return {
    title: t('metaTitle'),
    description: t('metaDescription'),
    keywords:t('keywords')
  };
}
export default function IndexPage({ params: { locale } }: Props) {
  // Enable static rendering
  setRequestLocale(locale);



  return (
    <main className="min-h-screen bg-white dark:bg-brown-900">
      <Hero />
      <Franchises />
      <Services />
      <MapSection />
      <PartnersSection />
    </main>
  );
}
