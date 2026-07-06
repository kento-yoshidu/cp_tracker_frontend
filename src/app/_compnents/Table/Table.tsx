"use client";

import { useState } from "react";
import { Problems } from "@/types"
import Link from "next/link";
import styles from "./table.module.css";
import updateAcCountClient from "@/app/apis/updateAcCount.client";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import FullScreenLoading from "../UI/FullScreenLoading";
import Tag from "../Tag/Tag";
import SolveBadge from "../SolveBadge/SolveBadge";
import DoneBadge from "../DoneBadge/DoneBadge";
import AlertModal from "../AlertModal/AlertModal";
import DifficultySquare from "../DifficultySquare/DifficultySquare";
import { formatDate } from "@/lib/formatDate";
import { isDone, shouldShowSolveBadge } from "@/lib/solveBadge";

type Props = {
  data: Problems[];
};

export default function Table({
  data,
}: Props) {
  const router = useRouter();
  const [confirmingId, setConfirmingId] = useState<string | null>(null);
  const [onlySolve, setOnlySolve] = useState(false);

  const filteredData = data.filter((d) => {
    if (onlySolve && !shouldShowSolveBadge(d.ac_count, d.last_solved_at)) return false;
    return true;
  });

  const acMutation = useMutation({
    mutationFn: (id: string) => updateAcCountClient(id),
    onSuccess: () => router.refresh(),
  });

  const handlerAc = (id: string) => {
    setConfirmingId(id);
  };

  const handleConfirmAc = () => {
    if (confirmingId === null) return;

    acMutation.mutate(confirmingId);
    setConfirmingId(null);
  };

  const handleCancelAc = () => {
    setConfirmingId(null);
  };

  const isPending = acMutation.isPending;

  return (
    <>
      <div className={styles.filters}>
        <button
          type="button"
          className={onlySolve ? `${styles.filterButton} ${styles.filterButtonActive}` : styles.filterButton}
          onClick={() => setOnlySolve((prev) => !prev)}
        >
          Solve!のみ
        </button>
      </div>

      <div className={styles.tableWrapper}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>問題</th>
            <th>タグ</th>
            <th>ACカウント</th>
            <th>最終AC日</th>
          </tr>
        </thead>

        <tbody>
          {filteredData.map((data) => (
            <tr
              key={data.id}
              className={isDone(data.ac_count) ? styles.doneRow : undefined}
            >
              <td>
                <div className={styles.titleWrapper}>

                  <Link
                    href={data.url}
                    className={styles.title}
                  >
                    <DifficultySquare difficulty={data.difficulty} />

                    {data.title}
                  </Link>

                  <SolveBadge
                    acCount={data.ac_count}
                    lastSolvedAt={data.last_solved_at}
                  />

                  <DoneBadge acCount={data.ac_count} />
                </div>
              </td>
              <td>
                <div className={styles.tags}>
                  {data.tags.map((tag) => (
                    <Tag
                      key={`tag-${tag}`}
                      tagName={tag}
                    />
                  ))}

                </div>
              </td>

              <td>
                <div className={styles.acCount}>
                <p>{data.ac_count}</p>

                <button
                  type="button"
                  className={styles.acButton}
                  onClick={() => handlerAc(data.id)}
                >
                  +1
                </button>

                </div>
              </td>

              <td>{data.last_solved_at ? formatDate(data.last_solved_at) : "-"}</td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>

      {isPending && <FullScreenLoading />}

      {confirmingId !== null && (
        <AlertModal
          title="ACカウントを+1します。よろしいですか?"
          onClick={handleConfirmAc}
          onClose={handleCancelAc}
        />
      )}
    </>
  )
}
