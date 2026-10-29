import { Hero, Section, SectionTitle, Btn } from "@ros/shared/kit/ui";
import YouthTabs from "@/components/YouthTabs";
import { DEPARTMENT_HEADS, EXECUTIVES, PRESIDENT, SPECIAL_ADVISERS, VICE_PRESIDENTS } from "@ros/shared/kit/youth";

export const metadata = { title: "Youth Leadership | RCCG Rose of Sharon" };

export default function YouthLeadership() {
  return (
    <>
      <Hero pill="👥 LEADERSHIP" title={<>Youth <span className="text-textRed">Leadership</span></>} subtitle="The executives leading the Young Leaders and Professionals Fellowship." bg="/youth/leaders.jpg" bgPosition="50% 45%" />
      <Section>
        <YouthTabs />
        <div className="ros:grid ros:grid-cols-1 ros:items-center ros:gap-10 ros:md:grid-cols-[360px_1fr]">
          <img loading="lazy" decoding="async" src={PRESIDENT.image} alt="The Youth President" className="ros:h-[480px] ros:w-full ros:rounded-lg ros:object-cover ros:object-top" />
          <div className="ros:flex ros:flex-col ros:gap-4">
            <SectionTitle pill="👤 THE PRESIDENT" title={<>The <span className="text-textRed">President</span></>} />
            <p className="ros:text-sm ros:font-bold ros:uppercase ros:tracking-[0.2em] ros:text-[#00000099]">{PRESIDENT.name}</p>
            <p className="ros:text-[#00000099]">{PRESIDENT.role}</p>
          </div>
        </div>
      </Section>

      <Section className="ros:pt-0">
        <SectionTitle pill="🤝 VICE PRESIDENTS" title={<>Two vice <span className="text-textRed">presidents</span></>}  />
        <div className="ros:mt-8 ros:grid ros:grid-cols-1 ros:gap-6 ros:md:grid-cols-2">
          {VICE_PRESIDENTS.map((l) => (
            <div key={l.role} className="ros:flex ros:flex-col ros:gap-3 ros:rounded-lg ros:border ros:border-[#00000014] ros:bg-[#FAFAFA8F] ros:p-6">
              <span className="ros:flex ros:size-14 ros:items-center ros:justify-center ros:rounded-full ros:bg-black ros:text-xl ros:font-bold ros:text-white">VP</span>
              <h3 className="ros:text-lg ros:font-bold">{l.role}</h3>
              <p className="ros:text-sm ros:font-semibold ros:text-[#00000099]">{l.name}</p>
            </div>
          ))}
        </div>
      </Section>

      <section className="ros:bg-black ros:px-4 ros:py-16">
        <div className="ros:mx-auto ros:flex ros:max-w-7xl ros:flex-col ros:gap-14">
          {[
            { pill: "📋 EXECUTIVES", title: <>The <span className="text-textRed">executives</span></>, list: EXECUTIVES },
            { pill: "🧩 DEPARTMENT HEADS", title: <>Heads of <span className="text-textRed">departments</span></>, list: DEPARTMENT_HEADS },
            { pill: "🧭 ADVISERS", title: <>Special <span className="text-textRed">advisers</span></>, list: SPECIAL_ADVISERS },
          ].map((g) => (
            <div key={g.pill}>
              <SectionTitle dark pill={g.pill} title={g.title} />
              <div className="ros:mt-8 ros:grid ros:grid-cols-1 ros:gap-4 ros:sm:grid-cols-2 ros:lg:grid-cols-3">
                {g.list.map((l) => (
                  <div key={l.role + l.name} className="ros:flex ros:flex-col ros:gap-2 ros:rounded-lg ros:border ros:border-[#FFFFFF2E] ros:p-5">
                    <h3 className="ros:font-bold ros:text-white">{l.role}</h3>
                    <p className="ros:text-xs ros:font-semibold ros:uppercase ros:tracking-[0.15em] ros:text-[#FFFFFF99]">{l.name}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <Section>
        <div><Btn href="/youth/departments">See the departments</Btn></div>
      </Section>
    </>
  );
}
