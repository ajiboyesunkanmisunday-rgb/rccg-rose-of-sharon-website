import { notFound } from "next/navigation";
import { ALBUMS } from "@ros/shared/kit/albums";
import AlbumView from "@/components/sermons/AlbumView";

export const dynamicParams = false;
export const generateStaticParams = () => ALBUMS.map((a) => ({ slug: a.slug }));

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const a = ALBUMS.find((x) => x.slug === slug);
  return { title: a ? `${a.title} | Gallery | RCCG Rose of Sharon` : "Gallery" };
}

export default async function AlbumPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const album = ALBUMS.find((a) => a.slug === slug);
  if (!album) notFound();
  return <AlbumView album={album} />;
}
