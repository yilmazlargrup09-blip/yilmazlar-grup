import { ReactNode, Suspense } from 'react';
import { Poppins } from 'next/font/google';
import { NextIntlClientProvider } from 'next-intl';
import { useMessages } from 'next-intl';
import Navigation from '@/components/Navigation';
import { ThemeProvider } from './ThemeProvider';
import { Footer } from './Footer';
import LoadingScreen from './LoadingScreen';
const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '600', '700'],
  variable: '--font-poppins',
  display: 'swap',
});

type Props = {
  children: ReactNode;
  locale: string;
};

export default function BaseLayout({ children, locale }: Props) {
  const messages = useMessages();

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className={`${poppins.variable} font-sans`} suppressHydrationWarning>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <Navigation />
            <Suspense fallback={<LoadingScreen />}>
              <main>{children}</main>
            </Suspense>
            <Footer />
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

