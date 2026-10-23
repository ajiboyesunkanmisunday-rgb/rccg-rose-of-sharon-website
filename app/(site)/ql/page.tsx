import type { Metadata } from "next";
import Link from "next/link";
import { PROGRAMS, programPages } from "@/app/(site)/(more)/_kit/programs";
import { YOUTH_PAGES, DEPARTMENTS } from "@/app/(site)/(more)/_kit/youth";

export const metadata: Metadata = {
  title: "Rose of Sharon Quick-Links",
  description: "Everything you need to serve, grow, and stay informed.",
};

const quickLinks = [
  { href: "/discipleship", label: "ROS Discipleship Experience" },
  { href: "/ccilegacyfellowsprogram", label: "ROS Legacy Fellows Program" },
  { href: "/ccilegacyprojectspotlight", label: "ROS Legacy Project Spotlight" },
  { href: "/celebrations", label: "Celebrations" },
  { href: "/feedback-survey", label: "Feedback Survey" },
  { href: "/ft", label: "first timer" },
  { href: "/ftabj", label: "first timer (branch)" },
  { href: "/gpa", label: "Global Protocol Attendance" },
  { href: "/helpline-volunteers", label: "Helpline Volunteers" },
  { href: "/membership", label: "Membership" },
  { href: "/membership-class/completed", label: "Membership Class (Completed)" },
  { href: "/membership-class/makeup", label: "Membership Class (Makeup)" },
  { href: "/membership-class/new", label: "Membership Class (New Enrolment)" },
  { href: "/newcampusvolunteers", label: "New Campus Volunteers" },
  { href: "/online-community", label: "Online Community" },
  { href: "/pfl", label: "PFL" },
  { href: "/post-marital-counselling", label: "Post Marital Counselling" },
  { href: "/prayer-request", label: "Prayer Request" },
  { href: "/pre-marital-counselling", label: "Pre Marital Counselling" },
  { href: "/rbcuk", label: "Streaming experience" },
  { href: "/st", label: "Second Timers" },
  { href: "/seniors-connect", label: "Seniors Connect" },
  { href: "/testimony", label: "Testimony" },
  { href: "/welfare", label: "Welfare" },
  { href: "/yaf-feedback", label: "Young And Free Feedback" },
];

// Additional Rose of Sharon pages, grouped by topic.
const groups: { title: string; sections: { heading?: string; links: { href: string; label: string }[] }[] }[] = [
  {
    title: "Training Programs",
    sections: [
      { links: [{ href: "/trainings", label: "All Training Programs" }] },
      ...PROGRAMS.map((p) => ({
        heading: p.name,
        links: programPages(p).map((pg) => ({ href: pg.href, label: pg.label })),
      })),
    ],
  },
  {
    title: "Youth",
    sections: [
      { links: YOUTH_PAGES.map((pg) => ({ href: pg.href, label: pg.label === "Overview" ? "Youth Church" : pg.label })) },
      { heading: "Youth departments", links: DEPARTMENTS.map((d) => ({ href: `/youth/departments/${d.slug}`, label: d.name })) },
    ],
  },
  {
    title: "Join & Grow",
    sections: [
      {
        links: [
          { href: "/first-timer", label: "First-Timer Registration" },
          { href: "/e-member", label: "E-Member Registration" },
          { href: "/new-believer", label: "New Believer" },
        ],
      },
    ],
  },
  {
    title: "Requests & Care",
    sections: [
      {
        links: [
          { href: "/requests/prayer", label: "Prayer Request (Online)" },
          { href: "/requests/counseling", label: "Counselling Request" },
          { href: "/requests/suggestion", label: "Suggestion" },
        ],
      },
    ],
  },
  {
    title: "Celebrations & Family",
    sections: [
      {
        links: [
          { href: "/requests/baby-dedication", label: "Baby Dedication" },
          { href: "/requests/baby-christening", label: "Baby Christening" },
          { href: "/special-day", label: "Send Us Your Special Day" },
        ],
      },
    ],
  },
  {
    title: "Church Life",
    sections: [
      {
        links: [
          { href: "/groups", label: "Church Groups" },
          { href: "/events", label: "Events & Services" },
          { href: "/media", label: "Sermons & Media" },
          { href: "/announcements", label: "Announcements" },
          { href: "/testimonies", label: "Testimonies (Online)" },
          { href: "/gallery", label: "Gallery" },
          { href: "/csr", label: "CSR Program" },
          { href: "/marketplace", label: "Marketplace" },
        ],
      },
    ],
  },
];

// Wrapping, centred rows: a box left alone on the last row sits in the middle instead of hanging on the left.
const listStyle: React.CSSProperties = { display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 16 };
const itemStyle: React.CSSProperties = { flex: "0 0 calc((100% - 32px) / 3)", minWidth: 230 };

export default function QLPage() {
  return (
    <>
      <section>
        <div className="flex items-center justify-center p-8">
          <div className="mx-4 flex w-full max-w-2xl flex-col items-center gap-6">
            <h1 className="my-3 max-w-[900px] px-4 text-center font-anton text-[3rem] font-medium uppercase text-black md:px-0 md:text-7xl md:leading-[1.2]">
              Welcome to <br />
              <span className="text-textRed"> Rose of Sharon</span>
            </h1>
            <h3 className="rounded-full bg-[#F4F4F4] p-2 text-center text-[10px] font-bold uppercase tracking-[0.24rem] text-[#00000099]">
              🌍 <span className="ml-0.5">Quick-links</span>
            </h3>
          </div>
        </div>
      </section>
      <section className="p-2 mb-8">
        <div className="container mx-auto max-w-[850px]">
          <ol className="my-5" style={listStyle}>
            {quickLinks.map((link) => (
              <li key={link.href} className="mb-4 rounded-md border border-cciRed-500 text-center" style={itemStyle}>
                <Link
                  href={link.href}
                  prefetch={true}
                  className="bg-red block w-full p-3 hover:text-cci-red hover:underline"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ol>

          {groups.map((g) => (
            <div key={g.title} className="mb-6">
              <h2 className="mb-2 mt-10 text-center font-anton text-2xl uppercase text-black">{g.title}</h2>
              {g.sections.map((sec, i) => (
                <div key={sec.heading ?? i}>
                  {sec.heading && (
                    <h3 className="mt-6 text-center text-xs font-bold uppercase" style={{ color: "#00000099", letterSpacing: "0.2em" }}>
                      {sec.heading}
                    </h3>
                  )}
                  <ol className="my-5" style={listStyle}>
                    {sec.links.map((link) => (
                      <li key={link.href + link.label} className="mb-4 rounded-md border border-cciRed-500 text-center" style={itemStyle}>
                        <Link href={link.href} prefetch={true} className="bg-red block w-full p-3 hover:text-cci-red hover:underline">
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ol>
                </div>
              ))}
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
