import { useState } from "react";
import Link from "next/link";
import DifficultySquare from "../DifficultySquare/DifficultySquare";
import Tag from "../Tag/Tag";
import ArchiveRowMenu from "../RowMenu/ArchiveRowMenu";
import { useMutation } from "@tanstack/react-query";
import deleteArchiveClient from "@/app/apis/deleteArchive.client";
import { useRouter } from "next/navigation";
import SnackBar from "../UI/SnackBar";
import styles from "./archiveTable.module.css";
import type { Archives, SnackBarState } from "@/types";
import AlertModal from "../AlertModal/AlertModal";

type Props = {
  data: Archives[];
};

type PendingAction =
  | { type: "delete", id: string }
  | { type: "restore", id: string };

const titles: Record<PendingAction["type"], string> = {
  delete: "この問題を削除します",
  restore: "この問題をアーカイブします",
};

export default function ArchiveTable({ data }: Props) {
  const router = useRouter();

  const [pendingAction, setPendingActoin] = useState<PendingAction | null>(null);

  const [snackBar, setSnackBar] = useState<SnackBarState>({
    isOpen: false,
    title: "",
    variant: "success",
  });

  const deleteArchiveMutation = useMutation({
    mutationFn: (id: string) => deleteArchiveClient(id),
    onSuccess: () => {
      router.refresh();

      setSnackBar({
        isOpen: true,
        title: "アーカイブを削除しました。",
        variant: "success",
      });
    },
  });

  const handleConfirm = () => {
    if (!pendingAction) {
      return;
    }

    const { type, id } = pendingAction;

    if (type === "delete") {
      deleteArchiveMutation.mutate(id);
    }

    setPendingActoin(null);
  };

  return (
    <>
      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>問題</th>
              <th>タグ</th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            {data.map((data) => (
              <tr key={data.id}>
                <td>
                  <div className={styles.titleWrapper}>
                    <Link
                      href={data.url}
                      className={styles.title}
                    >
                      <DifficultySquare difficulty={data.difficulty} />

                      {data.title}
                    </Link>
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
                  <div className={styles.menu}>
                    <ArchiveRowMenu
                      row={data}
                      onDelete={() =>
                        setPendingActoin({ type: "delete", id: data.id })
                      }
                      onRestore={() => {}}
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {pendingAction && (
        <AlertModal
          title={titles[pendingAction.type]}
          onClick={handleConfirm}
          onClose={() => setPendingActoin(null)}
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
