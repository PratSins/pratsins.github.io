import { useMemo, useState } from 'react'
import { Icon } from './Icons'
import contributions from '../data/contributions.json'
import type { Contributions } from '../types'

const data = contributions as Contributions

/* Cell geometry, in SVG user units. */
const CELL = 11
const GAP = 3
const STEP = CELL + GAP
const LEFT_LABELS = 30 // room for Mon / Wed / Fri
const TOP_LABELS = 18 // room for the month row
/*
 * Month labels are anchored at the first column of their month, so the final
 * one ("Sep" in a calendar ending in September) would run past the right edge
 * of the viewBox and be sliced in half. This reserves room for it.
 */
const RIGHT_LABEL_ROOM = 24

const DAY_MS = 86_400_000
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec']

interface Cell {
  /** Column (week) and row (weekday) in the grid. */
  col: number
  row: number
  count: number
  level: 0 | 1 | 2 | 3 | 4
  date: Date
}

/**
 * Buckets counts into five intensity steps.
 *
 * Thresholds come from the quartiles of the *active* days rather than from
 * fixed numbers, so the graph reads sensibly whether your busiest day is 3
 * commits or 300 — the same way GitHub does it.
 */
function makeLevels(counts: number[]): (counts: number) => 0 | 1 | 2 | 3 | 4 {
  const active = counts.filter((c) => c > 0).sort((a, b) => a - b)
  if (active.length === 0) return () => 0
  const at = (q: number) => active[Math.min(active.length - 1, Math.floor(active.length * q))]
  const q1 = at(0.25)
  const q2 = at(0.5)
  const q3 = at(0.75)
  return (count) => {
    if (count <= 0) return 0
    if (count <= q1) return 1
    if (count <= q2) return 2
    if (count <= q3) return 3
    return 4
  }
}

function buildCells(source: Contributions): Cell[] {
  const start = new Date(`${source.from}T00:00:00Z`)
  const levelOf = makeLevels(source.counts)
  return source.counts.map((count, i) => {
    const offset = source.startWeekday + i
    return {
      col: Math.floor(offset / 7),
      row: offset % 7,
      count,
      level: levelOf(count),
      date: new Date(start.getTime() + i * DAY_MS),
    }
  })
}

/** The viewer's local calendar date, expressed as UTC midnight so it can be
 *  compared against the cell dates (which are UTC midnight too). */
function todayAsUTC(): Date {
  const now = new Date()
  return new Date(Date.UTC(now.getFullYear(), now.getMonth(), now.getDate()))
}

/** "8 contributions on Monday, March 9, 2026" */
function describe(cell: Cell): string {
  const label = cell.date.toLocaleDateString('en-US', {
    weekday: 'long', month: 'long', day: 'numeric', year: 'numeric', timeZone: 'UTC',
  })
  const n = cell.count === 0 ? 'No contributions' : `${cell.count} contribution${cell.count === 1 ? '' : 's'}`
  return `${n} on ${label}`
}

/**
 * Wording for the resting state — the most recent day we have data for.
 *
 * Reads "…today" or "…yesterday" when that applies, because a bare date for
 * today is oddly formal. Anything older falls back to the same phrasing used
 * on hover, so the two never look like different features.
 */
function describeLatest(cell: Cell): string {
  const n =
    cell.count === 0
      ? 'No contributions'
      : `${cell.count} contribution${cell.count === 1 ? '' : 's'}`
  const daysAgo = Math.round((todayAsUTC().getTime() - cell.date.getTime()) / DAY_MS)
  if (daysAgo === 0) return `${n} today`
  if (daysAgo === 1) return `${n} yesterday`
  return describe(cell)
}

export function Activity() {
  const cells = useMemo(() => buildCells(data), [])
  const [hovered, setHovered] = useState<Cell | null>(null)

  /* The most recent day in the calendar — what the readout shows at rest. */
  const latest = cells.length > 0 ? cells[cells.length - 1] : null

  const columns = cells.length > 0 ? cells[cells.length - 1].col + 1 : 0
  const width = LEFT_LABELS + columns * STEP + RIGHT_LABEL_ROOM
  const height = TOP_LABELS + 7 * STEP

  /* One label per month, placed at the first column that month appears in. */
  const monthLabels = useMemo(() => {
    const out: { x: number; label: string }[] = []
    let last = -1
    for (const cell of cells) {
      const month = cell.date.getUTCMonth()
      if (month !== last) {
        last = month
        // Skip a label that would collide with the previous one.
        const x = LEFT_LABELS + cell.col * STEP
        if (out.length === 0 || x - out[out.length - 1].x > 26) {
          out.push({ x, label: MONTHS[month] })
        }
      }
    }
    return out
  }, [cells])

  return (
    <div className="cal">
      <p className="cal__summary">
        <span>
          <strong>{data.total.toLocaleString()}</strong> contributions in the last year
        </span>
        <a
          className="cal__handle"
          href={`https://github.com/${data.username}`}
          target="_blank"
          rel="noreferrer noopener"
        >
          <Icon name="github" size={18} />@{data.username}
        </a>
      </p>

      {/*
        The day readout. At rest it describes the most recent day; hovering
        a square swaps in that day instead. It keeps a fixed height either
        way, so the grid below never jumps as the cursor moves across it.
        aria-live means a screen reader announces the day you land on.
      */}
      <p className="cal__readout" aria-live="polite">
        {hovered ? describe(hovered) : latest ? describeLatest(latest) : ''}
      </p>

      {/* The grid scrolls sideways on narrow screens rather than shrinking
          the squares into illegibility. */}
      <div className="cal__scroll">
        <div className="cal__grid" onMouseLeave={() => setHovered(null)}>
          {/* No width/height attributes — the CSS stretches this to the full
              width of the section, and the viewBox scales everything inside
              it, squares and labels alike. */}
          <svg
            viewBox={`0 0 ${width} ${height}`}
            preserveAspectRatio="xMidYMid meet"
            role="img"
            aria-label={`${data.total} GitHub contributions between ${data.from} and ${data.to}`}
          >
            {monthLabels.map((m) => (
              <text key={`${m.label}-${m.x}`} className="cal__axis" x={m.x} y={11}>
                {m.label}
              </text>
            ))}

            {[1, 3, 5].map((row) => (
              <text key={row} className="cal__axis" x={0} y={TOP_LABELS + row * STEP + CELL - 1}>
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][row]}
              </text>
            ))}

            {cells.map((cell, i) => (
              <rect
                key={i}
                className="cal__day"
                x={LEFT_LABELS + cell.col * STEP}
                y={TOP_LABELS + cell.row * STEP}
                width={CELL}
                height={CELL}
                rx={2.5}
                fill={`var(--cal-${cell.level})`}
                onMouseEnter={() => setHovered(cell)}
                onFocus={() => setHovered(cell)}
                tabIndex={-1}
              />
            ))}
          </svg>

        </div>
      </div>

      <p className="cal__legend">
        <span>Less</span>
        {[0, 1, 2, 3, 4].map((level) => (
          <span key={level} className="cal__swatch" style={{ background: `var(--cal-${level})` }} />
        ))}
        <span>More</span>
      </p>
    </div>
  )
}
