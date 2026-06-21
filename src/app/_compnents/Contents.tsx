import { Suspense } from "react";
import fetchProblemsServer from "../apis/fetchProblems.servre";
import Table from "./Table/Table";

export default async function Contents() {
  const data = await fetchProblemsServer();

  return (
    <Suspense fallback={<p>Loading...</p>}>
      <Table data={data} />
    </Suspense>
  );
}
