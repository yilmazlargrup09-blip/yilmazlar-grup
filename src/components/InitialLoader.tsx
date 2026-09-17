'use client'

import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import LoadingScreen from './LoadingScreen'

const SHOW_DELAY = 400
const MIN_VISIBLE = 2400
const MAX_WAIT = 8000
const FADE_DURATION = 520

export default function InitialLoader() {
  const pathname = usePathname()
  const [phase, setPhase] = useState<'hidden' | 'visible' | 'leaving'>('hidden')

  useEffect(() => {
    setPhase('hidden')
    const startedAt = performance.now()
    let shownAt: number | null = null
    let finished = false
    let closeTimer: number | undefined
    let removeTimer: number | undefined
    const failed = new WeakSet<Element>()

    const pendingMedia = () => Array.from(
      document.querySelectorAll<HTMLImageElement | HTMLVideoElement>('main [data-page-media]'),
    ).some((media) => {
      if (failed.has(media)) return false
      if (media instanceof HTMLImageElement) return !media.complete
      return media.readyState < 2 && !media.error
    })

    const finish = () => {
      if (finished) return
      finished = true
      observer.disconnect()
      window.clearTimeout(showTimer)
      window.clearTimeout(guardTimer)
      if (shownAt === null) return
      closeTimer = window.setTimeout(() => {
        setPhase('leaving')
        removeTimer = window.setTimeout(() => setPhase('hidden'), FADE_DURATION)
      }, Math.max(0, MIN_VISIBLE - (performance.now() - shownAt)))
    }

    const check = () => {
      if (finished || performance.now() - startedAt < SHOW_DELAY) return
      const hasMedia = document.querySelector('main [data-page-media]') !== null
      if (!hasMedia) {
        if (shownAt !== null) finish()
        return
      }
      if (!pendingMedia()) {
        finish()
      } else if (shownAt === null) {
        shownAt = performance.now()
        setPhase('visible')
      }
    }
    const onMediaEvent = (event: Event) => {
      if (event.type === 'error' && event.target instanceof Element) failed.add(event.target)
      check()
    }
    const observer = new MutationObserver(check)
    observer.observe(document.body, { childList: true, subtree: true, attributes: true, attributeFilter: ['src', 'srcset', 'data-page-media'] })
    // Cached and fast images never trigger a full-screen overlay.
    const showTimer = window.setTimeout(check, SHOW_DELAY)
    // A broken or stalled asset must never block the page indefinitely.
    const guardTimer = window.setTimeout(finish, MAX_WAIT)
    document.addEventListener('load', onMediaEvent, true)
    document.addEventListener('loadeddata', onMediaEvent, true)
    document.addEventListener('error', onMediaEvent, true)

    return () => {
      observer.disconnect()
      window.clearTimeout(showTimer)
      window.clearTimeout(guardTimer)
      window.clearTimeout(closeTimer)
      window.clearTimeout(removeTimer)
      document.removeEventListener('load', onMediaEvent, true)
      document.removeEventListener('loadeddata', onMediaEvent, true)
      document.removeEventListener('error', onMediaEvent, true)
    }
  }, [pathname])

  if (phase === 'hidden') return null
  return (
    <div className={`site-loader-shell ${phase === 'leaving' ? 'site-loader-shell--leaving' : ''}`}>
      <LoadingScreen />
    </div>
  )
}
