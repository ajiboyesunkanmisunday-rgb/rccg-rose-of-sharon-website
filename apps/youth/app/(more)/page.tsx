import Link from "@ros/shared/link";
import { Hero, Section, SectionTitle, Btn } from "@ros/shared/kit/ui";
import YouthTabs from "@/components/YouthTabs";
import YouthSocials from "@/components/YouthSocials";
import { DEPARTMENTS, PHOTOS, PRESIDENT, YOUTH_PAGES, VALUES } from "@ros/shared/kit/youth";

export const metadata = { title: "Youth | RCCG Rose of Sharon", description: "The Rose of Sharon youth church — leadership, departments, Youth Sunday, events and how to join." };

export default function YouthHome() {
  const cards = YOUTH_PAGES.filter((p) => p.key !== "overview" && p.key !== "connect");
  return (
    <>
      <Hero pill="🔥 RCCG ROSE OF SHARON · YOUTH" title={<>The <span className="text-textRed">Youth</span> Church</>} subtitle="A church of its own within the church — young people led by young people, rooted in the Word and on mission." bg="/youth/hangout-1.jpg">
        <div className="ros:mt-2 ros:flex ros:flex-wrap ros:justify-center ros:gap-3">
          <Btn href="/youth/join" variant="white">Join the youth</Btn>
          <Btn href="/youth/departments" variant="outline-white">Serve in a department</Btn>
        </div>
      </Hero>

      <Section>
        <YouthTabs />
        <div className="ros:grid ros:grid-cols-1 ros:items-center ros:gap-10 ros:md:grid-cols-2">
          <div className="ros:flex ros:flex-col ros:gap-4">
            <SectionTitle pill="🌍 WHO WE ARE" title={<>A church <span className="text-textRed">within</span> the church</>} />
            <p className="ros:text-[#00000099]">The Rose of Sharon youth church has its own president, two vice presidents and a full executive council. It runs its own departments — media, protocol, choir, ushering and more — and anchors its own Youth Sunday every year.</p>
            <p className="ros:text-[#00000099]">It is where young people find friends, grow in the Word, discover their gifts and learn to lead.</p>
            <div className="ros:mt-2 ros:flex ros:flex-wrap ros:gap-3">
              <Btn href="/youth/about" variant="outline">About us</Btn>
              <Btn href="/youth/leadership" variant="outline">Meet the leaders</Btn>
            </div>
          </div>
          <img loading="lazy" decoding="async" src="/youth/hangout-3.jpg" alt="The Rose of Sharon youth at Youth Hangout 2026" className="ros:h-[360px] ros:w-full ros:rounded-lg ros:object-cover ros:object-center" />
        </div>
      </Section>

      <Section className="ros:pt-0">
        <SectionTitle pill="🗂️ EXPLORE" title={<>Everything about the <span className="text-textRed">youth</span></>} sub="Each part of the youth church has its own page." />
        <div className="ros:mt-8 ros:grid ros:grid-cols-1 ros:gap-6 ros:sm:grid-cols-2 ros:lg:grid-cols-3">
          {cards.map((pg) => (
            <Link key={pg.key} href={pg.href} className="ros:group ros:flex ros:flex-col ros:gap-3 ros:rounded-lg ros:border ros:border-[#00000014] ros:bg-[#FAFAFA8F] ros:p-6 ros:transition ros:hover:border-[#DF4E4E]">
              <span className="ros:flex ros:size-12 ros:items-center ros:justify-center ros:rounded-full ros:bg-black ros:text-[22px]">{pg.icon}</span>
              <h3 className="ros:text-lg ros:font-bold ros:group-hover:underline">{pg.label}</h3>
              <p className="ros:text-[#00000099]">{pg.text}</p>
              <span className="ros:mt-auto ros:text-[10px] ros:font-extrabold ros:uppercase ros:tracking-[0.2em] ros:text-[#DF4E4E]">Open →</span>
            </Link>
          ))}
        </div>
      </Section>

      <section className="ros:bg-black ros:px-4 ros:py-16 ros:md:py-20">
        <div className="ros:mx-auto ros:grid ros:max-w-6xl ros:grid-cols-1 ros:items-center ros:gap-10 ros:md:grid-cols-[360px_1fr]">
          <img loading="lazy" decoding="async" src={PRESIDENT.image} alt="The Youth President" className="ros:h-[460px] ros:w-full ros:rounded-lg ros:object-cover ros:object-top" />
          <div className="ros:flex ros:flex-col ros:gap-4">
            <SectionTitle dark pill="👤 YOUTH PRESIDENT" title={<>Led by <span className="text-textRed">our president</span></>} />
            <p className="ros:text-[#FFFFFFB2]">{PRESIDENT.note}</p>
            <p className="ros:text-sm ros:font-bold ros:uppercase ros:tracking-[0.2em] ros:text-[#FFFFFF99]">{PRESIDENT.name}</p>
            <div className="ros:mt-2"><Btn href="/youth/leadership" variant="outline-white">Full leadership team</Btn></div>
          </div>
        </div>
      </section>

      <Section>
        <SectionTitle pill="🧩 DEPARTMENTS" title={<>Find your <span className="text-textRed">place</span> to serve</>} sub="Every gift has a team." />
        <div className="no-scrollbar ros:mt-8 ros:flex ros:gap-3 ros:overflow-x-auto ros:pb-2">
          {DEPARTMENTS.map((d) => (
            <Link key={d.slug} href={`/youth/departments/${d.slug}`} className="ros:flex ros:min-w-[180px] ros:flex-col ros:items-center ros:gap-2 ros:rounded-lg ros:border ros:border-[#00000014] ros:bg-[#FAFAFA8F] ros:px-4 ros:py-6 ros:text-center ros:transition ros:hover:border-[#DF4E4E]">
              <span className="ros:text-[28px]">{d.icon}</span>
              <span className="ros:text-sm ros:font-bold">{d.name}</span>
            </Link>
          ))}
        </div>
      </Section>

      <Section className="ros:pt-0">
        <SectionTitle pill="📸 MOMENTS" title={<>Youth <span className="text-textRed">Hangout</span> 2026</>} />
        <div className="ros:mt-8 ros:grid ros:grid-cols-2 ros:gap-3 ros:md:grid-cols-4">
          {PHOTOS.slice(0, 4).map((p) => <img loading="lazy" decoding="async" key={p.src} src={p.src} alt={p.alt} className="ros:h-[180px] ros:w-full ros:rounded-lg ros:object-cover ros:md:h-[220px]" />)}
        </div>
        <div className="ros:mt-6"><Btn href="/youth/gallery" variant="outline">View the gallery</Btn></div>
      </Section>

      <section className="ros:bg-[#FAFAFA8F] ros:px-4 ros:py-16">
        <div className="ros:mx-auto ros:max-w-7xl">
          <SectionTitle center pill="💡 WHAT WE STAND FOR" title={<>Our <span className="text-textRed">values</span></>} />
          <div className="ros:mt-10 ros:grid ros:grid-cols-2 ros:gap-4 ros:md:grid-cols-3 ros:lg:grid-cols-6">
            {VALUES.map((v) => (
              <div key={v.title} className="ros:flex ros:flex-col ros:items-center ros:gap-2 ros:rounded-lg ros:border ros:border-[#00000014] ros:bg-white ros:p-5 ros:text-center">
                <span className="ros:text-[26px]">{v.icon}</span>
                <h3 className="ros:font-bold">{v.title}</h3>
                <p className="ros:text-xs ros:text-[#00000099]">{v.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Section>
        <SectionTitle pill="📱 STAY CONNECTED" title={<>Follow the <span className="text-textRed">youth</span> online</>} />
        <div className="ros:mt-8"><YouthSocials /></div>
      </Section>
    </>
  );
}
