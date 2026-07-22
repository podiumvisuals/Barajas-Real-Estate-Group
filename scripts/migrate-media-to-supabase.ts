/**
 * One-time migration: re-uploads every Media doc's file from its current
 * URL (Vercel Blob) into whatever storage is configured in payload.config.ts
 * (Supabase Storage, via @payloadcms/storage-s3), then updates the doc's
 * url/filename through Payload's Local API so the site serves the new copy.
 *
 * Safe to re-run: docs already pointing at S3_ENDPOINT's host are skipped.
 * Does NOT delete anything from Vercel Blob — old files are left in place
 * until you've verified the migration and clean them up manually.
 *
 * Usage: npm run migrate:media
 */
import 'dotenv/config'
import config from '../src/payload.config'
import { getPayload } from 'payload'

async function fetchAsFile(url: string, name: string, mimetype: string | null | undefined) {
  const res = await fetch(url)
  if (!res.ok) throw new Error(`Failed to fetch ${url}: ${res.status} ${res.statusText}`)
  const arrayBuffer = await res.arrayBuffer()
  return {
    data: Buffer.from(arrayBuffer),
    mimetype: mimetype || res.headers.get('content-type') || 'application/octet-stream',
    name,
    size: arrayBuffer.byteLength,
  }
}

async function run() {
  const s3Endpoint = process.env.S3_ENDPOINT
  if (!s3Endpoint) {
    throw new Error('S3_ENDPOINT is not set — configure the Supabase Storage env vars before running this.')
  }
  const s3Host = new URL(s3Endpoint).host

  const payload = await getPayload({ config })

  const { docs: media } = await payload.find({
    collection: 'media',
    limit: 0,
    depth: 0,
  })

  console.log(`Found ${media.length} media doc(s).`)

  let migrated = 0
  let skipped = 0
  let failed = 0

  for (const doc of media) {
    if (!doc.url) {
      console.warn(`Skipping doc ${doc.id} (${doc.filename ?? 'unknown filename'}): no url set.`)
      skipped++
      continue
    }

    if (doc.url.includes(s3Host)) {
      console.log(`Skipping doc ${doc.id} (${doc.filename}): already on Supabase.`)
      skipped++
      continue
    }

    try {
      console.log(`Migrating doc ${doc.id} (${doc.filename})...`)
      const file = await fetchAsFile(doc.url, doc.filename || `media-${doc.id}`, doc.mimeType)

      await payload.update({
        collection: 'media',
        id: doc.id,
        data: {},
        file,
      })

      migrated++
    } catch (err) {
      console.error(`Failed to migrate doc ${doc.id} (${doc.filename}):`, err)
      failed++
    }
  }

  console.log(`\nDone. Migrated: ${migrated}, skipped: ${skipped}, failed: ${failed}.`)
  if (migrated > 0) {
    console.log(
      'Old files remain in Vercel Blob storage (not deleted by this script). ' +
        'Verify the site looks correct, then clean those up manually from the Vercel dashboard once confirmed.',
    )
  }

  process.exit(failed > 0 ? 1 : 0)
}

run()
