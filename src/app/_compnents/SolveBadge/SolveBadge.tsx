import { shouldShowSolveBadge } from "@/lib/solveBadge";
import styles from "./solveBadge.module.css";

type Props = {
  acCount: number;
  lastSolvedAt: string;
  now: number;
};

export default function SolveBadge({ acCount, lastSolvedAt, now }: Props) {
  if (!shouldShowSolveBadge(acCount, lastSolvedAt, now)) return null;

  return (
    <div className={styles.wrapper}>
      <p>Solve!</p>
    </div>
  );
}
