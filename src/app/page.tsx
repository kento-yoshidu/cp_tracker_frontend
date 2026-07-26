
import fetchProblemsServer from "./apis/fetchProblems.servre";
import meServer from "./apis/me.server";
import nowServer from "@/lib/now.server";
import Contents from "./_compnents/Contents";

export default async function Home() {
  const data = await fetchProblemsServer();
  const now = nowServer();
  const isLoggedIn = await meServer();

  return (
    <Contents
      data={data}
      now={now}
      isLoggedIn={isLoggedIn}
    />
  );
}
