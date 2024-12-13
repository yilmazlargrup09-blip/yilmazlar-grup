import {useTranslations} from 'next-intl';
import PageLayout from './PageLayout';

export default function NotFoundPage() {
  const t = useTranslations('home');

  return (
    <PageLayout title={t('title')}>
      <p className="max-w-[460px]">{t('description')}</p>
    </PageLayout>
  );
}
