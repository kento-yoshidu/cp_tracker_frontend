import Header from "./_compnents/Header/Header";
import QueryProvider from "./_compnents/QueryProvider";
import styles from "./layout.module.css";
import meServer from "./apis/me.server";
import "./globals.css";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const isLoggedIn = await meServer();

  return (
    <html lang="ja">
      <body>
        <QueryProvider>
          <div className={styles.wrapper}>
            <Header isLoggedIn={isLoggedIn} />
            {children}
          </div>
        </QueryProvider>
      </body>
    </html>
  );
}
