import { Location } from "@/shared/types/location";

interface Props {
  id: string, 
  payload: Partial<Omit<Location, "id">>
}

export async function updateLocation({ id, payload }: Props) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/locations`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id, ...payload }),
  });
  if (!res.ok) throw new Error("Failed to fetch locations");

  return { success: true, data: res.json() };
}
