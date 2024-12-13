import { createNavigation } from 'next-intl/navigation';
import { defineRouting } from 'next-intl/routing';

// Çok dilli routing yapılandırması
export const routing = defineRouting({
  locales: ['en', 'ru', 'tr'], // İngilizce, Rusça, Türkçe dillerini ekliyoruz
  defaultLocale: 'tr', // Varsayılan dil İngilizce
  pathnames: {
    '/': '/', // Anasayfa
    '/about': {
      en: '/about', // Hakkımızda (İngilizce)
      ru: '/o-nas', // Hakkımızda (Rusça)
      tr: '/hakkimizda', // Hakkımızda (Türkçe)
    },
    '/services': {
      en: '/services', // Hizmetler (İngilizce)
      ru: '/uslugi', // Hizmetler (Rusça)
      tr: '/hizmetler', // Hizmetler (Türkçe)
    },
    '/contact': {
      en: '/contact', // İletişim (İngilizce)
      ru: '/kontakt', // İletişim (Rusça)
      tr: '/iletisim', // İletişim (Türkçe)
    },
  },
});

export type Pathnames = keyof typeof routing.pathnames;
export type Locale = (typeof routing.locales)[number];

// `createNavigation` kullanarak linkler ve yönlendirme için gerekli fonksiyonlar
export const { Link, getPathname, redirect, usePathname, useRouter } = createNavigation(routing);
