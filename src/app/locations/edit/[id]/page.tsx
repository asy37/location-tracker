import { EditLocationContainer } from "@/features/edit-location";
import { getLocations } from "@/features/locations/api";
import Loader from "@/shared/components/loader/Loader";
import { Location } from "@/shared/types/location";
import { Metadata } from "next";
import { notFound } from "next/navigation";

// metadata kısmı değişmedi
export const metadata: Metadata = {
  title: "Lokasyon Düzenle",
  description: "Harita Lokasyonu Düzenle.",
};

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const initialData = await getLocations();

  // params.id ile lokasyonunuzu buluyoruz
  const selected = initialData.find((l: Location) => l.id === id);

  // Eğer lokasyon bulunamazsa 404 hatası döndürüyoruz
  if (!selected) return notFound();

  return (
    <Loader>
      <EditLocationContainer initialData={initialData} initialId={id} />
    </Loader>
  );
}
