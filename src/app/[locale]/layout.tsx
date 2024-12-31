
import { getMessages, getTranslations, setRequestLocale } from 'next-intl/server';
import {  Suspense } from 'react';
import BaseLayout from '@/components/BaseLayout';
import ClientWrapper from '@/components/ClientWrapper';
import { routing, Locale } from '@/i18n/routing';
import type { Metadata, ResolvingMetadata } from 'next';
import LoadingScreen from '@/components/LoadingScreen';
import GlobalNotFound from '../not-found';

type Props = {
  children: React.ReactNode;
  params: {
    locale: string;
  };
};

export async function generateMetadata(
  { params }: { params: { locale: string } },
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { locale } = params;
  const t = await getTranslations({ locale, namespace: 'Layout' });

  // Optionally access and extend (rather than replace) parent metadata
  const previousKeywords = (await parent).keywords || [];

  return {
    title: t('metaTitle'),
    description: t('metaDescription'),
    keywords: [...(t('keywords', { defaultValue: '' }).split(',').map(keyword => keyword.trim())), ...previousKeywords],
  };
}

export default async function LocaleLayout({
  children,
  params,
}: Props) {
  const { locale } = await params; 

  if (!routing.locales.includes(locale as Locale)) {
    return <GlobalNotFound />;
  }

  const messages = await getMessages();
  setRequestLocale(locale as Locale);
  await new Promise(resolve => setTimeout(resolve, 1000));

  return (
    <Suspense fallback={<LoadingScreen />}>
      <ClientWrapper locale={locale as Locale} messages={messages}>
        <BaseLayout locale={locale as Locale}>
          {children}
        </BaseLayout>
      </ClientWrapper>
    </Suspense>
  );
}