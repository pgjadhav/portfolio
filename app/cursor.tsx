'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const cursor = cursorRef.current
    if (!cursor) return

    let mouseX = 0
    let mouseY = 0
    let cursorX = 0
    let cursorY = 0
    let isHovering = false

    const moveCursor = () => {
      if (!isHovering) {
        cursorX += (mouseX - cursorX) * 0.15
        cursorY += (mouseY - cursorY) * 0.15
        gsap.to(cursor, {
          x: cursorX,
          y: cursorY,
          duration: 0.1,
          overwrite: 'auto',
        })
      }
    }

    const animate = () => {
      moveCursor()
      requestAnimationFrame(animate)
    }

    // Track mouse movement
    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX
      mouseY = e.clientY
    }

    // Hover interactions
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (!target || !target.dataset) return
      
      if (target.dataset.cursor === 'hover') {
        isHovering = true
        const rect = target.getBoundingClientRect()
        gsap.to(cursor, {
          x: rect.left + rect.width / 2,
          y: rect.top + rect.height / 2,
          width: 60,
          height: 60,
          duration: 0.3,
          ease: 'power2.out',
        })
        cursor.style.borderColor = 'var(--accent)'
      } else if (target.dataset.cursor === 'text') {
        gsap.to(cursor, { scale: 1.2, duration: 0.3 })
      } else if (target.dataset.cursor === 'button') {
        gsap.to(cursor, { scale: 1.5, duration: 0.3 })
      }
    }

    const handleMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (!target || !target.dataset) return
      
      if (target.dataset.cursor === 'hover') {
        isHovering = false
        gsap.to(cursor, {
          width: 30,
          height: 30,
          duration: 0.3,
          ease: 'power2.out',
        })
        cursor.style.borderColor = 'var(--accent)'
      } else if (target.dataset.cursor === 'text' || target.dataset.cursor === 'button') {
        gsap.to(cursor, { scale: 1, duration: 0.3 })
      }
    }

    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseover', handleMouseOver)
    document.addEventListener('mouseout', handleMouseOut)

    animate()

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseover', handleMouseOver)
      document.removeEventListener('mouseout', handleMouseOut)
    }
  }, [])

  return (
    <div
      ref={cursorRef}
      className="pointer-events-none fixed z-50 flex items-center justify-center w-[30px] h-[30px] border-2 border-[var(--accent)] rounded-full mix-blend-multiply"
      style={{
        transform: 'translate(-50%, -50%)',
        left: 0,
        top: 0,
      }}
    >
      <div className="w-1 h-1 bg-[var(--accent)] rounded-full" />
    </div>
  )
}
