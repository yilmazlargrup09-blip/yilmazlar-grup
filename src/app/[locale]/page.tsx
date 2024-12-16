import {useTranslations} from 'next-intl';
import {setRequestLocale} from 'next-intl/server';
import Hero from '@/components/Hero';
import { Services } from '@/components/Services';
import { Franchises } from '@/components/Franchises';
import PartnersSection from '@/components/PartnersSection';

type Props = {
  params: {locale: string};
};

export default function IndexPage({params: {locale}}: Props) {
  // Enable static rendering
  setRequestLocale(locale);



  return (
    <main className="min-h-screen bg-white dark:bg-brown-900">
    <Hero />
    <Franchises/>
    <Services />
    <PartnersSection/>
    {/* 
    <ContactBanner /> */}
  </main>
  );
}
