'use client';

import clsx from 'clsx';
import { useParams } from 'next/navigation';
import { useTransition } from 'react';
import { Locale, usePathname, useRouter } from '@/i18n/routing';
import 'country-flag-icons/react/3x2'; // Bayrak stillerini yükleme
import { GB, TR, RU } from 'country-flag-icons/react/3x2'; // Bayrak bileşenlerini içe aktarma


type Props = {
  defaultValue: string;
  isScrolled: boolean;
};

export default function LocaleSwitcherSelect({
  defaultValue,
  isScrolled,
}: Props) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const pathname = usePathname();
  const params = useParams();

  function onLocaleChange(newLocale: Locale) {
    startTransition(() => {
      router.replace(
        // @ts-expect-error: TypeScript, params ve pathname'i doğrulayacak.
        { pathname, params },
        { locale: newLocale }
      );
    });
  }

 
  // Dilleri sırayla değiştirme mantığı
  function getNextLocale(locale: string) {
    return locale === 'tr' ? 'en' : locale === 'en' ? 'ru' : 'tr';
  }

  // Bayrak bileşenini döndüren fonksiyon
  function getFlagComponent(locale: string) {
    switch (locale) {
      case 'en':
        return <GB title="English" className="w-6 h-4 rounded-sm" />;
      case 'tr':
        return <TR title="Türkçe" className="w-6 h-4 rounded-sm" />;
      case 'ru':
        return <RU title="Русский" className="w-6 h-4 rounded-sm" />;
      default:
        return null;
    }
  }

  return (
    <div className="relative">
      {/* Bayrak ve Dil Düğmesi */}
      <button
        onClick={() => {
          const nextLocale = getNextLocale(defaultValue);
          onLocaleChange(nextLocale);
        }}
        className={clsx(
          'flex items-center gap-2 p-1 focus:outline-none  border-b-2 border-white ',
          isPending && 'transition-opacity opacity-50 cursor-not-allowed',
          isScrolled
            ? ' dark:bg-gray-800 dark:hover:bg-gray-700 border-gray-900'
            : ''
        )}
        disabled={isPending}
      >
        {/* Bayrak */}
        {getFlagComponent(defaultValue)}
        {/* Dil Kodu */}
        <span
          className={`text-sm font-semibold ${
            isScrolled ? 'text-gray-700 dark:text-white' : 'text-white'
          }`}
        >
          {defaultValue.toUpperCase()}
        </span>
      </button>
    </div>
  );
}
