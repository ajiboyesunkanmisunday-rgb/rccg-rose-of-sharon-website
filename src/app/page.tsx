import Hero from "@/components/sections/Hero";
import Welcome from "@/components/sections/Welcome";
import Events from "@/components/sections/Events";
import Groups from "@/components/sections/Groups";
import Thanksgiving from "@/components/sections/Thanksgiving";
import Gallery from "@/components/sections/Gallery";
import Podcast from "@/components/sections/Podcast";
import RequestsGive from "@/components/sections/RequestsGive";
import Footer from "@/components/layout/Footer";

export default function Home() {
  return (
    <main>
      <Hero />
      <Welcome />
      <Events />
      <Groups />
      <Thanksgiving />
      <Gallery />
      <Podcast />
      <RequestsGive />
      <Footer />
    </main>
  );
}
