'use client';

import clsx from 'clsx';
import { useParams } from 'next/navigation';
import { useTransition } from 'react';
import { Locale, usePathname, useRouter } from '@/i18n/routing';
import { SlGlobe } from 'react-icons/sl';

type Props = {
  defaultValue: string;
};

export default function LocaleSwitcherSelect({
  defaultValue,
}: Props) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const pathname = usePathname();
  const params = useParams();

  // Function to handle language change
  function onLocaleChange(newLocale: Locale) {
    startTransition(() => {
      router.replace(
        // @ts-expect-error -- TypeScript will validate that only known `params`
        // are used in combination with a given `pathname`. Since the two will
        // always match for the current route, we can skip runtime checks.
        { pathname, params },
        { locale: newLocale }
      );
    });
  }

  // Function to get the current language badge
  function getLanguageBadge(locale: string) {
    switch (locale) {
      case 'en':
        return 'EN';
      case 'tr':
        return 'TR';
      case 'ru':
        return 'RU';
      default:
        return '';
    }
  }

  return (
    <div className="relative">
      {/* Globe Icon Button with Current Language Badge */}
      <button
        onClick={() => {
          // Toggle between locales, for example: 'en' -> 'tr' -> 'ru' -> 'en'
          const nextLocale =
            defaultValue === 'en'
              ? 'tr'
              : defaultValue === 'tr'
              ? 'ru'
              : 'en';
          onLocaleChange(nextLocale);
        }}
        className={clsx(
          'text-gray-400 p-2 rounded-full focus:outline-none',
          isPending && 'transition-opacity opacity-30'
        )}
        disabled={isPending}
      >
        <SlGlobe className="text-2xl text-red-900" /> {/* Globe Icon */}

        {/* Current Language Badge */}
        <span className="absolute top-2 right-1 -mt-1 -mr-1 bg-red-600 text-white  rounded-full w-4 h-4 flex items-center justify-center"  style={{ fontSize: '8px' }}>
          {getLanguageBadge(defaultValue)}
        </span>
      </button>
    </div>
  );
}
