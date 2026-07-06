import styles from "./button.module.css";

type Props = {
  variant: "primary" | "secondary";
  title: string;
  type?: "button" | "submit";
  onClick?: () => void;
};

export default function Button({
  variant,
  title,
  type = "button",
  onClick,
}: Props) {
  return (
    <button
      type={type}
      className={`${styles.button} ${styles[variant]}`}
      onClick={onClick}
    >
      {title}
    </button>
  )
}