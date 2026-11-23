"use client";

import type { Problem } from "@/types";
import styles from "./rowMenu.module.css";

type Props = {
  row: Problem;
  onEdit: (row: Problem) => void;
  onDelete: (id: string) => void;
  onArchive: (id: string) => void;
};

export default function RowMenu({ row, onEdit, onDelete, onArchive }: Props) {
  const popoverId = `row-menu-${row.id}`;
  const anchorName = `--row-menu-${row.id}`;

  const handleEdit = () => {
    onEdit(row);
  };

  const handleDelete = () => {
    onDelete(row.id);
  };

  const handleArchive = () => {
    onArchive(row.id);
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
          onClick={handleEdit}
        >
          更新
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

        <button
          type="button"
          className={styles.menuItem}
          title="近日公開"
          popoverTarget={popoverId}
          popoverTargetAction="hide"
          onClick={handleArchive}
        >
          アーカイブ
        </button>
      </div>
    </>
  );
}
