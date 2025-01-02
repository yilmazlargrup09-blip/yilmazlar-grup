'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useTranslations } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, usePathname } from '@/i18n/routing';
import { Button } from './ui/button';
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import { Breadcrumb } from './Breadcrumb';

export const Services = () => {
  const t = useTranslations('services');
  
  const servicesList = t.raw('list') as Array<{
    title: string;
    description: string;
    image: string;
    slug: string;
    id: string;
    heroImage?: string;
  }>;

  const [loadedImages, setLoadedImages] = useState<boolean[]>(new Array(servicesList.length).fill(false));
  const [visibleCards, setVisibleCards] = useState(6);
  const loadMoreRef = useRef(null);
  const pathname = usePathname();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          setTimeout(() => {
            setVisibleCards(12);
          }, 300);
        }
      },
      { threshold: 0.1 }
    );

    if (loadMoreRef.current) {
      observer.observe(loadMoreRef.current);
    }

    return () => {
      if (loadMoreRef.current) {
        observer.unobserve(loadMoreRef.current);
      }
    };
  }, []);

  const handleImageLoad = (index: number) => {
    setLoadedImages((prev) => {
      const newState = [...prev];
      newState[index] = true;
      return newState;
    });
  };

  return (
    <section className="py-16 bg-white dark:bg-gray-900 bg-[url('/assets/services/bg-12.svg')] dark:bg-[url('/assets/services/hizmetler-bg.svg')] bg-cover bg-center">
      {pathname !== '/' && (
        <div className="flex items-center justify-end px-3 mb-4">
          <Breadcrumb title={t('title')} />
        </div>
      )}
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 text-brown-800 dark:text-white">
            {t('title')}
          </h2>
          <hr className="my-6 border-t-2 border-[#ff0505d9] max-w-[150px] mx-auto" />
          <p className="text-center text-gray-600 dark:text-gray-300 mb-16 max-w-3xl mx-auto dark:text-white">
            {t('description')}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 [&>*]:flex [&>*]:flex-col">
          {servicesList.slice(0, visibleCards).map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.5,
                delay: index < 6 ? index * 0.1 : (index - 6) * 0.1 + 0.3
              }}
            >
              <div className="group flex flex-col bg-white dark:bg-gray-700 rounded-lg p-6 shadow-lg hover:shadow-xl transition-all h-full">
                <div className="relative flex flex-col flex-grow overflow-hidden">
                  <div className="aspect-[5/3] mb-4 relative">
                    <AnimatePresence>
                      {!loadedImages[index] && (
                        <motion.div
                          initial={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="absolute inset-0 bg-gray-200 dark:bg-gray-600 rounded-lg animate-pulse"
                        />
                      )}
                    </AnimatePresence>
                    <Image
                      src={service.id === '4' ? service.heroImage || service.image : service.image}
                      alt={service.title}
                      loading="lazy"
                      width={500}
                      height={200}
                      onLoad={() => handleImageLoad(index)}
                      className={`w-full h-60 object-cover rounded-lg mb-4 transition-opacity duration-300 ${
                        loadedImages[index] ? 'opacity-100' : 'opacity-0'
                      }`}
                    />
                  </div>
                  <h3 className="text-xl font-semibold dark:text-white">{service.title}</h3>
                  <hr className="my-6 border-t-2 border-[#ff0505d9] max-w-[50px]" />
                  <p className="mb-4 dark:text-white mb-10">{service.description}</p>
                </div>
                <Button variant="outline" className="bg-red-600 text-white border-transparent w-fit self-start">
                  <Link
                    href={{
                      pathname: '/services/[slug]',
                      params: { slug: service.slug },
                    }}
                  >
                    <span className="flex items-center justify-center">
                      {t('buttonText')}{' '}
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1 text-white" />
                    </span>
                  </Link>
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      {visibleCards < servicesList.length && (
        <div
          ref={loadMoreRef}
          className="h-10 mt-8"
          aria-hidden="true"
        />
      )}
    </section>
  );
};

