import { notFound } from 'next/navigation';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { ReactNode, Suspense } from 'react';
import BaseLayout from '@/components/BaseLayout';
import { routing, Locale } from '@/i18n/routing';
import type { Metadata, ResolvingMetadata } from 'next';
import LoadingScreen from '@/components/LoadingScreen';
import ClientWrapper from '@/components/ClientWrapper';

type Props = {
  children: ReactNode;
  params: Promise<{ locale: string }>;
  
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'indexPage' });

  const previousKeywords = (await parent).keywords || [];

  return {
    title: t('metaTitle'),
    description: t('metaDescription'),
    keywords: [...(t('keywords').split(',').map(keyword => keyword.trim())), ...previousKeywords],
  };
}

export default async function LocaleLayout({
  children,
  params
}: Props) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as Locale)) {
    notFound();
  }
  setRequestLocale(locale as Locale);
  await new Promise(resolve => setTimeout(resolve, 1000));

  return (
    <Suspense fallback={<LoadingScreen />}>
    <ClientWrapper locale={locale as Locale}> {/* Wrap the children with ClientWrapper */}
      <BaseLayout locale={locale as Locale}>
        {children}
      </BaseLayout>
    </ClientWrapper>
  </Suspense>
  );
}

