type MediaLike =
  | string
  | number
  | null
  | undefined
  | {
      url?: string | null
      alt?: string | null
    }

export function mediaUrl(media: MediaLike): string | undefined {
  if (!media || typeof media === 'string' || typeof media === 'number') return undefined
  return media.url ?? undefined
}

export function mediaAlt(media: MediaLike, fallback = ''): string {
  if (!media || typeof media === 'string' || typeof media === 'number') return fallback
  return media.alt ?? fallback
}
