import React from 'react';
import Image from 'next/image'
import { Card } from './ui/card'
import { useTranslations } from 'next-intl';


export default function About() {
    const t = useTranslations('about')
    const whyUs = t.raw('whyUs') as Array<{
        title: string
        description: string
        icon: string
    }>
    return (
        <div>
            <section className='bg-[#f5f7fa] dark:bg-gray-900 py-12 md:py-20'>
                <div className="px-4 md:px-16 max-w-[1400px] mx-auto">
                    <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-start">
                        <div>
                            <h2 className="text-gray-700 text-3xl md:text-4xl font-bold mb-6 dark:text-white">
                                {t('subTitle')}
                            </h2>
                            <div className="w-24 h-1 bg-[#ff0505d9] mb-6" />
                            <div className="space-y-4 text-gray-700 dark:text-gray-300">
                                <p className="leading-relaxed">
                                    {t('desc1')}
                                </p>
                                <p className="leading-relaxed">
                                    {t('desc2')}
                                </p>
                            </div>
                        </div>
                        <div className="relative h-[300px] md:h-[500px] mt-6 md:mt-0">
                            <Image
                                src="/assets/about/hakkimizda.webp"
                                alt="FNZ YAPI Modern Villa Projesi"
                                fill
                                className="object-cover rounded-lg"
                                loading="lazy"
                            />
                        </div>
                    </div>
                </div>
            </section>
            {/* Why Us Section */}
            <section className="bg-gray-100 dark:bg-gray-800 py-12 md:py-20">
                <div className="container mx-auto px-4 md:px-16 max-w-7xl">
                    <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center text-gray-700 dark:text-white">{t('whyUsTitle')}</h2>
                    <div className="w-24 h-1 bg-[#ff0505d9] mb-6 mx-auto" />
                    <p className="text-md text-gray-600 dark:text-white mb-8 text-center">
                        {t('whyUssubTitle')}
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {whyUs.map((item, index) => (
                            <Card key={index} className="p-6 border-[#ff0505d9] border">
                                <div className="flex items-center mb-4">
                                    <Image
                                        src={item.icon}
                                        alt={item.title}
                                        width={50}
                                        height={50}
                                        className="mr-4"
                                        loading="lazy"
                                    />
                                    <h3 className="text-xl dark:text-white text-gray-500 font-bold hover:text-gray-700">
                                        {item.title}
                                    </h3>
                                </div>
                                <p className="text-gray-600 dark:text-white">
                                    {item.description}
                                </p>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>
            {/* Mission & Vision Section */}
            <section className="py-12 md:py-20 dark:bg-gray-900">
                <div className="container mx-auto px-4 md:px-16 max-w-7xl">
                    <div className="grid md:grid-cols-2 gap-12">
                        <div>
                            <div className="relative h-[300px] md:h-[400px] mb-8">
                                <Image
                                    src="/assets/about/misyon.webp"
                                    alt="FNZ YAPI Modern Villa Projesi"
                                    fill
                                    className="object-cover rounded-lg"
                                    loading="lazy"
                                />

                            </div>
                            <h2 className="text-2xl font-bold mb-4 relative text-brown-700 dark:text-white">
                                {t('missionTitle')}
                                <div className="w-16 h-1 bg-[#ff0505d9] absolute -bottom-2" />
                            </h2>
                            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mt-6">
                                {t('mission')}
                            </p>
                        </div>
                        <div>
                            <div className="relative h-[300px] md:h-[400px] mb-8">
                                <Image
                                    src="/assets/about/vizyon-2.png"
                                    alt="FNZ YAPI Modern Villa Projesi"
                                    fill
                                    className="object-cover rounded-lg"
                                    loading="lazy"
                                />

                            </div>
                            <h2 className="text-2xl font-bold mb-4 relative text-brown-700 dark:text-white">
                                {t('visionTitle')}
                                <div className="w-16 h-1 bg-[#ff0505d9] absolute -bottom-2" />
                            </h2>
                            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mt-6">
                                {t('vision')}
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </div>


    )
}

