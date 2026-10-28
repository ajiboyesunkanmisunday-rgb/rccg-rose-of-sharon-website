import { Suspense } from "react";
import SermonHome, { SermonHomeWithSearch } from "@/components/sermons/SermonHome";
import { getSermons } from "@/lib/sermons";

export const revalidate = 1800;
export const metadata = { title: "Sermons | RCCG Rose of Sharon", description: "Watch the latest sermons and services from RCCG Rose of Sharon." };

export default async function Page() {
  const sermons = await getSermons();
  return (
    <Suspense fallback={<SermonHome sermons={sermons} search="" />}>
      <SermonHomeWithSearch sermons={sermons} />
    </Suspense>
  );
}
