import Link from "next/link";
import { CHANNEL_ID, CHANNEL_URL } from "@/lib/sermons";

export const metadata = { title: "Live | RCCG Rose of Sharon Sermons" };

export default function Page() {
  return (
    <div>
      <h3 className="ros:text-[26px] ros:font-bold ros:md:text-[30px]">Live</h3>
      <p className="ros:mt-1 ros:text-white/50">Join our services live. When we are not broadcasting, the player below will tell you, and you can catch up on the latest sermons.</p>
      <div className="ros:mt-6 ros:overflow-hidden ros:rounded-xl ros:bg-black" style={{ aspectRatio: "16 / 9", maxWidth: 1000 }}>
        <iframe src={`https://www.youtube-nocookie.com/embed/live_stream?channel=${CHANNEL_ID}`} title="RCCG Rose of Sharon live stream" allow="autoplay; encrypted-media; picture-in-picture; fullscreen" allowFullScreen style={{ width: "100%", height: "100%", border: 0 }} />
      </div>
      <div className="ros:mt-6 ros:flex ros:flex-wrap ros:gap-3">
        <a href={CHANNEL_URL} target="_blank" rel="noopener noreferrer" className="ros:rounded-full ros:bg-white ros:px-6 ros:py-3 ros:text-[13px] ros:font-bold ros:text-black">Watch on YouTube</a>
        <Link href="/" className="ros:rounded-full ros:border ros:border-white/15 ros:px-6 ros:py-3 ros:text-[13px] ros:font-bold ros:transition ros:hover:bg-white/10">Latest sermons</Link>
      </div>
    </div>
  );
}
