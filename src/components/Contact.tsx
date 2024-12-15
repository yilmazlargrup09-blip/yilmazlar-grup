'use client'
import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import { HiOutlinePhone } from 'react-icons/hi'
import { LuMessageCircle } from 'react-icons/lu'
import { MdMailOutline } from 'react-icons/md'
import { RiMapPinLine } from 'react-icons/ri'

export default function Contact() {
    const t = useTranslations('contact')
    return (
        <div>
            {/* Contact Section */}
            <section className=' bg-[#f5f7fa]  dark:bg-gray-900 mt-5'>
                <div className="py-20 px-4 md:px-16 max-w-[1400px] mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-8">
                            <div>
                                <h2 className="text-2xl font-semibold mb-4 text-brown-800 dark:text-red-100">{t('contactInfo')}</h2>
                                <ul className="space-y-4">
                                    <li className="flex items-center">
                                        <HiOutlinePhone className="mr-2 text-red-500" />
                                        <span className="text-gray-600 dark:text-gray-300">+90 549 424 42 49</span>
                                    </li>
                                    <li className="flex items-center">
                                        <MdMailOutline className="mr-2 text-red-500" />
                                        <span className="text-gray-600 dark:text-gray-300">yilmazlargrup09@gmail.com</span>
                                    </li>
                                    <li className="flex items-center">
                                        <RiMapPinLine className="mr-2 text-red-500" />
                                        <span className="text-gray-600 dark:text-gray-300">Marmaris, Muğla, Turkey</span>
                                    </li>
                                </ul>
                            </div>
                            <div>
                                <h2 className="text-2xl font-semibold mb-4 text-brown-800 dark:text-red-100">{t('quickContact')}</h2>
                                <div className="flex space-x-4">
                                    <motion.a
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.9 }}
                                        href="https://wa.me/+905494244249"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="bg-red-500 text-white p-3 rounded-full"
                                    >
                                        <LuMessageCircle size={24} />
                                    </motion.a>
                                    <motion.a
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.9 }}
                                        href="tel:+905494244249"
                                        className="bg-gray-500 text-white p-3 rounded-full"
                                    >
                                        <HiOutlinePhone size={24} />
                                    </motion.a>
                                </div>
                            </div>
                        </div>
                        <div>
                            <h2 className="text-2xl font-semibold mb-4 text-brown-800 dark:text-red-100">{t('location')}</h2>
                            <div className="relative w-full h-64">
                                <iframe
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3193.4319194108193!2d28.13952907613126!3d36.8321305722381!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14bfb9a28834bed5%3A0xcf75f8c66998562a!2sY%C4%B1lmazlar%20Grup%20Marmaris!5e0!3m2!1str!2str!4v1734279083620!5m2!1str!2str"
                                    className="absolute inset-0 w-full h-full border-0"
                                    allowFullScreen
                                    loading="lazy"
                                ></iframe>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

        </div>
    )
}
