
import { getTranslations} from 'next-intl/server';
import { MapSection } from '@/components/MapSection';
import AlbertGenauPage from '@/components/AlbertGenau';
import ProductLayout from '@/components/ProductPageLayout';
import { Metadata, ResolvingMetadata } from 'next';

type Props = {
  params: Promise<{ locale: string }>
}
interface Category {
  id: string;
  name: string;
  mainImage: string;
  subTitle:string;
  title:string;
  metaTitle:string;
  metaDescription:string
  metaKeywords:[]
}

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  // `params`'ı doğru şekilde bekliyoruz
  const { locale } = await params;

  const t = await getTranslations({ locale, namespace: 'products' });

  // `categories`'i doğru şekilde almak için
  const categories = t.raw('categories') as Category[];

  // 'albert-genau' kategorisini buluyoruz
  const AlbertGenauCategory = categories.find(category => category.id === 'albert-genau');

  const metaTitle = AlbertGenauCategory?.metaTitle || 'Albert Genau';
  const metaDescription = AlbertGenauCategory?.metaDescription || 'Albert Genau';
  const metaKeywords = AlbertGenauCategory?.metaKeywords || '';

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

export default async function AlbertGenau({ params }: Props) {
  const { locale } = await params;

  const t = await getTranslations({ locale, namespace: 'products' });
  const categories = t.raw('categories') as Category[];
  const AlbertGenauCategory = categories.find(category => category.id === 'albert-genau');
  const title = AlbertGenauCategory ? AlbertGenauCategory.title : 'Albert Genau';
  const subTitle = AlbertGenauCategory ? AlbertGenauCategory.subTitle : 'Albert Genau';
  const image = AlbertGenauCategory ? AlbertGenauCategory.mainImage : 'Albert Genau';
  return (
    <ProductLayout title={title} subTitle={subTitle} image={image}>
      <AlbertGenauPage />
      <MapSection />
    </ProductLayout>
  )
}

