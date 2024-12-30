'use client'

import { ReactNode, useState, useEffect, useCallback } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { useTheme } from 'next-themes';
import LoadingScreen from '@/components/LoadingScreen';

export default function ClientSideLoader({ children }: { children: ReactNode }) {
  const [loading, setLoading] = useState(true);
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { theme, systemTheme } = useTheme();

  const startLoading = useCallback(() => {
    setLoading(true);
  }, []);

  const stopLoading = useCallback(() => {
    setLoading(false);
  }, []);

  useEffect(() => {
    startLoading();
    
    // Mikro gecikme ile loading'i false yapıyoruz
    const timer = setTimeout(() => {
      stopLoading();
      
      // Theme işlemlerini burada yapıyoruz
      const htmlElement = document.documentElement;
      htmlElement.classList.remove('light', 'dark');
      const currentTheme = theme === 'system' ? systemTheme : theme;
      htmlElement.classList.add(currentTheme || 'light');
    }, 0);

    return () => clearTimeout(timer);
  }, [pathname, searchParams, startLoading, stopLoading, theme, systemTheme]);

  useEffect(() => {
    startLoading();
    
    // Simulated content loading time
    const timer = setTimeout(stopLoading, 300);

    return () => clearTimeout(timer);
  }, [pathname, searchParams, startLoading, stopLoading]);

  if (loading) {
    return <LoadingScreen />;
  }

  return <>{children}</>;
}

