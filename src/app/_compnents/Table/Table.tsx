"use client";

import { Problems } from "@/types"
import Link from "next/link";
import styles from "./table.module.css";
import updateAcCountClient from "@/app/apis/updateAcCount.client";
import { useMutation } from "@tanstack/react-query";

type Props = {
  data: Problems[];
};

export default function Table({
  data,
}: Props) {
  const mutation = useMutation({
    mutationFn: (id: string) => updateAcCountClient(id),
  });

  const handlerAc = (id: string) => {
    mutation.mutate(id);
  };

  if (mutation.isPending) {
    return (
      <div>Loading...</div>
    )
  }

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
              <div key={`tag-${tag}`}>{tag}</div>
            ))}</td>
            <td>
              {data.ac_count}
              <button onClick={() => handlerAc(data.id)}>+1</button>
            </td>
            <td>{data.last_solved_at ?? "-"}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
