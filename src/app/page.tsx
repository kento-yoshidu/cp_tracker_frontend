
import fetchProblemsServer from "./apis/fetchProblems.servre";
import meServer from "./apis/me.server";
import nowServer from "@/lib/now.server";
import Contents from "./_compnents/Contents";
import fetchActivities from "./apis/fetchActivities.client";

export default async function Home() {
  const problems = await fetchProblemsServer();
  const activities = await fetchActivities();

  const now = nowServer();
  const isLoggedIn = await meServer();

  return (
    <Contents
      problems={problems}
      activities={activities}
      now={now}
      isLoggedIn={isLoggedIn}
    />
  );
}
