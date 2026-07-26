import styles from "./badge.module.css";

type Props = {
  label: string;
  variant: "solve" | "done";
};

export default function Badge({
  label,
  variant,
}: Props) {
  const style =
    variant === "solve" ? "solve" : "done";

  return (
    <div
      className={`${styles.wrapper} ${styles[style]}`}
    >
      <p>{label}</p>
    </div>
  )
}
