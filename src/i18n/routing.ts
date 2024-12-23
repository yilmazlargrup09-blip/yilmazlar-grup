import { createNavigation } from 'next-intl/navigation';
import { defineRouting } from 'next-intl/routing';

// Çok dilli routing yapılandırması
export const routing = defineRouting({
  locales: ['en', 'ru', 'tr'], // İngilizce, Rusça, Türkçe dillerini ekliyoruz
  defaultLocale: 'tr', // Varsayılan dil İngilizce
  pathnames: {
    '/': '/', 
    '/about': {
      en: '/about', 
      ru: '/o-nas', 
      tr: '/hakkimizda', 
    },
    '/services': {
      en: '/services', 
      ru: '/uslugi', 
      tr: '/hizmetler', 
    },
    '/services/[slug]': { // Dinamik hizmet sayfası yolu
      en: '/services/[slug]',
      ru: '/uslugi/[slug]',
      tr: '/hizmetler/[slug]',
    },
    '/contact': {
      en: '/contact',
      ru: '/kontakt',
      tr: '/iletisim',
    }, 
    '/products': {
      en: '/products',
      ru: '/produkty',
      tr: '/urunler',
    },
    '/products/winsa': {
      en: '/products/winsa',
      ru: '/produkty/winsa',
      tr: '/urunler/winsa',
    },
    '/products/linea-rossa': {
      en: '/products/linea-rossa',
      ru: '/produkty/linea-rossa',
      tr: '/urunler/linea-rossa',
    },
    '/products/albert-genau': {
      en: '/products/albert-genau',
      ru: '/produkty/albert-genau',
      tr: '/urunler/albert-genau',
    },
  },
});

export type Pathnames = keyof typeof routing.pathnames;
export type Locale = (typeof routing.locales)[number];

// `createNavigation` kullanarak linkler ve yönlendirme için gerekli fonksiyonlar
export const { Link, getPathname, redirect, usePathname, useRouter } = createNavigation(routing);
