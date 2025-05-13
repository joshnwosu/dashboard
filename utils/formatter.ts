export function formatDateToShortString(dateStr: string): string {
  const date = new Date(dateStr);
  return date
    .toLocaleDateString('en-US', {
      month: 'short',
      day: '2-digit',
      year: 'numeric',
    })
    .replace(',', '');
}
