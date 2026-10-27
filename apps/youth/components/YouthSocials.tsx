import { SOCIALS } from "@ros/shared/kit/youth";
import { A } from "@ros/shared/link";

const ICONS: Record<string, React.ReactNode> = {
  instagram: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="ros:size-6"><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.2" cy="6.8" r="1" fill="currentColor" stroke="none" /></svg>,
  tiktok: <svg viewBox="0 0 24 24" fill="currentColor" className="ros:size-6"><path d="M16.6 3c.3 2.4 1.7 3.9 4 4.1v3.2c-1.4.1-2.7-.3-4-1.1v5.9c0 3.7-2.6 6-5.7 6-3 0-5.5-2.3-5.5-5.4 0-3.3 2.7-5.7 6-5.3v3.3c-1.6-.5-2.8.5-2.8 1.9 0 1.2.9 2.1 2.1 2.1 1.4 0 2.2-.9 2.2-2.4V3h3.7z" /></svg>,
  x: <svg viewBox="0 0 24 24" fill="currentColor" className="ros:size-5"><path d="M18.2 2.5h3.1l-6.8 7.8 8 11.2h-6.3l-4.9-6.7-5.7 6.7H2.5l7.3-8.3L2.2 2.5h6.4l4.4 6.1 5.2-6.1zm-1.1 17.1h1.7L7.1 4.3H5.3l11.8 15.3z" /></svg>,
  facebook: <svg viewBox="0 0 24 24" fill="currentColor" className="ros:size-6"><path d="M13.5 21v-7.6h2.6l.4-3h-3V8.5c0-.9.3-1.5 1.5-1.5h1.6V4.3c-.3 0-1.2-.1-2.3-.1-2.3 0-3.9 1.4-3.9 4v2.2H7.8v3h2.6V21h3.1z" /></svg>,
};

/** Row of the youth fellowship's social handles. dark = for use on a black band. */
export default function YouthSocials({ dark = false }: { dark?: boolean }) {
  return (
    <div className="ros:grid ros:grid-cols-1 ros:gap-4 ros:sm:grid-cols-2 ros:lg:grid-cols-4">
      {SOCIALS.map((s) => (
        <A
          key={s.key}
          href={s.href}
          target="_blank"
          rel="noopener noreferrer"
          className={`ros:group ros:flex ros:flex-col ros:gap-3 ros:rounded-lg ros:border ros:p-6 ros:transition ${
            dark ? "ros:border-[#FFFFFF2E] ros:text-white ros:hover:border-[#DF4E4E]" : "ros:border-[#00000014] ros:bg-[#FAFAFA8F] ros:hover:border-[#DF4E4E]"
          }`}
        >
          <span className={`ros:flex ros:size-12 ros:items-center ros:justify-center ros:rounded-full ${dark ? "ros:bg-white ros:text-black" : "ros:bg-black ros:text-white"}`}>{ICONS[s.key]}</span>
          <h3 className="ros:text-lg ros:font-bold ros:group-hover:underline">{s.name}</h3>
          <p className={`ros:text-sm ros:font-semibold ${dark ? "ros:text-[#FFFFFFCC]" : ""}`}>{s.handle}</p>
          <p className={dark ? "ros:text-[#FFFFFFB2]" : "ros:text-[#00000099]"}>{s.text}</p>
          <span className="ros:mt-auto ros:text-[10px] ros:font-extrabold ros:uppercase ros:tracking-[0.2em] ros:text-[#DF4E4E]">Follow →</span>
        </A>
      ))}
    </div>
  );
}
