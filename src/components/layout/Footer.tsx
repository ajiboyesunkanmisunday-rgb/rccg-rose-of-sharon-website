import Image from "next/image";
import Link from "next/link";

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
            style={{ fontVariationSettings: '"wdth" 100', textShadow: "0px 0px 0px rgba(0,0,0,0.3)" }}
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
              className="bg-[#0000BA] rounded-[3.2px] size-[32px] relative flex items-center justify-center hover:opacity-80 transition-opacity"
              aria-label="YouTube"
            >
              <div className="relative size-[16px]">
                <Image src="/assets/social-3.svg" alt="" fill />
              </div>
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div className="flex flex-col gap-[20px]">
          <h3
            className="text-[#FFFDFD] text-[20px] md:text-[25px] font-bold leading-[32.5px]"
            style={{ fontVariationSettings: '"wdth" 100', textShadow: "0px 0px 0px rgba(0,0,0,0.3)" }}
          >
            Quick Links
          </h3>
          <ul className="flex flex-col gap-[12px] md:gap-[16px]">
            {quickLinks.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  className="text-white text-[16px] md:text-[20px] font-normal leading-normal hover:text-[#B5B5F3] transition-colors"
                  style={{ fontVariationSettings: '"wdth" 100' }}
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
            style={{ fontVariationSettings: '"wdth" 100', textShadow: "0px 0px 0px rgba(0,0,0,0.3)" }}
          >
            Help
          </h3>
          <ul className="flex flex-col gap-[12px] md:gap-[16px]">
            {helpLinks.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  className="flex gap-[8px] items-center text-[#FFFDFD] text-[16px] md:text-[20px] font-normal leading-normal hover:text-[#B5B5F3] transition-colors"
                  style={{ fontVariationSettings: '"wdth" 100' }}
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
