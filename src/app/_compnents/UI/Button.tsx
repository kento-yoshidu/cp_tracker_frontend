import styles from "./button.module.css";

type Props = {
  title: string;
  onClick: () => void;
};

export default function Button({
  title,
  onClick
}: Props) {
  return (
    <button
      className={styles.button}
      type="button"
      onClick={onClick}
    >
      {title}
    </button>
  )
}
