import { notFound } from "next/navigation";
import { ALBUMS } from "@ros/shared/kit/albums";
import AlbumView from "@/components/sermons/AlbumView";
import { getAllAlbums } from "@/lib/library";

// the church's own albums are built ahead of time; albums from the media library are added as they appear
export const dynamicParams = true;
export const revalidate = 300;
export const generateStaticParams = () => ALBUMS.map((a) => ({ slug: a.slug }));

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const a = (await getAllAlbums()).find((x) => x.slug === slug);
  return { title: a ? `${a.title} | Gallery | RCCG Rose of Sharon` : "Gallery" };
}

export default async function AlbumPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const albums = await getAllAlbums();
  const album = albums.find((a) => a.slug === slug);
  if (!album) notFound();
  return <AlbumView album={album} albums={albums} />;
}
