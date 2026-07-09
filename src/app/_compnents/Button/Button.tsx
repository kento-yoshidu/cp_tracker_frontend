import styles from "./button.module.css";

type Props = {
  variant: "primary" | "secondary";
  title: string;
  type?: "button" | "submit";
  onClick?: () => void;
  disabled?: boolean;
};

export default function Button({
  variant,
  title,
  type = "button",
  onClick,
  disabled = false,
}: Props) {
  return (
    <button
      type={type}
      className={`${styles.button} ${styles[variant]}`}
      onClick={onClick}
      disabled={disabled}
    >
      {title}
    </button>
  )
}
