import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Quick Links",
  description: "Everything you need to serve, grow, and stay informed.",
};

const quickLinks = [
  { href: "/discipleship", label: "Discipleship Experience" },
  { href: "/ccilegacyfellowsprogram", label: "Legacy Fellows Program" },
  { href: "/ccilegacyprojectspotlight", label: "Legacy Project Spotlight" },
  { href: "/celebrations", label: "Celebrations" },
  { href: "/feedback-survey", label: "Feedback Survey" },
  { href: "/first-timer", label: "First Timer" },
  { href: "/ftabj", label: "First Timer (Branch)" },
  { href: "/gpa", label: "Global Protocol Attendance" },
  { href: "/helpline-volunteers", label: "Helpline Volunteers" },
  { href: "/e-member", label: "Membership" },
  { href: "/membership-class/completed", label: "Membership Class (Completed)" },
  { href: "/membership-class/makeup", label: "Membership Class (Makeup)" },
  { href: "/membership-class/new", label: "Membership Class (New Enrolment)" },
  { href: "/newcampusvolunteers", label: "New Campus Volunteers" },
  { href: "/online-community", label: "Online Community" },
  { href: "/pfl", label: "PFL" },
  { href: "/post-marital-counselling", label: "Post Marital Counselling" },
  { href: "/requests/prayer", label: "Prayer Request" },
  { href: "/pre-marital-counselling", label: "Pre Marital Counselling" },
  { href: "/rbcuk", label: "Streaming Experience" },
  { href: "/st", label: "Second Timers" },
  { href: "/seniors-connect", label: "Seniors Connect" },
  { href: "/testimonies", label: "Testimony" },
  { href: "/welfare", label: "Welfare" },
  { href: "/yaf-feedback", label: "Young And Free Feedback" },
  // Rose of Sharon pages
  { href: "/new-believer", label: "New Believer" },
  { href: "/requests/counseling", label: "Counselling" },
  { href: "/requests/suggestion", label: "Suggestion" },
  { href: "/requests/baby-dedication", label: "Baby Dedication" },
  { href: "/requests/baby-christening", label: "Baby Christening" },
  { href: "/trainings", label: "Training Programs" },
  { href: "/events", label: "Events & Services" },
  { href: "/announcements", label: "Announcements" },
  { href: "/marketplace", label: "Marketplace" },
];

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
      <section className="p-2">
        <div className="container mx-auto max-w-[850px]">
          <ol className="my-5 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {quickLinks.map((link) => (
              <li key={link.href} className="mb-4 rounded-md border border-textRed/50 text-center">
                <Link
                  href={link.href}
                  prefetch={true}
                  className="block w-full p-3 hover:text-textRed hover:underline"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ol>
        </div>
      </section>
    </>
  );
}
