import { notFound } from 'next/navigation';
import { getMessages, getTranslations, setRequestLocale } from 'next-intl/server';
import { ReactNode, Suspense } from 'react';
import BaseLayout from '@/components/BaseLayout';
import ClientWrapper from '@/components/ClientWrapper';
import { routing, Locale } from '@/i18n/routing';
import type { Metadata, ResolvingMetadata } from 'next';
import LoadingScreen from '@/components/LoadingScreen';

type Props = {
  children: ReactNode;
  params: Promise<{ locale: string }>;
};

// `generateStaticParams` fonksiyonu ile dinamik olarak tüm diller için parametreler oluşturuluyor.
export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

// Sayfa metadata'sını dinamik olarak oluşturmak
export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'indexPage' });

  // Varsayılan metadata'ya eklemeler yapmak
  const previousKeywords = (await parent).keywords || [];

  return {
    title: t('metaTitle'),
    description: t('metaDescription'),
    keywords: [...(t('keywords').split(',').map(keyword => keyword.trim())), ...previousKeywords],
  };
}

export default async function LocaleLayout({
  children,
  params,
}: Props) {
  const { locale } = await params; // No need for await here

  // `locale`'ün geçerli olduğundan emin olunuyor
  if (!routing.locales.includes(locale as Locale)) {
    notFound();  // Geçersiz locale ile karşılaşıldığında sayfa bulunamadı
  }

  const messages = await getMessages(); // Sunucu tarafında mesajlar alınıyor
  setRequestLocale(locale as Locale); // Locale ayarları yapılır
  await new Promise(resolve => setTimeout(resolve, 1000));

  return (
    // `Suspense` burada async bileşenler yüklenene kadar bekler
    <Suspense fallback={<LoadingScreen />}>
      <ClientWrapper locale={locale as Locale} messages={messages}>
        <BaseLayout locale={locale as Locale}>
          {children}
        </BaseLayout>
      </ClientWrapper>
    </Suspense>
  );
}
