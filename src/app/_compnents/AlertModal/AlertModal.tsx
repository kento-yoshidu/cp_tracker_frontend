import Button from "../Button/Button";
import styles from "./alertModal.module.css";

type Props = {
  title: string;
  onClick?: () => void;
  onClose: () => void;
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
          <Button
            variant="secondary"
            title="キャンセル"
            onClick={onClose}
          />

          <Button
            variant="primary"
            title="OK"
            onClick={() => onClick?.()}
          />
        </div>
      </dialog>
    </>
  );
}
