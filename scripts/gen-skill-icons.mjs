/**
 * Generates src/components/SkillIcons.tsx.
 *
 * Run with:  npm run icons
 *
 * Two sources, because neither alone is good enough:
 *
 *   simple-icons — a single flat path per logo, tinted with the brand colour.
 *                  Compact, and right for logos that really are one shape.
 *
 *   devicon      — the authentic multi-colour artwork. Bigger, but the only
 *                  way to get logos that are genuinely multi-coloured (Google
 *                  Cloud's four-segment cloud) or that simple-icons cannot
 *                  carry at all (Java, for Oracle trademark reasons).
 *
 * Both are devDependencies. Only the logos listed below are extracted, so
 * neither package ever reaches the browser.
 *
 * To add a logo: put its slug in SIMPLE or DEVICON below and run the script.
 * To upgrade one to full colour, move it from SIMPLE to DEVICON.
 */
import fs from 'node:fs'
import * as si from 'simple-icons'

/** our slug -> simple-icons export name (flat, single-colour) */
const SIMPLE = {
  go: 'siGo',
  spring: 'siSpring',
  react: 'siReact',
  typescript: 'siTypescript',
  mongodb: 'siMongodb',
  pytorch: 'siPytorch',
  scikitlearn: 'siScikitlearn',
  numpy: 'siNumpy',
  pandas: 'siPandas',
}

/** our slug -> [devicon folder, title, representative colour] (full colour) */
const DEVICON = {
  // simple-icons only has a plain cloud outline, which reads as generic.
  gcp: ['googlecloud', 'Google Cloud', '#4285F4'],
  // simple-icons cannot carry Java at all; its OpenJDK stand-in is a
  // different mark. devicon has the real one, and it is smaller.
  java: ['java', 'Java', '#EA2D2E'],
  // simple-icons draws PostgreSQL as thin line art, which goes sub-pixel and
  // all but vanishes at 17px. devicon's is a solid filled elephant.
  postgresql: ['postgresql', 'PostgreSQL', '#336791'],
  // OpenCV's mark is three coloured rings; flattening it to one colour loses
  // the whole identity, and devicon's costs the same as the flat version.
  opencv: ['opencv', 'OpenCV', '#5C3EE8'],
}

function readDevicon(folder) {
  const file = `node_modules/devicon/icons/${folder}/${folder}-original.svg`
  const svg = fs.readFileSync(file, 'utf8')
  const viewBox = svg.match(/viewBox="([^"]+)"/)?.[1] ?? '0 0 128 128'
  const paths = []
  for (const tag of svg.match(/<path\b[^>]*>/g) ?? []) {
    const d = tag.match(/\bd="([^"]+)"/)?.[1]
    if (!d) continue
    paths.push({ d, fill: tag.match(/\bfill="([^"]+)"/)?.[1] })
  }
  if (paths.length === 0) throw new Error(`no paths found in ${file}`)
  return { viewBox, paths }
}

const header = `/**
 * Brand logos for the Skills section.
 *
 * GENERATED FILE — do not hand-edit. Run \`npm run icons\` to rebuild it.
 * See scripts/gen-skill-icons.mjs to add, remove or recolour a logo.
 *
 * Sources: Simple Icons (CC0) for flat single-colour marks, devicon (MIT)
 * for the full-colour artwork. Only the logos actually used are extracted.
 */

export interface BrandIcon {
  title: string
  /** Brand colour, used for single-path logos and as a fallback. */
  hex: string
  viewBox: string
  /** \`fill\` is set only on multi-colour logos; otherwise \`hex\` is used. */
  paths: { d: string; fill?: string }[]
}

export const BRAND_ICONS: Record<string, BrandIcon> = {
`

const entries = []
for (const [slug, key] of Object.entries(SIMPLE)) {
  const icon = si[key]
  if (!icon) throw new Error(`simple-icons has no ${key} (for "${slug}")`)
  entries.push([
    slug,
    `  ${slug}: { title: '${icon.title.replace(/'/g, "\\'")}', hex: '#${icon.hex}', viewBox: '0 0 24 24', paths: [{ d: '${icon.path}' }] },\n`,
    icon.path.length,
  ])
}
for (const [slug, [folder, title, hex]] of Object.entries(DEVICON)) {
  const { viewBox, paths } = readDevicon(folder)
  const body = paths
    .map((p) => `{ d: '${p.d}'${p.fill ? `, fill: '${p.fill}'` : ''} }`)
    .join(', ')
  entries.push([
    slug,
    `  ${slug}: { title: '${title}', hex: '${hex}', viewBox: '${viewBox}', paths: [${body}] },\n`,
    body.length,
  ])
}

entries.sort((a, b) => a[0].localeCompare(b[0]))
fs.writeFileSync('src/components/SkillIcons.tsx', header + entries.map((e) => e[1]).join('') + '}\n')

console.log(`wrote src/components/SkillIcons.tsx — ${entries.length} logos`)
for (const [slug, , size] of [...entries].sort((a, b) => b[2] - a[2])) {
  console.log(`  ${slug.padEnd(13)} ${String(size).padStart(6)} chars`)
}
