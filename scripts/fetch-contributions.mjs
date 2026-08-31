/**
 * Fetches your GitHub contribution calendar and writes it to
 * src/data/contributions.json.
 *
 * Run with:  npm run contributions
 *
 * WHY A BUILD STEP, not a browser fetch: GitHub's contribution calendar is
 * only available through the GraphQL API, which requires a token. A token
 * shipped to the browser is readable by anyone — and GitHub's secret scanning
 * would revoke it. Here the token stays on your machine (or, later, in a CI
 * secret) and only the resulting numbers are published.
 *
 * The query uses `viewer`, meaning "whoever owns this token". That is what
 * makes PRIVATE contributions count towards the totals — an anonymous source
 * can only ever see public ones.
 *
 * If the fetch fails, any existing contributions.json is left untouched, so a
 * bad network day can never blank out the section on your site.
 */
import fs from 'node:fs'
import path from 'node:path'

const OUT = 'src/data/contributions.json'

// Load .env if present. Node has this built in — no dotenv dependency needed.
try {
  process.loadEnvFile('.env')
} catch {
  /* no .env file; fall back to a real environment variable */
}

const token = process.env.GH_CONTRIB_TOKEN
if (!token) {
  console.error(`
  Missing GH_CONTRIB_TOKEN.

  1. Create a token:  https://github.com/settings/tokens
     Tokens (classic) -> Generate new token -> tick "read:user"
  2. Copy .env.example to .env and paste the token in.

  (${fs.existsSync(OUT) ? `Leaving the existing ${OUT} untouched.` : `No ${OUT} yet — the site will show an empty graph until this runs.`})
`)
  process.exit(1)
}

const QUERY = `
  query {
    viewer {
      login
      contributionsCollection {
        contributionCalendar {
          totalContributions
          weeks {
            contributionDays {
              date
              contributionCount
              weekday
            }
          }
        }
      }
    }
  }
`

function bail(message) {
  console.error(`\n  ${message}`)
  if (fs.existsSync(OUT)) {
    console.error(`  Leaving the existing ${OUT} in place.\n`)
  }
  process.exit(1)
}

const response = await fetch('https://api.github.com/graphql', {
  method: 'POST',
  headers: {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
    'User-Agent': 'portfolio-contributions-script',
  },
  body: JSON.stringify({ query: QUERY }),
}).catch((err) => bail(`Network error talking to GitHub: ${err.message}`))

if (response.status === 401) {
  bail('GitHub rejected the token (401). It may be wrong, revoked or expired.')
}
if (!response.ok) {
  bail(`GitHub returned HTTP ${response.status}.`)
}

const body = await response.json()
if (body.errors?.length) {
  bail(`GraphQL error: ${body.errors.map((e) => e.message).join('; ')}`)
}

const calendar = body.data?.viewer?.contributionsCollection?.contributionCalendar
if (!calendar) bail('Unexpected response shape from GitHub.')

// Flatten the weeks into one day-per-entry list, in date order.
const days = calendar.weeks.flatMap((week) => week.contributionDays)
if (days.length === 0) bail('GitHub returned an empty calendar.')

/*
 * Stored compactly: just the counts, plus the first date and its weekday.
 * Every cell's date and grid position is derived from those three values, so
 * the file stays around 1 KB instead of repeating a date string 366 times.
 */
const data = {
  username: body.data.viewer.login,
  total: calendar.totalContributions,
  from: days[0].date,
  to: days[days.length - 1].date,
  startWeekday: days[0].weekday, // 0 = Sunday
  counts: days.map((d) => d.contributionCount),
  generatedAt: new Date().toISOString(),
}

fs.mkdirSync(path.dirname(OUT), { recursive: true })
fs.writeFileSync(OUT, JSON.stringify(data, null, 2) + '\n')

const kb = (fs.statSync(OUT).size / 1024).toFixed(1)
const active = data.counts.filter((c) => c > 0).length
console.log(
  `\n  ${OUT}\n` +
    `  @${data.username} · ${data.total} contributions · ${data.from} to ${data.to}\n` +
    `  ${data.counts.length} days (${active} active) · ${kb} KB on disk\n`,
)
