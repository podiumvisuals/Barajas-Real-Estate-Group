const PATHS: Record<string, string> = {
  wrench:
    'M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.1-3.1a4 4 0 0 1-5.1 5.1L7 20l-3-3 8.7-8.7a4 4 0 0 1 5.1-5.1z',
  house: 'M3 21h18M5 21V9l7-5 7 5v12M9 21v-6h6v6',
  blueprint: 'M4 20h4l10-10-4-4L4 16v4zM14.5 5.5l4 4',
  hammer: 'M15 12l-8.5 8.5a1.5 1.5 0 0 1-2-2L13 10M13 3l4 4-2.5 2.5-4-4L13 3zM17 7l3 3',
  dollar: 'M12 1v22M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6',
  key: 'M15.5 7.5a4 4 0 1 1-4-4 4 4 0 0 1 4 4zM11.5 11.5L2 21M6 21l-1.5-1.5M9.5 17.5L8 16',
  checklist: 'M9 11l3 3L22 4M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11',
}

export default function Icon({ name }: { name: string }) {
  const d = PATHS[name] ?? PATHS.wrench

  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
      <path d={d} />
    </svg>
  )
}
