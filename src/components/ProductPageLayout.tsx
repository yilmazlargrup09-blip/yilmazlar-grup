import { ReactNode } from 'react';
import Image from 'next/image';
import { Button } from './ui/button';
import { useTranslations } from 'next-intl';

type Props = {
    children?: ReactNode;
    title: ReactNode;
    image: string;
    subTitle: ReactNode;
};

export default function ProductLayout({ children, title, image, subTitle }: Props) {

    const t = useTranslations('productLayout');
    const isVideo = image.toLowerCase().endsWith('.mp4');
    return (
        <div className="min-h-screen bg-white dark:bg-[#363f4b]">
            <section className="relative pt-16">
                <div className="absolute inset-0 z-0">
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
                        <Image
                            src={image}
                            alt={`Yılmazlar Grup ${title}`}
                            fill
                            className="object-cover brightness-[0.7]"
                            priority
                           
                        />
                    )}
                </div>

                <div className="relative z-10 container mx-auto px-4 py-32 md:py-48 mt-10">
                    <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 max-w-3xl">
                        {title}
                    </h1>
                    <p className="text-lg md:text-xl text-gray-200 max-w-2xl mb-8">
                        {subTitle}
                    </p>
                    <Button size="lg" className="bg-red-600 hover:bg-red-700 text-white">
                        {t('title')}
                    </Button>
                </div>
            </section>
            <section className='bg-[#f5f7fa] dark:bg-gray-900'>
                <div className="mt-1 ">
                    {children}
                </div>
            </section>
        </div>
    );
}
