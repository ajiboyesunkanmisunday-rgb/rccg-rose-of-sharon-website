import { Hero, Section, SectionTitle, Btn } from "@ros/shared/kit/ui";
import YouthTabs from "@/components/YouthTabs";
import { EVENTS } from "@ros/shared/kit/youth";

export const metadata = { title: "Youth Events | RCCG Rose of Sharon" };

export default function YouthEvents() {
  const upcoming = EVENTS.filter((e) => e.status === "upcoming");
  const past = EVENTS.filter((e) => e.status === "past");
  return (
    <>
      <Hero pill="📅 EVENTS" title={<>Youth <span className="text-textRed">Events</span></>} subtitle="Hangouts, conferences and programs for the youth church." bg="/youth/hangout-1.jpg" />
      <Section>
        <YouthTabs />
        <SectionTitle pill="🔜 COMING UP" title={<>Upcoming <span className="text-textRed">programs</span></>} sub="Dates will be posted here and on our social pages as they are confirmed." />
        <div className="ros:mt-8 ros:grid ros:grid-cols-1 ros:gap-6 ros:md:grid-cols-3">
          {upcoming.map((e) => (
            <div key={e.title} className="ros:flex ros:flex-col ros:gap-3 ros:rounded-lg ros:border ros:border-[#00000014] ros:bg-[#FAFAFA8F] ros:p-6">
              <span className="ros:text-[10px] ros:font-bold ros:uppercase ros:tracking-[0.2em] ros:text-[#DF4E4E]">{e.when}</span>
              <h3 className="ros:text-lg ros:font-bold">{e.title}</h3>
              <p className="ros:text-[#00000099]">{e.text}</p>
              <p className="ros:mt-auto ros:text-xs ros:font-semibold ros:text-[#00000099]">📍 {e.where}</p>
            </div>
          ))}
        </div>
        <div className="ros:mt-6"><Btn href="/youth/connect" variant="outline">Follow for updates</Btn></div>
      </Section>
      <Section className="ros:pt-0">
        <SectionTitle pill="🗓️ LOOKING BACK" title={<>Past <span className="text-textRed">events</span></>} />
        {past.map((e) => (
          <div key={e.title} className="ros:mt-8 ros:grid ros:grid-cols-1 ros:items-center ros:gap-8 ros:md:grid-cols-2">
            <img loading="lazy" decoding="async" src={e.image} alt={e.title} className="ros:h-[320px] ros:w-full ros:rounded-lg ros:object-cover" />
            <div className="ros:flex ros:flex-col ros:gap-3">
              <span className="ros:text-[10px] ros:font-bold ros:uppercase ros:tracking-[0.2em] ros:text-[#DF4E4E]">{e.when}</span>
              <h3 className="ros-anton ros:text-3xl ros:uppercase">{e.title}</h3>
              <p className="ros:text-[#00000099]">{e.text}</p>
              <div><Btn href="/youth/gallery" variant="outline">See photos</Btn></div>
            </div>
          </div>
        ))}
      </Section>
    </>
  );
}
