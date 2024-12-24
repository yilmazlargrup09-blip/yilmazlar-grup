'use client'

import { ReactNode, useState, useEffect, useCallback } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import LoadingScreen from '@/components/LoadingScreen';

export default function ClientSideLoader({ children }: { children: ReactNode }) {
  const [loading, setLoading] = useState(true);
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const startLoading = useCallback(() => {
    setLoading(true);
  }, []);

  const stopLoading = useCallback(() => {
    setLoading(false);
  }, []);

  useEffect(() => {
    startLoading();
    
    // Simüle edilmiş içerik yükleme süresi
    const timer = setTimeout(stopLoading, 300);

    return () => clearTimeout(timer);
  }, [pathname, searchParams, startLoading, stopLoading]);

  if (loading) {
    return <LoadingScreen />;
  }

  return <>{children}</>;
}

