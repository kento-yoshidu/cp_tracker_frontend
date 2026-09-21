import { getActivityLevel, type ActivityDay } from "@/lib/activityWeeks";
import styles from "./box.module.css";

type Props = {
  day: ActivityDay;
};

export default function Box({
  day,
}: Props) {
  const level = getActivityLevel(day.acCount);

  const className = [
    styles.box,
    styles[`level${level}`],
    day.isFuture && styles.future,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={className}
    />
  );
}
