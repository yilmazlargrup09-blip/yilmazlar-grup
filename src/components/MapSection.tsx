'use client'
import { useTranslations } from 'next-intl'
import React from 'react'
import { motion } from 'framer-motion'

export const MapSection = () => {
    const t = useTranslations('mapSection')
    return (
        <div className="dark:bg-gray-900 dark:text-white text-gray-900 bg-gray-100">
            <div className="md:flex p-8">
                <div className="md:w-1/2 p-8 md:p-16">
                    <h2 className="text-4xl md:text-5xl font-bold mb-6">{t('title')}</h2>
                    <p className="mb-4">Hisarönü Mahallesi Değirmenyanı Merkez Sokak No:66, Marmaris,Muğla, 48700</p>
                    <div className="space-y-4">
                        <div className="flex items-center">
                            <div className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center mr-4">
                                <svg className="w-6 h-6 text-white " fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                </svg>
                            </div>
                            <motion.a
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                href="https://wa.me/+905494244249"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <span>+90 (549) 424 42 49</span>
                            </motion.a>

                        </div>
                        <div className="flex items-center">
                            <div className="w-10 h-10 flex-shrink-0 bg-red-600 rounded-full flex items-center justify-center mr-4">
                                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                            </div>
                            <span className="break-all text-sm sm:text-base">yilmazlargrup09@gmail.com</span>
                        </div>
                    </div>
                </div>
                <div className="md:w-1/2">
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3193.4319194108193!2d28.13952907613126!3d36.8321305722381!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14bfb9a28834bed5%3A0xcf75f8c66998562a!2sY%C4%B1lmazlar%20Grup%20Marmaris!5e0!3m2!1str!2str!4v1734279083620!5m2!1str!2str"
                        width="100%"
                        height="100%"
                        style={{ border: 0, minHeight: '400px' }}
                        allowFullScreen
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        title="Company Location"
                    ></iframe>
                </div>
            </div>
        </div>
    )
}
