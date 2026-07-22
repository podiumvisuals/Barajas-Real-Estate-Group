# Barajas Real Estate Group

Website for Lily Barajas (REALTOR®) — Next.js frontend backed by a self-hosted Payload CMS, so content can be edited without a developer.

**Live:** https://barajas-homepage.vercel.app
**Admin:** https://barajas-homepage.vercel.app/admin
**Repo:** github.com/podiumvisuals/Barajas-Real-Estate-Group

## Logging in

1. Go to `/admin`.
2. If no account exists yet, Payload shows **"Create your first user"** — that account becomes an **admin** automatically.
3. To add Lily (or anyone else) as an editor: log in as admin → **Users** → **Create New** → set **Role** to **Editor**.

Two roles, enforced at the database access-control level, not just hidden in the UI:
- **admin** — full access, including managing user accounts.
- **editor** — can edit all site content, cannot manage users or delete accounts.

## What's editable from `/admin`

| Section | Type | Covers |
|---|---|---|
| Site Settings | Global | Brand name, nav links, phone/email/address, social links, footer/copyright |
| Hero Section | Global | Headline, lead paragraph, CTA buttons, 4 stat tiles |
| Listings | Collection | Add/remove/reorder properties, mark one "Featured" (shows in hero), photo, price, beds/baths/sqft, badges |
| Testimonials | Collection | Add reviews, choose which show on the homepage |
| Renovation Section | Global | Feature blocks (icon + text), before/after and video gallery tiles |
| About Section | Global | Bio, photo, specialties, languages, brokerage |
| Contact form fields | Forms (form-builder plugin) | Add/remove/relabel the actual fields on the contact form — the frontend renders whatever's defined here |
| Media | Collection | All uploaded images/photos, stored in Vercel Blob |

Content changes appear on the live site immediately — no deploy needed. Code changes (new sections, design changes) still go through git → Vercel like normal.

## Architecture

- **Framework**: Next.js 16 (App Router), Payload CMS 3 embedded in the same app (not Payload Cloud — self-hosted, no separate vendor).
- **Database**: Neon Postgres (`@payloadcms/db-postgres`), connected via Vercel's Neon Marketplace integration.
- **Media storage**: S3-compatible object storage (`@payloadcms/storage-s3`), configured for Supabase Storage.
- **Contact form**: `@payloadcms/plugin-form-builder` — dynamic fields defined in `/admin`, submissions stored in a `form-submissions` collection.
- **Frontend data fetching**: Server Components call Payload's **Local API** directly (`getPayload({config})` → `payload.find`/`findGlobal`) — no HTTP round-trip, since it talks straight to Postgres from the same server process.
- **Two route groups**: `app/(payload)` (Payload's own admin panel + REST/GraphQL API, boilerplate copied verbatim from Payload's official template) and `app/(site)` (the actual public site, hand-written).
- **Original static site**: preserved at `docs/original-index.html` for reference — this project replaced it entirely.

### Content model files

- `src/collections/` — `Users`, `Listings`, `Testimonials`, `Media`
- `src/globals/` — `SiteSettings`, `HeroSection`, `RenovationSection`, `AboutSection`
- `src/blocks/` — the 3 renovation-gallery tile types (before/after, photo, video)
- `src/access/` — shared `isAdmin`/`isAdminOrEditor` access-control functions
- `src/components/site/` — the actual page sections (Server Components reading from Payload)

## Local development

```bash
npm install
```

Copy `.env.example` to `.env` and fill in:
- `DATABASE_URL` / `DATABASE_URL_UNPOOLED` — Neon Postgres connection strings (from Neon's dashboard directly, or via Vercel dashboard → project → Storage → Neon if still provisioned that way)
- `S3_BUCKET` / `S3_ENDPOINT` / `S3_REGION` / `S3_ACCESS_KEY_ID` / `S3_SECRET_ACCESS_KEY` — from Supabase Dashboard → Storage → S3 Connection (project settings page shows all five values directly)
- `PAYLOAD_SECRET` — any long random string (`node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"`)

```bash
npm run dev
```

First request will take ~20-30s while Payload pushes the schema to Postgres (dev-mode auto-migration). Subsequent requests are fast.

**One-time seed** (populates a fresh database with the original site's content — do not re-run against a database that already has real content, it doesn't dedupe):
```bash
npm run seed
```

## Deployment

Auto-deploys via Vercel's GitHub integration on push to `main`. Env vars (`DATABASE_URL`, `BLOB_READ_WRITE_TOKEN`, `PAYLOAD_SECRET`, etc.) are set in the Vercel dashboard under Production/Preview — **must be "Non-sensitive" type**, see gotcha below.

## Known gotchas (hit and fixed during initial setup — read before touching Vercel project settings)

**1. Vercel's framework auto-detection can silently fall back to `@vercel/static`, even when the dashboard's Framework Preset correctly shows "Next.js".**
This produced a "successful" deployment that was actually just raw source files copied as static output, with every route 404ing (`X-Vercel-Error: NOT_FOUND`). Confirmed via `vercel build`'s diagnostics (`.vercel/output/diagnostics/cli_traces.json`): `frameworkCrossCheck` showed `"result":"none-detected"` despite `"configuredFramework":"nextjs"`.
**Fix already applied**: `vercel.json` at repo root explicitly pins the builder:
```json
{ "framework": "nextjs", "builds": [{ "src": "package.json", "use": "@vercel/next" }] }
```
Don't remove this file without confirming a plain framework-preset deploy actually works first.

**2. Vercel's "Sensitive" env var type makes the value unreadable at build time — including by Vercel's own build process.**
`vercel env pull` (and apparently the build itself) substitutes the literal string `"[SENSITIVE]"` instead of the real value for vars marked Sensitive. This broke `DATABASE_URL`, `PAYLOAD_SECRET`, and `BLOB_READ_WRITE_TOKEN` (all defaulted to Sensitive when added — Neon/Blob integrations and the dashboard's "Add New" flow both default to this).
**Fix already applied**: all three are stored as **Non-sensitive**. When adding any new secret env var to this project, always use `vercel env add NAME production,preview --no-sensitive --value "..."` (CLI) or explicitly select "Non-sensitive" in the dashboard — don't accept the default.

**3. Vercel deployment protection (SSO) blocks preview URLs behind a login wall by default.**
This is intentional and currently **enabled** (`vercel project protection barajas-homepage` to check status) — only people with dashboard access to this Vercel project can view preview deployments. Production is unaffected either way. If previews need to be shared with someone outside the team, temporarily disable via `vercel project protection enable/disable barajas-homepage --sso`, then re-enable afterward.

**4. The 10 seeded listing/agent photos are placeholders sourced from real Zillow listings, not Lily's own.**
They're structurally correct (right aspect ratios, realistic content) but were only ever meant to prove the design out. Replace them — especially the agent headshot — through `/admin` before treating the site as fully live. `npm run seed` re-fetches them from Zillow's CDN at seed time; they are not committed to this repo.

**5. Don't switch media storage to Hostinger's local filesystem if this app ever moves off Vercel.**
Hostinger support confirmed that GitHub/ZIP redeploys on their Node.js hosting rebuild/replace the app directory, so runtime-written files (like local uploads) can be silently wiped on the next deploy. This is why media storage uses S3-compatible object storage (`@payloadcms/storage-s3`, configured for Supabase Storage) instead of Payload's local-disk upload option — keep it that way regardless of hosting provider.

## Third-party services

| Service | Purpose |
|---|---|
| Neon | Postgres database |
| Supabase Storage | Media/image storage |
| Vercel | Hosting (migration to Hostinger in progress) |
| Resend (not yet configured) | Contact-form email notifications — submissions are saved in `/admin` regardless; email alerts need `RESEND_API_KEY`, `NOTIFY_EMAIL_TO`, `NOTIFY_EMAIL_FROM` set |
