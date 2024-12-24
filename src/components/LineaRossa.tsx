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
  imageGallery: string[]; // Updated this to be an array of strings (just image URLs)
}

interface Subcategory {
  id: string;
  title: string;
  mainImage: string;
  items: Item[];
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
      <Image
        src="/assets/logos/marmaris-yilmazlar-grup-linea-rossa-e1725715469384.png"
        alt="Linea Rossa Aluminium"
        layout="intrinsic"
        width={130}
        height={130}
        objectFit="cover"
        className="transition-transform duration-300 group-hover:scale-105 mb-10"
      />
      {lineaRossaCategory?.subcategories.map((subcategory) => {
        // Extract the first word of the title to highlight it
        const [highlightedWord] = subcategory.title.split(" ") || []

        return (
          <section key={subcategory.id} className="mb-12">
            {/* Animated Heading with highlighted word */}
            <div className='mb-20'>
              <AnimatedHeading text={subcategory.title || ''} highlightedWord={highlightedWord} />
            </div>

            {subcategory.items.map((item, index) => (
              <div key={index} className="mb-20">
                  <p className="text-2xl text-red-600 font-light text-start mb-10">{item.name}</p>
                <div className="relative w-full mb-2">
                  {/* Grid Layout for Images */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-4">
                    {item.imageGallery.map((imageUrl, galleryIndex) => (
                      <div key={galleryIndex} className="flex flex-col items-center">
                        {/* Product Image */}
                        <Image
                          src={imageUrl}
                          alt={`${item.name} - Image ${galleryIndex + 1}`}
                          layout="intrinsic"
                          width={500}
                          height={500}
                          objectFit="cover"
                          className="transition-transform duration-300 group-hover:scale-105"
                        />
                        {/* Optional: If you want to add a logo, you need to modify the data structure */}
                      </div>
                    ))}
                  </div>
                </div>
              
              </div>
            ))}
          </section>
        )
      })}
    </div>
  )
}
