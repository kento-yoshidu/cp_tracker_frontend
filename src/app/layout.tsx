import Header from "./_compnents/Header/Header";
import QueryProvider from "./_compnents/QueryProvider";
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
        <QueryProvider>
          <div className={styles.wrapper}>
            <Header />
            {children}
          </div>
        </QueryProvider>
      </body>
    </html>
  );
}
