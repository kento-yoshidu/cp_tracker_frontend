import fetchProblemsServer from "../apis/fetchProblems.servre";
import meServer from "../apis/me.server";
import nowServer from "@/lib/now.server";
import Table from "./Table/Table";

export default async function Contents() {
  const data = await fetchProblemsServer();
  const now = nowServer();
  const isLoggedIn = await meServer();

  return (
    <Table data={data} now={now} isLoggedIn={isLoggedIn} />
  );
}
