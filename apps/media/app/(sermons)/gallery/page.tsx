import GalleryHome from "@/components/sermons/GalleryHome";
import { getAllAlbums } from "@/lib/library";

export const metadata = { title: "Gallery | RCCG Rose of Sharon" };
export const revalidate = 300;

export default async function GalleryPage() {
  return <GalleryHome albums={await getAllAlbums()} />;
}
