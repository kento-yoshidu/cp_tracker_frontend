import styles from "./alertModal.module.css";

type Props = {
  title: string;
  onClick?: () => void;
  onClose?: () => void;
};

export default function AlertModal({
  title,
  onClick,
  onClose,
}: Props) {
  return (
    <>
      <div className={styles.overlay} />

      <dialog
        open
        className={styles.dialog}
      >
        <div className={styles.header}>
          <p className={styles.title}>{title}</p>
        </div>

        <div className={styles.footer}>
          <button
            type="button"
            className={styles.cancelButton}
            onClick={onClose}
          >
            キャンセル
          </button>

          <button
            type="button"
            className={styles.confirmButton}
            autoFocus
            onClick={onClick}
          >
            OK
          </button>
        </div>
      </dialog>
    </>
  );
}
