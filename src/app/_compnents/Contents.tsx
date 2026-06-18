import { Suspense } from "react";
import fetchProblemsServer from "../apis/fetchProblems.servre";

export default async function Contents() {
  const data = await fetchProblemsServer();

  console.log("data = ", data);

  return (
    <Suspense fallback={<p>Loading...</p>}>
      {data.map((d) => {
        return (
          <p>{d.id}</p>
        )
      })}
    </Suspense>
  );
}
