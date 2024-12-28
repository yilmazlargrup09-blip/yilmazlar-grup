
import { useTranslations } from 'next-intl';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { MapSection } from '@/components/MapSection';
import WinsaPage from '@/components/WinsaPage';
import ProductLayout from '@/components/ProductPageLayout';
import { Metadata, ResolvingMetadata } from 'next';
type Props = {
  params: Promise<{ locale: string }>
}
interface Category {
  id: string;
  name: string;
  mainImage: string;
  subTitle: string;
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

  const categories = t.raw('categories') as Category[];

  const winsaCategory = categories.find(category => category.id === 'winsa');

  const metaTitle = winsaCategory?.metaTitle || 'Winsa';
  const metaDescription = winsaCategory?.metaDescription || 'Winsa';
  const metaKeywords = winsaCategory?.metaKeywords || '';

  const previousKeywords = (await parent).keywords || [];

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
export default async function Winsa({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = useTranslations('products');
  const categories = t.raw('categories') as Category[]
  const WinsaCategory = categories.find(category => category.id === 'winsa');
  const title = WinsaCategory ? WinsaCategory.title : 'Winsa';
  const subTitle = WinsaCategory ? WinsaCategory.subTitle : 'Winsa';
  const image = WinsaCategory ? WinsaCategory.mainImage : 'Winsa';
  return (

    <ProductLayout title={title} subTitle={subTitle} image={image}>
      <WinsaPage />
      <MapSection />
    </ProductLayout>
  )
}

