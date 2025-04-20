export async function getLocations() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/locations`, {
    cache: "no-store",
  });

  if (!res.ok) throw new Error("Failed to fetch locations");

  return res.json();
}
