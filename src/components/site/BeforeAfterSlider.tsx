'use client'

import { useCallback, useRef, useState } from 'react'

type BeforeAfterSliderProps = {
  beforeUrl?: string
  beforeAlt: string
  afterUrl?: string
  afterAlt: string
}

export default function BeforeAfterSlider({
  beforeUrl,
  beforeAlt,
  afterUrl,
  afterAlt,
}: BeforeAfterSliderProps) {
  const [percent, setPercent] = useState(50)
  const containerRef = useRef<HTMLDivElement>(null)
  const draggingRef = useRef(false)

  const updateFromClientX = useCallback((clientX: number) => {
    const el = containerRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const pct = ((clientX - rect.left) / rect.width) * 100
    setPercent(Math.min(100, Math.max(0, pct)))
  }, [])

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    draggingRef.current = true
    e.currentTarget.setPointerCapture(e.pointerId)
    updateFromClientX(e.clientX)
  }

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!draggingRef.current) return
    updateFromClientX(e.clientX)
  }

  const stopDragging = () => {
    draggingRef.current = false
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'ArrowLeft') setPercent((p) => Math.max(0, p - 5))
    else if (e.key === 'ArrowRight') setPercent((p) => Math.min(100, p + 5))
    else if (e.key === 'Home') setPercent(0)
    else if (e.key === 'End') setPercent(100)
    else return
    e.preventDefault()
  }

  return (
    <div
      ref={containerRef}
      className="baf"
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={stopDragging}
      onPointerLeave={stopDragging}
      onPointerCancel={stopDragging}
    >
      <div
        className="baf-img baf-after"
        role="img"
        aria-label={afterAlt}
        style={afterUrl ? { backgroundImage: `url(${afterUrl})` } : undefined}
      >
        <span className="baf-tag">After</span>
      </div>

      <div
        className="baf-img baf-before"
        role="img"
        aria-label={beforeAlt}
        style={{
          ...(beforeUrl ? { backgroundImage: `url(${beforeUrl})` } : undefined),
          clipPath: `inset(0 ${100 - percent}% 0 0)`,
        }}
      >
        <span className="baf-tag">Before</span>
      </div>

      <div
        className="baf-divider"
        style={{ left: `${percent}%` }}
        role="slider"
        tabIndex={0}
        aria-label="Drag to compare before and after"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(percent)}
        onKeyDown={handleKeyDown}
      >
        <div className="handle">↔</div>
      </div>
    </div>
  )
}
