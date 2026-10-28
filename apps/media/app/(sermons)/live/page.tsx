import { CHANNEL_URL } from "@/lib/sermons";
import { CHURCH_LINKS } from "@ros/shared/links";

export const metadata = { title: "Live | RCCG Rose of Sharon Sermons" };

const CHANNELS = [
  {
    name: "YouTube",
    text: "Watch our services live and catch up on every sermon on the Rose of Sharon YouTube channel.",
    cta: "Open the YouTube channel",
    href: CHANNEL_URL,
    icon: <svg viewBox="0 0 24 24" fill="currentColor" className="ros:size-8"><path d="M21.6 7.2a2.5 2.5 0 0 0-1.8-1.8C18.2 5 12 5 12 5s-6.2 0-7.8.4A2.5 2.5 0 0 0 2.4 7.2C2 8.8 2 12 2 12s0 3.2.4 4.8a2.5 2.5 0 0 0 1.8 1.8C5.8 19 12 19 12 19s6.2 0 7.8-.4a2.5 2.5 0 0 0 1.8-1.8c.4-1.6.4-4.8.4-4.8s0-3.2-.4-4.8ZM10 15V9l5.2 3L10 15Z" /></svg>,
  },
  {
    name: "Mixlr",
    text: "Listen to our services live as audio on the Rose of Sharon Mixlr channel. Ideal when your data is low.",
    cta: "Open the Mixlr channel",
    href: CHURCH_LINKS.mixlr,
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" className="ros:size-8"><path d="M4 9v6M8 6v12M12 3v18M16 7v10M20 10v4" /></svg>,
  },
];

export default function Page() {
  return (
    <div>
      <h3 className="ros:text-[26px] ros:font-bold ros:md:text-[30px]">Live</h3>
      <p className="ros:mt-1 ros:max-w-2xl ros:text-white/50">Join our services live on either of our channels.</p>
      <div className="ros:mt-8 ros:grid ros:max-w-4xl ros:grid-cols-1 ros:gap-4 ros:md:grid-cols-2">
        {CHANNELS.map((c) => (
          <div key={c.name} className="ros:flex ros:flex-col ros:gap-4 ros:rounded-2xl ros:border ros:border-white/10 ros:p-6" style={{ background: "#111" }}>
            <span className="ros:flex ros:size-14 ros:items-center ros:justify-center ros:rounded-full ros:bg-white/10">{c.icon}</span>
            <h4 className="ros:text-[22px] ros:font-bold">{c.name}</h4>
            <p className="ros:text-white/55">{c.text}</p>
            {c.href ? (
              <a href={c.href} target="_blank" rel="noopener noreferrer" className="ros:mt-auto ros:w-fit ros:rounded-full ros:bg-white ros:px-6 ros:py-3 ros:text-[13px] ros:font-bold ros:text-black ros:transition ros:hover:bg-white/85">{c.cta} ↗</a>
            ) : (
              <span className="ros:mt-auto ros:w-fit ros:rounded-full ros:border ros:border-white/15 ros:px-6 ros:py-3 ros:text-[13px] ros:font-bold ros:text-white/40">Link coming soon</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
