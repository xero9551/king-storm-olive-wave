export function daysUntil(isoDate: string | undefined, now = new Date()): number | null {
  if (!isoDate) return null;
  const due = new Date(`${isoDate}T23:59:59Z`);
  if (Number.isNaN(due.getTime())) return null;
  return Math.ceil((due.getTime() - now.getTime()) / 86_400_000);
}

export function formatDate(iso: string | undefined): string {
  if (!iso) return "—";
  const d = iso.slice(0, 10);
  return d;
}

export function relativeDue(isoDate: string | undefined, now = new Date()): string {
  const days = daysUntil(isoDate, now);
  if (days === null) return "no due date";
  if (days < 0) return `${Math.abs(days)}d overdue`;
  if (days === 0) return "due today";
  if (days === 1) return "due tomorrow";
  return `${days}d remaining`;
}

export function isRansomware(value: string | undefined): boolean {
  return (value ?? "").toLowerCase() === "known";
}
