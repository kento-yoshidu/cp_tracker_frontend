"use client";

import { useState } from "react";
import CreateProblemModal from "../CreateProblemModal/CreateProblemModal";
import styles from "./header.module.css";

type AcRate = {
  rate: number;
  numerator: number;
  denominator: number;
};

type Props = {
  isLoggedIn: boolean;
  acRate: AcRate;
};

export default function Header({ isLoggedIn, acRate }: Props) {
  const isLocalDev = process.env.NODE_ENV === "development";
  const isTargetingProductionBackend =
    !process.env.NEXT_PUBLIC_API_URL?.includes("localhost");
  const showProductionBadge = isLocalDev && isTargetingProductionBackend;

  const [isOpenCreateProblemModal, setIsOpenCreateProblemModal] =
    useState(false);

  return (
    <header className={styles.header}>
      <h1 className={styles.title}>CP Tracker</h1>

      {isLoggedIn && (
        <>
          <div className={styles.actions}>
            <span className={styles.acRate}>
              AC率 {acRate.rate.toFixed(1)}% ({acRate.numerator}/
              {acRate.denominator})
            </span>

            {showProductionBadge && (
              <span className={styles.productionBadge}>本番データ</span>
            )}

            {isLoggedIn && (
              <>
                <span className={styles.loggedInBadge}>ログイン中</span>

                <button
                  type="button"
                  className={styles.addButton}
                  onClick={() => setIsOpenCreateProblemModal(true)}
                >
                  問題を追加する
                </button>
              </>
            )}
          </div>

          <CreateProblemModal
            open={isOpenCreateProblemModal}
            onClose={() => setIsOpenCreateProblemModal(false)}
          />
        </>
      )}
    </header>
  );
}
