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

  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const filteredData = problems.filter((problem) => {
    if (onlySolve && !shouldShowSolveBadge(problem.ac_count, problem.last_solved_at, now)) {
      return false;
    }

    if (!selectedTags.every((tag) => problem.tags.includes(tag))) {
      return false;
    }

    return true;
  });

  console.log("activities = ", activities);

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
    </>
  );
}
