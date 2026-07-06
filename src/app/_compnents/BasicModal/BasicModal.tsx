import { ReactNode } from "react";
import styles from "./basicModal.module.css";

type Props = {
  open: boolean;
  title: string;
  onClose: () => void;
  children: ReactNode;
};

export default function BasicModal({
  open,
  title,
  onClose,
  children,
}: Props) {
  if (!open) return null;

  return (
    <>
      <div
        className={styles.overlay}
        onClick={onClose}
      />

      <dialog
        open
        className={styles.dialog}
      >
        <div className={styles.header}>
          <p className={styles.title}>{title}</p>

          <button
            type="button"
            className={styles.closeButton}
            onClick={onClose}
            aria-label="閉じる"
          >
            ×
          </button>
        </div>

        <div className={styles.body}>
          {children}
        </div>
      </dialog>
    </>
  );
}
