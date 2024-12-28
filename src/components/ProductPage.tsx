'use client'

import { useTranslations } from 'next-intl'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from './ui/button'
import { ChevronRight } from 'lucide-react'
import Link from 'next/link'
import BlurImage from './blur-image'
interface ImageGalleryItem {
  image: string;
  logo?: string;
}

interface ProductItem {
  id: string;
  name: string;
  imageGallery: (string | ImageGalleryItem)[];
}

interface Subcategory {
  id: string;
  title: string;
  mainImage: string;
  items: ProductItem[];
}

interface Category {
  id: string;
  name: string;
  image: string;
  url: string;
  description: string;
  subcategories: Subcategory[];
}

export default function ProductsPage() {
  const t = useTranslations('products')
  const [activeCategory, setActiveCategory] = useState<string>('linea-rossa-aluminium')

  const categories = t.raw('categories') as Category[]
  const categoryUrl = categories.find((cat) => cat.id === activeCategory)?.url;
  return (
    <div className="dark:bg-gray-900 text-white p-8 rounded-lg  bg-white">

      <h2 className="text-2xl md:text-4xl font-extrabold mb-6 text-center text-gray-900 dark:text-white">
        {t('name')}
      </h2>
      <hr className="my-4 border-t-2 border-red-600 max-w-[200px] mx-auto" />

      <div className="flex flex-col md:flex-row md:space-x-10">
        {/* Kategoriler */}
        <div className="md:w-1/4 relative">
          <div className="w-full md:h-[600px] h-[400px] bg-gray-100 dark:bg-gray-800 rounded-lg p-6 relative">
            <nav className="space-y-4">
              {categories.map((category) => (
                <Button
                  key={category.id}
                  onClick={() => {
                    setActiveCategory(category.id);

                  }}
                  className={`block w-full text-left px-5 py-4 rounded-lg text-lg md:text-xl font-medium flex justify-between items-center ${activeCategory === category.id
                    ? 'bg-red-600 text-white shadow-lg'
                    : 'text-gray-700 dark:text-gray-200 hover:bg-gray-800 dark:hover:bg-gray-700 hover:text-white'
                    }`}
                >
                  {category.name} <ChevronRight className="h-5 w-5" />
                </Button>
              ))}
            </nav>
            <div className="mt-10 p-6 bg-red-600 text-white rounded-lg absolute bottom-0 left-0 w-full">
              <h3 className="font-bold text-lg">{t('contact.title')}</h3>
              <p className="text-sm mt-2"> {t('contact.desc')}</p>
              <a
                href="https://wa.me/+905494244249"
                target="_blank"
                rel="noopener noreferrer"
                className="block mt-4"
              >
                <Button
                  variant="outline"
                  className="w-[50%] text-gray-900  border-white hover:bg-white hover:text-red-600"
                >
                  {t('contact.text')}
                </Button>
              </a>
            </div>
          </div>
        </div>

        {/* Alt Kategoriler ve Ürünler */}
        <div className="md:w-3/4 mt-6 md:mt-0">
          <div className='flex justify-between'>
            <h3 className="text-md md:text-md font-semibold mb-6 text-gray-900 dark:text-white">
              {t('name')} {'>'}  <span className='text-red-600'>
                <Link href={`/products/${categoryUrl}`}>{categories.find((cat) => cat.id === activeCategory)?.name}</Link>
              </span>
            </h3>
            <Link href={`/products/${categoryUrl}`}>
              <h3 className="text-md md:text-md font-semibold mb-6 text-gray-900 text-red-600">
                {t('moreInfo')} &rarr;
              </h3>
            </Link>

          </div>
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {categories
              .find((category) => category.id === activeCategory)
              ?.subcategories.map((subcategory, index) => (
                <motion.div
                  key={subcategory.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden shadow-md"
                >

                  <BlurImage
                    src={subcategory.mainImage}
                    alt={subcategory.title}
                    width={400}
                    height={400}
                    loading="lazy"
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
                      {subcategory.title}
                    </h4>
                  </div>
                </motion.div>
              ))}
          </motion.div>
        </div>
      </div>
    </div>

  )
}

