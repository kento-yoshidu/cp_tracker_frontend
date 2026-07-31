import { Dispatch, SetStateAction } from "react";
import Tag from "../Tag/Tag";
import styles from "./filter.module.css";

type Props = {
  isLoggedIn: boolean;
  onlySolve: boolean;
  onClick: (prev: boolean) => void;
  selectedTags: string[];
  setSelectedTags: Dispatch<SetStateAction<string[]>>;
};

export default function Filter({
  isLoggedIn,
  onlySolve,
  onClick,
  selectedTags,
  setSelectedTags,
}: Props) {
  return (
    <div className={styles.filters}>
      {isLoggedIn && (
        <button
          type="button"
          className={onlySolve ? `${styles.filterButton} ${styles.filterButtonActive}` : styles.filterButton}
          onClick={() => onClick(!onlySolve)}
        >
          Solve!のみ
        </button>
      )}

      <p
        className={`${styles.label} ${selectedTags.length !== 0 ? "" : styles.empty}`}
      >
        タグ絞り込み
      </p>

      {selectedTags.map((tag) => (
        <Tag
          key={`selected-tag-${tag}`}
          tagName={tag}
          onClick={() => setSelectedTags((prev) => prev.filter((t) => t !== tag))}
        />
      ))}
    </div>
  );
}
