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

  return (
    <div className="relative">
      <button
        onClick={() => onLocaleChange(defaultValue as Locale)}
        className={clsx(
          'text-gray-400 p-2 rounded-full focus:outline-none',
          isPending && 'transition-opacity opacity-30'
        )}
        disabled={isPending}
      >
        <SlGlobe className="text-2xl" /> {/* Globe Icon */}
      </button>

      {/* Optional: Dropdown of locale buttons with small red badge */}
      <div className="absolute top-0 right-0 mt-2 bg-white shadow-lg rounded-md">
        <button
          onClick={() => onLocaleChange('tr')}
          className="px-4 py-2 relative"
        >
          {/* Red badge inside the button */}
          <span className="absolute top-0 right-0 -mt-1 -mr-1 bg-red-600 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
            🇹🇷
          </span>
        </button>
        <button
          onClick={() => onLocaleChange('en')}
          className="px-4 py-2 relative"
        >
          {/* Red badge inside the button */}
          <span className="absolute top-0 right-0 -mt-1 -mr-1 bg-red-600 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
            🇺🇸
          </span>
        </button>
        <button
          onClick={() => onLocaleChange('ru')}
          className="px-4 py-2 relative"
        >
          {/* Red badge inside the button */}
          <span className="absolute top-0 right-0 -mt-1 -mr-1 bg-red-600 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
            🇷🇺
          </span>
        </button>
      </div>
    </div>
  );
}
