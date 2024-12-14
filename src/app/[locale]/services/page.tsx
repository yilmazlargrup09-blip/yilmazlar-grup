import {useTranslations} from 'next-intl';
import {setRequestLocale} from 'next-intl/server';
import PageLayout from '@/components/PageLayout';
import { Services } from '@/components/Services';

type Props = {
  params: {locale: string};
};

export default function ServicesPage({params: {locale}}: Props) {
  // Enable static rendering
  setRequestLocale(locale);

  const t = useTranslations('services');

  return (
    <PageLayout title={t('title')} image={t('mainImage')}>
     <Services/>
    </PageLayout>
  );
}
