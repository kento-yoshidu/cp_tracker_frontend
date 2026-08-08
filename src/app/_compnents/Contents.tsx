"use client";

import { useState } from "react";
import { shouldShowSolveBadge } from "@/lib/solveBadge";
import type { Activity, Archives, Problem } from "@/types";
import ArchiveTable from "./ArchiveTable/ArchiveTable";
import styles from "./Contents.module.css";
import Filter from "./Filter/Filter";
import Table from "./Table/Table";

type Props = {
  problems: Problem[];
  activities: Activity[];
  archives: Archives[];
  now: number;
  isLoggedIn: boolean;
};

export default function Contents({
  problems,
  activities,
  archives,
  now,
  isLoggedIn,
}: Props) {
  console.log("activities = ", activities);
  console.log("archives = ", archives);

  const [onlySolve, setOnlySolve] = useState(false);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const filteredData = problems.filter((problem) => {
    if (
      onlySolve &&
      !shouldShowSolveBadge(problem.acCount, problem.lastSolvedAt, now)
    ) {
      return false;
    }

    if (!selectedTags.every((tag) => problem.tags.includes(tag))) {
      return false;
    }

    return true;
  });

  return (
    <>
      <Filter
        isLoggedIn={isLoggedIn}
        onlySolve={onlySolve}
        onClick={setOnlySolve}
        selectedTags={selectedTags}
        setSelectedTags={setSelectedTags}
      />

      <Table
        data={filteredData}
        now={now}
        isLoggedIn={isLoggedIn}
        setSelectedTags={setSelectedTags}
      />

      {isLoggedIn && (
        <details className={styles.archiveSection}>
          <summary className={styles.archiveToggle}>
            <span className={styles.label}>
              アーカイブ
              <span className={styles.count}>{archives.length}件</span>
            </span>

            <span
              className={styles.chevron}
              aria-hidden="true"
            >
              ▾
            </span>
          </summary>

          <ArchiveTable data={archives} />
        </details>
      )}
    </>
  );
}
