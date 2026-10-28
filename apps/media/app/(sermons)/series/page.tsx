import SeriesList from "@/components/sermons/SeriesList";
import { getSermons } from "@/lib/sermons";

export const revalidate = 1800;
export const metadata = { title: "Series | RCCG Rose of Sharon Sermons" };

export default async function Page() {
  return <SeriesList sermons={await getSermons()} />;
}
