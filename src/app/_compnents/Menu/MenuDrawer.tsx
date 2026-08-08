"use client";

import { useRef, useState } from "react";
import styles from "./menu.module.css";

type Item = {
  id: string;
  title: string;
  code: string;
  html: string;
};

type Props = {
  items: Item[];
};

export default function MenuDrawer({ items }: Props) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [selectedId, setSelectedId] = useState(items[0]?.id);
  const [copied, setCopied] = useState(false);

  const selected = items.find((item) => item.id === selectedId);

  const handleCopy = () => {
    if (!selected) {
      return;
    }

    navigator.clipboard.writeText(selected.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const handleBackdropClick = (e: React.MouseEvent<HTMLDialogElement>) => {
    if (e.target === dialogRef.current) {
      dialogRef.current?.close();
    }
  };

  return (
    <>
      <button
        type="button"
        className={styles.hamburgerButton}
        onClick={() => dialogRef.current?.showModal()}
        aria-label="スニペットメニューを開く"
      >
        <span />
        <span />
        <span />
      </button>

      <dialog
        ref={dialogRef}
        className={styles.drawer}
        onClick={handleBackdropClick}
      >
        <div className={styles.drawerHeader}>
          <p className={styles.drawerTitle}>スニペット</p>

          <button
            type="button"
            className={styles.closeButton}
            onClick={() => dialogRef.current?.close()}
            aria-label="閉じる"
          >
            ×
          </button>
        </div>

        <select
          className={styles.select}
          value={selectedId}
          onChange={(e) => {
            setSelectedId(e.target.value);
            setCopied(false);
          }}
        >
          {items.map((item) => (
            <option
              key={item.id}
              value={item.id}
            >
              {item.title}
            </option>
          ))}
        </select>

        {selected && (
          <div className={styles.codeWrapper}>
            <button
              type="button"
              className={styles.copyButton}
              onClick={handleCopy}
            >
              {copied ? "コピーしました" : "コピー"}
            </button>

            <div
              className={styles.code}
              dangerouslySetInnerHTML={{ __html: selected.html }}
            />
          </div>
        )}
      </dialog>
    </>
  );
}
