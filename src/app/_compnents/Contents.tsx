"use client";

import { useState } from "react";
import Table from "./Table/Table";
import { Problems } from "@/types";
import { shouldShowSolveBadge } from "@/lib/solveBadge";
import Filter from "./Filter/Filter";

type Props = {
  data: Problems[];
  now: number;
  isLoggedIn: boolean;
};

export default function Contents({
  data,
  now,
  isLoggedIn,
}: Props) {
  const [onlySolve, setOnlySolve] = useState(false);

  const filteredData = data.filter((d) => {
    if (onlySolve && !shouldShowSolveBadge(d.ac_count, d.last_solved_at, now)) {
      return false;
    }

    return true;
  });

  return (
    <>
      <Filter
        onlySolve={onlySolve}
        onClick={setOnlySolve}
      />

      <Table
        data={filteredData}
        now={now}
        isLoggedIn={isLoggedIn}
      />
    </>
  );
}
