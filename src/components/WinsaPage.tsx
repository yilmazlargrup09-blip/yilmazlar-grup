'use client'
import Image from 'next/image'
import { useTranslations } from 'next-intl'
import AnimatedHeading from '@/components/AnimatedHeading'
import { useState } from 'react';

interface ImageGalleryItem {
  image: string;
  logo: string;
}

interface Item {
  name: string;
  imageGallery: ImageGalleryItem[];
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

export default function WinsaPage() {
  const t = useTranslations('products')
  const categories = t.raw('categories') as Category[]

  const winsaCategory = categories.find(category => category.id === 'winsa')

  return (
    <div className="p-6 bg-white dark:bg-gray-900">
      <div className='flex justify-center'>
        <Image
          src="/assets/logos/winsa-pvc.svg"
          alt="Linea Rossa Aluminium"
          layout="intrinsic"
          width={250}
          height={250}
          objectFit="cover"
          className="transition-transform duration-300 group-hover:scale-105 mb-10"
        />
      </div>

      {winsaCategory?.subcategories.map((subcategory) => {
        return (
          <section key={subcategory.id} className="mb-12">
            <div className="container mx-auto px-4">
              {/* Subcategory Title and Subtitle */}
              <div className="mb-20">
                <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800  dark:text-white">
                  {subcategory.title}
                </h2>
                <p className="text-lg text-gray-600 mb-8 max-w-3xl">
                  {subcategory.subTitle}
                </p>
              </div>
            </div>
            <div className="">
              {subcategory.items.map((item, index) => (
                <div key={index} className="flex flex-col items-center mb-10">
                  {/* Image Gallery */}
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-4">
                    {item.imageGallery.map((galleryItem, galleryIndex) => (
                      <div key={galleryIndex} className="flex flex-col items-center">
                        {/* Product Image */}
                        <Image
                          src={galleryItem.image}
                          alt={`${item.name} - Image ${galleryIndex + 1}`}
                          layout="intrinsic"
                          width={300}
                          height={300}
                          objectFit="cover"
                          className="transition-transform duration-300 group-hover:scale-105"
                        />
                        {/* Logo Below the Image */}
                        <Image
                          src={galleryItem.logo}
                          alt={`${item.name} logo`}
                          width={200}
                          height={200}
                          objectFit="contain"
                          className="mt-2 transition-transform duration-300"
                        />
                      </div>
                    ))}
                  </div>
                  <p className="text-sm font-light text-center mt-4">{item.name}</p>
                </div>
              ))}
            </div>


          </section>
        )
      })}
    </div>
  )
}
