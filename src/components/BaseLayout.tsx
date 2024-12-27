import { Poppins } from 'next/font/google';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { ReactNode } from 'react';
import Navigation from '@/components/Navigation';
import { ThemeProvider } from './ThemeProvider';
import { Footer } from './Footer';
import ClientSideLoader from '@/components/ClientSideLoader';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '600', '700'],
  variable: '--font-poppins',
  display: "swap"
});

type Props = {
  children: ReactNode;
 locale: string 
};

export default async function BaseLayout({ children, locale }: Props) {
  const messages = await getMessages();

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className={`${poppins.variable} font-sans`} suppressHydrationWarning>
        <NextIntlClientProvider messages={messages}>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <ClientSideLoader>
              <Navigation />
              {children}
              <Footer />
            </ClientSideLoader>
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

