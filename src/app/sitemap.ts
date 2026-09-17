import { MetadataRoute } from 'next'

const HOST = 'https://marmariscamaluminyum.com'

export default function sitemap(): MetadataRoute.Sitemap {
    const lastMod = new Date().toISOString()

    // Define your pages with their translations and metadata
    const pages = [
        { tr: '', en: '', ru: '', changeFreq: 'yearly' as const, priority: 1.0 },
        { tr: 'hakkimizda', en: 'about', ru: 'o-nas', changeFreq: 'monthly' as const, priority: 0.8 },
        { tr: 'iletisim', en: 'contact', ru: 'kontakt', changeFreq: 'yearly' as const, priority: 0.6 },
        { tr: 'urunler', en: 'products', ru: 'produkty', changeFreq: 'monthly' as const, priority: 0.7 },
        { tr: 'urunler/winsa', en: 'products/winsa', ru: 'produkty/winsa', changeFreq: 'monthly' as const, priority: 0.7 },
        { tr: 'hizmetler', en: 'services', ru: 'uslugi', changeFreq: 'monthly' as const, priority: 0.7 },
        { tr: 'urunler/linea-rossa', en: 'products/linea-rossa', ru: 'produkty/linea-rossa', changeFreq: 'monthly' as const, priority: 0.7 },
        { tr: 'urunler/albert-genau', en: 'products/albert-genau', ru: 'produkty/albert-genau', changeFreq: 'monthly' as const, priority: 0.7 },
        { tr: 'hizmetler/pencere-kapi-sistemleri', en: 'services/window-door-systems', ru: 'uslugi/okonnyye-dvernye-sistemy', changeFreq: 'monthly' as const, priority: 0.8 },
        { tr: 'hizmetler/otomatik-panjur-sistemleri', en: 'services/automatic-shutter-systems', ru: 'uslugi/avtomaticheskiye-rolstavni', changeFreq: 'monthly' as const, priority: 0.8 },
        { tr: 'hizmetler/cam-balkon', en: 'services/glass-balcony', ru: 'uslugi/steklyannyye-balkony', changeFreq: 'monthly' as const, priority: 0.8 },
        { tr: 'hizmetler/bioklimatik-pergola', en: 'services/bioclimatic-pergola', ru: 'uslugi/bioklimaticheskiy-pergol', changeFreq: 'monthly' as const, priority: 0.8 },
        { tr: 'hizmetler/kis-bahcesi', en: 'services/winter-garden', ru: 'uslugi/zimniy-sad', changeFreq: 'monthly' as const, priority: 0.8 },
        { tr: 'hizmetler/cam-cephe-giydirme', en: 'services/glass-facade-cladding', ru: 'uslugi/steklyannyy-fasad', changeFreq: 'monthly' as const, priority: 0.8 },
        { tr: 'hizmetler/giyotin-pencere', en: 'services/guillotine-window', ru: 'uslugi/gilotinnoe-okno', changeFreq: 'monthly' as const, priority: 0.8 },
        { tr: 'hizmetler/fotoselli-kayar-kapi', en: 'services/automatic-sliding-door', ru: 'uslugi/avtomaticheskaya-razdvizhnyaya-dver', changeFreq: 'monthly' as const, priority: 0.8 },
        { tr: 'hizmetler/giyotin-pencere', en: 'services/guillotine-window', ru: 'uslugi/gilotinnoe-okno', changeFreq: 'monthly' as const, priority: 0.8 }
      ]

    // Generate sitemap entries for both languages
    const sitemapEntries = pages.flatMap(page => {
        const trPath = page.tr ? `/${page.tr}` : ''
        const enPath = page.en ? `/${page.en}` : ''
        const ruPath = page.ru ? `/${page.ru}` : ''
        return [
            {
                url: `${HOST}/tr${trPath}`,
                lastModified: lastMod,
                changeFrequency: page.changeFreq,
                priority: page.priority,
                // Add language alternates for Turkish pages
                languages: {
                    'tr': `${HOST}/tr${trPath}`,
                    'en': `${HOST}/en${enPath}`,
                    'ru': `${HOST}/ru${ruPath}`, 
                    'x-default': `${HOST}/tr${trPath}`, // Turkish is default
                    'canonical': `${HOST}/tr${trPath}`, // Add canonical URL for Turkish version
                }
            },
            {
                
                url: `${HOST}/en${enPath}`,
                lastModified: lastMod,
                changeFrequency: page.changeFreq,
                priority: page.priority,
                // Add language alternates for English pages
                languages: {
                    'tr': `${HOST}/tr${trPath}`,
                    'en': `${HOST}/en${enPath}`,
                    'ru': `${HOST}/ru${ruPath}`, 
                    'x-default': `${HOST}/tr${trPath}`, // Turkish remains default
                    'canonical': `${HOST}/en${enPath}`, // Add canonical URL for English version
                }
            },
            {
                url: `${HOST}/ru${ruPath}`,
                lastModified: lastMod,
                changeFrequency: page.changeFreq,
                priority: page.priority,
                languages: {
                  'tr': `${HOST}/tr${trPath}`,
                  'en': `${HOST}/en${enPath}`,
                  'ru': `${HOST}/ru${ruPath}`, // Russian link
                  'x-default': `${HOST}/tr${trPath}`, // Turkish remains default
                  'canonical': `${HOST}/ru${ruPath}`, // Add canonical URL for Russian version
                }
              }
        ]
    })

    return sitemapEntries
}

