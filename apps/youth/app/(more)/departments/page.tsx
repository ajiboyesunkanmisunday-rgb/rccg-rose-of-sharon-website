import Link from "@ros/shared/link";
import { Hero, Section, SectionTitle, Btn } from "@ros/shared/kit/ui";
import YouthTabs from "@/components/YouthTabs";
import { DEPARTMENTS } from "@ros/shared/kit/youth";

export const metadata = { title: "Youth Departments | RCCG Rose of Sharon" };

export default function YouthDepartments() {
  return (
    <>
      <Hero pill="🧩 DEPARTMENTS" title={<>Youth <span className="text-textRed">Departments</span></>} subtitle="Every gift has a team. Find where you can serve." bg="/youth/hangout-3.jpg" />
      <Section>
        <YouthTabs />
        <SectionTitle pill="🗂️ ALL TEAMS" title={<>Pick a <span className="text-textRed">department</span></>} />
        <div className="ros:mt-8 ros:grid ros:grid-cols-1 ros:gap-6 ros:sm:grid-cols-2 ros:lg:grid-cols-3">
          {DEPARTMENTS.map((d) => (
            <Link key={d.slug} href={`/youth/departments/${d.slug}`} className="ros:group ros:flex ros:flex-col ros:gap-3 ros:rounded-lg ros:border ros:border-[#00000014] ros:bg-[#FAFAFA8F] ros:p-6 ros:transition ros:hover:border-[#DF4E4E]">
              <span className="ros:flex ros:size-12 ros:items-center ros:justify-center ros:rounded-full ros:bg-black ros:text-[22px]">{d.icon}</span>
              <h3 className="ros:text-lg ros:font-bold ros:group-hover:underline">{d.name}</h3>
              <p className="ros:text-[#00000099]">{d.short}</p>
              <span className="ros:mt-auto ros:text-[10px] ros:font-extrabold ros:uppercase ros:tracking-[0.2em] ros:text-[#DF4E4E]">Open →</span>
            </Link>
          ))}
        </div>
        <div className="ros:mt-10"><Btn href="/youth/join">Join a department</Btn></div>
      </Section>
    </>
  );
}
