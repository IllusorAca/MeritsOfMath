# Deploying Merits of Math (free)

The app is a static site (`index.html` + `js/` + `style.css`) plus one serverless
function that hides the AI API key. Both halves fit comfortably in free tiers.

## Architecture

```
Browser (static app)  ──►  /api/chat  (serverless proxy holds GROQ_API_KEY)  ──►  Groq API
```

Students never enter or see a key. The proxy pins the model and caps token usage
server-side, so a leaked endpoint can't run up large bills.

## Recommended: Cloudflare Pages (static + Functions on one origin)

1. Push this repo to GitHub.
2. Cloudflare dashboard → **Workers & Pages → Create → Pages → Connect to Git**, pick the repo.
3. Build settings: **Framework preset: None**, **Build command: empty**, **Output directory: `/`** (the repo root — it's already static).
4. After the first deploy, go to **Settings → Environment variables** and add:
   - `GROQ_API_KEY` = your Groq key (`gsk_...`) — mark it **encrypted/secret**.
   - *(optional)* `GROQ_MODEL` to override the default `llama-3.1-8b-instant`.
   - *(optional)* `ALLOWED_ORIGIN` = your site URL (e.g. `https://meritsofmath.pages.dev`) to soft-block other origins.
5. Redeploy. `functions/api/chat.js` is picked up automatically and served at `/api/chat` — no config file needed.

Get a free Groq key at <https://console.groq.com>.

## Alternative: Netlify

Netlify serves functions under `/.netlify/functions/`, so add a redirect so the
frontend's `/api/chat` still resolves. Create `netlify.toml`:

```toml
[[redirects]]
  from = "/api/chat"
  to = "/.netlify/functions/chat"
  status = 200
```

Then port `functions/api/chat.js` to Netlify's handler signature
(`export default async (request, context) => {...}`, reading `Netlify.env.get('GROQ_API_KEY')`)
and place it at `netlify/functions/chat.js`. Set `GROQ_API_KEY` under
**Site settings → Environment variables**.

## Local development

- Open via a local server (not `file://`) so the service worker registers — e.g.
  `npx serve` or `python -m http.server`, then visit `http://localhost:<port>`.
- The `/api/chat` proxy only exists on a platform that runs the function. For local
  AI while developing, either:
  - open **Settings** and paste your own Groq key (cloud mode goes direct to Groq), or
  - open **Settings → Local** and point at a running Ollama instance, or
  - run `npx wrangler pages dev .` to emulate Cloudflare Pages Functions locally.

## Offline / PWA

`manifest.webmanifest` + `sw.js` make the app installable and cache the shell **and**
the CDN libraries after the first successful load, so it works offline on return
visits. Bump `CACHE` in `sw.js` when you ship changes.

## Next step: true offline-first (optional follow-up)

Runtime caching covers returning students but still needs the CDNs (MathJax, MathLive,
Font Awesome, Google Fonts, mathjs, marked) on the **first** load. To make even a cold
first load work with the CDNs blocked or unreachable, vendor those libraries into the
repo and precache them in `sw.js`. MathJax and MathLive lazy-load extra sub-files, so
this is a larger, separate task — done here intentionally as a follow-up.
