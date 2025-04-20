interface Props {
  id: string;
}

export async function deleteLocation({ id }: Props) {
  const res = await await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/locations`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    }
  );
  if (!res.ok) throw new Error("Failed to fetch locations");

  return { success: true, data: res.json() };
}
