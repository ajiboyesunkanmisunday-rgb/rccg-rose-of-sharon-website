import Link from "@ros/shared/link";
import { Hero, Section, SectionTitle } from "@ros/shared/kit/ui";
import CelebrationForm from "@/components/CelebrationForm";

export const metadata = { title: "Celebrations | RCCG Rose of Sharon" };

const options = [
  { image: "/home/baby-dedication.jpg", pos: "50% 30%", title: "Baby Dedication", text: "Present your child to the Lord before the church family. Choose a Sunday at least two weeks from today.", href: "/requests/baby-dedication", cta: "Request a dedication" },
  { image: "/home/baby-christening.jpg", pos: "50% 20%", title: "Baby Christening / Naming Ceremony", text: "Celebrate the name of your child. Choose a day at least three days from today.", href: "/requests/baby-christening", cta: "Request a naming ceremony" },
  { image: "/home/special-day.jpg", pos: "50% 25%", title: "Your Special Day", text: "Birthdays, wedding thanksgiving and other milestones. Wedding thanksgiving: choose a Sunday at least two weeks from today.", href: "#request", cta: "Fill the request below" },
];

export default function CelebrationsPage() {
  return (
    <>
      <Hero
        pill="🎉 CELEBRATIONS"
        title={<>Celebrate life&apos;s special <span className="text-textRed">moments</span></>}
        subtitle="We are just as excited as you are about your happy day."
        bg="/home/celebrations-banner.jpg"
        bgPosition="50% 35%"
      />
      <Section>
        <SectionTitle pill="📅 CHOOSE A CELEBRATION" title={<>What are you <span className="text-textRed">celebrating</span>?</>} sub="Pick the one that fits and fill in the short form. Our team will confirm your date." />
        <div className="ros:mt-8 ros:grid ros:grid-cols-1 ros:gap-6 ros:md:grid-cols-3">
          {options.map((o) => (
            <Link key={o.title} href={o.href} className="ros:group ros:flex ros:flex-col ros:overflow-hidden ros:rounded-lg ros:border ros:border-[#00000014] ros:bg-[#FAFAFA8F] ros:transition ros:hover:border-[#DF4E4E]">
              <div className="ros:h-[220px] ros:w-full ros:overflow-hidden ros:bg-[#F4F4F4]">
                <img src={o.image} alt={o.title} loading="lazy" decoding="async" className="ros:h-full ros:w-full ros:object-cover ros:transition ros:duration-500 ros:group-hover:scale-[1.04]" style={{ objectPosition: o.pos }} />
              </div>
              <div className="ros:flex ros:flex-1 ros:flex-col ros:gap-3 ros:p-6">
                <h3 className="ros:text-lg ros:font-bold ros:group-hover:underline">{o.title}</h3>
                <p className="ros:text-[#00000099]">{o.text}</p>
                <span className="ros:mt-auto ros:text-[10px] ros:font-extrabold ros:uppercase ros:tracking-[0.2em] ros:text-[#DF4E4E]">{o.cta} →</span>
              </div>
            </Link>
          ))}
        </div>
      </Section>
      <CelebrationForm />
    </>
  );
}
