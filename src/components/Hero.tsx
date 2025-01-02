'use client'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { useTranslations } from 'next-intl'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Link } from '@/i18n/routing'


interface HeroSlide {
  image: string;
  title: string;
  subtitle: string;
  url:string;
}

export default function Hero() {
  const t = useTranslations('hero')

  const slides: HeroSlide[] = [
    {
      image: t('slide1.image'),
      title: t('slide1.title'),
      subtitle: t('slide1.subtitle'),
      url:t('slide1.url')
    },
    {
      image: t('slide2.image'),
      title: t('slide2.title'),
      subtitle: t('slide2.subtitle'),
      url:t('slide2.url')
    },
    {
      image: t('slide3.image'),
      title: t('slide3.title'),
      subtitle: t('slide3.subtitle'),
      url:t('slide3.url')
    }
  ]
  
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  useEffect(() => {
    if (!isAutoPlaying) return

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [isAutoPlaying])

  // Next slide function
  const nextSlide = () => {
    setIsAutoPlaying(false)
    setCurrentSlide((prev) => (prev + 1) % slides.length)
  }

  // Previous slide function
  const prevSlide = () => {
    setIsAutoPlaying(false)
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
  }

  const partners = [
    { name: 'Linea Rossa', logo: '/assets/partners/linea-rossa.svg' },
    { name: 'Winsa', logo: '/assets/partners/winsa.svg' },
    { name: 'Albert Genau', logo: '/assets/partners/albert-genau.svg' },
    { name: 'Alusel', logo: '/assets/partners/alusel.svg' },
    { name: 'Raynaers Aluminum', logo: '/assets/partners/reynaers-aluminium.svg' },
    { name: 'Asaş', logo: '/assets/partners/asas.svg' },
  ]
  
  return (
    <div className="relative h-screen w-full overflow-hidden">
  <AnimatePresence initial={false} mode="wait">
    <motion.div
      key={currentSlide}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.7 }}
      className="absolute inset-0"
    >
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${index === currentSlide ? "opacity-100" : "opacity-0"}`}
        >
          <Image
            src={slide.image}
            alt={slide.title}
            fill
            priority
            className="filter blur-sm object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/60 to-transparent" />
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.7 }}
            className="absolute inset-0 flex flex-col items-center justify-center text-center text-white p-4"
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="container text-center text-white">
                <h1 className="text-2xl font-bold tracking-tight sm:text-5xl md:text-3xl lg:text-5xl">
                  {slide.title}
                </h1>
                <hr className="my-6 border-t-2 border-[#ff0505d9] max-w-[150px] mx-auto" />
                <p className="mt-6 text-lg sm:text-xl md:text-2xl">
                  {slide.subtitle}
                </p>
                <div className="mt-5 relative z-20">
                  <Link
                    href={{
                      pathname: '/services/[slug]',
                      params: { slug: slide.url },
                    }}
                    className="inline-flex items-center bg-red-600 text-white px-4 py-2 rounded-md text-sm font-bold hover:bg-red-700 transition-colors duration-200"
                  >
                    <button>{t('cta')}</button>
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      ))}
    </motion.div>
  </AnimatePresence>

  <div className="absolute bottom-20 left-1/2 -translate-x-1/2 flex gap-3 z-20">
    {slides.map((_, index) => (
      <button
        key={index}
        onClick={() => {
          setIsAutoPlaying(false)
          setCurrentSlide(index)
        }}
        className={`w-3 h-3 rounded-full transition-all duration-300 ${index === currentSlide
          ? 'bg-red-500 w-8'
          : 'bg-white/50 hover:bg-white/75'
          }`}
      />
    ))}
  </div>

  <div className="absolute inset-0 flex flex-col lg:flex-row items-center justify-between p-5 z-10">
    <div className="hidden md:flex absolute left-0 right-0 bottom-0 bg-gray-100/40 backdrop-blur-md pointer-events-none">
      <div className="container mx-auto">
        <div className="grid grid-cols-2 items-center gap-8 px-4 py-2 md:grid-cols-3 lg:grid-cols-6 lg:gap-12">
          {partners.map((partner, index) => (
            <div key={index} className="relative group">
              <Image
                width={120}
                height={50}
                loading="lazy"
                src={partner.logo}
                alt={partner.name}
                className="object-contain filter saturate-50 transition-all duration-300 group-hover:grayscale-0 group-hover:scale-110"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>

  {/* Add buttons for next and previous slide */}
  <div className="absolute top-1/2 left-5 transform -translate-y-1/2 z-10 hidden md:flex">
    <button
      onClick={prevSlide}
      className=" text-white p-2 transition-all"
    >
      <ChevronLeft className='w-10' />
    </button>
  </div>
  <div className="absolute top-1/2 right-5 transform -translate-y-1/2 z-10 hidden md:flex">
    <button
      onClick={nextSlide}
      className=" text-white p-2 transition-all"
    >
      <ChevronRight className='w-24'/>
    </button>
  </div>
</div>

  )
}
