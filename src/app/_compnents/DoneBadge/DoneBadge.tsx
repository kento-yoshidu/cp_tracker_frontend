import { isDone } from "@/lib/solveBadge";
import styles from "./doneBadge.module.css";

type Props = {
  acCount: number;
};

export default function DoneBadge({ acCount }: Props) {
  if (!isDone(acCount)) return null;

  return (
    <div className={styles.wrapper}>
      <p>Done</p>
    </div>
  );
}
