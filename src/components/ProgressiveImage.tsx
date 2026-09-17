'use client'

import { useEffect, useState } from 'react'
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
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    setIsReady(false)
  }, [src])

  return (
    <span
      className={cn(
        'image-reveal block overflow-hidden bg-slate-200 dark:bg-slate-700',
        props.fill && 'absolute inset-0',
        isReady && 'image-reveal--ready',
        wrapperClassName,
      )}
    >
      <Image
        {...props}
        src={src}
        alt={alt}
        onLoad={(event) => {
          setIsReady(true)
          onLoad?.(event)
        }}
        onError={(event) => {
          // Do not leave a flashing/broken-image state if an optional asset fails.
          setIsReady(true)
          onError?.(event)
        }}
        className={cn(
          'image-reveal__asset transition-[opacity,transform,filter] duration-500 ease-out',
          isReady ? 'opacity-100 scale-100 blur-0' : 'opacity-0 scale-[1.015] blur-sm',
          className,
        )}
      />
    </span>
  )
}
