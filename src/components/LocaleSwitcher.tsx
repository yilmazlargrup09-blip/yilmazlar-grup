'use client';

import clsx from 'clsx';
import { useParams } from 'next/navigation';
import { useTransition } from 'react';
import { Locale, usePathname, useRouter } from '@/i18n/routing';
import 'country-flag-icons/react/3x2'; // Bayrak stillerini yükleme
import { GB, TR, RU } from 'country-flag-icons/react/3x2'; // Bayrak bileşenlerini içe aktarma
import enMessages from '../../messages/en.json';
import trMessages from '../../messages/tr.json';
import ruMessages from '../../messages/ru.json';

type Props = {
  defaultValue: string;
  isScrolled: boolean;
};
interface Service {
  id: string;
  title: string;
  slug: string;
  metaTitle: string;
  metaDescription: string;
}

interface Params {
  slug?: string;
  id?: string;
}
export default function LocaleSwitcherSelect({
  defaultValue,
  isScrolled,
}: Props) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const pathname = usePathname();
  const params = useParams();



  function getServicesByLocale(locale: string): Service[] {
    switch (locale) {
      case 'tr':
        return trMessages.services.list; // tr.json
      case 'en':
        return enMessages.services.list; // en.json
      case 'ru':
        return ruMessages.services.list; // ru.json
      default:
        return [];
    }
  }

  function getServiceIdBySlug(slug: string, locale: string): string | null {
    const servicesList = getServicesByLocale(locale);

    const service = servicesList.find(service => service.slug === slug);


    return service ? service.id : null;
  }

  function onLocaleChange(newLocale: Locale) {
    startTransition(() => {
      const currentPathname = pathname;
      const currentParams: Params = { ...params };
      if (currentParams.slug) {
        // Mevcut slug'ı alın
        const currentSlug = currentParams.slug || '';
     

        // Mevcut slug'a göre ID'yi alın
        const currentServiceId = getServiceIdBySlug(currentSlug, defaultValue);


        if (currentServiceId) {
          // ID'ye göre yeni dildeki slug'ı bulun
          const newSlug = getServiceSlugById(currentServiceId, newLocale);
   

          if (newSlug) {
            // Yeni slug ile params güncelle
            currentParams.slug = newSlug;

            // Yeni rota ile yönlendirme yap
            router.replace(
              { pathname: currentPathname, params: currentParams as { slug: string } },
              { locale: newLocale }
            );

          }
        }
      } else {
        router.replace(
          // @ts-expect-error: TypeScript, params ve pathname'i doğrulayacak.
          { pathname, params },
          { locale: newLocale }
        );
      }


    });
  }
  function getServiceSlugById(serviceId: string, locale: string): string | null {
    const servicesList = getServicesByLocale(locale);

    const service = servicesList.find(service => service.id === serviceId);


    return service ? service.slug : null;
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
          className={`text-sm font-semibold ${isScrolled ? 'text-gray-700 dark:text-white' : 'text-white'
            }`}
        >
          {defaultValue.toUpperCase()}
        </span>
      </button>
    </div>
  );
}
