import { EditLocationContainer } from "@/features/edit-location";
import { getLocations } from "@/features/locations/api";
import Loader from "@/shared/components/loader/Loader";
import { Location } from "@/shared/types/location";
import { Metadata } from "next";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: "Lokasyon Düzenle",
  description: "Harita Lokasyonu Düzenle.",
};

export default async function Page({ params }: { params: { id: string } }) {
  const { id } = await params
  const initialData = await getLocations();

  const selected = initialData.find((l: Location) => l.id === id);

  if (!selected) return notFound();

  return (
    <Loader>
      <EditLocationContainer initialData={initialData} initialId={id} />
    </Loader>
  );
}
