'use client';

import { ReactNode, useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { Skeleton } from '@/components/ui/skeleton';

type Props = {
    children?: ReactNode;
    title: ReactNode;
    image: string;
    subTitle: ReactNode;
};

export default function ProductLayout({ children, title, image, subTitle }: Props) {
    const [isMediaLoaded, setIsMediaLoaded] = useState(false);
    const isVideo = image.toLowerCase().endsWith('.mp4');
    const t = useTranslations('productLayout');

    useEffect(() => {
        if (isVideo) {
            const video = document.querySelector('video');
            if (video) {
                video.addEventListener('loadeddata', () => setIsMediaLoaded(true));
                return () => video.removeEventListener('loadeddata', () => setIsMediaLoaded(true));
            }
        }
    }, [isVideo]);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                duration: 0.3,
                when: 'beforeChildren',
                staggerChildren: 0.1,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
    };

    return (
        <div className="min-h-screen bg-white dark:bg-[#363f4b]">
            <section className="relative pt-16">
                {/* Background Image or Video */}
                <div className="absolute inset-0 z-0">
                    {isVideo ? (
                        <>
                            <video
                                src={image}
                                autoPlay
                                loop
                                muted
                                playsInline
                                preload="auto"
                                className={`object-cover w-full h-full md:h-[700px] brightness-[0.7] ${
                                    isMediaLoaded ? 'opacity-100' : 'opacity-0'
                                } transition-opacity duration-300`}
                                onLoadedData={() => setIsMediaLoaded(true)}
                            />
                            {!isMediaLoaded && (
                                <Skeleton className="w-full h-full md:h-[700px] bg-gray-100 dark:bg-gray-800" />
                            )}
                        </>
                    ) : (
                        <>
                            <Image
                                src={image}
                                alt={`Yılmazlar Grup ${title}`}
                                fill
                                priority
                                sizes="100vw"
                                className={`object-cover brightness-[0.7] ${
                                    isMediaLoaded ? 'opacity-100' : 'opacity-0'
                                } transition-opacity duration-300`}
                                onLoadingComplete={() => setIsMediaLoaded(true)}
                            />
                            {!isMediaLoaded && (
                                <Skeleton className="w-full h-full md:h-[700px] bg-gray-100 dark:bg-gray-800" />
                            )}
                        </>
                    )}
                </div>

                {/* Content */}
                {isMediaLoaded && (
                    <motion.div
                        className="relative z-10 container mx-auto px-4 py-32 md:py-48 mt-10"
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        <motion.h1
                            className="text-4xl md:text-6xl font-bold text-white mb-6 max-w-3xl"
                            variants={itemVariants}
                        >
                            {title}
                        </motion.h1>
                        <motion.p
                            className="text-lg md:text-xl text-gray-200 max-w-2xl mb-8"
                            variants={itemVariants}
                        >
                            {subTitle}
                        </motion.p>

                        <motion.a
                            variants={itemVariants}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            href="https://wa.me/+905494244249"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <Button size="lg" className="bg-red-600 hover:bg-red-700 text-white">
                                {t('title')}
                            </Button>
                        </motion.a>
                    </motion.div>
                )}
            </section>

            {/* Children Content */}
            <section className="bg-[#f5f7fa] dark:bg-gray-900">
                {isMediaLoaded ? (
                    <div>{children}</div>
                ) : (
                    <div className="container mx-auto px-4 py-16">
                        <Skeleton className="w-full h-64 bg-gray-100 dark:bg-gray-800" />
                    </div>
                )}
            </section>
        </div>
    );
}

