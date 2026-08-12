import Link from "next/link";
import { Archives } from "@/types";
import DifficultySquare from "../DifficultySquare/DifficultySquare";
import Tag from "../Tag/Tag";
import styles from "./archiveTable.module.css";
import ArchiveRowMenu from "../RowMenu/ArchiveRowMenu";

type Props = {
  data: Archives[];
};

export default function ArchiveTable({ data }: Props) {
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
                      onDelete={() => {}}
                      onRestore={() => {}}
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
