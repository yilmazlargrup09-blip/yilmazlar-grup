'use client'

import { useState } from 'react'
import Image, { type ImageProps } from 'next/image'
import { cn } from '@/lib/utils'

type ProgressiveImageProps = ImageProps & {
  wrapperClassName?: string
}

/**
 * Keeps the image's reserved Next/Image dimensions in place while replacing its
 * neutral placeholder with a short, unobtrusive reveal once the asset is ready.
 */
export default function ProgressiveImage({
  className,
  wrapperClassName,
  onLoad,
  onError,
  src,
  alt,
  ...props
}: ProgressiveImageProps) {
  const [readySrc, setReadySrc] = useState<ImageProps['src'] | null>(null)
  const isReady = readySrc === src

  return (
    <span
      className={cn(
        'image-reveal block overflow-hidden ',
        props.fill ? 'absolute inset-0' : 'relative',
        isReady && 'image-reveal--ready',
        wrapperClassName,
      )}
    >
      <Image
        {...props}
        src={src}
        alt={alt}
        onLoad={(event) => {
          setReadySrc(src)
          onLoad?.(event)
        }}
        onError={(event) => {
          // Do not leave a flashing/broken-image state if an optional asset fails.
          setReadySrc(src)
          onError?.(event)
        }}
        className={cn(
          'image-reveal__asset transition-[opacity,transform,filter] duration-500 ease-out',
          isReady ? 'scale-100 blur-0' : 'scale-[1.015] blur-sm',
          className,
        )}
      />
    </span>
  )
}
