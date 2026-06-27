const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export async function apiFetch(path: string) {
    const res = await fetch(`${BASE_URL}/${path}`, {
        headers: { "Content-Type": "application/json" },
    });

    const data = await res.json();

    return data;
}
