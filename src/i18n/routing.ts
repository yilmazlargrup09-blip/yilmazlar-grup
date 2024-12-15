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
    '/contact': {
      en: '/contact',
      ru: '/kontakt',
      tr: '/iletisim',
    },
    '/window-door-systems': {
      en: '/window-door-systems',
      ru: '/okno-dveri-sistemy',
      tr: '/pencere-kapi-sistemleri',
    },
    '/automatic-shutter-systems': {
      en: '/automatic-shutter-systems',
      ru: '/avtomaticheskie-shtory-sistemy',
      tr: '/otomatik-panjur-sistemleri',
    },
    '/glass-balcony': {
      en: '/glass-balcony',
      ru: '/steklyanniy-balkon',
      tr: '/cam-balkon',
    },
    '/bioclimatic-pergola': {
      en: '/bioclimatic-pergola',
      ru: '/bioklimaticheskaya-pergola',
      tr: '/bioklimatik-pergola',
    },
    '/aluminum-framing-systems': {
      en: '/aluminum-framing-systems',
      ru: '/aljuminiyevi-ramy-sistemy',
      tr: '/aluminyum-dograma-sistemleri',
    },
    '/glass-facade-cladding': {
      en: '/glass-facade-cladding',
      ru: '/steklyannaya-fasada-oblicovka',
      tr: '/cam-fasadi-kaplama',
    },
    '/automatic-sliding-door': {
      en: '/automatic-sliding-door',
      ru: '/avtomaticheskie-skatayushchiesya-dveri',
      tr: '/otomatik-fotoselli-kapı',
    },
    'guillotine': {
      en: '/guillotine',
      ru: '/giljotina',
      tr: '/giyotin',
    },
    'exterior-sun-shading-systems': {
      en: '/exterior-sun-shading-systems',
      ru: '/vneshnie-solnechnye-zashchitnye-sistemy',
      tr: '/dis-mekan-zip-perde-sistemleri',
    },

  },
});

export type Pathnames = keyof typeof routing.pathnames;
export type Locale = (typeof routing.locales)[number];

// `createNavigation` kullanarak linkler ve yönlendirme için gerekli fonksiyonlar
export const { Link, getPathname, redirect, usePathname, useRouter } = createNavigation(routing);
