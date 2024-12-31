
import { ReactNode } from 'react';
import Navigation from '@/components/Navigation';
import { ThemeProvider } from './ThemeProvider';
import { Footer } from './Footer';

type Props = {
  children: ReactNode;
  locale: string;
};

export default async function BaseLayout({ children }: Props) {

  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
    <Navigation />
    <main>{children}</main>
    <Footer />
  </ThemeProvider>
);
}