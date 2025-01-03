import { useLocale } from 'next-intl';
import BaseLayout from '@/components/BaseLayout';
import NotFoundPage from '@/components/NotFoundPage';

export default function GlobalNotFound() {
  const locale = useLocale();

  return (
    <BaseLayout locale={locale}>
      <NotFoundPage />
    </BaseLayout>
  );
}

