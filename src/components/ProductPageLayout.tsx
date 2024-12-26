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
        // <div className="min-h-screen bg-white dark:bg-[#363f4b]">
        //   <section className="py-16 relative h-[300px] md:h-[500px] w-full dark:bg-gray-900">
        //     <div className="absolute inset-0 overflow-hidden">
        //       {isVideo ? (
        //         <video
        //           src={image}
        //           autoPlay
        //           loop
        //           muted
        //           playsInline
        //           className="object-cover rounded-lg w-full h-full brightness-50"
        //         />
        //       ) : (
        //         <Image
        //           src={image}
        //           alt={`Yılmazlar Grup ${title}`}
        //           fill
        //           objectFit="cover"
        //           priority
        //           className="brightness-50"
        //         />
        //       )}
        //       <div className="absolute inset-0 flex flex-col items-start justify-center px-4 md:px-16">
        //         <h1 className="text-3xl md:text-5xl lg:text-7xl font-bold text-white tracking-wider mb-4">
        //           {title}
        //         </h1>
        //         <div className="w-24 md:w-32 h-1 bg-[#ff0505d9]" />
        //       </div>
        //     </div>
        //   </section>
        //   {/* About Section */}
        //   <section className='bg-[#f5f7fa] dark:bg-gray-900'>
        //     <div className="mt-1 ">
        //       {children}
        //     </div>
        //   </section>
        // </div>
    );
}
