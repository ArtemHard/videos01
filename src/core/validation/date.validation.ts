export function isValidISODateString(value: any): boolean {
  if (typeof value !== 'string') return false;
  if (!/\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z/.test(value)) return false;
  const date = new Date(value);
  return !isNaN(date.getTime()) && date.toISOString() === value;
}