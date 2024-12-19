
import Image from 'next/image'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Zap, Shield, Paintbrush, AppWindowIcon as Window, Maximize, Layers, Blinds, ThumbsUp, Lock, Clock, Smile, Sun, Leaf, Thermometer, Heart, Glasses, Clipboard, CheckCircle, Hammer, SwatchBook, VolumeOff, ShieldCheck, Quote, Phone, ArrowRight } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { setRequestLocale } from 'next-intl/server'
import PageLayout from '@/components/PageLayout'
import ReactPlayer from 'react-player'
import { Card } from '@/components/ui/card'
import AnimatedHeading from '@/components/AnimatedHeading'
import { MapSection } from '@/components/MapSection'

// Icon mapping for advantages
const iconMap = {
  zap: Zap,
  shield: ShieldCheck,
  paintbrush: Paintbrush,
  window: Window,
  maximize: Maximize,
  layers: Layers,
  blinds: Blinds,
  swatchbook: SwatchBook,
  lock: Lock,
  clock: Clock,
  smile: Smile,
  sun: Sun,
  leaf: Leaf,
  thermometer: Thermometer,
  heart: Heart,
  glass: Glasses,
  clipboard: Clipboard,
  checkCircle: CheckCircle,
  hammer: Hammer,
  volumeOff: VolumeOff
}
type Props = {
  params: { locale: string, slug: string }; 
}


export default function ServicePage({ params: { locale, slug } }: Props) {
  
  // Locale'i ayarla
  setRequestLocale(locale);
  const t = useTranslations('services')

  // Hizmetler listesi
  const servicesList = t.raw('list') as Array<{
    title: string
    description: string
    description2: string
    image: string
    video?: string,
    id: string
    slug: string  // Slug'ı da ekliyoruz
    metaTitle?: string
    metaDescription?: string
    introduction?: string
    pricingTitle: string,
    pricingDescription: string,
    heroImage?: string
    advantages?: Array<{ icon: string; title: string; description: string }>
    galleryImages?: Array<{ name: string; image: string }>
  }>


  // Locale ve slug'a göre hizmeti bul
  const service = servicesList.find(service => service.slug === slug)

  if (!service) {
    notFound() // Eğer hizmet bulunmazsa 404 sayfasına yönlendir
  }
  const [highlightedWord] = service.introduction?.split(" ") || [];
 
  return (
    <PageLayout title={service?.title} image={service?.image}>
      <div className=" mx-auto ">
        {/* Introduction */}
        <section className="bg-white py-16 dark:bg-gray-900  ">
          <div className="container mx-auto px-4 md:px-6 lg:px-8 mt-5 mb-5">
          <AnimatedHeading text={service.introduction} highlightedWord={highlightedWord}/>
            <hr className="my-6 border-t-2 border-[#ff0505d9] max-w-[150px] mx-auto" />
            <p className="max-w-6xl text-xl md:text-2xl  mx-auto text-center text-gray-600  dark:text-white ">
              {service.description2}
            </p>
          </div>
        </section>
        {/* Pricing Section */}
        <section className="flex flex-col md:flex-row h-auto md:h-[540px] ">
          {/* Video Section */}
          <div className="relative w-full md:w-1/2 h-[200px] md:h-full">
            <video
              src={service?.video}
              autoPlay
              loop
              muted
              className="w-full h-full object-cover"
            >
              {t('videoError')}
            </video>
            <div className="absolute inset-0 bg-gradient-to-r from-gray-600 via-gray-900/70 to-transparent dark:bg-gradient-to-r dark:from-gray-900 dark:via-gray-900/70 dark:to-transparent" />
          </div>

          {/* Text Section */}
          <div className="w-full md:w-1/2 flex items-center justify-center p-6 bg-white dark:bg-gray-900">
            <div className="max-w-3xl text-center md:text-left">
              <h2 className="text-2xl md:text-5xl font-bold text-red-500 dark:text-white mb-2">
                {service.pricingTitle}!
              </h2>
              <p className="text-lg md:text-3xl text-red-500 mb-4">{service.title}</p>
              <p className="text-sm text-gray-500 dark:text-gray-300 mb-4">
                {service.pricingDescription}
              </p>
              <button className="group bg-red-600 text-white px-4 py-2 rounded-full font-semibold inline-flex items-center space-x-2 transition-all duration-300 ease-in-out hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50">
                <span>{t('getInTouchButton')}</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          </div>
        </section>
        {/* Projects */}
        {service.galleryImages && service.galleryImages.length > 0 ? (
          <section className="mx-auto px-4 py-8 md:py-20 dark:bg-gray-800 mb-8 bg-white">
            <h2 className="text-4xl font-semibold mb-2 group-hover:text-blue-600 transition-colors duration-300 dark:text-white ">
              {service?.title} {t('projects')}
            </h2>
            <hr className="my-6 border-t-2 border-[#ff0505d9] max-w-[150px]" />
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {service.galleryImages.map((images, index) => (
                <div
                  key={index}
                  className="bg-white dark:bg-gray-900/70 rounded-lg shadow-md overflow-hidden transition-transform duration-300 ease-in-out transform hover:-translate-y-2 mt-5"
                >
                  <div className="relative h-64">
                    <Image
                      src={images.image}
                      alt={`${service.title} project ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <h2 className="text-lg font-semibold mb-2 group-hover:text-blue-600 transition-colors duration-300 dark:text-white">
                      {images.name}
                    </h2>
                  </div>
                </div>
              ))}
            </div>
          </section>
        ) : (
          <p className="text-gray-500 col-span-full text-center">{' '}</p>
        )}
        {/* Advantages Section */}
        <section className="bg-gray-100 py-10 md:py-10 dark:bg-gray-900">
          <div className="container mx-auto px-4 md:px-6 lg:px-8">
            <h2 className="text-4xl md:text-4xl font-bold text-center text-gray-900 dark:text-white mb-5 mt-5">
              {t('advantagesTitle')}
            </h2>
            <div className="w-24 h-1 bg-[#ff0505d9] mb-6 mx-auto"></div>
            <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4  ">
              {service.advantages &&
                service.advantages.map((advantage, index) => {
                  const Icon = iconMap[advantage.icon as keyof typeof iconMap];
                  return (
                    <Card
                      key={index}
                      className="p-6 border-[#ff0505d9] border rounded-lg shadow-sm mt-5 mb-5"
                    >
                      <div className="flex flex-col items-center md:flex-row md:items-start mb-4">
                        <Icon className="w-12 h-12 text-red-600 mb-4 md:mr-4" />
                        <h3 className="text-lg md:text-xl font-bold text-gray-700 dark:text-white">
                          {advantage.title}
                        </h3>
                      </div>
                      <p className="text-gray-600 dark:text-gray-300 text-center md:text-left">
                        {advantage.description}
                      </p>
                    </Card>
                  );
                })}
            </div>
          </div>
        </section>
       
        <MapSection/>
        
      </div>
    </PageLayout>
  )
}

