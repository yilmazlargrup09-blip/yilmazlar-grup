
import { useTranslations } from 'next-intl';
import PageLayout from '@/components/PageLayout';
import { setRequestLocale } from 'next-intl/server';
import { MapSection } from '@/components/MapSection';
import WinsaPage from '@/components/WinsaPage';
type Props = {
  params: { locale: string };
};
interface Category {
    name: string;
  }
// export async function generateMetadata({
//   params: { locale }
// }: Omit<Props, 'children'>) {
//   const t = await getTranslations({ locale, namespace: 'about' });

//   return {
//     title: t('metaTitle'),  
//     description: t('metaDescription')  
//   };
// }
export default function Winsa({ params: { locale } }: Props) {
  setRequestLocale(locale);
  const t = useTranslations('products');
  const categories = t.raw('categories') as Category[]
  const categoryName = categories.length > 0 ? categories[2].name : 'Default Category';
  return (
    <PageLayout title={categoryName} image={t('mainImage')}>
      <WinsaPage/>
      <MapSection/>
    </PageLayout>
  )
}

