'use client'
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Link } from '@/i18n/routing';
import { Button } from './ui/button';
import { ArrowRight } from 'lucide-react';

export const Services = () => {
  const t = useTranslations('services');

  const servicesList = t.raw('list') as Array<{
    title: string;
    description: string;
    image: string;
    slug: string;
    id: string;
    heroImage?: string
  }>;

  return (
    <section className="py-16 bg-white dark:bg-gray-900 bg-[url('/assets/services/bg-12.svg')] dark:bg-[url('/assets/services/hizmetler-bg.svg')] bg-cover bg-center">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 text-brown-800 dark:text-white">{t('title')}</h2>
        <hr className="my-6 border-t-2 border-[#ff0505d9] max-w-[150px] mx-auto" />
        <p className="text-center text-gray-600 dark:text-gray-300 mb-16 max-w-3xl mx-auto dark:text-white ">{t('description')}</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 ">
          {servicesList.map((service, index) => (
            <motion.div
              key={service.title}
              className="group flex flex-col bg-white dark:bg-gray-700 rounded-lg p-6 shadow-lg hover:shadow-xl transition-all"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="relative  aspect-[4/3] flex-1">
                <Image
                  src={service.id === "4" ? service.heroImage || service.image : service.image}
                  alt={service.title}
                  loading="lazy"
                  width={500}
                  height={200}
                  className="w-[500] h-60 object-cover rounded-lg mb-4 transition-transform duration-300 group-hover:scale-105"
                />
                <h3 className="text-xl font-semibold mb-4 dark:text-white">{service.title}</h3>
                <hr className="my-6 border-t-2 border-[#ff0505d9] max-w-[50px]" />
                <p className="mb-4 dark:text-white mb-10">{service.description}</p>

              </div>
              <Button variant="outline" className="bg-red-600 text-white  border-transparent w-fit self-start ">
                <Link
                  href={{
                    pathname: '/services/[slug]',
                    params: { slug: service.slug },
                  }}
                >
                  <span className=" flex items-center justify-center">
                    {t('buttonText')} <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1 text-white " />
                  </span>
                </Link>
              </Button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
