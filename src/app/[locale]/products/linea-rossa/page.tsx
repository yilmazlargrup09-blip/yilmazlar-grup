
import { useTranslations } from 'next-intl';
import PageLayout from '@/components/PageLayout';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { MapSection } from '@/components/MapSection';
import LineaRossaPage from '@/components/LineaRossa';

type Props = {
  params: { locale: string };
};

interface Category {
  id: string;
  name: string;
  metaTitle: string;
  metaDescription: string
  metaKeywords: []
}

export async function generateMetadata({
  params: { locale }
}: Omit<Props, 'children'>) {
  const t = await getTranslations({ locale, namespace: 'products' });

  // `categories`'i doğru şekilde almak için:
  const categories = t.raw('categories') as Category[];

  // 'linea-rossa-aluminium' kategorisini buluyoruz
  const lineaRossaCategory = categories.find(category => category.id === 'linea-rossa-aluminium');
  console.log(lineaRossaCategory)
  const metaTitle = lineaRossaCategory ? lineaRossaCategory.metaTitle : 'lineaRossaCategory';
  const metaDescription = lineaRossaCategory ? lineaRossaCategory.metaDescription : 'metaDescription';
  const metaKeywords = lineaRossaCategory ? lineaRossaCategory.metaKeywords.join(', ') : '';

  return {
    title: metaTitle,
    description: metaDescription,
    keywords: metaKeywords
  };
}

export default function LineaRossa({ params: { locale } }: Props) {
  setRequestLocale(locale);
  const t = useTranslations('products');
  const categories = t.raw('categories') as Category[]
  const categoryName = categories.length > 0 ? categories[0].name : 'Default Category';
  return (
    <PageLayout title={categoryName} image={t('mainImage')}>
      <LineaRossaPage />
      <MapSection />
    </PageLayout>
  )
}

