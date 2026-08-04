"use client";

import { useState } from "react";
import Table from "./Table/Table";
import { shouldShowSolveBadge } from "@/lib/solveBadge";
import Filter from "./Filter/Filter";
import DifficultySquare from "./DifficultySquare/DifficultySquare";
import styles from "./Contents.module.css";
import type { Activity, Archives, Problem } from "@/types";
import { arch } from "os";

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

  const [isShowArchives, setIsShowArchives] = useState(false);

  const filteredData = problems.filter((problem) => {
    if (onlySolve && !shouldShowSolveBadge(problem.ac_count, problem.last_solved_at, now)) {
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
        <div className={styles.archiveSection}>
          <button
            type="button"
            className={styles.archiveToggle}
            onClick={() => setIsShowArchives((prev) => !prev)}
            aria-expanded={isShowArchives}
          >
            <span className={styles.label}>
              アーカイブ
              <span className={styles.count}>{archives.length}件</span>
            </span>

            <span
              className={`${styles.chevron} ${isShowArchives ? styles.chevronOpen : ""}`}
              aria-hidden="true"
            >
              ▾
            </span>
          </button>

          <div
            className={`${styles.archiveBody} ${isShowArchives ? styles.archiveBodyOpen : ""}`}
          >
            <div className={styles.archiveBodyInner}>
              {archives.length === 0 ? (
                <p className={styles.empty}>アーカイブされた問題はありません</p>
              ) : (
                <ul className={styles.archiveList}>
                  {archives.map((archive) => (
                    <li key={archive.id} className={styles.archiveRow}>
                      <span className={styles.archiveRowTitle}>
                        <DifficultySquare difficulty={archive.difficulty} />
                        {archive.title}
                      </span>

                      <span className={styles.archiveRowDate}>
                        {archive.archived_at.slice(0, 10)}
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
