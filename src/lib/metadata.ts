import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

// Meta bilgilerini dinamik olarak sağlayan fonksiyon
export async function generateMetadataForPage(
  locale: string, 
  pageName: string
): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: pageName });

  return {
    title: t('metaTitle'),
    description: t('metaDescription'),
    keywords: t('keywords').split(',').map((keyword: string) => keyword.trim()),
  };
}
