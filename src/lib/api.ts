import { BASE_URL } from "@/constants/constants";

export async function apiFetch(path: string) {
    const res = await fetch(`${BASE_URL}/${path}`, {
        headers: { "Content-Type": "application/json" },
        cache: 'no-store',
    });

    const data = await res.json();

    return data;
}
