
import { useTranslations } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import { MapSection } from '@/components/MapSection';
import WinsaPage from '@/components/WinsaPage';
import ProductLayout from '@/components/ProductPageLayout';
type Props = {
  params: { locale: string };
};
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

export default function Winsa({ params: { locale } }: Props) {
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

