'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { useState } from 'react';

interface Item {
  name: string;
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

export default function AlbertGenauPage() {
  const t = useTranslations('products');
  const categories = t.raw('categories') as Category[];

  const AlbertGenauCategory = categories.find(
    (category) => category.id === 'albert-genau'
  );

  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <div className="p-6 bg-white dark:bg-gray-900">
    
        <div className="flex justify-center mb-2">
          <Image
            src="/assets/partners/albert-genau.svg"
            alt="Albert Genau Logo"
            width={300}
            height={100}
            className="mx-auto h-24 w-auto"
            loading="lazy"
          />
        </div>

      {/* Subcategories Section */}
      {AlbertGenauCategory?.subcategories.map((subcategory) => (
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

            {/* Items within Subcategory */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {subcategory.items.map((item, itemIndex) => (
                <div
                  key={itemIndex}
                  className="bg-gray-100 rounded-lg overflow-hidden shadow-md transition-transform duration-300 hover:scale-105"
                >
                  {item.imageGallery.map((imageUrl, galleryIndex) => (
                    <div
                      key={galleryIndex}
                      className="flex flex-col items-center group relative overflow-hidden rounded-lg"
                    >
                      <div className="relative aspect-[4/3] w-full">
                        {!imageLoaded && (
                          <div className="absolute inset-0 flex items-center justify-center bg-gray-200">
                            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                          </div>
                        )}
                        <Image
                          src={imageUrl}
                          alt={`${item.name} - Image ${galleryIndex + 1}`}
                          layout="fill"
                          objectFit="cover"
                          className={`transition-opacity duration-300 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
                          onLoadingComplete={() => setImageLoaded(true)}
                          loading="lazy"
                        />
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                        <h3 className="text-white text-xl font-semibold">{item.name}</h3>
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </section>
      ))}
    </div>
  );
}
