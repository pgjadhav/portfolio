'use client'

import { useEffect, useState } from 'react'

export default function Loading() {
  const [progress, setProgress] = useState(0)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer)
          setTimeout(() => setIsLoaded(true), 500)
          return 100
        }
        return prev + 2
      })
    }, 50)

    return () => clearInterval(timer)
  }, [])

  if (isLoaded) return null

  return (
    <div className="loading-overlay">
      <div className="loading-content">
        <div className="loading-text">
          <span className="loading-letter">P</span>
          <span className="loading-letter">R</span>
          <span className="loading-letter">A</span>
          <span className="loading-letter">S</span>
          <span className="loading-letter">H</span>
          <span className="loading-letter">A</span>
          <span className="loading-letter">N</span>
          <span className="loading-letter">T</span>
        </div>
        <div className="loading-bar">
          <div className="loading-fill" style={{ width: `${progress}%` }} />
        </div>
        <div className="loading-percent">{progress}%</div>
      </div>
    </div>
  )
}