import { LocationsContainer } from "@/features/locations";
import { getLocations } from "@/features/locations/api";
import Loader from "@/shared/components/loader/Loader";
import { Metadata } from "next";

export default async function Page() {
  const initialData = await getLocations();

  return <Loader><LocationsContainer initialData={initialData} /></Loader>;
}

export const metadata: Metadata = {
  title: "Lokasyonlar",
  description: "Harita Lokasyonları.",
};
