import { Poppins } from 'next/font/google';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { ReactNode } from 'react';
import Navigation from '@/components/Navigation';
import { ThemeProvider } from './ThemeProvider';
import { Footer } from './Footer';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '600', '700'],
  variable: '--font-poppins',
  display:"swap"
});

type Props = {
  children: ReactNode;
  locale: string;
};

export default async function BaseLayout({ children, locale }: Props) {
  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();

  return (
    <html className="h-full light" style={{colorScheme: 'light'}} lang={locale}>
      <body className={`${poppins.variable} font-sans`}>
        <NextIntlClientProvider messages={messages}>
          <ThemeProvider  attribute="class" defaultTheme="light">
            <Navigation />
            {children}
            <Footer/>
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
