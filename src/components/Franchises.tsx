'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'



export const Franchises = () => {
  const t = useTranslations('franchises');
  const franchises = [
    {
      name: t('franch1.name'),
      image: "/assets/franchises/linea-rossa.jpg",
      description: t('franch1.description'),
   
    },
    {
      name: t('franch2.name'),
      image: "/assets/franchises/albert-genau.png",
      description: t('franch2.description'),
    },
    {
      name: t('franch3.name'),
      image: "/assets/franchises/winsa.jpg",
      description: t('franch3.description'),
    }
  ];
  return (
    <section className="py-16 bg-gray-100 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 text-brown-800 dark:text-white">
          {t('title')}
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
         
        {franchises.map((franchise, index) => (
            <motion.div
              key={franchise.name}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className='relative'>
              <Image
                src={franchise.image}
                alt={franchise.name}
                width={400}
                height={300}
                className="w-full h-48 object-cover"
              />
              <div className="absolute right-0 top-0 z-10">
                <div className="bg-red-600 py-2 px-6 text-white shadow-lg">
                  <span className="font-medium tracking-wide">{franchise.name}</span>
                </div>
              </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">{franchise.name}</h3>
                <p className="text-gray-600 dark:text-gray-300">{franchise.description}</p>
                <Link href={`/franchises/${franchise.name.toLowerCase().replace(/\s+/g, '-')}`} className="mt-4 inline-block text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300">
                  {t('moreInfo')} &rarr;
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

