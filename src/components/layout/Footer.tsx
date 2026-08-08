import Image from "next/image";
import Link from "next/link";

const quickLinks = [
  "Oaks of Righteousness",
  "Young Leaders and Professionals",
  "Calendar",
  "Podcast",
  "Watch Sermon",
  "Gallery",
];

const helpLinks = [
  { label: "Book a Counselling Session", href: "#counselling" },
  { label: "Prayer Request", href: "#prayer" },
  { label: "Share Testimony", href: "#testimony" },
  { label: "New Believer", href: "#new-believer" },
];

export default function Footer() {
  return (
    <footer className="bg-[#100e1a] flex flex-col h-[501px] items-center px-[120px] py-[84px] w-full">
      <div className="flex gap-[64px] items-start flex-shrink-0">
        {/* Connect With Us */}
        <div className="flex flex-col items-start justify-center flex-shrink-0">
          <div className="flex flex-col gap-[12px] h-[77px] items-start flex-shrink-0">
            <h3
              className="text-[#FFFDFD] text-[25px] font-bold leading-[32.5px] whitespace-nowrap"
              style={{ fontVariationSettings: '"wdth" 100', textShadow: "0px 0px 0px rgba(0,0,0,0.3)" }}
            >
              Connect With Us
            </h3>
            <div className="flex flex-1 gap-[8px] items-center min-h-0 px-[12px] w-full">
              <a
                href="#"
                className="bg-[#8A38F5] rounded-[3.2px] flex-shrink-0 size-[31.99px] relative flex items-center justify-center hover:opacity-80 transition-opacity"
                aria-label="Instagram"
              >
                <div className="relative size-[15.99px]">
                  <Image src="/assets/social-1.svg" alt="" fill />
                </div>
              </a>
              <a
                href="#"
                className="bg-[#3B5998] rounded-[3.2px] flex-shrink-0 size-[31.99px] relative flex items-center justify-center hover:opacity-80 transition-opacity"
                aria-label="Facebook"
              >
                <div className="relative size-[15.99px]">
                  <Image src="/assets/social-2.svg" alt="" fill />
                </div>
              </a>
              <a
                href="#"
                className="bg-[#0000BA] rounded-[3.2px] flex-shrink-0 size-[31.99px] relative flex items-center justify-center hover:opacity-80 transition-opacity"
                aria-label="YouTube"
              >
                <div className="relative size-[15.99px]">
                  <Image src="/assets/social-3.svg" alt="" fill />
                </div>
              </a>
            </div>
          </div>
        </div>

        {/* Quick Links */}
        <div className="flex flex-col gap-[20px] items-start flex-shrink-0">
          <h3
            className="text-[#FFFDFD] text-[25px] font-bold h-[33px] flex flex-col justify-center min-w-full leading-[32.5px] whitespace-nowrap"
            style={{ fontVariationSettings: '"wdth" 100', textShadow: "0px 0px 0px rgba(0,0,0,0.3)" }}
          >
            Quick Links
          </h3>
          <ul className="flex flex-col gap-[16px] items-start flex-shrink-0">
            {quickLinks.map((link) => (
              <li key={link}>
                <Link
                  href="#"
                  className="text-white text-[20px] font-normal leading-normal hover:text-[#B5B5F3] transition-colors"
                  style={{ fontVariationSettings: '"wdth" 100' }}
                >
                  {link}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Help */}
        <div className="flex flex-col gap-[20px] items-start flex-shrink-0 w-[268px]">
          <h3
            className="text-[#FFFDFD] text-[25px] font-bold h-[32.5px] flex flex-col justify-center w-full leading-[32.5px]"
            style={{ fontVariationSettings: '"wdth" 100', textShadow: "0px 0px 0px rgba(0,0,0,0.3)" }}
          >
            Help
          </h3>
          <ul className="flex flex-col gap-[16px] items-start flex-shrink-0 w-full">
            {helpLinks.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  className="flex gap-[8px] items-center text-[#FFFDFD] text-[20px] font-normal leading-normal hover:text-[#B5B5F3] transition-colors whitespace-nowrap"
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
