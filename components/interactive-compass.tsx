"use client"

import { useEffect, useRef, useState } from "react"

export function InteractiveCompass({ className }: { className?: string }) {
  const compassRef = useRef<HTMLDivElement>(null)
  const [rotation, setRotation] = useState(0)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!compassRef.current) return

      const rect = compassRef.current.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2

      // Calculate angle between center of compass and mouse position
      const angleRad = Math.atan2(e.clientY - centerY, e.clientX - centerX)
      const angleDeg = angleRad * (180 / Math.PI)

      // Add 90 degrees because the needle points up (0deg) by default,
      // but atan2 returns 0 for right (3 o'clock)
      setRotation(angleDeg + 90)
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  return (
    <div ref={compassRef} className={`relative flex items-center justify-center text-white ${className}`}>
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        {/* Outer Ring */}
        <circle cx="50" cy="50" r="45" stroke="currentColor" strokeWidth="6" className="opacity-100" />
        {/* Cardinal Marks */}
        <path d="M50 4 V14" stroke="currentColor" strokeWidth="6" /> {/* N */}
        <path d="M50 86 V96" stroke="currentColor" strokeWidth="6" /> {/* S */}
        <path d="M86 50 H96" stroke="currentColor" strokeWidth="6" /> {/* E */}
        <path d="M4 50 H14" stroke="currentColor" strokeWidth="6" /> {/* W */}
        {/* Sub-marks (Diagonals) */}
        <circle cx="50" cy="50" r="3" fill="currentColor" />
        {/* Rotating Needle Group */}
        <g
          style={{ transform: `rotate(${rotation}deg)`, transformOrigin: "50px 50px" }}
          className="transition-transform duration-75 ease-out"
        >
          {/* North Needle (Filled) */}
          <path d="M50 18 L58 50 L50 82 L42 50 Z" fill="currentColor" />

          {/* Center Pivot Detail */}
          <circle cx="50" cy="50" r="4" fill="black" />
        </g>
      </svg>
    </div>
  )
}
