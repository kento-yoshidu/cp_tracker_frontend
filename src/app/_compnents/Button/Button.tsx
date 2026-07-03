import styles from "./button.module.css";

type Props = {
  variant: "primary" | "secondary";
  title: string;
  onClick: () => void;
};

export default function Button({
  variant,
  title,
  onClick,
}: Props) {
  return (
    <button
      type="button"
      className={`${styles.button} ${styles[variant]}`}
      onClick={onClick}
    >
      {title}
    </button>
  )
}