import fs from 'fs'
import { routing } from '../src/i18n/routing'

const BASE_URL = 'https://yilmazlargrups.com'

function generateSitemap() {
  try {
    let sitemap = '<?xml version="1.0" encoding="UTF-8"?>\n'
    sitemap += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"\n'
    sitemap += '  xmlns:xhtml="http://www.w3.org/1999/xhtml">\n'

    // Add root URL
    sitemap += `  <url>\n`
    sitemap += `    <loc>${BASE_URL}/</loc>\n`
    routing.locales.forEach(locale => {
      sitemap += `    <xhtml:link\n`
      sitemap += `      rel="alternate"\n`
      sitemap += `      hreflang="${locale}"\n`
      sitemap += `      href="${BASE_URL}/${locale}"\n`
      sitemap += `    />\n`
    })
    sitemap += `    <xhtml:link\n`
    sitemap += `      rel="alternate"\n`
    sitemap += `      hreflang="x-default"\n`
    sitemap += `      href="${BASE_URL}/tr"\n`
    sitemap += `    />\n`
    sitemap += `  </url>\n`

    // Generate URLs for static routes
    Object.entries(routing.pathnames).forEach(([key, value]) => {
      if (typeof value === 'object' && !key.includes('[slug]')) {
        // Always start with Turkish version first
        const orderedLocales = ['tr', ...routing.locales.filter(l => l !== 'tr')]
        
        orderedLocales.forEach(locale => {
          const path = value[locale as keyof typeof value] || value.tr // Fallback to Turkish if translation is missing
          sitemap += `  <url>\n`
          sitemap += `    <loc>${BASE_URL}/${locale}${path}</loc>\n`
          
          // Add alternate language versions
          routing.locales.forEach(altLocale => {
            const altPath = value[altLocale as keyof typeof value] || value.tr
            sitemap += `    <xhtml:link\n`
            sitemap += `      rel="alternate"\n`
            sitemap += `      hreflang="${altLocale}"\n`
            sitemap += `      href="${BASE_URL}/${altLocale}${altPath}"\n`
            sitemap += `    />\n`
          })
          
          // Add x-default pointing to Turkish version
          sitemap += `    <xhtml:link\n`
          sitemap += `      rel="alternate"\n`
          sitemap += `      hreflang="x-default"\n`
          sitemap += `      href="${BASE_URL}/tr${value.tr}"\n`
          sitemap += `    />\n`
          
          sitemap += `  </url>\n`
        })
      }
    })

    // Extract service slugs from the routing configuration
    const servicesSlugs = Object.keys(routing.pathnames)
      .filter(key => key.startsWith('/services/') && key !== '/services/[slug]')
      .map(key => key.replace('/services/', ''))

    // Add dynamic routes for services
    servicesSlugs.forEach(slug => {
      // Always start with Turkish version first
      const orderedLocales = ['tr', ...routing.locales.filter(l => l !== 'tr')]
      
      orderedLocales.forEach(locale => {
        const path = (routing.pathnames['/services/[slug]'] as Record<string, string>)[locale].replace('[slug]', slug)
        sitemap += `  <url>\n`
        sitemap += `    <loc>${BASE_URL}/${locale}${path}</loc>\n`
        
        // Add alternate language versions
        routing.locales.forEach(altLocale => {
          const altPath = (routing.pathnames['/services/[slug]'] as Record<string, string>)[altLocale].replace('[slug]', slug)
          sitemap += `    <xhtml:link\n`
          sitemap += `      rel="alternate"\n`
          sitemap += `      hreflang="${altLocale}"\n`
          sitemap += `      href="${BASE_URL}/${altLocale}${altPath}"\n`
          sitemap += `    />\n`
        })
        
        // Add x-default pointing to Turkish version
        const trPath = (routing.pathnames['/services/[slug]'] as Record<string, string>).tr.replace('[slug]', slug)
        sitemap += `    <xhtml:link\n`
        sitemap += `      rel="alternate"\n`
        sitemap += `      hreflang="x-default"\n`
        sitemap += `      href="${BASE_URL}/tr${trPath}"\n`
        sitemap += `    />\n`
        
        sitemap += `  </url>\n`
      })
    })

    // Add product pages
    const productSlugs = ['winsa', 'linea-rossa', 'albert-genau'] as const
    productSlugs.forEach(slug => {
      const productPath = `/products/${slug}` as keyof typeof routing.pathnames
      // Always start with Turkish version first
      const orderedLocales = ['tr', ...routing.locales.filter(l => l !== 'tr')]
      
      orderedLocales.forEach(locale => {
        const path = (routing.pathnames[productPath] as Record<string, string>)[locale]
        sitemap += `  <url>\n`
        sitemap += `    <loc>${BASE_URL}/${locale}${path}</loc>\n`
        
        // Add alternate language versions
        routing.locales.forEach(altLocale => {
          const altPath = (routing.pathnames[productPath] as Record<string, string>)[altLocale]
          sitemap += `    <xhtml:link\n`
          sitemap += `      rel="alternate"\n`
          sitemap += `      hreflang="${altLocale}"\n`
          sitemap += `      href="${BASE_URL}/${altLocale}${altPath}"\n`
          sitemap += `    />\n`
        })
        
        // Add x-default pointing to Turkish version
        sitemap += `    <xhtml:link\n`
        sitemap += `      rel="alternate"\n`
        sitemap += `      hreflang="x-default"\n`
        sitemap += `      href="${BASE_URL}/tr${(routing.pathnames[productPath] as Record<string, string>).tr}"\n`
        sitemap += `    />\n`
        
        sitemap += `  </url>\n`
      })
    })

    sitemap += '</urlset>'

    fs.writeFileSync('./public/sitemap.xml', sitemap)
 
  } catch (error) {
    console.error('Sitemap oluşturulurken hata oluştu:', error)
  }
}

generateSitemap()