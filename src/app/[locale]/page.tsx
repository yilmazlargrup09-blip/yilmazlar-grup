'use client'

import { useState, useEffect } from 'react'
import Hero from '@/components/Hero';
import { Services } from '@/components/Services';
import { Franchises } from '@/components/Franchises';
import PartnersSection from '@/components/PartnersSection';
import { MapSection } from '@/components/MapSection';
import LoadingScreen from '@/components/LoadingScreen';



export default function IndexPage() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false)
    }, 1000) // 2 seconds loading time
  
    return () => clearTimeout(timer)
  }, [])
  
  return (
    <main className="min-h-screen bg-gray-900">
       {loading ? (
        <LoadingScreen />
      ) : (
        <>
      <Hero />
      <Franchises />
      <Services />
      <MapSection />
      <PartnersSection />
      </>
    )}
    </main>
  );
}

