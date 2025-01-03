import BaseLayout from '@/components/BaseLayout';
import NotFoundPage from '@/components/NotFoundPage';

type Props = {
  params: Promise<{ locale: string }>;

};
export default async function  GlobalNotFound({
  params
}: Props) {
  const { locale } = await params;
  return (
    <BaseLayout locale={locale}>
      <NotFoundPage />
    </BaseLayout>
  );
}
