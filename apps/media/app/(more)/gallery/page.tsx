import { Hero } from "@ros/shared/kit/ui";
import AlbumGallery from "@/components/AlbumGallery";

export const metadata = { title: "Gallery | RCCG Rose of Sharon" };

export default function GalleryPage() {
  return (
    <div>
      <Hero pill="🌍 RCCG ROSE OF SHARON" title={<>Our <span className="text-textRed">Moments</span></>} subtitle="A glimpse into the life and fellowship of RCCG Rose of Sharon." bg="/assets/hero-bg.png" />
      <AlbumGallery />
    </div>
  );
}
