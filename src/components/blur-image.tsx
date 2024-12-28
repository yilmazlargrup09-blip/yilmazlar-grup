'use client'

import { useState, useEffect } from 'react'
import NextImage, { ImageProps } from 'next/image'
import { cn } from '@/lib/utils'

interface BlurImageProps extends Omit<ImageProps, 'src' | 'alt'> {
  src: string
  alt: string
}

export default function BlurImage({
  src,
  alt,
  className,
  ...props
}: BlurImageProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [currentSrc, setCurrentSrc] = useState(getLowQualityImageUrl(src))

  useEffect(() => {
    const highResImage = new globalThis.Image()
    highResImage.src = src
    highResImage.onload = () => {
      setCurrentSrc(src)
      setIsLoading(false)
    }
  }, [src])

  return (
    <NextImage
      {...props}
      src={currentSrc}
      alt={alt}
      className={cn(
        "transition-all duration-500",
        isLoading ? 
          "scale-105 blur-sm" : 
          "scale-100 blur-0",
        className
      )}
    />
  )
}

function getLowQualityImageUrl(src: string): string {
  try {
    const url = new URL(src, typeof window !== 'undefined' ? window.location.origin : undefined)
    url.searchParams.set('w', '50')
    url.searchParams.set('q', '10')
    return url.toString()
  } catch (error) {
    // If URL parsing fails, return the original src
    return src
  }
}
