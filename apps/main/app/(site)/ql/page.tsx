import type { Metadata } from "next";
import Link from "@ros/shared/link";
import { CHURCH_LINKS } from "@ros/shared/links";

export const metadata: Metadata = {
  title: "Rose of Sharon Quick-Links",
  description: "Everything you need to serve, grow, and stay informed.",
};

// The quick links, in the order the church asked for. Links to the youth, training and media sites are
// written as ordinary paths; the shared Link component sends them to the right site.
const quickLinks = [
  { href: "/membership", label: "Become a Member" },
  { href: "/testimonies", label: "Testimonies" },
  { href: "/celebrations", label: "Celebrations" },
  { href: "/requests/prayer", label: "Prayer Request" },
  { href: "/csr#register", label: "Register for CSR" },
  { href: "/ministries/kids-and-teens", label: "Children Church" },
  { href: "/buildingproject", label: "ROS Project 2" },
  { href: "/events", label: "Calendar" },
  { href: "/events", label: "Upcoming Events" },
  { href: "/ministries/hearts-of-david", label: "Hearts of David" },
  { href: "/ministries/choir", label: "Rose of Sharon Choir" },
  { href: "/ministries/kids-and-teens", label: "Oaks of Righteousness" },
  { href: "/youth", label: "Young Leaders and Professionals" },
  { href: CHURCH_LINKS.whatsapp || "#", label: "Join The Church WhatsApp Group" },
  { href: CHURCH_LINKS.instagram || "#", label: "Follow us on Instagram" },
  { href: CHURCH_LINKS.youtube, label: "Follow us on YouTube" },
  { href: "/media", label: "Sermons" },
  { href: "/requests/suggestion", label: "Suggestion Box" },
  { href: "/counselling", label: "Marriage Counseling" },
  { href: "/membership-class", label: "Join Believers Class" },
  { href: "/trainings/water-baptism/register", label: "Join the next Baptismal Class" },
  { href: "/trainings/workers-in-training/register", label: "Register for Workers-in-training" },
  { href: "/trainings/rila/apply", label: "Register for RILA" },
  { href: "/trainings/school-of-ministry/register", label: "Register for School of Ministries" },
  { href: "/trainings/school-of-disciples/register", label: "Register for School of Disciples" },
  { href: "/give", label: "Give Online" },
  { href: "/marketplace", label: "Marketplace" },
  { href: CHURCH_LINKS.attendance || "#", label: "Attendance" },
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
              <li key={link.label} className="mb-4 rounded-md border border-cciRed-500 text-center" style={itemStyle}>
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

        </div>
      </section>
    </>
  );
}
