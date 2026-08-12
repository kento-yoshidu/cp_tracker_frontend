"use client";

import type { Archives } from "@/types";
import styles from "./archiveRowMenu.module.css";

type Props = {
  row: Archives;
  onDelete: (id: string) => void;
  onRestore: (id: string) => void;
};

export default function ArchiveRowMenu({ row, onDelete, onRestore }: Props) {
  const popoverId = `archive-row-menu-${row.id}`;
  const anchorName = `--archive-row-menu-${row.id}`;

  const handleRestore = () => {
    onRestore(row.id);
  };

  const handleDelete = () => {
    onDelete(row.id);
  };

  return (
    <>
      <button
        type="button"
        popoverTarget={popoverId}
        className={styles.trigger}
        style={{ anchorName }}
        aria-label="メニューを開く"
      >
        ⋮
      </button>

      <div
        id={popoverId}
        popover="auto"
        className={styles.menu}
        style={{ positionAnchor: anchorName }}
      >
        <button
          type="button"
          className={styles.menuItem}
          popoverTarget={popoverId}
          popoverTargetAction="hide"
          onClick={handleRestore}
        >
          復元
        </button>

        <button
          type="button"
          className={styles.menuItem}
          popoverTarget={popoverId}
          popoverTargetAction="hide"
          onClick={handleDelete}
        >
          削除
        </button>
      </div>
    </>
  );
}
