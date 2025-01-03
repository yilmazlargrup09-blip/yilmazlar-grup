import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import { ReactNode } from 'react';
import BaseLayout from '@/components/BaseLayout';
import { routing, Locale } from '@/i18n/routing';
import type { Metadata } from 'next';

type Props = {
  children: ReactNode;
  params: { locale: string };
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata(
  { params: { locale } }: Props
): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'LocaleLayout' });

  return {
    title: t('title'),
  };
}

export default async function LocaleLayout({ children, params: { locale } }: Props) {
  // Validate that the incoming `locale` parameter is valid
  if (!routing.locales.includes(locale as Locale)) notFound();

  return (
    <BaseLayout locale={locale}>
      {children}
    </BaseLayout>
  );
}

