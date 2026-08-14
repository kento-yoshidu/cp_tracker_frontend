import { useState } from "react";
import Link from "next/link";
import { Archives, SnackBarState } from "@/types";
import DifficultySquare from "../DifficultySquare/DifficultySquare";
import Tag from "../Tag/Tag";
import styles from "./archiveTable.module.css";
import ArchiveRowMenu from "../RowMenu/ArchiveRowMenu";
import { useMutation } from "@tanstack/react-query";
import deleteArchiveClient from "@/app/apis/deleteArchive.client";
import { useRouter } from "next/navigation";
import SnackBar from "../UI/SnackBar";

type Props = {
  data: Archives[];
};

export default function ArchiveTable({ data }: Props) {
  const router = useRouter();

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
                      onDelete={() => deleteArchiveMutation.mutate(data.id)}
                      onRestore={() => {}}
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <SnackBar
        title={snackBar.title}
        variant={snackBar.variant}
        isOpen={snackBar.isOpen}
        onClose={() => setSnackBar((prev) => ({ ...prev, isOpen: false }))}
      />
    </>
  );
}
