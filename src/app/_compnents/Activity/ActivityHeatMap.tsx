"use client";

import { useState } from "react";
import { buildActivityWeeks } from "@/lib/activityWeeks";
import Box from "./_components/Box";
import styles from "./activityHeatMap.module.css";
import type { Activity } from "@/types";

type Props = {
  activities: Activity[];
  now: number;
};

type Mode = "count" | "difficulty";

const MODES: { value: Mode; label: string }[] = [
  { value: "count", label: "回数" },
  { value: "difficulty", label: "難易度" },
];

export default function ActivityHeatMap({
  activities,
  now,
}: Props) {
  const [mode, setMode] = useState<Mode>("count");

  const weeks = buildActivityWeeks(activities, now);

  return (
    <div>
      <div
        className={styles.toggle}
        role="group"
        aria-label="表示モード"
      >
        {MODES.map(({ value, label }) => (
          <button
            key={value}
            type="button"
            aria-pressed={mode === value}
            className={
              mode === value
                ? `${styles.toggleButton} ${styles.toggleButtonActive}`
                : styles.toggleButton
            }
            onClick={() => setMode(value)}
          >
            {label}
          </button>
        ))}
      </div>

      <div className={styles.wrapper}>
        {weeks.map((week) => (
          <div
            className={styles.week}
            key={`week-${week[0].date}`}
          >
            {week.map((day) => (
              <Box
                key={day.date}
                day={day}
                mode={mode}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
