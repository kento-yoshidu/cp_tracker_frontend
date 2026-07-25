import Header from "./_compnents/Header/Header";
import QueryProvider from "./_compnents/QueryProvider";
import styles from "./layout.module.css";
import meServer from "./apis/me.server";
import fetchProblemsServer from "./apis/fetchProblems.servre";
import type { Problems } from "@/types";
import "./globals.css";
import Footer from "./_compnents/Footer/Footer";

function calcAcRate(problems: Problems[]) {
  const denominator = problems.length * 5;
  const numerator = problems.reduce((sum, p) => sum + Math.min(5, p.ac_count), 0);
  const rate = denominator === 0 ? 0 : (numerator / denominator) * 100;

  return { rate, numerator, denominator };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const isLoggedIn = await meServer();
  const problems = await fetchProblemsServer();
  const acRate = calcAcRate(problems);

  return (
    <html lang="ja">
      <body>
        <QueryProvider>
          <div className={styles.wrapper}>
            <Header isLoggedIn={isLoggedIn} acRate={acRate} />
            {children}
            <Footer />
          </div>
        </QueryProvider>
      </body>
    </html>
  );
}
