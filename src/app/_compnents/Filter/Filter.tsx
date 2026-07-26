import styles from "./filter.module.css";

type Props = {
  onlySolve: boolean;
  onClick: (prev: boolean) => void;
};

export default function Filter({
  onlySolve,
  onClick,
}: Props) {
  return (
    <div className={styles.filters}>
      <button
        type="button"
        className={onlySolve ? `${styles.filterButton} ${styles.filterButtonActive}` : styles.filterButton}
        onClick={() => onClick(!onlySolve)}
      >
        Solve!のみ
      </button>
    </div>
  );
}
