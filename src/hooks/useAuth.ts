import { useQuery } from "@tanstack/react-query";
import meClient from "@/app/apis/me.client";

export default function useAuth(): boolean {
  const { data: isLoggedIn } = useQuery({
    queryKey: ["me"],
    queryFn: meClient,
  });

  return isLoggedIn ?? false;
}
