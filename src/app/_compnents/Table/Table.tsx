"use client";

import { useMutation } from "@tanstack/react-query";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { type Dispatch, type SetStateAction, useState } from "react";
import archiveClient from "@/app/apis/archive.client";
import deleteProblemClient from "@/app/apis/deleteProblem.client";
import updateAcCountClient from "@/app/apis/updateAcCount.client";
import { formatDate } from "@/lib/formatDate";
import { isDone, shouldShowSolveBadge } from "@/lib/solveBadge";
import type { ApiGetProblemsResponse, Problem, SnackBarState } from "@/types";
import AlertModal from "../AlertModal/AlertModal";
import DifficultySquare from "../DifficultySquare/DifficultySquare";
import EditProblemModal from "../EditProblemModal/EditProblemModal";
import RowMenu from "../RowMenu/RowMenu";
import Tag from "../Tag/Tag";
import Badge from "../UI/Badge";
import FullScreenLoading from "../UI/FullScreenLoading";
import SnackBar from "../UI/SnackBar";
import styles from "./table.module.css";

type Props = {
  data: Problem[];
  now: number;
  isLoggedIn: boolean;
  setSelectedTags: Dispatch<SetStateAction<string[]>>;
};

type PendingAction =
  | { type: "ac"; id: string }
  | { type: "delete"; id: string }
  | { type: "archive"; id: string };

export default function Table({
  data,
  now,
  isLoggedIn,
  setSelectedTags,
}: Props) {
  const router = useRouter();

  const [pendingAction, setPendingAction] = useState<PendingAction | null>(
    null,
  );

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

  const archiveMutation = useMutation({
    mutationFn: (id: string) => archiveClient(id),
    onSuccess: () => {
      router.refresh();
      setSnackBar({
        isOpen: true,
        title: "アーカイブしました",
        variant: "success",
      });
    },
  });

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

  const handleConfirm = () => {
    if (!pendingAction) {
      return;
    }

    const { type, id } = pendingAction;

    if (type === "ac") {
      acMutation.mutate(id);
    }

    if (type === "delete") {
      deleteProblemMutation.mutate(id);
    }

    if (type === "archive") {
      archiveMutation.mutate(id);
    }

    setPendingAction(null);
  };

  const handleClose = () => {
    setPendingAction(null);
  };

  const isPending = acMutation.isPending || deleteProblemMutation.isPending;

  const titles: Record<PendingAction["type"], string> = {
    ac: "ACカウントを+1します",
    delete: "この問題を削除します",
    archive: "この問題をアーカイブします",
  };

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
                  <th>
                    AC
                    <br />
                    カウント
                  </th>
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
                className={isDone(data.acCount) ? styles.doneRow : undefined}
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
                        {shouldShowSolveBadge(
                          data.acCount,
                          data.lastSolvedAt,
                          now,
                        ) && (
                          <Badge
                            label="Solve!"
                            variant="solve"
                          />
                        )}

                        {isDone(data.acCount) && (
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
                        onClick={() =>
                          setSelectedTags((prev) =>
                            prev.includes(tag)
                              ? prev.filter((t) => t !== tag)
                              : [...prev, tag],
                          )
                        }
                      />
                    ))}
                  </div>
                </td>

                {isLoggedIn && (
                  <>
                    <td>
                      <div className={styles.acCount}>
                        <p>{data.acCount}</p>

                        {isLoggedIn && (
                          <button
                            type="button"
                            className={styles.acButton}
                            onClick={() =>
                              setPendingAction({ type: "ac", id: data.id })
                            }
                          >
                            +1
                          </button>
                        )}
                      </div>
                    </td>

                    <td>
                      <p className={styles.createdAt}>
                        {data.lastSolvedAt
                          ? formatDate(data.lastSolvedAt)
                          : "-"}
                      </p>
                    </td>

                    <td>
                      <div className={styles.menu}>
                        <RowMenu
                          row={data}
                          onEdit={setEditingProblem}
                          onDelete={() =>
                            setPendingAction({ type: "delete", id: data.id })
                          }
                          onArchive={() =>
                            setPendingAction({ type: "archive", id: data.id })
                          }
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

      {pendingAction && (
        <AlertModal
          title={titles[pendingAction.type]}
          onClick={handleConfirm}
          onClose={handleClose}
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
  );
}
