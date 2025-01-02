import { notFound } from 'next/navigation';
import { getMessages, getTranslations, setRequestLocale } from 'next-intl/server';
import { ReactNode, Suspense } from 'react';
import BaseLayout from '@/components/BaseLayout';
import { routing, Locale } from '@/i18n/routing';
import type { Metadata, ResolvingMetadata } from 'next';
import LoadingScreen from '@/components/LoadingScreen';
import { NextIntlClientProvider } from 'next-intl';
import { Poppins } from 'next/font/google';

type Props = {
  children: ReactNode;
  params: Promise<{ locale: string }>;

};
const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '600', '700'],
  variable: '--font-poppins',
  display: 'swap',
});

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
  const messages = await getMessages();
  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        <meta name="google-site-verification" content="googleae1ab6bc1b2473b9.html" />
      </head>
      <body className={`${poppins.variable} font-sans`} suppressHydrationWarning>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <Suspense fallback={<LoadingScreen />}>
            <BaseLayout locale={locale as Locale}>
              {children}
            </BaseLayout>
          </Suspense>
        </NextIntlClientProvider>
      </body>
    </html>

  );
}

