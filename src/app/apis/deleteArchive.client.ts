export default async function deleteArchiveClient(id: string): Promise<void> {
    const res = await fetch(`/api/archives/${id}`, {
        method: "DELETE",
    });

    if (!res.ok) {
        throw new Error(`Failed to delete archive: ${res.status}`);
    }
}
