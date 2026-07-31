"use client";

import { Dispatch, SetStateAction, useState } from "react";
import Link from "next/link";
import styles from "./table.module.css";
import updateAcCountClient from "@/app/apis/updateAcCount.client";
import deleteProblemClient from "@/app/apis/deleteProblem.client";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import FullScreenLoading from "../UI/FullScreenLoading";
import Tag from "../Tag/Tag";
import AlertModal from "../AlertModal/AlertModal";
import DifficultySquare from "../DifficultySquare/DifficultySquare";
import { formatDate } from "@/lib/formatDate";
import { isDone, shouldShowSolveBadge } from "@/lib/solveBadge";
import SnackBar from "../UI/SnackBar";
import RowMenu from "../RowMenu/RowMenu";
import EditProblemModal from "../EditProblemModal/EditProblemModal";
import Badge from "../UI/Badge";
import type { Problem, SnackBarState } from "@/types"

type Props = {
  data: Problem[];
  now: number;
  isLoggedIn: boolean;
  setSelectedTags: Dispatch<SetStateAction<string[]>>;
};

export default function Table({
  data,
  now,
  isLoggedIn,
  setSelectedTags,
}: Props) {
  const router = useRouter();
  const [confirmingId, setConfirmingId] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [editingProblem, setEditingProblem] = useState<Problem | null>(null);

  const [snackBar, setSnackBar] = useState<SnackBarState>({
    isOpen: false,
    title: "",
    variant: "success",
  });

  const acMutation = useMutation({
    mutationFn: (id: string) => updateAcCountClient(id),
    onSuccess: () => {
      router.refresh();
      setSnackBar({
        isOpen: true,
        title: "+1しました",
        variant: "success",
      });
    },
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

  const deleteProblemMutation = useMutation({
    mutationFn: (id: string) => deleteProblemClient(id),
    onSuccess: () => {
      router.refresh();
      setSnackBar({
        isOpen: true,
        title: "削除しました",
        variant: "success",
      });
    },
  });

  const handleDelete = (id: string) => {
    setDeletingId(id);
  };

  const handleConfirmDelete = () => {
    if (deletingId === null) return;

    deleteProblemMutation.mutate(deletingId);
    setDeletingId(null);
  };

  const handleCancelDelete = () => {
    setDeletingId(null);
  };

  const isPending = acMutation.isPending || deleteProblemMutation.isPending;

  return (
    <>
      <div className={styles.tableWrapper}>

      <table className={styles.table}>
        <thead>
          <tr>
            <th>問題</th>
            <th>タグ</th>
            {isLoggedIn && (
              <>
                <th>AC<br />カウント</th>
                <th>最終AC日</th>
                <th></th>
              </>
            )}
          </tr>
        </thead>

        <tbody>
          {data.map((data) => (
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

                  {isLoggedIn && (
                    <>
                      {shouldShowSolveBadge(data.ac_count, data.last_solved_at, now) && (
                        <Badge
                          label="Solve!"
                          variant="solve"
                        />
                      )}

                      {isDone(data.ac_count) && (
                        <Badge
                          label="Done"
                          variant="done"
                        />
                      )}
                    </>
                  )}
                </div>
              </td>
              <td>
                <div className={styles.tags}>
                  {data.tags.map((tag) => (
                    <Tag
                      key={`tag-${tag}`}
                      tagName={tag}
                      onClick={() => setSelectedTags((prev) =>
                        prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
                      )}
                    />
                  ))}
                </div>
              </td>

              {isLoggedIn && (
                <>
                  <td>
                    <div className={styles.acCount}>
                      <p>{data.ac_count}</p>

                      {isLoggedIn && (
                        <button
                          type="button"
                          className={styles.acButton}
                          onClick={() => handlerAc(data.id)}
                        >
                          +1
                        </button>
                      )}
                    </div>
                  </td>

                  <td>
                    <p className={styles.createdAt}>
                      {data.last_solved_at ? formatDate(data.last_solved_at) : "-"}
                    </p>
                  </td>

                  <td>
                    <div className={styles.menu}>
                      <RowMenu
                        row={data}
                        onEdit={setEditingProblem}
                        onDelete={handleDelete}
                      />
                    </div>
                  </td>
                </>
              )}
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

      {deletingId !== null && (
        <AlertModal
          title="この問題を削除します。よろしいですか?"
          onClick={handleConfirmDelete}
          onClose={handleCancelDelete}
        />
      )}

      {editingProblem && (
        <EditProblemModal
          key={editingProblem.id}
          problem={editingProblem}
          onClose={() => setEditingProblem(null)}
        />
      )}

      <SnackBar
        title={snackBar.title}
        variant={snackBar.variant}
        isOpen={snackBar.isOpen}
        onClose={() => setSnackBar((prev) => ({ ...prev, isOpen: false }))}
      />
    </>
  )
}
