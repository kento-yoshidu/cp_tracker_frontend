export function formatDate(date: string): string {
  if (!/^\d{8}$/.test(date)) return date;

  return `${date.slice(0, 4)}/${date.slice(4, 6)}/${date.slice(6, 8)}`;
}
