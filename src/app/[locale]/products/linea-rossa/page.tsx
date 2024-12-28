
import { useTranslations } from 'next-intl';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { MapSection } from '@/components/MapSection';
import LineaRossaPage from '@/components/LineaRossa';
import ProductLayout from '@/components/ProductPageLayout';
import { Metadata, ResolvingMetadata } from 'next';

type Props = {
  params: Promise<{ locale: string }>
}

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


export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'products' });

  // `categories`'i doğru şekilde almak için:
  const categories = t.raw('categories') as Category[];

  // 'albert-genau' kategorisini buluyoruz
  const lineaRossaCategory = categories.find(category => category.id === 'linea-rossa-aluminium');

  const metaTitle = lineaRossaCategory?.metaTitle || 'Linea Rossa';
  const metaDescription = lineaRossaCategory?.metaDescription || 'Linea Rossa';
  const metaKeywords = lineaRossaCategory?.metaKeywords || '';

  // Optionally access and extend (rather than replace) parent metadata
  const previousKeywords = (await parent).keywords || [];

  // Handle metaKeywords whether it's a string or an array
  const keywordsArray = Array.isArray(metaKeywords) 
    ? metaKeywords 
    : typeof metaKeywords === 'string' 
      ? metaKeywords.split(',').map(keyword => keyword.trim())
      : [];

  return {
    title: metaTitle,
    description: metaDescription,
    keywords: [...keywordsArray, ...previousKeywords],
  };
}
export default async function LineaRossa({ params }: Props) {
  const { locale } = await params;
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

