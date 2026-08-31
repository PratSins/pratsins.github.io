/**
 * The maths behind the drifting 3D point-network in the page margins.
 *
 * Kept separate from the drawing code so it is a pure function of time —
 * easy to reason about, and testable without a browser.
 *
 * There is no 3D library here on purpose. A wireframe point cloud needs a
 * rotation matrix and a perspective divide, which is about twenty lines;
 * pulling in Three.js for it would cost ~150 KB gzipped, nearly doubling
 * the weight of the whole site.
 */

/* ---------------------------------------------------------------------------
 * TUNING — everything you might want to change lives here.
 * ------------------------------------------------------------------------- */
export const NET = {
  /** Points per side. More points = denser web, more work per frame. */
  count: 26,
  /** Half-width of the cube the points live in, in world units. */
  spread: 180,
  /** Perspective strength. Lower = more dramatic foreshortening. */
  fov: 520,
  /** Rotation speed, radians per millisecond. */
  speed: 0.00016,
  /** Draw a line between two points when they land closer than this (px). */
  linkDistance: 132,
  /** How fast points drift within the cube. */
  drift: 0.06,

  /* --- Looks ------------------------------------------------------------
   * `rgb` is the line and dot colour as three numbers. The default is the
   * site's ink brown (--ink). For the teal of the original inspiration,
   * use '45, 212, 191'.
   */
  rgb: '36, 27, 6',
  /** Opacity of a line at zero distance; it fades out towards linkDistance. */
  lineAlpha: 0.5,
  /** Opacity of the dots at each vertex. */
  dotAlpha: 0.55,
  dotRadius: 1.5,
  lineWidth: 1,
}

export interface Point3 {
  x: number
  y: number
  z: number
  vx: number
  vy: number
  vz: number
}

export interface Projected {
  x: number
  y: number
  /** Perspective scale: >1 is nearer the viewer, <1 is further away. */
  s: number
}

/** A random cloud of points inside the cube, each with a slow drift. */
export function makePoints(count = NET.count, spread = NET.spread): Point3[] {
  const rand = (r: number) => (Math.random() * 2 - 1) * r
  return Array.from({ length: count }, () => ({
    x: rand(spread),
    y: rand(spread * 1.6), // taller than wide — the margins are tall strips
    z: rand(spread),
    vx: rand(NET.drift),
    vy: rand(NET.drift),
    vz: rand(NET.drift),
  }))
}

/** Keeps a coordinate inside [-limit, limit] by wrapping it around. */
function wrap(value: number, limit: number): number {
  if (value > limit) return -limit
  if (value < -limit) return limit
  return value
}

/**
 * Advances the cloud by one frame and projects it to 2D screen coordinates.
 *
 * Mutates `points` in place (cheap — this runs 60 times a second) and returns
 * a fresh array of projected positions.
 */
export function stepAndProject(
  points: Point3[],
  time: number,
  width: number,
  height: number,
  phase = 0,
): Projected[] {
  const spread = NET.spread
  const tallSpread = spread * 1.6

  // Spin around the vertical axis, with a gentle nodding tilt on top.
  const ay = time * NET.speed + phase
  const ax = Math.sin(time * NET.speed * 0.6 + phase) * 0.35

  const cosY = Math.cos(ay)
  const sinY = Math.sin(ay)
  const cosX = Math.cos(ax)
  const sinX = Math.sin(ax)

  const cx = width / 2
  const cy = height / 2

  const out: Projected[] = []
  for (const p of points) {
    p.x = wrap(p.x + p.vx, spread)
    p.y = wrap(p.y + p.vy, tallSpread)
    p.z = wrap(p.z + p.vz, spread)

    // Rotate about Y, then about X.
    const x1 = p.x * cosY - p.z * sinY
    const z1 = p.x * sinY + p.z * cosY
    const y2 = p.y * cosX - z1 * sinX
    const z2 = p.y * sinX + z1 * cosX

    // Perspective divide. The +spread keeps the denominator safely positive,
    // so a point rotating through the camera plane can never divide by zero.
    const s = NET.fov / (NET.fov + z2 + spread)

    out.push({ x: cx + x1 * s, y: cy + y2 * s, s })
  }
  return out
}
