
import { useTranslations } from 'next-intl';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { MapSection } from '@/components/MapSection';
import LineaRossaPage from '@/components/LineaRossa';
import ProductLayout from '@/components/ProductPageLayout';
import { Metadata } from 'next';

type Props = {
  params: { locale: string };
};

interface Category {
  id: string;
  name: string;
  subTitle: string; 
  mainImage: string;
  title: string;
  metaTitle: string;
  metaDescription: string
  metaKeywords: []
}

export async function generateMetadata({ params: { locale } }: Props): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'products' });

  // `categories`'i doğru şekilde almak için:
  const categories = t.raw('categories') as Category[];

  // 'linea-rossa-aluminium' kategorisini buluyoruz
  const lineaRossaCategory = categories.find(category => category.id === 'linea-rossa-aluminium');
  console.log(lineaRossaCategory)
  const metaTitle = lineaRossaCategory ? lineaRossaCategory.metaTitle : 'lineaRossaCategory';
  const metaDescription = lineaRossaCategory ? lineaRossaCategory.metaDescription : 'metaDescription';
  const metaKeywords = lineaRossaCategory ? lineaRossaCategory.metaKeywords: '';

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
  const LineaRossaAluminiumCategory = categories.find(category => category.id === 'linea-rossa-aluminium');
  const title = LineaRossaAluminiumCategory ? LineaRossaAluminiumCategory.title : 'Linea Rossa Aluminium';
  const subTitle = LineaRossaAluminiumCategory ? LineaRossaAluminiumCategory.subTitle : 'Linea Rossa Aluminium';
  const image = LineaRossaAluminiumCategory ? LineaRossaAluminiumCategory.mainImage : 'Linea Rossa Aluminium';
  return (
    <ProductLayout title={title} subTitle={subTitle} image={image}>
      <LineaRossaPage />
      <MapSection />
    </ProductLayout>
  )
}

