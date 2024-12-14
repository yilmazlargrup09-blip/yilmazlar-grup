import React from 'react';
import Image from 'next/image'
import { Card } from '../components/ui/card'
import { RiArrowRightDoubleLine } from "react-icons/ri";
import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'FNZ YAPI - Hakkımızda | Marmaris\'te Lider İnşaat ve İç Dekorasyon Şirketi',
    description: 'FNZ YAPI, Marmaris\'te modern ve lüks yaşam alanları inşa eden, özel mobilya tasarımı ve dekorasyon hizmetleri sunan lider bir inşaat şirketidir. Yüksek kaliteli konut projeleri ve iç mekan çözümleri için bizi tercih edin.',
    openGraph: {
        title: 'FNZ YAPI - Marmaris\'in Güvenilir İnşaat ve Dekorasyon Uzmanı',
        description: 'Marmaris\'te villa projeleri, iç dekorasyon ve özel mobilya tasarımında uzman FNZ YAPI ile tanışın. Kaliteli, modern ve lüks yaşam alanları için doğru adres.',
        images: [
            {
                url: '/assets/images/about/fnz-yapi-marmaris-hakkimizda-4.png',
                width: 1200,
                height: 630,
                alt: 'FNZ YAPI Marmaris',
            },
        ],
    },
    keywords: 'Marmaris villa inşaatı, konut inşaatı, mobilya dekorasyon, FNZ YAPI, Marmaris inşaat firması, Marmaris İnşaat , marmaris villa , fonozbart , fonozbart ahşap sanayi , marmaris daire , marmaris müstakil ev , marmaris merkez ev , marmaris mutfak dolabı , marmaris banyo dolabı',
}


export default function About() {
    return (
        <section className='bg-[#f5f7fa] dark:bg-gray-900 py-12 md:py-20'>
            <div className="px-4 md:px-16 max-w-[1400px] mx-auto">
                <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-start">
                    <div>
                        <h2 className="text-[#6D4534] text-3xl md:text-4xl font-bold mb-6 dark:text-white">
                            YILMAZLAR GRUP HAKKINDA
                        </h2>
                        <div className="w-24 h-1 bg-[#ff0505d9] mb-6" />
                        <div className="space-y-4 text-gray-700 dark:text-gray-300">
                            <p className="leading-relaxed">
                                Yılmazlar Grup olarak, yenilikçi ve estetik odaklı tasarım çözümleri sunan bir yapı tasarım firmasıyız. 2000 yılından bu yana, mimari ve
                                iç mekan tasarımından kentsel planlamaya kadar geniş bir projeler yelpazesine imza atarak sektörde güçlü bir konum elde ettik.
                            </p>
                            <p className="leading-relaxed">
                                Sunduğumuz hizmetler arasında pencere ve kapı sistemleri, giyotin, bioklimatik pergola, otomatik panjur sistemleri, dış cephe giydirme,
                                dış cephe güneş kırıcı perdeler, cam balkon ve kış bahçesi gibi çeşitli tasarım ve yapı çözümleri yer almaktadır.
                                Her bir projede, estetik, işlevsellik ve enerji verimliliği prensiplerini ön planda tutarak, müşterilerimize en yüksek kaliteyi sunmayı hedefliyoruz.
                            </p>
                        </div>
                    </div>
                    <div className="relative h-[300px] md:h-[500px] mt-6 md:mt-0">
                        <Image
                            src="/assets/about/hakkimizda-1.jpg"
                            alt="FNZ YAPI Modern Villa Projesi"
                            fill
                            className="object-cover rounded-lg"
                        />
                    </div>
                </div>
            </div>
        </section>

    )
}

