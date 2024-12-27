
import { useTranslations } from 'next-intl';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { MapSection } from '@/components/MapSection';
import AlbertGenauPage from '@/components/AlbertGenau';
import ProductLayout from '@/components/ProductPageLayout';

type Props = {
  params: { locale: string };
};
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

export async function generateMetadata({
  params: { locale }
}: Omit<Props, 'children'>) {
  const t = await getTranslations({ locale, namespace: 'products' });

  // `categories`'i doğru şekilde almak için:
  const categories = t.raw('categories') as Category[];

  // 'linea-rossa-aluminium' kategorisini buluyoruz
  const AlbertGenauCategory = categories.find(category => category.id === 'albert-genau');

  const metaTitle = AlbertGenauCategory ? AlbertGenauCategory.metaTitle : 'Albert Genau ';
  const metaDescription = AlbertGenauCategory ? AlbertGenauCategory.metaDescription : 'Albert Genau';
  const metaKeywords = AlbertGenauCategory ? AlbertGenauCategory.metaKeywords : '';

  return {
    title: metaTitle,
    description: metaDescription,
    keywords: metaKeywords
  };
}


export default function AlbertGenau({ params: { locale } }: Props) {
  setRequestLocale(locale);
  const t = useTranslations('products');
  const categories = t.raw('categories') as Category[]
  const AlbertGenauCategory = categories.find(category => category.id === 'albert-genau');
  const title = AlbertGenauCategory ? AlbertGenauCategory.title : 'Albert Genau ';
  const subTitle = AlbertGenauCategory ? AlbertGenauCategory.subTitle : 'Albert Genau';
  const image = AlbertGenauCategory ? AlbertGenauCategory.mainImage : 'Albert Genau';
  return (
    <ProductLayout title={title} subTitle={subTitle} image={image}>
      <AlbertGenauPage />
      <MapSection />
    </ProductLayout>
  )
}

