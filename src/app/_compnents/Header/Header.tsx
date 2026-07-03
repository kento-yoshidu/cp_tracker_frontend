import styles from "./header.module.css";

export default function Header() {
  const isLocalDev = process.env.NODE_ENV === "development";
  const isTargetingProductionBackend = !process.env.NEXT_PUBLIC_API_URL?.includes("localhost");
  const showProductionBadge = isLocalDev && isTargetingProductionBackend;

  return (
    <header className={styles.header}>
      <h1 className={styles.title}>CP Tracker</h1>

      {showProductionBadge && (
        <span className={styles.productionBadge}>本番環境</span>
      )}
    </header>
  );
}
