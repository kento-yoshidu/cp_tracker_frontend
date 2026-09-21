import type { Activity } from "@/types";

export type ActivityDay = {
  date: string;
  acCount: number;
  maxDifficulty: number;
  isFuture: boolean;
};

const WEEKS = 53;
const DAY_MS = 24 * 60 * 60 * 1000;
const JST_OFFSET_MS = 9 * 60 * 60 * 1000;

function toYYYYMMDD(ms: number) {
  const d = new Date(ms);
  const y = d.getUTCFullYear();
  const m = String(d.getUTCMonth() + 1).padStart(2, "0");
  const day = String(d.getUTCDate()).padStart(2, "0");

  return `${y}${m}${day}`;
}

export type ActivityLevel = 0 | 1 | 2 | 3 | 4;

export function getActivityLevel(acCount: number): ActivityLevel {
  if (acCount <= 0) return 0;
  if (acCount === 1) return 1;
  if (acCount <= 3) return 2;
  if (acCount <= 5) return 3;

  return 4;
}

export function buildActivityWeeks(
  activities: Activity[],
  now: number,
) {
  const byDate = new Map(activities.map((a) => [a.date, a]));

  const jstNow = now + JST_OFFSET_MS;
  const today = jstNow - (jstNow % DAY_MS);

  const todayDow = new Date(today).getUTCDay();
  const start = today - (todayDow + (WEEKS - 1) * 7) * DAY_MS;

  return Array.from({ length: WEEKS }, (_, w) =>
    Array.from({ length: 7 }, (_, d) => {
      const ms = start + (w * 7 + d) * DAY_MS;
      const date = toYYYYMMDD(ms);
      const a = byDate.get(date);

      return {
        date,
        acCount: a?.acCount ?? 0,
        maxDifficulty: a?.maxDifficulty ?? 0,
        isFuture: ms > today,
      };
    }),
  );
}