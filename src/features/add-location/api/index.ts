import { Location } from "@/shared/types/location";

interface Props {
  payload: Location;
}

export async function addLocation({ payload }: Props) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/locations`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) throw new Error("Failed to fetch locations");

  return { success: true, data: res.json() };
}
