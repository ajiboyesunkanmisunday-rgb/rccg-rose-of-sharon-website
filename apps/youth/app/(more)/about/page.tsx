import { Hero, Section, SectionTitle, Btn } from "@ros/shared/kit/ui";
import YouthTabs from "@/components/YouthTabs";
import { VALUES, TBA } from "@ros/shared/kit/youth";

export const metadata = { title: "About the Youth | RCCG Rose of Sharon" };

const DOES = [
  { icon: "⛪", title: "Youth Sunday", text: "Once a year the youth anchor the entire Sunday service." },
  { icon: "📖", title: "Teaching & discipleship", text: "Bible study, mentoring and leadership training for young people." },
  { icon: "🎉", title: "Fellowship", text: "Hangouts, sports and retreats that build lasting friendships." },
  { icon: "🌍", title: "Outreach", text: "Campus and community evangelism, and care for the needy." },
  { icon: "🎥", title: "Media & creative", text: "Telling the story through photos, video, design and music." },
  { icon: "🧭", title: "Leadership pipeline", text: "Departments and the executive council raise the next leaders." },
];

export default function YouthAbout() {
  return (
    <>
      <Hero pill="🔥 ABOUT THE YOUTH" title={<>About <span className="text-textRed">Us</span></>} subtitle="Young people led by young people — rooted in the Word and on mission." bg="/youth/hangout-2.jpg" />
      <Section>
        <YouthTabs />
        <div className="ros:grid ros:grid-cols-1 ros:gap-10 ros:md:grid-cols-2">
          <div className="ros:flex ros:flex-col ros:gap-4">
            <SectionTitle pill="👁️ OUR VISION" title={<>A generation that <span className="text-textRed">knows God</span></>} />
            <p className="ros:text-[#00000099]">To raise a generation of young people who love God, walk in purpose and carry His light into campuses, workplaces and cities.</p>
          </div>
          <div className="ros:flex ros:flex-col ros:gap-4">
            <SectionTitle pill="🎯 OUR MISSION" title={<>Enlist, disciple, <span className="text-textRed">redeploy</span></>} />
            <p className="ros:text-[#00000099]">To welcome every young person, disciple them in the Word, and release them to serve in the church and in the world — the same heartbeat as RCCG Rose of Sharon.</p>
          </div>
        </div>
      </Section>

      <Section className="ros:pt-0">
        <SectionTitle pill="🛠️ WHAT WE DO" title={<>Life in the <span className="text-textRed">youth church</span></>} />
        <div className="ros:mt-8 ros:grid ros:grid-cols-1 ros:gap-6 ros:sm:grid-cols-2 ros:lg:grid-cols-3">
          {DOES.map((d) => (
            <div key={d.title} className="ros:flex ros:flex-col ros:gap-3 ros:rounded-lg ros:border ros:border-[#00000014] ros:bg-[#FAFAFA8F] ros:p-6">
              <span className="ros:flex ros:size-12 ros:items-center ros:justify-center ros:rounded-full ros:bg-black ros:text-[22px]">{d.icon}</span>
              <h3 className="ros:text-lg ros:font-bold">{d.title}</h3>
              <p className="ros:text-[#00000099]">{d.text}</p>
            </div>
          ))}
        </div>
      </Section>

      <section className="ros:bg-black ros:px-4 ros:py-16">
        <div className="ros:mx-auto ros:max-w-6xl">
          <SectionTitle center dark pill="💡 CORE VALUES" title={<>What we <span className="text-textRed">stand for</span></>} />
          <div className="ros:mt-10 ros:grid ros:grid-cols-1 ros:gap-4 ros:sm:grid-cols-2 ros:lg:grid-cols-3">
            {VALUES.map((v) => (
              <div key={v.title} className="ros:flex ros:items-start ros:gap-4 ros:rounded-lg ros:border ros:border-[#FFFFFF2E] ros:p-5">
                <span className="ros:text-[26px]">{v.icon}</span>
                <div><h3 className="ros:font-bold ros:text-white">{v.title}</h3><p className="ros:text-sm ros:text-[#FFFFFFB2]">{v.text}</p></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Section>
        <SectionTitle pill="🕒 WHEN WE MEET" title={<>Come and <span className="text-textRed">join us</span></>} sub={`Youth fellowship day and time: ${TBA}. Youth Sunday date: ${TBA}.`} />
        <div className="ros:mt-6 ros:flex ros:flex-wrap ros:gap-3"><Btn href="/youth/events">See events</Btn><Btn href="/youth/join" variant="outline">Join us</Btn></div>
      </Section>
    </>
  );
}
