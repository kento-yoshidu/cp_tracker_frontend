import "./globals.css";
import type { Problem } from "@/types";
import Footer from "./_compnents/Footer/Footer";
import Header from "./_compnents/Header/Header";
import Menu from "./_compnents/Menu/Menu";
import QueryProvider from "./_compnents/QueryProvider";
import fetchProblemsServer from "./apis/fetchProblems.servre";
import meServer from "./apis/me.server";
import styles from "./layout.module.css";

function calcAcRate(problems: Problem[]) {
  const denominator = problems.length * 5;
  const numerator = problems.reduce(
    (sum, p) => sum + Math.min(5, p.acCount),
    0,
  );
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
            <Header
              isLoggedIn={isLoggedIn}
              acRate={acRate}
            />

            {children}

            <Footer />
          </div>

          <Menu />
        </QueryProvider>
      </body>
    </html>
  );
}
