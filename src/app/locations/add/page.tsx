import { AddLocationContainer } from "@/features/add-location";
import Loader from "@/shared/components/loader/Loader";
import { Metadata } from "next";

export default async function Page() {
  return (
    <Loader>
      <AddLocationContainer />
    </Loader>
  );
}

export const metadata: Metadata = {
  title: "Lokasyon Ekle",
  description: "Harita Lokasyonu Ekle.",
};
