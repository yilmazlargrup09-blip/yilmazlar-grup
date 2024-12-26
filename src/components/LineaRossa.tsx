'use client'
import Image from 'next/image'
import { useTranslations } from 'next-intl'
import AnimatedHeading from '@/components/AnimatedHeading'
import { Button } from '@/components/ui/button'

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

  return (
    <div className="p-6 bg-white dark:bg-gray-900">
      <section className="py-4 bg-muted/50">
        <div className="container mx-auto px-4">
          <Image
            src="/assets/logos/marmaris-yilmazlar-grup-linea-rossa-e1725715469384.png"
            alt="Albert Genau Logo"
            width={300}
            height={100}
            loading="lazy"
            className="mx-auto h-24 w-auto"
          />
        </div>
      </section>
      {lineaRossaCategory?.subcategories.map((subcategory) => (
        <section key={subcategory.id} className="mb-12">
          <div className="container mx-auto px-4">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
              <div className="text-center mb-24">
                <h1 className="text-5xl font-bold mb-6 dark:text-white">{subcategory.title}</h1>
                <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                  {subcategory.subTitle}
                </p>
              </div>
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
                      <Button className="bg-red-600 text-white hover:bg-gray-500">
                        {t('contactButton')}
                      </Button>
                    </div>
                    <div className={`relative h-[600px] ${index % 2 === 0 ? 'order-2' : 'order-2 lg:order-1'}`}>
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

