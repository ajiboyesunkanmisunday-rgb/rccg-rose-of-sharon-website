import Link from "next/link";
import { notFound } from "next/navigation";
import { Hero, Section, SectionTitle, Btn } from "../../../_kit/ui";
import YouthTabs from "../../../_kit/YouthTabs";
import { DEPARTMENTS, TBA, getDepartment } from "../../../_kit/youth";

export function generateStaticParams() { return DEPARTMENTS.map((d) => ({ slug: d.slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const d = getDepartment((await params).slug);
  return { title: d ? `${d.name} | Youth | RCCG Rose of Sharon` : "Youth" };
}

export default async function DepartmentPage({ params }: { params: Promise<{ slug: string }> }) {
  const d = getDepartment((await params).slug);
  if (!d) notFound();
  const others = DEPARTMENTS.filter((x) => x.slug !== d.slug);
  return (
    <>
      <Hero pill={`${d.icon} YOUTH DEPARTMENT`} title={<>{d.name.split(" ")[0]} <span className="text-textRed">{d.name.split(" ").slice(1).join(" ") || "Team"}</span></>} subtitle={d.short} bg="/youth/hangout-1.jpg">
        <div className="ros:mt-2"><Btn href="/youth/join" variant="white">Join this team</Btn></div>
      </Hero>
      <Section>
        <YouthTabs />
        <div className="ros:grid ros:grid-cols-1 ros:gap-10 ros:md:grid-cols-2">
          <div className="ros:flex ros:flex-col ros:gap-4">
            <SectionTitle pill="📘 ABOUT THE TEAM" title={<>What <span className="text-textRed">{d.name}</span> does</>} />
            <p className="ros:text-[#00000099]">{d.about}</p>
            <dl className="ros:mt-2 ros:grid ros:gap-3 ros:text-sm">
              <div><dt className="ros:font-bold">Department head</dt><dd className="ros:text-[#00000099]">{TBA}</dd></div>
              <div><dt className="ros:font-bold">Helpful skills</dt><dd className="ros:text-[#00000099]">{d.skills}</dd></div>
              <div><dt className="ros:font-bold">When the team meets</dt><dd className="ros:text-[#00000099]">{d.meets}</dd></div>
            </dl>
          </div>
          <ul className="ros:flex ros:flex-col ros:gap-3 ros:self-center">
            {d.does.map((x) => (
              <li key={x} className="ros:flex ros:items-center ros:gap-3 ros:rounded-lg ros:border ros:border-[#00000014] ros:bg-[#FAFAFA8F] ros:px-5 ros:py-4">
                <span className="ros:size-[8px] ros:flex-shrink-0 ros:rounded-full ros:bg-[#DF4E4E]" />
                <span className="ros:font-medium">{x}</span>
              </li>
            ))}
          </ul>
        </div>
      </Section>
      <Section className="ros:pt-0">
        <SectionTitle pill="🧩 OTHER TEAMS" title={<>More <span className="text-textRed">departments</span></>} />
        <div className="ros:mt-6 ros:flex ros:flex-wrap ros:gap-2">
          {others.map((o) => (
            <Link key={o.slug} href={`/youth/departments/${o.slug}`} className="ros:rounded-full ros:border ros:border-[#00000029] ros:bg-white ros:px-4 ros:py-2 ros:text-[11px] ros:font-bold ros:uppercase ros:tracking-[0.15em] ros:transition ros:hover:border-[#DF4E4E] ros:hover:text-[#DF4E4E]">{o.name}</Link>
          ))}
        </div>
      </Section>
    </>
  );
}
