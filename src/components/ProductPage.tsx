'use client'

import { useTranslations } from 'next-intl'
import { useState } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
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
  description: string;
  subcategories: Subcategory[];
}

export default function ProductsPage() {
  const t = useTranslations('products')
  const [activeCategory, setActiveCategory] = useState<string>('linea-rossa-aluminium')
  const [activeSubcategory, setActiveSubcategory] = useState<string | null>(null);

  const categories = t.raw('categories') as Category[]

  return (
    <div className="dark:bg-gray-900 text-white p-10 rounded-lg min-h-screen bg-white ">
       <h2 className="text-3xl md:text-5xl font-bold mb-4 text-gray-900 dark:text-white text-center">{t('name')}</h2>
       <hr className="my-6 border-t-2 border-[#ff0505d9] max-w-[150px] mx-auto" />
      <div className="flex flex-col md:flex-row md:space-x-8 flex flex-col ">
        {/* Kategoriler */}
         
        <div className="md:w-1/4">
         <div className='w-full h-[300px] dark:bg-gray-800 rounded  dark:text-white bg-white'>
         <nav className="space-y-2 ">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => {
                  setActiveCategory(category.id);
                  setActiveSubcategory(null); // Alt kategoriyi sıfırla
                }}
                className={`block w-full text-left px-4 py-8 rounded text-xl mt-5 ${
                  activeCategory === category.id
                    ? 'bg-red-500 text-white '
                    : ' text-gray-800 hover:bg-gray-700 hover:text-white '
                }`}
              >
                {category.name} <span className='float-right'>&rarr;</span>
              </button>
            ))}
          </nav>
         </div>
         
        </div>

        {/* Alt Kategoriler ve Ürünler */}
        <div className="md:w-3/4 mt-6 md:mt-5 ">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
             className="grid grid-cols-1 md:grid-cols-4 gap-6"
          >
            {categories
              .find((category) => category.id === activeCategory)
              ?.subcategories.map((subcategory,index) => (
                <motion.div
                  key={subcategory.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="bg-gray-800 rounded-lg overflow-hidden"
                >
                  <Image
                    src={subcategory.mainImage}
                    alt={subcategory.title}
                    width={400}
                    height={400}
                  className="w-full h-48 object-cover object-center"
                  />
                  <div className="p-4">
                    <h3 className="text-lg font-semibold">{subcategory.title}</h3>
                  </div>
                </motion.div>
              ))}
          </motion.div>
        </div>
      </div>
    </div>
  )
}

