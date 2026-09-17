'use client';

import { ReactNode } from 'react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import ProgressiveImage from './ProgressiveImage';

type Props = {
    children?: ReactNode;
    title: ReactNode;
    image: string;
    subTitle: ReactNode;
};

export default function ProductLayout({ children, title, image, subTitle }: Props) {
    const isVideo = image.toLowerCase().endsWith('.mp4');
    const t = useTranslations('productLayout');


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
                         <video data-page-media="true"
                         src={image}
                         autoPlay
                         loop
                         muted
                         playsInline
                         preload="auto"
                         className="object-cover w-full h-full md:h-[700px] brightness-[0.7]"
                     />
                    ) : (
                        <>
                             <ProgressiveImage
                            src={image}
                            alt={`Yılmazlar Grup ${title}`}
                            fill
                            priority
                            sizes="100vw"
                            className="object-cover brightness-[0.7]"
                        />
                        </>
                    )}
                </div>

                {/* Content */}
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
            </section>

            {/* Children Content */}
            <section className="bg-[#f5f7fa] dark:bg-gray-900">
                <div>{children}</div>
            </section>
        </div>
    );
}

