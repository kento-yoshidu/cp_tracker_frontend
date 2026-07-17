"use client";

import styles from "./header.module.css";
import { useState } from "react";
import CreateProblemModal from "../CreateProblemModal/CreateProblemModal";

type Props = {
  isLoggedIn: boolean;
};

export default function Header({ isLoggedIn }: Props) {
  const isLocalDev = process.env.NODE_ENV === "development";
  const isTargetingProductionBackend = !process.env.NEXT_PUBLIC_API_URL?.includes("localhost");
  const showProductionBadge = isLocalDev && isTargetingProductionBackend;

  const [isOpenCreateProblemModal, setIsOpenCreateProblemModal] = useState(false);

  return (
    <header className={styles.header}>
      <h1 className={styles.title}>CP Tracker</h1>

      <div className={styles.actions}>
        {showProductionBadge && (
          <span className={styles.productionBadge}>本番環境</span>
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
    </header>
  );
}
