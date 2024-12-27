'use client'

import { ReactNode, useState, useEffect, useCallback } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { useTheme } from 'next-themes';
import LoadingScreen from '@/components/LoadingScreen';

export default function ClientSideLoader({ children }: { children: ReactNode }) {
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { theme, systemTheme} = useTheme();

  const startLoading = useCallback(() => {
    setLoading(true);
  }, []);

  const stopLoading = useCallback(() => {
    setLoading(false);
  }, []);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    startLoading();
    
    // Simulated content loading time
    const timer = setTimeout(stopLoading, 300);

    return () => clearTimeout(timer);
  }, [pathname, searchParams, startLoading, stopLoading]);

  useEffect(() => {
    if (mounted) {
      const htmlElement = document.documentElement;
      htmlElement.classList.remove('light', 'dark');
      const currentTheme = theme === 'system' ? systemTheme : theme;
      htmlElement.classList.add(currentTheme || 'light');
    }
  }, [theme, systemTheme, mounted]);

  if (!mounted) return null;

  if (loading) {
    return <LoadingScreen />;
  }

  return <>{children}</>;
}
