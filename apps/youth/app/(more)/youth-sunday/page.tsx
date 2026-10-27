import { Hero, Section, SectionTitle, Btn } from "@ros/shared/kit/ui";
import YouthTabs from "@/components/YouthTabs";
import { TBA } from "@ros/shared/kit/youth";

export const metadata = { title: "Youth Sunday | RCCG Rose of Sharon" };

const FLOW = [
  { t: "Praise & worship", d: "Led by the youth choir and instrumentalists." },
  { t: "Welcome & anchors", d: "The youth president and vice presidents open the service." },
  { t: "Creative moments", d: "Drama, dance, spoken word and testimonies." },
  { t: "The word", d: "A message to a generation, often by a youth minister." },
  { t: "Ministration & prayer", d: "Altar call, prayer and impartation." },
  { t: "Fellowship", d: "Photos, refreshments and meeting new friends." },
];
const ROLES = [
  { t: "President & vice presidents", d: "Anchor and run the service from the pulpit." },
  { t: "Media", d: "Cameras, livestream, screens and photos." },
  { t: "Protocol & ushering", d: "Welcome, seating and special-guest care." },
  { t: "Choir & music", d: "Worship and special numbers." },
  { t: "Drama & creative arts", d: "Skits, dance and poetry." },
  { t: "Technical", d: "Sound, lights and stage." },
];

export default function YouthSunday() {
  return (
    <>
      <Hero pill="⛪ YOUTH SUNDAY" title={<>Youth <span className="text-textRed">Sunday</span></>} subtitle="The one Sunday the youth anchor the whole service — from the opening song to the final prayer." bg="/youth/hangout-5.jpg">
        <div className="ros:mt-2 ros:flex ros:flex-wrap ros:justify-center ros:gap-3"><Btn href="/youth/events" variant="white">See the date</Btn><Btn href="/youth/join" variant="outline-white">Serve with us</Btn></div>
      </Hero>
      <Section>
        <YouthTabs />
        <div className="ros:grid ros:grid-cols-1 ros:gap-10 ros:md:grid-cols-2">
          <div className="ros:flex ros:flex-col ros:gap-4">
            <SectionTitle pill="📘 WHAT IT IS" title={<>The youth take the <span className="text-textRed">lead</span></>} />
            <p className="ros:text-[#00000099]">Youth Sunday is when the youth fellowship leads the entire Sunday service. The president and vice presidents anchor the program, every department has a role, and young people hear and share the word together with the whole church.</p>
            <p className="ros:text-sm"><span className="ros:font-bold">Next Youth Sunday: </span><span className="ros:text-[#00000099]">{TBA}</span></p>
          </div>
          <ol className="ros:flex ros:flex-col ros:gap-3">
            {FLOW.map((f, i) => (
              <li key={f.t} className="ros:flex ros:items-start ros:gap-4 ros:rounded-lg ros:border ros:border-[#00000014] ros:bg-[#FAFAFA8F] ros:px-5 ros:py-4">
                <span className="ros:flex ros:size-8 ros:flex-shrink-0 ros:items-center ros:justify-center ros:rounded-full ros:bg-black ros:text-sm ros:font-bold ros:text-white">{i + 1}</span>
                <span><span className="ros:block ros:font-bold">{f.t}</span><span className="ros:text-sm ros:text-[#00000099]">{f.d}</span></span>
              </li>
            ))}
          </ol>
        </div>
      </Section>
      <section className="ros:bg-black ros:px-4 ros:py-16">
        <div className="ros:mx-auto ros:max-w-6xl">
          <SectionTitle dark pill="🧩 WHO MAKES IT HAPPEN" title={<>Every department <span className="text-textRed">plays a part</span></>} />
          <div className="ros:mt-10 ros:grid ros:grid-cols-1 ros:gap-4 ros:sm:grid-cols-2 ros:lg:grid-cols-3">
            {ROLES.map((r) => (
              <div key={r.t} className="ros:rounded-lg ros:border ros:border-[#FFFFFF2E] ros:p-5"><h3 className="ros:font-bold ros:text-white">{r.t}</h3><p className="ros:text-sm ros:text-[#FFFFFFB2]">{r.d}</p></div>
            ))}
          </div>
          <div className="ros:mt-8"><Btn href="/youth/departments" variant="outline-white">Browse departments</Btn></div>
        </div>
      </section>
    </>
  );
}
