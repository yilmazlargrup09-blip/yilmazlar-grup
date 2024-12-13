'use client'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { useTranslations } from 'next-intl'

interface HeroSlide {
  image: string;
  title: string;
  subtitle: string;
}

export default function Hero() {
  const t = useTranslations('hero')

  // Now use the correct path to get the hero slides
  const slides: HeroSlide[] = [
    {
      image: t('slide1.image'),
      title: t('slide1.title'),
      subtitle: t('slide1.subtitle')
    },
    {
      image: t('slide2.image'),
      title: t('slide2.title'),
      subtitle: t('slide2.subtitle')
    },
    {
      image: t('slide3.image'),
      title: t('slide3.title'),
      subtitle: t('slide3.subtitle')
    }
  ]
  const [currentSlide, setCurrentSlide] = React.useState(0)


  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
  }

  React.useEffect(() => {
    const timer = setInterval(nextSlide, 5000)
    return () => clearInterval(timer)
  }, [])

  React.useEffect(() => {
    const timer = setInterval(nextSlide, 5000)
    return () => clearInterval(timer)
  }, [])
  const partners = [
    { name: 'Linea Rossa', logo: '/assets/partners/linea-rossa.svg' },
    { name: 'Winsa', logo: '/assets/partners/winsa.svg' },
    { name: 'Albert Genau', logo: '/assets/partners/albert-genau.svg' },
    { name: 'Alusel', logo: '/assets/partners/alusel.svg' },
    { name: 'Raynaers Aluminum', logo: '/assets/partners/reynaers-aluminium.svg' },
    { name: 'Asaş', logo: '/assets/partners/asas.svg' },
  ]
  return (
    <div className="relative min-h-[880px] bg-gray-100 dark:bg-gray-900">

      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${index === currentSlide ? "opacity-100" : "opacity-0"}`}
        >
          <Image
            src={slide.image}
            alt={slide.title}
            fill
            className="object-cover"
            priority={index === 0}
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="container text-center text-white">
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
                {slide.title}
              </h1>
              <p className="mt-6 text-lg sm:text-xl md:text-2xl">
                {slide.subtitle}
              </p>
              <div className="mt-5 relative">
                <Link
                  href="https://wa.me/+905494244249"
                  className="inline-block bg-red-600 text-white px-8 py-4 rounded-full text-xl font-bold hover:bg-red-700 transition-colors duration-200 z-10"
                >
                  {t('cta')}
                </Link>
              </div>
            </div>
          </div>
        </div>
      ))}
      <div className="absolute inset-0 flex flex-col lg:flex-row items-center justify-between p-8">

        <div className=" hidden md:flex absolute left-0 right-0 bottom-0 bg-gray-100/40 backdrop-blur-md">
          <div className="container mx-auto">
            <div className="grid grid-cols-2 items-center gap-8 px-4 py-4 md:grid-cols-3 lg:grid-cols-6 lg:gap-12">
              {partners.map((partner) => (
                <div
                  key={partner.name}
                  className="flex items-center justify-center p-2"
                >
                  <Image
                    src={partner.logo}
                    alt={`${partner.name} logo`}
                    width={120}
                    height={50}
                    className="h-auto max-h-12  object-contain"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
