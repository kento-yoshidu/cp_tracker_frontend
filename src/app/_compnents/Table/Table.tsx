"use client";

import { Problems } from "@/types"
import Link from "next/link";
import styles from "./table.module.css";
import updateAcCountClient from "@/app/apis/updateAcCount.client";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import FullScreenLoading from "../UI/FullScreenLoading";
import Tag from "../Tag/Tag";
import Button from "../UI/Button";
import SolveBadge from "../SolveBadge/SolveBadge";
import DoneBadge from "../DoneBadge/DoneBadge";

type Props = {
  data: Problems[];
};

export default function Table({
  data,
}: Props) {
  const router = useRouter();

  const mutation = useMutation({
    mutationFn: (id: string) => updateAcCountClient(id),
    onSuccess: () => router.refresh(),
  });

  const handlerAc = (id: string) => {
    mutation.mutate(id);
  };

  return (
    <>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>プラット<br />フォーム</th>
            <th>問題</th>
            <th>タグ</th>
            <th>ACカウント</th>
            <th>最終AC日</th>
          </tr>
        </thead>

        <tbody>
          {data.map((data) => (
            <tr key={data.id}>
              <td>{data.platform}</td>
              <td>
                <div className={styles.titleWrapper}>
                  <Link
                    href={data.url}
                    className={styles.title}
                  >
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

                <Button
                  title="+1"
                  onClick={() => handlerAc(data.id)}
                />

                </div>
              </td>

              <td>{data.last_solved_at ?? "-"}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {mutation.isPending && (
        <FullScreenLoading />
      )}
    </>
  )
}
