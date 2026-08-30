import Image from "next/image";
import Link from "next/link";

const vs = { fontVariationSettings: '"wdth" 100' };

const quickLinks = [
  { label: "Meet the Church", href: "/about" },
  { label: "First-Timer Registration", href: "/first-timer" },
  { label: "Training Programs", href: "/trainings" },
  { label: "Church Groups", href: "/groups" },
  { label: "Upcoming Events", href: "/events" },
  { label: "Give Online", href: "/give" },
];

const helpLinks = [
  { label: "Book a Counselling Session", href: "/requests/counseling" },
  { label: "Prayer Request", href: "/requests/prayer" },
  { label: "Become an E-Member", href: "/e-member" },
  { label: "Announcements", href: "/announcements" },
  { label: "New Believer", href: "/new-believer" },
];

export default function Footer() {
  return (
    <footer className="bg-[#100e1a] w-full px-6 md:px-[60px] lg:px-[120px] py-[48px] md:py-[84px]">
      <div className="flex flex-col md:flex-row gap-10 md:gap-[64px] items-start">
        {/* Connect With Us */}
        <div className="flex flex-col gap-[12px]">
          <h3
            className="text-[#FFFDFD] text-[20px] md:text-[25px] font-bold leading-[32.5px]"
            style={vs}
          >
            Connect With Us
          </h3>
          <div className="flex gap-[8px] items-center">
            <a
              href="https://www.instagram.com/rccgros/?hl=en"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#8A38F5] rounded-[3.2px] size-[32px] relative flex items-center justify-center hover:opacity-80 transition-opacity"
              aria-label="Instagram"
            >
              <div className="relative size-[16px]">
                <Image src="/assets/social-1.svg" alt="" fill />
              </div>
            </a>
            <a
              href="https://www.facebook.com/rccgrospage/"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#3B5998] rounded-[3.2px] size-[32px] relative flex items-center justify-center hover:opacity-80 transition-opacity"
              aria-label="Facebook"
            >
              <div className="relative size-[16px]">
                <Image src="/assets/social-2.svg" alt="" fill />
              </div>
            </a>
            <a
              href="https://www.youtube.com/@rccgrostv"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#FF0000] rounded-[3.2px] size-[32px] flex items-center justify-center hover:opacity-80 transition-opacity"
              aria-label="YouTube"
            >
              <svg width="18" height="14" viewBox="0 0 18 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M17.154 2.186a2.253 2.253 0 0 0-1.587-1.595C14.241.25 9 .25 9 .25S3.759.25 2.433.59A2.253 2.253 0 0 0 .846 2.186C.5 3.514.5 7 .5 7s0 3.486.346 4.814a2.253 2.253 0 0 0 1.587 1.595C3.759 13.75 9 13.75 9 13.75s5.241 0 6.567-.341a2.253 2.253 0 0 0 1.587-1.595C17.5 10.486 17.5 7 17.5 7s0-3.486-.346-4.814ZM7.25 10V4l5.25 3-5.25 3Z" fill="#FFFDFD"/>
              </svg>
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div className="flex flex-col gap-[20px]">
          <h3
            className="text-[#FFFDFD] text-[20px] md:text-[25px] font-bold leading-[32.5px]"
            style={vs}
          >
            Quick Links
          </h3>
          <ul className="flex flex-col gap-[12px] md:gap-[16px]">
            {quickLinks.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  className="text-white text-[16px] md:text-[20px] font-normal leading-normal hover:text-[#B5B5F3] transition-colors"
                  style={vs}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Help */}
        <div className="flex flex-col gap-[20px]">
          <h3
            className="text-[#FFFDFD] text-[20px] md:text-[25px] font-bold leading-[32.5px]"
            style={vs}
          >
            Help
          </h3>
          <ul className="flex flex-col gap-[12px] md:gap-[16px]">
            {helpLinks.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  className="flex gap-[8px] items-center text-[#FFFDFD] text-[16px] md:text-[20px] font-normal leading-normal hover:text-[#B5B5F3] transition-colors"
                  style={vs}
                >
                  <div className="relative flex-shrink-0 size-[14px]">
                    <Image src="/assets/social-4.svg" alt="" fill />
                  </div>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
