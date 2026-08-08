import { createPortal } from "react-dom";
import styles from "./snackBar.module.css";

type Props = {
  title: string;
  variant: "success" | "error";
  isOpen: boolean;
  onClose: () => void;
};

export default function SnackBar({ title, variant, isOpen, onClose }: Props) {
  if (!isOpen) {
    return;
  }

  return createPortal(
    <div className={`${styles.snackBar} ${styles[variant]}`}>
      <p className={styles.title}>{title}</p>

      <button
        type="button"
        className={styles.closeButton}
        onClick={onClose}
        aria-label="閉じる"
      >
        ×
      </button>
    </div>,
    document.body,
  );
}
