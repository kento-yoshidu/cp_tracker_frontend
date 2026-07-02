import { shouldShowSolveBadge } from "@/lib/solveBadge";
import styles from "./solveBadge.module.css";

type Props = {
  acCount: number;
  lastSolvedAt: string;
};

export default function SolveBadge({ acCount, lastSolvedAt }: Props) {
  if (!shouldShowSolveBadge(acCount, lastSolvedAt)) return null;

  return (
    <div className={styles.wrapper}>
      <p>Solve!</p>
    </div>
  );
}
