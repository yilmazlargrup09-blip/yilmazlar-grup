'use client'

import { ReactNode, useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import BlurImage from './blur-image';

type Props = {
    children?: ReactNode;
    title: ReactNode;
    image: string;
    subTitle: ReactNode;
};

export default function ProductLayout({ children, title, image, subTitle }: Props) {
    const isVideo = image.toLowerCase().endsWith('.mp4');
    const [isLoaded, setIsLoaded] = useState(false);
    const t = useTranslations('productLayout');
    useEffect(() => {
        setIsLoaded(true);
    }, []);

    const containerVariants = {
        hidden: { opacity: 0, x: -100 },
        visible: {
            opacity: 1,
            x: 0,
            transition: {
                duration: 0.5,
                staggerChildren: 0.2
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, x: -50 },
        visible: { opacity: 1, x: 0 }
    };

    return (
        <div className="min-h-screen bg-white dark:bg-[#363f4b]">
            <section className="relative pt-16">
                <div
                    className="absolute inset-0 z-0"

                >
                    {isVideo ? (
                        <video
                            src={image}
                            autoPlay
                            loop
                            muted
                            playsInline
                            preload="none"
                            className="object-cover rounded-lg w-full md:h-[700px] h-full brightness-[0.7]"
                        />
                    ) : (
                        <BlurImage
                            src={image}
                            alt={`Yılmazlar Grup ${title}`}
                            fill
                            priority
                            className="object-cover brightness-[0.7]"
                        />

                    )}
                </div>

                <motion.div
                    className="relative z-10 container mx-auto px-4 py-32 md:py-48 mt-10"
                    variants={containerVariants}
                    initial="hidden"
                    animate={isLoaded ? "visible" : "hidden"}
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

                    <motion.a variants={itemVariants}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        href="https://wa.me/+905494244249"
                        target="_blank"
                        rel="noopener noreferrer"

                    >
                        <Button size="lg" className="bg-red-600 hover:bg-red-700 text-white">
                            {t('title')}
                        </Button>
                    </motion.a>
                </motion.div>
            </section>
            <section className='bg-[#f5f7fa] dark:bg-gray-900'>
                <div className="">
                    {children}
                </div>
            </section>
        </div>
    );
}

