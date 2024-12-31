'use client';

import { ReactNode, useState, useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { AbstractIntlMessages, NextIntlClientProvider } from 'next-intl';
import LoadingScreen from './LoadingScreen';

type Props = {
  children: ReactNode;
  locale: string;
  messages: AbstractIntlMessages
};

export default function ClientWrapper({ children, locale, messages }: Props) {
  const [loading, setLoading] = useState(true);
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    // This effect runs whenever the pathname or searchParams change
    setLoading(true);

    // Simulate loading completion after a short delay
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    // Cleanup the timer on component unmount or before the next effect
    return () => clearTimeout(timer);
  }, [pathname, searchParams]);

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      {children}
    </NextIntlClientProvider>
  );
}
