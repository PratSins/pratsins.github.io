# Cloudflare Cron Worker -> GitHub Actions Scheduler

This Cloudflare Worker runs on a reliable daily Cron Trigger and dispatches a `daily-contribution-refresh` event to GitHub Actions via the `repository_dispatch` API.

---

## 1. Setup GitHub Personal Access Token (PAT)

1. Go to [GitHub Settings → Personal Access Tokens (classic)](https://github.com/settings/tokens).
2. Click **Generate new token (classic)**.
3. Name it `Cloudflare-Cron-Scheduler`.
4. Select the **`repo`** scope (Full control of private repositories / write access to repository dispatches).
5. Copy the generated token.

---

## 2. Deploy the Worker

From the `cron-worker` directory:

```bash
cd cron-worker
npm install

# 1. Set the GitHub Token Secret in Cloudflare
npx wrangler secret put GH_DISPATCH_TOKEN
# (Paste your GitHub PAT when prompted)

# 2. Deploy to Cloudflare Workers
npx wrangler deploy
```

---

## 3. How It Works

- **Cron Schedule:** `30 4 * * *` (Daily at 04:30 UTC == 10:00 AM IST).
- **Scheduled Trigger:** Cloudflare fires the `scheduled()` hook accurately at 10:00 AM IST.
- **API Call:** The worker sends a `POST` request to `https://api.github.com/repos/PratSins/PratSins.github.io/dispatches` with `{ "event_type": "daily-contribution-refresh" }`.
- **GitHub Action:** `.github/workflows/deploy.yml` listens for `repository_dispatch` with type `daily-contribution-refresh`, runs `npm run contributions`, builds the site, and deploys to GitHub Pages.

---

## 4. Manual Testing

You can test the trigger anytime by hitting the Worker URL:

```bash
curl https://github-actions-cron-scheduler.<your-subdomain>.workers.dev/trigger
```
