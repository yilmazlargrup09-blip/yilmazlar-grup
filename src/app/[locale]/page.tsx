import {useTranslations} from 'next-intl';
import {setRequestLocale} from 'next-intl/server';
import PageLayout from '@/components/PageLayout';
import Hero from '@/components/Hero';
import FranchisesPage from './franchises/page';

type Props = {
  params: {locale: string};
};

export default function IndexPage({params: {locale}}: Props) {
  // Enable static rendering
  setRequestLocale(locale);

  const t = useTranslations('home');

  return (
    <main className="min-h-screen bg-gray-100 dark:bg-gray-900">
    <Hero />
    <FranchisesPage />
    {/* <Services />
    <ContactBanner /> */}
  </main>
  );
}
