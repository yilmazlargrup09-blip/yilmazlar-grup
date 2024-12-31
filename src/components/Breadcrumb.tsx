'use client';

import Link from 'next/link';
import { usePathname, useParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { ChevronRight } from 'lucide-react';

type Props = {
  title: string;
};

export function Breadcrumb({ title }: Props) {
  const t = useTranslations('breadcrumb');
  const pathname = usePathname();
  const params = useParams();
  const locale = params.locale as string;

  // Locale'i kaldır ve segmentleri ayıkla
  const pathWithoutLocale = pathname.replace(`/${locale}`, '');
  const segments = pathWithoutLocale.split('/').filter(Boolean);

  // Segment çevirileri
  const segmentTranslations: { [key: string]: string } = {
    urunler: t('products'),
    hakkimizda: t('about'),
    hizmetler: t('services'),
  };

  // İlk harfi büyük harf yap
  function capitalizeFirstLetter(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  return (
    <nav aria-label="Breadcrumb" className="text-sm mb-4">
      <ol className="list-none p-0 inline-flex">
        {/* Ana Sayfa */}
        <li className="flex items-center">
          <Link
            href={`/${locale}`}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          >
            {t('home')}
          </Link>
        </li>

        {/* Segmentler */}
        {segments.map((segment, index) => {
          const href = `/${locale}/${segments.slice(0, index + 1).join('/')}`;
          const isLast = index === segments.length - 1;
          const translatedSegment =
            segmentTranslations[segment] || capitalizeFirstLetter(segment);

          return (
            <li key={segment} className="flex items-center">
              <ChevronRight className="h-4 w-4 text-gray-400 mx-2" />
              {isLast ? (
                <span className="text-red-600" aria-current="page">
                  {title || translatedSegment}
                </span>
              ) : (
                <Link
                  href={href}
                  className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                >
                  {translatedSegment}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
