import { ReactNode } from 'react';
import './globals.css'
import { Poppins } from 'next/font/google';

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

export default function RootLayout({ children,locale }: Props) {
  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        <meta name="google-site-verification" content="googleae1ab6bc1b2473b9.html" />
      </head>
      <body className={`${poppins.variable} font-sans`} suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}

