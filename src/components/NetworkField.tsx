import { useEffect, useRef } from 'react'
import { NET, makePoints, stepAndProject } from '../lib/network'
import type { Point3 } from '../lib/network'

/**
 * A slowly rotating 3D wireframe network, drawn in the empty margins either
 * side of the content column — never behind the text.
 *
 * Two canvases rather than one full-width one: the centre of the screen is
 * never touched, so there is nothing to mask out and no wasted pixels being
 * composited underneath your words.
 *
 * The whole thing is one requestAnimationFrame loop driving both sides, and
 * it switches itself off when it cannot help:
 *   - narrow screens (there are no margins to draw in — see app.css)
 *   - a background tab
 *   - "reduce motion" enabled in the operating system
 */

interface Field {
  canvas: HTMLCanvasElement
  ctx: CanvasRenderingContext2D
  points: Point3[]
  phase: number
  w: number
  h: number
}

function draw(field: Field, time: number) {
  const { ctx, w, h } = field
  ctx.clearRect(0, 0, w, h)

  const projected = stepAndProject(field.points, time, w, h, field.phase)
  const maxDist = NET.linkDistance
  const maxDistSq = maxDist * maxDist

  // Lines first, so the dots sit on top of them.
  ctx.lineWidth = NET.lineWidth
  for (let i = 0; i < projected.length; i++) {
    const a = projected[i]
    for (let j = i + 1; j < projected.length; j++) {
      const b = projected[j]
      const dx = a.x - b.x
      const dy = a.y - b.y
      const distSq = dx * dx + dy * dy
      if (distSq > maxDistSq) continue

      // Fade the line out as the two points drift apart.
      const closeness = 1 - Math.sqrt(distSq) / maxDist
      ctx.strokeStyle = `rgba(${NET.rgb}, ${closeness * NET.lineAlpha})`
      ctx.beginPath()
      ctx.moveTo(a.x, a.y)
      ctx.lineTo(b.x, b.y)
      ctx.stroke()
    }
  }

  for (const p of projected) {
    // Nearer points read as slightly larger and more solid.
    ctx.fillStyle = `rgba(${NET.rgb}, ${NET.dotAlpha * p.s})`
    ctx.beginPath()
    ctx.arc(p.x, p.y, NET.dotRadius * p.s, 0, Math.PI * 2)
    ctx.fill()
  }
}

export function NetworkField() {
  const leftRef = useRef<HTMLCanvasElement>(null)
  const rightRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    // Someone who asked for less motion should not get a perpetual animation.
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const canvases = [leftRef.current, rightRef.current].filter(
      (c): c is HTMLCanvasElement => c !== null,
    )
    if (canvases.length === 0) return

    // Cap the pixel ratio at 2 — beyond that the extra pixels cost real
    // battery on a retina display and nobody can see the difference.
    const dpr = Math.min(window.devicePixelRatio || 1, 2)

    const fields: Field[] = []
    for (const canvas of canvases) {
      const ctx = canvas.getContext('2d')
      if (!ctx) continue
      fields.push({
        canvas,
        ctx,
        points: makePoints(),
        // Different phases so the two sides are never mirror images.
        phase: Math.random() * Math.PI * 2,
        w: 0,
        h: 0,
      })
    }
    if (fields.length === 0) return

    const resize = () => {
      for (const f of fields) {
        const rect = f.canvas.getBoundingClientRect()
        f.w = rect.width
        f.h = rect.height
        f.canvas.width = Math.round(rect.width * dpr)
        f.canvas.height = Math.round(rect.height * dpr)
        f.ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      }
    }
    resize()

    const observer = new ResizeObserver(resize)
    canvases.forEach((c) => observer.observe(c))

    let frame = 0
    const tick = (time: number) => {
      for (const f of fields) {
        // Width is zero when the media query has hidden the canvas, which is
        // every narrow screen. Nothing to draw, so skip the work entirely.
        if (f.w < 2 || f.h < 2) continue
        draw(f, time)
      }
      frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)

    // A background tab should not be burning cycles on decoration.
    const onVisibility = () => {
      cancelAnimationFrame(frame)
      if (!document.hidden) frame = requestAnimationFrame(tick)
    }
    document.addEventListener('visibilitychange', onVisibility)

    return () => {
      cancelAnimationFrame(frame)
      observer.disconnect()
      document.removeEventListener('visibilitychange', onVisibility)
    }
  }, [])

  return (
    <div className="netfield" aria-hidden="true">
      <canvas className="netfield__canvas netfield__canvas--left" ref={leftRef} />
      <canvas className="netfield__canvas netfield__canvas--right" ref={rightRef} />
    </div>
  )
}
