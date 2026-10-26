import { Hero, Section, SectionTitle, Btn } from "@ros/shared/kit/ui";
import YouthTabs from "@/components/YouthTabs";
import YouthSocials from "@/components/YouthSocials";

export const metadata = { title: "Connect with the Youth | RCCG Rose of Sharon" };

export default function YouthConnect() {
  return (
    <>
      <Hero pill="📱 CONNECT" title={<>Follow the <span className="text-textRed">Youth</span></>} subtitle="Stay in the loop — events, flyers, reels and updates from the youth church." bg="/youth/hangout-2.jpg" />
      <Section>
        <YouthTabs />
        <SectionTitle pill="🔗 OUR PAGES" title={<>Find us <span className="text-textRed">online</span></>} />
        <div className="ros:mt-8"><YouthSocials /></div>
      </Section>
      <section className="ros:bg-black ros:px-4 ros:py-16">
        <div className="ros:mx-auto ros:flex ros:max-w-3xl ros:flex-col ros:items-center ros:gap-5 ros:text-center">
          <SectionTitle center dark pill="🤝 NEW HERE?" title={<>Come and <span className="text-textRed">join us</span></>} sub="Tell us you are coming and we will welcome you." />
          <div className="ros:flex ros:flex-wrap ros:justify-center ros:gap-3"><Btn href="/youth/join" variant="white">Join the youth</Btn><Btn href="/first-timer" variant="outline-white">First-timer registration</Btn></div>
        </div>
      </section>
    </>
  );
}
