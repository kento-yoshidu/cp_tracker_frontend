import { buildActivityWeeks } from "@/lib/activityWeeks";
import Box from "./_components/Box";
import styles from "./activityHeatMap.module.css";
import type { Activity } from "@/types";

type Props = {
  activities: Activity[];
  now: number;
};

export default function ActivityHeatMap({
  activities,
  now,
}: Props) {
  const weeks = buildActivityWeeks(activities, now);

  return (
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
            />
          ))}
        </div>
      ))}
    </div>
  );
}
