"use client";

import { useState } from "react";
import { Problems } from "@/types";
import styles from "./rowMenu.module.css";

type Props = {
  row: Problems;
  onEdit: (row: Problems) => void;
  onDelete: (id: string) => void;
};

export default function RowMenu({ row, onEdit, onDelete }: Props) {
  const [isOpen, setIsOpen] = useState(false);

  const handleEdit = () => {
    setIsOpen(false);
    onEdit(row);
  };

  const handleDelete = () => {
    setIsOpen(false);
    onDelete(row.id);
  };

  return (
    <div className={styles.wrapper}>
      <button
        type="button"
        className={styles.trigger}
        onClick={() => setIsOpen((prev) => !prev)}
        aria-label="メニューを開く"
      >
        ⋮
      </button>

      {isOpen && (
        <>
          <div
            className={styles.overlay}
            onClick={() => setIsOpen(false)}
          />

          <div className={styles.menu}>
            <button
              type="button"
              className={styles.menuItem}
              onClick={handleEdit}
            >
              更新
            </button>

            <button
              type="button"
              className={styles.menuItem}
              onClick={handleDelete}
            >
              削除
            </button>

            <button
              type="button"
              className={styles.menuItem}
              disabled
              title="近日公開"
            >
              アーカイブ
            </button>
          </div>
        </>
      )}
    </div>
  );
}
