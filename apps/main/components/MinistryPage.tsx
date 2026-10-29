import Link from "@ros/shared/link";
import { Hero, Section, SectionTitle, Btn } from "@ros/shared/kit/ui";
import { WHATSAPP_GROUPS } from "@ros/shared/links";

/** One ministry of the church: hero, who they are, what they stand for, and how to get involved. */
export default function MinistryPage({
  pill,
  title,
  intro,
  image,
  imageAlt,
  imagePosition = "50% 50%",
  banner,
  bannerPosition,
  about,
  points,
  joinText,
  others,
  group,
}: {
  pill: string;
  title: React.ReactNode;
  intro: string;
  image: string;
  imageAlt: string;
  /** CSS object-position, to keep faces in view */
  imagePosition?: string;
  /** a separate picture for the top banner (defaults to `image`) */
  banner?: string;
  bannerPosition?: string;
  about: string;
  points: { title: string; text: string }[];
  joinText: string;
  others: { label: string; href: string }[];
  /** "men" or "women": shows join-the-WhatsApp-group buttons instead of the first-timer / other-ministries links */
  group?: "men" | "women";
}) {
  const wa = group ? WHATSAPP_GROUPS.find((g) => g.key === group) : undefined;
  // the group's invite link when it exists, otherwise its QR code on the Join Us page
  const waHref = wa ? wa.link || `/join#${wa.key}` : "";
  return (
    <>
      <Hero pill={pill} title={title} subtitle={intro} bg={banner ?? image} bgPosition={bannerPosition ?? imagePosition}>
        <div className="ros:mt-2 ros:flex ros:flex-wrap ros:justify-start ros:gap-3">
          <Btn href="/membership" variant="white">Become a member</Btn>
          {wa ? <Btn href={waHref} variant="outline-white">Join the {wa.key}&apos;s WhatsApp group</Btn> : <Btn href="/ministries" variant="outline-white">All ministries</Btn>}
        </div>
      </Hero>

      <Section>
        <div className="ros:grid ros:grid-cols-1 ros:items-center ros:gap-10 ros:md:grid-cols-2">
          <div className="ros:flex ros:flex-col ros:gap-4">
            <SectionTitle pill="🙌 ABOUT THE MINISTRY" title={<>Who <span className="text-textRed">we are</span></>} />
            <p className="ros:text-[#00000099]">{about}</p>
          </div>
          <img src={image} alt={imageAlt} loading="lazy" className="ros:h-[340px] ros:w-full ros:rounded-lg ros:object-cover" style={{ objectPosition: imagePosition }} />
        </div>
      </Section>

      <Section className="ros:pt-0">
        <SectionTitle pill="💡 OUR HEART" title={<>What we <span className="text-textRed">stand for</span></>} />
        <div className="ros:mt-8 ros:grid ros:grid-cols-1 ros:gap-6 ros:md:grid-cols-2">
          {points.map((p) => (
            <div key={p.title} className="ros:flex ros:flex-col ros:gap-2 ros:rounded-lg ros:border ros:border-[#00000014] ros:bg-[#FAFAFA8F] ros:p-6">
              <h3 className="ros:text-lg ros:font-bold">{p.title}</h3>
              <p className="ros:text-[#00000099]">{p.text}</p>
            </div>
          ))}
        </div>
      </Section>

      <section className="ros:bg-black ros:px-4 ros:py-16">
        <div className="ros:mx-auto ros:flex ros:max-w-3xl ros:flex-col ros:items-center ros:gap-5 ros:text-center">
          <SectionTitle center dark pill="🤝 GET INVOLVED" title={<>Come and <span className="text-textRed">join us</span></>} sub={joinText} />
          <div className="ros:flex ros:flex-wrap ros:justify-center ros:gap-3">
            <Btn href="/membership" variant="white">Become a member</Btn>
            {wa ? <Btn href={waHref} variant="outline-white">Join our WhatsApp group</Btn> : <Btn href="/first-timer" variant="outline-white">First-timer registration</Btn>}
          </div>
          {!wa && (
          <div className="ros:mt-4 ros:flex ros:flex-wrap ros:justify-center ros:gap-2">
              {others.map((o) => (
                <Link key={o.href} href={o.href} className="ros:rounded-full ros:border ros:border-[#FFFFFF44] ros:px-4 ros:py-2 ros:text-[11px] ros:font-bold ros:uppercase ros:tracking-[0.15em] ros:text-white ros:transition ros:hover:border-[#DF4E4E] ros:hover:text-[#DF4E4E]">{o.label}</Link>
              ))}
            </div>
            )}
        </div>
      </section>
    </>
  );
}
