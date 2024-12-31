'use client'
import React, { useState, useEffect } from 'react';
import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { Button } from '@/components/ui/button'
import Loader from './LoadingScreen';
interface Item {
  name: string;
  title?: string;
  imageGallery: string[];
}

interface Subcategory {
  id: string;
  title: string;
  mainImage: string;
  items: Item[];
  subTitle: string;
}

interface Category {
  id: string;
  name: string;
  image: string;
  url: string;
  description: string;
  subcategories: Subcategory[];
}

export default function LineaRossaPage() {
  const t = useTranslations('products')
  const categories = t.raw('categories') as Category[]

  const lineaRossaCategory = categories.find(category => category.id === 'linea-rossa-aluminium')
  const [isLoading, setIsLoading] = useState(true);

  // // Simulate loading state (or replace with actual data fetching)
  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     setIsLoading(false);
  //   }, 1000); // Simulate a 1-second delay

  //   return () => clearTimeout(timer);
  // }, []);
  // if (isLoading) {
  //   return <Loader />; // Yükleniyor animasyonunu burada göster
  // }
  return (
    <div className="p-6 bg-white dark:bg-gray-900">
      <div className='flex justify-center'>
        <Image
          src="/assets/logos/marmaris-yilmazlar-grup-linea-rossa-e1725715469384.png"
          alt="Linea Rossa Aluminium"
          layout="intrinsic"
          loading="lazy"
          width={250}
          height={250}
          objectFit="cover"
          className="transition-transform duration-300 group-hover:scale-105 mb-10"
        /></div>
      {lineaRossaCategory?.subcategories.map((subcategory) => (
        <section key={subcategory.id} className="mb-12">
          <div className="container mx-auto px-4">
              {/* Subcategory Title and Subtitle */}
              <div className="text-center mb-24 mt-2">
                <h1 className="text-5xl font-bold mb-6 dark:text-white">{subcategory.title}</h1>
                <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                  {subcategory.subTitle}
                </p>
              </div>
            <div className="space-y-32">
              {subcategory.items.map((item, index) => (
                <section key={item.name} className="relative">
                  <div className="grid lg:grid-cols-2 gap-12">
                    <div className={`space-y-8 ${index % 2 === 0 ? 'order-1' : 'order-1 lg:order-2'}`}>
                      <h2 className="text-4xl font-bold dark:text-white">{item.name}</h2>
                      <p className="text-gray-400 text-lg ">{item.title}</p>
                      <div className="grid grid-cols-2 gap-4">
                        <div className=" p-4 rounded-lg">
                          <Image
                            src={item.imageGallery[1]}
                            alt={`Technical Drawing 1 for ${item.name}`}
                            width={400}
                            height={200}
                            className="rounded"
                            loading="lazy"
                          />
                        </div>
                        <div className=" p-4 rounded-lg">
                          <Image
                            src={item.imageGallery[2]}
                            alt={`Technical Drawing 2 for ${item.name}`}
                            width={400}
                            height={200}
                            className="rounded"
                            loading="lazy"
                          />
                        </div>
                      </div>
                      <a
                        href="https://wa.me/+905494244249"
                        target="_blank"
                        rel="noopener noreferrer"
                        className=""
                      >
                        <Button className="bg-red-600 text-white hover:bg-gray-500">
                          {t('contactButton')}
                        </Button>
                      </a>

                    </div>
                    <div className={`relative md:h-[600px] h-[300px] ${index % 2 === 0 ? 'order-2' : 'order-2 lg:order-1'}`}>
                      <Image
                        src={item.imageGallery[0]}
                        alt={`${item.name} Sliding System`}
                        fill
                        className="object-cover rounded-lg"
                        loading="lazy"
                      />
                    </div>
                  </div>
                </section>
              ))}
            </div>
          </div>
        </section>
      ))}
    </div>
  )
}

