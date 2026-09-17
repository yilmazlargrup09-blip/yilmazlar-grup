'use client'

import { useEffect, useState } from 'react'
import LoadingScreen from './LoadingScreen'

const CRITICAL_ASSETS = [
  '/assets/logos/yilmazlar-grup-logo.png',
  '/assets/images/cam-balkon-marmaris.webp',
  '/assets/images/pvc-urunleri.webp',
  '/assets/images/balkon-cam-korkuluk.svg',
]

function preloadImage(src: string) {
  return new Promise<void>((resolve) => {
    const image = new window.Image()
    let isSettled = false

    const finish = () => {
      if (isSettled) return
      isSettled = true
      window.clearTimeout(timeout)
      resolve()
    }

    // A stalled connection must not hold the whole page behind the overlay.
    // Successful assets still finish immediately; this is only a network guard.
    const timeout = window.setTimeout(finish, 7000)
    image.onload = () => {
      const decode = image.decode?.()
      if (decode) {
        decode.catch(() => undefined).finally(finish)
      } else {
        finish()
      }
    }
    image.onerror = finish
    image.src = src
  })
}

function waitForFonts() {
  return new Promise<void>((resolve) => {
    const timeout = window.setTimeout(resolve, 7000)
    ;(document.fonts?.ready ?? Promise.resolve()).finally(() => {
      window.clearTimeout(timeout)
      resolve()
    })
  })
}

export default function InitialLoader() {
  const [isVisible, setIsVisible] = useState(true)
  const [isLeaving, setIsLeaving] = useState(false)

  useEffect(() => {
    if (sessionStorage.getItem('yilmazlar-initial-loader-complete')) {
      setIsVisible(false)
      return
    }

    Promise.all([
      ...CRITICAL_ASSETS.map(preloadImage),
      waitForFonts(),
    ]).finally(() => {
      sessionStorage.setItem('yilmazlar-initial-loader-complete', 'true')
      requestAnimationFrame(() => requestAnimationFrame(() => setIsLeaving(true)))
    })
  }, [])

  if (!isVisible) return null

  return (
    <div
      className={`site-loader-shell ${isLeaving ? 'site-loader-shell--leaving' : ''}`}
      onTransitionEnd={(event) => {
        if (isLeaving && event.target === event.currentTarget) setIsVisible(false)
      }}
    >
      <LoadingScreen />
    </div>
  )
}
