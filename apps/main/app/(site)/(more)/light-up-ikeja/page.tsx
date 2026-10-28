import Link from "@ros/shared/link";
import { Hero, Section, SectionTitle, Btn } from "@ros/shared/kit/ui";

export const metadata = {
  title: "Light Up Ikeja | RCCG Rose of Sharon",
  description: "Light Up Ikeja — Rose of Sharon's city-wide crusade and 30th anniversary celebration.",
};

const photos = [
  { src: "/gallery/light-up-ikeja/10.jpg", alt: "Worship at the Light Up Ikeja crusade ground" },
  { src: "/gallery/light-up-ikeja/09.jpg", alt: "Ministering on the Light Up Ikeja stage" },
  { src: "/gallery/light-up-ikeja/04.jpg", alt: "A worshipper with raised fists at the crusade" },
  { src: "/gallery/light-up-ikeja/05.jpg", alt: "Women worshipping together at the crusade" },
  { src: "/gallery/light-up-ikeja/16.jpg", alt: "The crowd at Light Up Ikeja" },
  { src: "/gallery/light-up-ikeja/13.jpg", alt: "Joy at Light Up Ikeja" },
];

const reasons = [
  { icon: "🔥", title: "Take the gospel to the city", text: "Light Up Ikeja takes worship, the word and prayer out of the auditorium and into the community." },
  { icon: "🎉", title: "Thirty years of grace", text: "It is part of Rose of Sharon's 30th anniversary celebration: thanking God for how far He has brought us." },
  { icon: "🙌", title: "Everyone is welcome", text: "Members, friends, neighbours and first-timers. Come, bring someone and be blessed." },
];

export default function LightUpIkejaPage() {
  return (
    <>
      <Hero
        pill="🔥 30TH ANNIVERSARY"
        title={<>Light Up <span className="text-textRed">Ikeja</span></>}
        subtitle="A city-wide crusade of worship, the word and prayer, and a highlight of Rose of Sharon's 30th anniversary celebration."
        bg="/gallery/light-up-ikeja/10.jpg"
      >
        <div className="ros:mt-2 ros:flex ros:flex-wrap ros:justify-center ros:gap-3">
          <Btn href="/events" variant="white">See the calendar</Btn>
          <Btn href="/first-timer" variant="outline-white">I am coming</Btn>
        </div>
      </Hero>

      <Section>
        <SectionTitle pill="🌍 ABOUT THE CRUSADE" title={<>Why we <span className="text-textRed">light up</span> Ikeja</>} />
        <div className="ros:mt-8 ros:grid ros:grid-cols-1 ros:gap-6 ros:md:grid-cols-3">
          {reasons.map((r) => (
            <div key={r.title} className="ros:flex ros:flex-col ros:gap-3 ros:rounded-lg ros:border ros:border-[#00000014] ros:bg-[#FAFAFA8F] ros:p-6">
              <span className="ros:flex ros:size-12 ros:items-center ros:justify-center ros:rounded-full ros:bg-black ros:text-[22px]">{r.icon}</span>
              <h3 className="ros:text-lg ros:font-bold">{r.title}</h3>
              <p className="ros:text-[#00000099]">{r.text}</p>
            </div>
          ))}
        </div>
      </Section>

      <section className="ros:bg-black ros:px-4 ros:py-16">
        <div className="ros:mx-auto ros:max-w-4xl ros:text-center">
          <SectionTitle center dark pill="📍 DATE & VENUE" title={<>Join us at the <span className="text-textRed">next one</span></>} sub="The date, time and venue of the next Light Up Ikeja will be announced here and on the calendar." />
          <div className="ros:mt-8 ros:grid ros:grid-cols-1 ros:gap-4 ros:md:grid-cols-3">
            {[{ k: "Date", v: "To be announced" }, { k: "Time", v: "To be announced" }, { k: "Venue", v: "To be announced" }].map((x) => (
              <div key={x.k} className="ros:rounded-lg ros:border ros:border-[#FFFFFF2E] ros:p-5">
                <p className="ros:text-[10px] ros:font-bold ros:uppercase ros:tracking-[0.2em] ros:text-[#FFFFFF99]">{x.k}</p>
                <p className="ros:mt-1 ros:font-bold ros:text-white">{x.v}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Section>
        <SectionTitle pill="📸 MOMENTS" title={<>From the <span className="text-textRed">crusade ground</span></>} sub="Pictures from Light Up Ikeja, November 22nd, 2025." />
        <div className="ros:mt-8 ros:grid ros:grid-cols-2 ros:gap-3 ros:md:grid-cols-3">
          {photos.map((p) => (
            <img key={p.src} src={p.src} alt={p.alt} loading="lazy" decoding="async" className="ros:aspect-[4/3] ros:w-full ros:rounded-lg ros:object-cover" />
          ))}
        </div>
        <div className="ros:mt-12">
          <SectionTitle pill="🗓️ LOOKING BACK" title={<>The <span className="text-textRed">2024</span> crusade</>} sub="Light Up Ikeja has grown year by year. Here are moments from 2024." />
          <div className="ros:mt-8 ros:grid ros:grid-cols-2 ros:gap-3 ros:md:grid-cols-4">
            {[{ n: "01", a: "The crowd at Light Up Ikeja 2024" }, { n: "03", a: "Worship on the Light Up Ikeja 2024 stage" }, { n: "04", a: "Volunteers at Light Up Ikeja 2024" }, { n: "06", a: "Light Up Ikeja 2024 attendees" }].map((x) => (
              <img key={x.n} src={`/gallery/light-up-ikeja-2024/${x.n}-thumb.jpg`} alt={x.a} loading="lazy" decoding="async" className="ros:aspect-[4/3] ros:w-full ros:rounded-lg ros:object-cover" />
            ))}
          </div>
        </div>
        <div className="ros:mt-8 ros:flex ros:flex-wrap ros:gap-3">
          <Link href="/gallery/light-up-ikeja" className="ros:rounded-full ros:border ros:border-black ros:px-5 ros:py-3 ros:text-[0.75rem] ros:font-extrabold ros:uppercase ros:tracking-[.25em] ros:transition ros:hover:bg-black ros:hover:text-white">See all the pictures</Link>
          <Link href="/give" className="ros:rounded-full ros:border ros:border-[#DF4E4E] ros:bg-[#DF4E4E] ros:px-5 ros:py-3 ros:text-[0.75rem] ros:font-extrabold ros:uppercase ros:tracking-[.25em] ros:text-white ros:transition ros:hover:border-black ros:hover:bg-white ros:hover:text-black">Support the work</Link>
        </div>
      </Section>
    </>
  );
}
