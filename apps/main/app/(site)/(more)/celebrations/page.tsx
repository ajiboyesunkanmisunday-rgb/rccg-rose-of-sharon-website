import Link from "@ros/shared/link";
import { Hero, Section, SectionTitle } from "@ros/shared/kit/ui";

export const metadata = { title: "Celebrations | RCCG Rose of Sharon" };

const options = [
  { icon: "👶", title: "Baby Dedication", text: "Present your child to the Lord before the church family. Choose a Sunday at least two weeks from today.", href: "/requests/baby-dedication", cta: "Request a dedication" },
  { icon: "🍼", title: "Baby Christening / Naming Ceremony", text: "Celebrate the name of your child. Choose a day at least three days from today.", href: "/requests/baby-christening", cta: "Request a naming ceremony" },
  { icon: "🎉", title: "Your Special Day", text: "Birthdays, wedding thanksgiving and other milestones. Wedding thanksgiving: choose a Sunday at least two weeks from today.", href: "/special-day", cta: "Tell us your special day" },
];

export default function CelebrationsPage() {
  return (
    <>
      <Hero
        pill="🎉 CELEBRATIONS"
        title={<>Celebrate life&apos;s special <span className="text-textRed">moments</span></>}
        subtitle="We are just as excited as you are about your happy day."
        bg="/home/celebrations-hero.jpg"
        bgPosition="50% 28%"
      />
      <Section>
        <SectionTitle pill="📅 CHOOSE A CELEBRATION" title={<>What are you <span className="text-textRed">celebrating</span>?</>} sub="Pick the one that fits and fill in the short form. Our team will confirm your date." />
        <div className="ros:mt-8 ros:grid ros:grid-cols-1 ros:gap-6 ros:md:grid-cols-3">
          {options.map((o) => (
            <Link key={o.title} href={o.href} className="ros:group ros:flex ros:flex-col ros:gap-3 ros:rounded-lg ros:border ros:border-[#00000014] ros:bg-[#FAFAFA8F] ros:p-6 ros:transition ros:hover:border-[#DF4E4E]">
              <span className="ros:flex ros:size-12 ros:items-center ros:justify-center ros:rounded-full ros:bg-black ros:text-[22px]">{o.icon}</span>
              <h3 className="ros:text-lg ros:font-bold ros:group-hover:underline">{o.title}</h3>
              <p className="ros:text-[#00000099]">{o.text}</p>
              <span className="ros:mt-auto ros:text-[10px] ros:font-extrabold ros:uppercase ros:tracking-[0.2em] ros:text-[#DF4E4E]">{o.cta} →</span>
            </Link>
          ))}
        </div>
      </Section>
    </>
  );
}
