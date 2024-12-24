'use client'
import Image from 'next/image'
import { useTranslations } from 'next-intl'
import AnimatedHeading from '@/components/AnimatedHeading'

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
        // Extract the first word of the title to highlight it
        const [highlightedWord] = subcategory.title.split(" ") || []

        return (
          <section key={subcategory.id} className="mb-12">
            {/* Animated Heading with highlighted word */}
            <div className='mb-20'>
              <AnimatedHeading text={subcategory.title || ''} highlightedWord={highlightedWord} />
              <p className="text-gray-500 text-center max-w-2xl mx-auto mt-3">
                {subcategory.subTitle}
              </p>
            </div>
            {subcategory.items.map((item, index) => (
              <div key={index} className="mb-20">
                <div className="relative w-full mb-2">
                  {/* Grid Layout for Images and Logos */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-4">
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
                          className="transition-transform duration-300 mt-2"
                        />
                      </div>
                    ))}
                  </div>
                </div>
                <p className="text-sm font-light text-center">{item.name}</p>
              </div>
            ))}
          </section>
        )
      })}
    </div>
  )
}
