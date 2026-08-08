import { FetchStrategy } from "next/dist/client/components/segment-cache/types";
import nowServer from "@/lib/now.server";
import Contents from "./_compnents/Contents";
import fetchActivities from "./apis/fetchActivities.client";
import fetchArchives from "./apis/fetchArchives";
import fetchProblemsServer from "./apis/fetchProblems.servre";
import meServer from "./apis/me.server";

export default async function Home() {
  const problems = await fetchProblemsServer();
  const activities = await fetchActivities();
  const archives = await fetchArchives();

  const now = nowServer();
  const isLoggedIn = await meServer();

  return (
    <Contents
      problems={problems}
      activities={activities}
      archives={archives}
      now={now}
      isLoggedIn={isLoggedIn}
    />
  );
}
