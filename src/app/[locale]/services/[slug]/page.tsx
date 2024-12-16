import Image from 'next/image'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Zap, Shield, Paintbrush, AppWindowIcon as Window, Maximize, Layers, Blinds, ThumbsUp, Lock, Clock, Smile, Sun, Leaf, Thermometer, Heart, Glasses, Clipboard, CheckCircle, Hammer, SwatchBook, VolumeOff, ShieldCheck } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { setRequestLocale } from 'next-intl/server'
import PageLayout from '@/components/PageLayout'

// Icon mapping for advantages
const iconMap = {
  zap: Zap,
  shield: ShieldCheck,
  paintbrush: Paintbrush,
  window: Window,
  maximize: Maximize,
  layers: Layers,
  blinds: Blinds,
  swatchbook:SwatchBook,
  lock:Lock,
  clock:Clock,
  smile:Smile,
  sun:Sun,
  leaf:Leaf,
  thermometer:Thermometer,
  heart:Heart,
  glass:Glasses,
  clipboard:Clipboard,
  checkCircle:CheckCircle,
  hammer:Hammer,
  volumeOff:VolumeOff 
}
type Props = {
  params: { locale: string, slug: string };  // locale ve slug'ı parametre olarak alıyoruz
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
    id: string
    slug: string  // Slug'ı da ekliyoruz
    metaTitle?: string
    metaDescription?: string
    introduction?: string
    heroImage?: string
    advantages?: Array<{ icon: string; title: string; description: string }>
    galleryImages?: string[]
  }>

  // Locale ve slug'a göre hizmeti bul
  const service = servicesList.find(service => service.slug === slug)

  if (!service) {
    notFound() // Eğer hizmet bulunmazsa 404 sayfasına yönlendir
  }

  return (
    <PageLayout title={service?.title} image={service?.image}>
      <div className=" mx-auto ">
        {/* Introduction */}
        <section className="bg-white py-16">
          <div className="container mx-auto px-4 md:px-6 lg:px-8">
            <h2 className="mb-8 text-3xl font-bold text-center text-gray-900"> {service.introduction}</h2>
            <p className="max-w-3xl mx-auto text-center text-gray-600">
              {service.description2}
            </p>
          </div>
        </section>

        {/* Projects */}
        {/* <section className="bg-white py-16">
          <div className="container mx-auto px-4 md:px-6 lg:px-8">
            <h2 className="mb-12 text-3xl font-bold text-center text-gray-900">Our Projects</h2>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {projects.map((project, index) => (
                <div key={index} className="overflow-hidden rounded-lg bg-gray-100 shadow-lg">
                  <Image src={project.image} alt={project.title} width={600} height={400} className="h-48 w-full object-cover" />
                  <div className="p-6">
                    <h3 className="mb-2 text-xl font-semibold">{project.title}</h3>
                    <p className="text-gray-600">{project.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section> */}

        {/* Advantages */}
        <section className="bg-gray-100 py-16">
          <div className="container mx-auto px-4 md:px-6 lg:px-8">
            <h2 className="mb-12 text-3xl font-bold text-center text-gray-900">{t('advantagesTitle')}</h2>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
              {service.advantages && service.advantages.length > 0 && service.advantages.map((advantage, index) => {
                const Icon = iconMap[advantage.icon as keyof typeof iconMap];
                return (
                  <div key={index} className="bg-white rounded-lg shadow-lg p-6 text-center">
                    <Icon className="w-12 h-12 text-red-600 mb-4 mx-auto" />
                    <h3 className="text-xl font-semibold mb-2">{advantage.title}</h3>
                    <p className="text-gray-600">{advantage.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>


        {/* Projects (Gallery) */}
        {/* {service.galleryImages && service.galleryImages.length > 0 && (
        <>
          <h2 className="text-3xl font-semibold text-center mb-8">{t('projectsTitle')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {service.galleryImages.map((image, index) => (
              <div key={index} className="relative h-64">
                <Image
                  src={image}
                  alt={`${service.title} project ${index + 1}`}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-lg"
                />
              </div>
            ))}
          </div>
        </>
      )} */}

        {/* Pricing Section */}
        {/* <div className="bg-gray-100 rounded-lg p-8 text-center mb-12">
        <h2 className="text-3xl font-semibold mb-4">{t('pricingTitle')}</h2>
        <p className="text-xl mb-6">{t('pricingDescription')}</p>
        <Button className="bg-red-600 text-white hover:bg-red-700">
          {t('getInTouchButton')}
        </Button>
      </div> */}
      </div>
    </PageLayout>
  )
}

