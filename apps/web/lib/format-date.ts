/**
 * Formats an ISO date string (yyyy-mm-dd) as a long-form local date — e.g. "May 14, 2026".
 * Parses as local time to avoid UTC-offset display issues that would show "May 13" near midnight.
 */
export function formatPostDate(isoDate: string): string {
  const [year, month, day] = isoDate.split('-').map(Number)
  return new Date(year, month - 1, day).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}
