export interface Env {
  GH_DISPATCH_TOKEN: string
  // Optional security key if triggering manually via HTTP URL
  TRIGGER_SECRET?: string
}

const GITHUB_REPO = 'PratSins/PratSins.github.io'

async function triggerGitHubDispatch(env: Env): Promise<{ ok: boolean; status: number; text: string }> {
  if (!env.GH_DISPATCH_TOKEN) {
    throw new Error('Missing GH_DISPATCH_TOKEN in worker environment secrets.')
  }

  const res = await fetch(`https://api.github.com/repos/${GITHUB_REPO}/dispatches`, {
    method: 'POST',
    headers: {
      Accept: 'application/vnd.github.v3+json',
      Authorization: `Bearer ${env.GH_DISPATCH_TOKEN}`,
      'User-Agent': 'Cloudflare-Cron-Worker',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      event_type: 'daily-contribution-refresh',
    }),
  })

  const text = await res.text()
  return { ok: res.ok, status: res.status, text }
}

export default {
  // Cloudflare Cron Trigger handler
  async scheduled(event: ScheduledEvent, env: Env, ctx: ExecutionContext): Promise<void> {
    console.log(`[Cron Trigger] Fired at ${new Date(event.scheduledTime).toISOString()}`)
    ctx.waitUntil(
      triggerGitHubDispatch(env)
        .then((res) => {
          if (res.ok) {
            console.log(`[Cron Trigger] Successfully dispatched to GitHub Actions. Status: ${res.status}`)
          } else {
            console.error(`[Cron Trigger] GitHub API error (${res.status}): ${res.text}`)
          }
        })
        .catch((err) => {
          console.error(`[Cron Trigger] Execution error:`, err)
        }),
    )
  },

  // HTTP endpoint for manual testing via browser or curl
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    const url = new URL(request.url)

    if (url.pathname === '/health') {
      return new Response(JSON.stringify({ status: 'healthy', time: new Date().toISOString() }), {
        headers: { 'Content-Type': 'application/json' },
      })
    }

    if (url.pathname === '/trigger') {
      // Optional authentication check for manual web endpoint
      if (env.TRIGGER_SECRET) {
        const secret = url.searchParams.get('secret') || request.headers.get('x-trigger-secret')
        if (secret !== env.TRIGGER_SECRET) {
          return new Response('Unauthorized', { status: 401 })
        }
      }

      try {
        const result = await triggerGitHubDispatch(env)
        if (result.ok) {
          return new Response(
            JSON.stringify({
              success: true,
              message: `Successfully dispatched 'daily-contribution-refresh' to ${GITHUB_REPO}`,
              status: result.status,
            }),
            { headers: { 'Content-Type': 'application/json' } },
          )
        } else {
          return new Response(
            JSON.stringify({
              success: false,
              status: result.status,
              error: result.text,
            }),
            { status: result.status, headers: { 'Content-Type': 'application/json' } },
          )
        }
      } catch (err: any) {
        return new Response(
          JSON.stringify({
            success: false,
            error: err.message || String(err),
          }),
          { status: 500, headers: { 'Content-Type': 'application/json' } },
        )
      }
    }

    return new Response(
      `Cloudflare Cron Worker for PratSins.github.io\n\nEndpoints:\n- GET /trigger (manual trigger)\n- GET /health (health check)\n`,
      { headers: { 'Content-Type': 'text/plain' } },
    )
  },
}
