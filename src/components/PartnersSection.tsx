import Image from "next/image"
import { Button } from "./ui/button"
import { useTranslations } from "next-intl"

const partners = [
    { name: 'Linea Rossa', logo: '/assets/partners/linea-rossa.svg' },
    { name: 'Winsa', logo: '/assets/partners/winsa.svg' },
    { name: 'Albert Genau', logo: '/assets/partners/albert-genau.svg' },
    { name: 'Alusel', logo: '/assets/partners/alusel.svg' },
    { name: 'Raynaers Aluminum', logo: '/assets/partners/reynaers-aluminium.svg' },
    { name: 'Asaş', logo: '/assets/partners/asas.svg' },
  ]

export default function PartnersSection() {
      const t = useTranslations('partners')
  return (
    <section className="py-16 bg-white dark:bg-gray-800">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 dark:text-white">{t('title')}</h2>
          <hr className="my-6 border-t-2 border-[#ff0505d9] max-w-[150px] mx-auto" />
          <p className="text-gray-600 mb-8 dark:text-white ">
          {t('subtitle')}
          </p>
          <Button 
           
            className="bg-red-500 text-white hover:bg-red-600 border-none"
          >
            {t('button')}
          </Button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
          {partners.map((partner, index) => (
            <div 
              key={index} 
              className="relative aspect-[3/2] group"
            >
              <Image
                src={partner.logo}
                alt={partner.name}
                loading="lazy"
                fill
                className="object-contain filter grayscale transition-all duration-300 group-hover:grayscale-0 group-hover:scale-110 "
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

