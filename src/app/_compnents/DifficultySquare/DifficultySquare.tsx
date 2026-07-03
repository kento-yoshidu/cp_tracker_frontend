import { getDifficultyColor } from "@/lib/difficultyColor";
import styles from "./difficultySquare.module.css";

type Props = {
  difficulty?: number;
};

export default function DifficultySquare({ difficulty }: Props) {
  const color = getDifficultyColor(difficulty);

  return (
    <span
      className={styles.square}
      style={{
        backgroundColor: color,
        boxShadow: `0 0 8px ${color}`,
      }}
    />
  );
}
