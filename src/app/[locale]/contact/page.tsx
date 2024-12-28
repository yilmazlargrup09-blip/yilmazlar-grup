
import Contact from '@/components/Contact';
import PageLayout from '@/components/PageLayout';
import { Metadata, ResolvingMetadata } from 'next';
import { useTranslations } from 'next-intl';
import { getTranslations, setRequestLocale } from 'next-intl/server';

type Props = {
    params: Promise<{ locale: string }>
  }
export async function generateMetadata(
    { params }: Props,
    parent: ResolvingMetadata
  ): Promise<Metadata> {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'contact' });
  
    // Optionally access and extend (rather than replace) parent metadata
    const previousKeywords = (await parent).keywords || [];
  
    return {
      title: t('metaTitle'),
      description: t('metaDescription'),
      keywords: [...(t('keywords').split(',').map(keyword => keyword.trim())), ...previousKeywords],
    };
  }
  export default async function PathnamesPage({ params }: Props) {
    const { locale } = await params;
    setRequestLocale(locale);

    const t = useTranslations('contact');

    return (
        <PageLayout title={t('title')} image={t('mainImage')}>
            <Contact />
        </PageLayout>

    );
}
