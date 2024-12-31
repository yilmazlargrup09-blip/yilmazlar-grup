'use client'

import React, { useState, useEffect } from 'react'
import '../app/globals.css'

const TOTAL_LOADERS = 3;
const ANIMATION_INTERVAL = 500; // 0.8 saniye

export default function LoadingScreen() {
  const [activeLoader, setActiveLoader] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveLoader((prev) => (prev + 1) % TOTAL_LOADERS);
    }, ANIMATION_INTERVAL);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen  flex flex-col items-center justify-center fixed inset-0 z-50 flex  bg-gray-900">
      <div className="flex space-x-8 mb-10">
        <div className={`loader ${activeLoader === 0 ? 'active' : ''}`}>
          <div className="automatic-shutter">
            <div className="shutter-body">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="shutter-slat" />
              ))}
            </div>
          </div>
        </div>

        <div className={`loader ${activeLoader === 1 ? 'active' : ''}`}>
          <div className="roller-pergola">
            <div className="pergola-frame">
              <div className="pergola-top"></div>
              <div className="pergola-cover"></div>
              <div className="pergola-pillar left"></div>
              <div className="pergola-pillar right"></div>
            </div>
          </div>
        </div>

        <div className={`loader ${activeLoader === 2 ? 'active' : ''}`}>
          <div className="window-frame">
            <div className="window-panel left"></div>
            <div className="window-panel right"></div>
          </div>
        </div>
      </div>
      <div className="h-16 w-16 animate-spin rounded-full border-b-2 border-t-2 border-white"></div>
    </div>
  )
}

