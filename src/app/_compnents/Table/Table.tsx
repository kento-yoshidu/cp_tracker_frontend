import { Problems } from "@/types"
import Link from "next/link";
import styles from "./table.module.css";

type Props = {
  data: Problems[];
};

export default function Table({
  data,
}: Props) {
  return (
    <table className={styles.table}>
      <thead>
        <tr>
          <th>プラット<br />フォーム</th>
          <th>問題</th>
          <th>URL</th>
          <th>タグ</th>
          <th>ACカウント</th>
          <th>最終AC日</th>
        </tr>
      </thead>

      <tbody>
        {data.map((data) => (
          <tr key={data.id}>
            <td>{data.platform}</td>
            <td>{data.title}</td>
            <td>
              <Link href={data.url}>
                問題
              </Link>
            </td>
            <td>{data.tags.map((tag) => (
              <div>{tag}</div>
            ))}</td>
            <td>{data.ac_count}</td>
            <td>{data.last_solved_at ?? "-"}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
