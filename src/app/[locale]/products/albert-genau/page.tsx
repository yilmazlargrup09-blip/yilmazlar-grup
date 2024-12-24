
import { useTranslations } from 'next-intl';
import PageLayout from '@/components/PageLayout';
import { setRequestLocale } from 'next-intl/server';
import { MapSection } from '@/components/MapSection';
import AlbertGenauPage from '@/components/AlbertGenau';

type Props = {
  params: { locale: string };
};
interface Category {
    name: string;
  }

export default function LineaRossa({ params: { locale } }: Props) {
  setRequestLocale(locale);
  const t = useTranslations('products');
  const categories = t.raw('categories') as Category[]
  const categoryName = categories.length > 0 ? categories[1].name : 'Default Category';
  return (
    <PageLayout title={categoryName} image={t('mainImage')}>
      <AlbertGenauPage/>
      <MapSection/>
    </PageLayout>
  )
}

