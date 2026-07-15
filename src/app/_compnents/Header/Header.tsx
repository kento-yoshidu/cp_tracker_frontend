"use client";

import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import styles from "./header.module.css";
import createNewProblemClient from "@/app/apis/createNewProblem.client";
import FullScreenLoading from "../UI/FullScreenLoading";
import { useState } from "react";
import CreateProblemModal from "../CreateProblemModal/CreateProblemModal";
import { CreateProblemInput } from "@/types";
import useAuth from "@/hooks/useAuth";

export default function Header() {
  const router = useRouter();
  const isLoggedIn = useAuth();
  const isLocalDev = process.env.NODE_ENV === "development";
  const isTargetingProductionBackend = !process.env.NEXT_PUBLIC_API_URL?.includes("localhost");
  const showProductionBadge = isLocalDev && isTargetingProductionBackend;

  const [isOpenCreateProblemModal, setIsOpenCreateProblemModal] = useState(false);

  const createProblemMutation = useMutation({
    mutationFn: (input: CreateProblemInput) => createNewProblemClient(input),
    onSuccess: () => {
      setIsOpenCreateProblemModal(false);
      router.refresh();
    },
  });

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

      {createProblemMutation.isPending && <FullScreenLoading />}

      <CreateProblemModal
        open={isOpenCreateProblemModal}
        onClose={() => setIsOpenCreateProblemModal(false)}
        onSubmit={(input) => createProblemMutation.mutate(input)}
      />
    </header>
  );
}
