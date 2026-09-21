import { type ActivityDay, getActivityLevel } from "@/lib/activityWeeks";
import { getDifficultyColor } from "@/lib/difficultyColor";
import styles from "./box.module.css";

type Props = {
  day: ActivityDay;
  mode: "count" | "difficulty";
};

export default function Box({ day, mode }: Props) {
  const className = [
    styles.box,
    mode === "count" && styles[`level${getActivityLevel(day.acCount)}`],
    day.isFuture && styles.future,
  ]
    .filter(Boolean)
    .join(" ");

  const style =
    mode === "difficulty" && day.acCount > 0
      ? {
          backgroundColor: `color-mix(in srgb, ${getDifficultyColor(day.maxDifficulty)} 80%, transparent)`,
        }
      : undefined;

  return (
    <div
      className={className}
      style={style}
    />
  );
}
