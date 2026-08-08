import { Archives } from "@/types"

import styles from "./archiveTable.module.css";
import Link from "next/link";
import DifficultySquare from "../DifficultySquare/DifficultySquare";
import Tag from "../Tag/Tag";

type Props = {
  data: Archives[];
}

export default function ArchiveTable({
  data,
}: Props) {
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
            <tr
              key={data.id}
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
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    </>
  )
}
