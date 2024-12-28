
import Contact from '@/components/Contact';
import PageLayout from '@/components/PageLayout';
import { Metadata } from 'next';
import { useTranslations } from 'next-intl';
import { getTranslations, setRequestLocale } from 'next-intl/server';

type Props = {
    params: { locale: string };
};
export async function generateMetadata({ params: { locale } }: Props): Promise<Metadata> {
    const t = await getTranslations({ locale, namespace: 'contact' });
  
    return {
      title: t('metaTitle'),  
      description: t('metaDescription')  ,
      keywords:t('keywords')
    };
  }
export default function PathnamesPage({ params: { locale } }: Props) {
    // Enable static rendering
    setRequestLocale(locale);

    const t = useTranslations('contact');

    return (
        <PageLayout title={t('title')} image={t('mainImage')}>
            <Contact />
        </PageLayout>

    );
}
