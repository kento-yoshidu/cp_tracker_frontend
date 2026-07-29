"use client";

import { useState } from "react";
import Table from "./Table/Table";
import { shouldShowSolveBadge } from "@/lib/solveBadge";
import Filter from "./Filter/Filter";
import type { Activity, Problem } from "@/types";

type Props = {
  problems: Problem[];
  activities: Activity[];
  now: number;
  isLoggedIn: boolean;
};

export default function Contents({
  problems,
  activities,
  now,
  isLoggedIn,
}: Props) {
  const [onlySolve, setOnlySolve] = useState(false);

  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  const filteredData = problems.filter((problem) => {
    if (onlySolve && !shouldShowSolveBadge(problem.ac_count, problem.last_solved_at, now)) {
      return false;
    }

    if (selectedTag && !problem.tags.includes(selectedTag)) {
      return false;
    }

    return true;
  });

  console.log("activities = ", activities);

  return (
    <>
      <Filter
        onlySolve={onlySolve}
        onClick={setOnlySolve}
        selectedTag={selectedTag}
        setSelectedTag={setSelectedTag}
      />

      <Table
        data={filteredData}
        now={now}
        isLoggedIn={isLoggedIn}
        setSelectedTag={setSelectedTag}
      />
    </>
  );
}
