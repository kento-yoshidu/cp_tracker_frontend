import { Dispatch, SetStateAction } from "react";
import Tag from "../Tag/Tag";
import styles from "./filter.module.css";

type Props = {
  onlySolve: boolean;
  onClick: (prev: boolean) => void;
  selectedTag: string | null;
  setSelectedTag: Dispatch<SetStateAction<string | null>>;
};

export default function Filter({
  onlySolve,
  onClick,
  selectedTag,
  setSelectedTag,
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

      {selectedTag && (
        <Tag
          tagName={selectedTag}
          onClick={() => setSelectedTag(null)}
        />
      )}
    </div>
  );
}
