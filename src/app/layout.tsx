import Header from "./_compnents/Header/Header";
import styles from "./layout.module.css";
import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body>
        <div className={styles.wrapper}>
          <Header />
          {children}

        </div>
      </body>
    </html>
  );
}
