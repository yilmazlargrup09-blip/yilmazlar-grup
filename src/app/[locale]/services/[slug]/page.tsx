import type { Metadata, ResolvingMetadata } from 'next'
import { notFound } from 'next/navigation'
import { getTranslations } from 'next-intl/server'
import { ServiceContent } from './ServiceContent'

type Props = {
  params: Promise<{ locale: string; slug: string }>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

type Service = {
  title: string
  slug: string
  metaTitle?: string
  subTitle?: string
  metaDescription?: string
  keywords?: string
  introduction?: string
  description: string
  description2: string
  image: string
  video?: string
  pricingTitle: string
  pricingDescription: string
  advantages?: Array<{ icon: string; title: string; description: string }>
  galleryImages?: Array<{ name: string; image: string }>
}

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  // read route params
  const { locale, slug } = await params

  // Use getTranslations instead of useTranslations for server components
  const t = await getTranslations('services')

  // Fetch the services list
  const servicesList = t.raw('list') as Array<Service>

  // Find the service based on the slug
  const service = servicesList.find(service => service.slug === slug)

  if (!service) {
    return {
      title: 'Service Not Found',
      description: 'The requested service could not be found.',
    }
  }

  // optionally access and extend (rather than replace) parent metadata
  const previousImages = (await parent).openGraph?.images || []

  return {
    title: service.metaTitle || service.title,
    description: service.metaDescription || service.description,
    keywords: service.keywords,
    openGraph: {
      title: service.metaTitle || service.title,
      description: service.metaDescription || service.description,
      images: [
        {
          url: service.image,
          width: 1200,
          height: 630,
          alt: service.title,
        },
        ...previousImages,
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: service.metaTitle || service.title,
      description: service.metaDescription || service.description,
      images: [service.image],
    },
  }
}

export default async function ServicePage({ params }: Props) {
  const {  slug } = await params
  const t = await getTranslations('services')

  // Fetch the services list
  const servicesList = t.raw('list') as Array<Service>

  // Find the service based on the slug
  const service = servicesList.find(service => service.slug === slug)

  if (!service) {
    notFound()
  }

  return <ServiceContent service={service} />
}

