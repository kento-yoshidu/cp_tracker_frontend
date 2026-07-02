const REVIEW_INTERVAL_DAYS: Record<number, number> = {
  1: 3,
  2: 7,
  3: 30,
  4: 60,
};

const DONE_THRESHOLD = 5;
const DAY_MS = 24 * 60 * 60 * 1000;

export function shouldShowSolveBadge(acCount: number, lastSolvedAt: string): boolean {
  if (acCount >= DONE_THRESHOLD) return false;
  if (acCount === 0) return true;

  const intervalDays = REVIEW_INTERVAL_DAYS[acCount];
  const nextSolveAt = new Date(lastSolvedAt).getTime() + intervalDays * DAY_MS;

  return Date.now() >= nextSolveAt;
}

export function isDone(acCount: number): boolean {
  return acCount >= DONE_THRESHOLD;
}
