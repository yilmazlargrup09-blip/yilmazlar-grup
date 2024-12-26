import {useTranslations} from 'next-intl';
import {setRequestLocale} from 'next-intl/server';
import PageLayout from '@/components/PageLayout';
import { Services } from '@/components/Services';
import ProductLayout from '@/components/ProductPageLayout';

type Props = {
  params: {locale: string};
};

export default function ServicesPage({params: {locale}}: Props) {
  // Enable static rendering
  setRequestLocale(locale);

  const t = useTranslations('services');

  return (
    <ProductLayout title={t('title')} subTitle={t('subTitle')} image={t('mainImage')}>
     <Services/>
    </ProductLayout>
  );
}
