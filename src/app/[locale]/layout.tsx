import { notFound } from 'next/navigation';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { ReactNode } from 'react';
import BaseLayout from '@/components/BaseLayout';
import { routing, Locale } from '@/i18n/routing';
import type { Metadata, ResolvingMetadata } from 'next'

type Props = {
  children: ReactNode;
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata(
  { params }: Omit<Props, 'children'>,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'LocaleLayout' });

  // Optionally access and extend (rather than replace) parent metadata
  const previousTitle = (await parent).title || '';

  return {
    title: `${t('title')} | ${previousTitle}`,
  };
}

export default async function LocaleLayout({
  children,
  params
}: Omit<Props, 'searchParams'>) {
  const { locale } = await params;

  // Ensure that the incoming `locale` is valid
  if (!routing.locales.includes(locale as Locale)) {
    notFound();
  }

  // Enable static rendering
  setRequestLocale(locale as Locale);

  return <BaseLayout locale={locale as Locale}>{children}</BaseLayout>;
}

