const REVIEW_INTERVAL_DAYS: Record<number, number> = {
  1: 3,
  2: 7,
  3: 30,
  4: 60,
};

const DONE_THRESHOLD = 5;
const DAY_MS = 24 * 60 * 60 * 1000;

function parseYYYYMMDD(date: string): number {
  const match = /^(\d{4})(\d{2})(\d{2})$/.exec(date);
  if (!match) return NaN;

  const [, year, month, day] = match;
  return new Date(Number(year), Number(month) - 1, Number(day)).getTime();
}

export function shouldShowSolveBadge(acCount: number, lastSolvedAt: string, now: number): boolean {
  if (acCount >= DONE_THRESHOLD) return false;
  if (acCount === 0) return true;

  const intervalDays = REVIEW_INTERVAL_DAYS[acCount];
  const nextSolveAt = parseYYYYMMDD(lastSolvedAt) + intervalDays * DAY_MS;

  return now >= nextSolveAt;
}

export function isDone(acCount: number): boolean {
  return acCount >= DONE_THRESHOLD;
}
