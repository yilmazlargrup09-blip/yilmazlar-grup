'use client'
import Image from 'next/image'
import { useState, useTransition } from 'react'
import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'

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
  const [activeSubcategory, setActiveSubcategory] = useState<string | null>(null)
  const [isPending, startTransition] = useTransition()
  const t = useTranslations('products')
  const categories = t.raw('categories') as Category[]

  const winsaCategory = categories.find(category => category.id === 'winsa')

  const handleSubcategoryChange = (subcategoryId: string) => {
    startTransition(() => {
      setActiveSubcategory(subcategoryId)
    })
  }

  return (
    // <div className="p-6 bg-white">
    //   <div className="flex flex-col md:flex-row md:space-x-6 mb-6">
    //     <div className="md:w-1/4">
    //       <h2 className="text-2xl font-bold mb-4">{winsaCategory?.name}</h2>
    //       <nav className="space-y-2">
    //         {winsaCategory?.subcategories.map((subcategory) => (
    //           <button
    //             key={subcategory.id}
    //             onClick={() => handleSubcategoryChange(subcategory.id)}
    //             className={`block w-full text-left px-4 py-2 rounded ${
    //               activeSubcategory === subcategory.id ? 'bg-red-500 text-white' : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
    //             }`}
    //           >
    //             {subcategory.title}
    //           </button>
    //         ))}
    //       </nav>
    //     </div>
    //     <div className="md:w-3/4 mt-6 md:mt-0">
    //       {activeSubcategory && (
    //         <motion.div
    //           key={activeSubcategory}
    //           initial={{ opacity: 0 }}
    //           animate={{ opacity: 1 }}
    //           transition={{ duration: 0.5 }}
    //           className="grid grid-cols-1 md:grid-cols-2 gap-6"
    //         >
    //           {winsaCategory?.subcategories
    //             .find(sub => sub.id === activeSubcategory)
    //             ?.items.map((item, index) => (
    //               <motion.div
    //                 key={index}
    //                 initial={{ opacity: 0, y: 20 }}
    //                 animate={{ opacity: 1, y: 0 }}
    //                 transition={{ duration: 0.3, delay: index * 0.1 }}
    //                 className="bg-gray-800 rounded-lg overflow-hidden"
    //               >
    //                 {item.imageGallery && item.imageGallery.length > 0 && (
    //                   <div className="relative h-48">
    //                     <Image 
    //                       src={item.imageGallery[0].image}
    //                       alt={item.name} 
    //                       layout="fill"
    //                       objectFit="cover"
    //                     />
    //                     <div className="absolute bottom-2 right-2 w-16 h-16">
    //                       <Image 
    //                         src={item.imageGallery[0].logo}
    //                         alt={`${item.name} logo`}
    //                         layout="fill"
    //                         objectFit="contain"
    //                       />
    //                     </div>
    //                   </div>
    //                 )}
    //                 <div className="p-4">
    //                   <h3 className="text-lg font-semibold mb-2">{item.name}</h3>
    //                 </div>
    //               </motion.div>
    //             ))}
    //         </motion.div>
    //       )}
    //     </div>
    //     {winsaCategory?.subcategories
    //             .find(sub => sub.id === activeSubcategory)
    //             ?.items.map((item, index) => (
    //           <div key={item} className="mb-12">
    //             <h2 className="text-2xl font-light mb-6">{item}</h2>
    //             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
    //               {items.map((item, index) => (
    //                 <motion.div
    //                   key={index}
    //                   initial={{ opacity: 0, y: 20 }}
    //                   animate={{ opacity: 1, y: 0 }}
    //                   transition={{ duration: 0.3, delay: index * 0.1 }}
    //                   className="group"
    //                 >
    //                   <div className="relative aspect-square mb-2 overflow-hidden">
    //                     <Image
    //                       src={`/placeholder.svg?height=300&width=300&text=${item}`}
    //                       alt={item}
    //                       layout="fill"
    //                       objectFit="cover"
    //                       className="transition-transform duration-300 group-hover:scale-105"
    //                     />
    //                   </div>
    //                   <p className="text-sm font-light">{item}</p>
    //                 </motion.div>
    //               ))}
    //             </div>
    //           </div>
    //         ))}
    //   </div>
    // </div>
  )
}

