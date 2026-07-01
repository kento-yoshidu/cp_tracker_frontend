import styles from "./fullScreenLoading.module.css";

export default function FullScreenLoading() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.spinner}>
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className={styles.dot}
            style={{ "--i": i } as React.CSSProperties}
          />
        ))}
      </div>
    </div>
  );
}
