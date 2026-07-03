import fetchProblemsServer from "../apis/fetchProblems.servre";
import Table from "./Table/Table";

export default async function Contents() {
  const data = await fetchProblemsServer();

  return (
    <Table data={data} />
  );
}
