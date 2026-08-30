import Image from "next/image";
import Link from "next/link";

const vs = { fontVariationSettings: '"wdth" 100' };

const features = [
  "Transformative Sunday services at 7:45 AM",
  "Bible-centred teaching & discipleship",
  "Prayer, intercession & community groups",
  "Ministries for every stage of life",
];

export default function Welcome() {
  return (
    <>
      {/* Dark separator between hero and welcome */}
      <div className="bg-[#100E1A] border-t border-[#B5B5F3]/10 w-full" />

      <section id="about" className="bg-[#100E1A] px-6 md:px-[60px] lg:px-[120px] py-[60px] md:py-[84px] w-full">
        <div className="flex flex-col lg:flex-row gap-[48px] lg:gap-[80px] items-center max-w-[1148px] mx-auto">

          {/* Left: text */}
          <div className="flex flex-col gap-[24px] flex-1 min-w-0">
            <p className="text-[#B5B5F3] text-[14px] font-normal uppercase tracking-[0.15em]" style={vs}>
              Welcome
            </p>
            <h2
              className="text-[#FFFDFD] text-[32px] md:text-[42px] lg:text-[52px] font-bold leading-[1.15]"
              style={vs}
            >
              A Place to Grow,<br />Worship &amp; Belong
            </h2>
            <p className="text-[#A3A1AF] text-[16px] md:text-[18px] font-normal leading-[1.8]" style={vs}>
              We believe in the power of God&apos;s Word to change lives. At Rose of Sharon, faith meets
              real life — every Sunday and beyond.
            </p>
            <ul className="flex flex-col gap-[12px]">
              {features.map((item) => (
                <li key={item} className="flex items-center gap-[10px] text-[#FFFDFD] text-[15px]" style={vs}>
                  <div className="size-[20px] rounded-full bg-[#000080] flex items-center justify-center flex-shrink-0">
                    <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                      <path d="M1 4l2.5 2.5L9 1" stroke="#B5B5F3" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  {item}
                </li>
              ))}
            </ul>
            <div className="flex gap-[12px] flex-wrap pt-[8px]">
              <Link
                href="/testimonies#share"
                className="px-[32px] py-[14px] bg-[#000080] text-[#FFFDFD] text-[15px] font-bold rounded-[30px] hover:bg-[#0000a0] transition-colors shadow-[0_4px_16px_rgba(0,0,128,0.35)]"
                style={vs}
              >
                Share Your Story
              </Link>
              <Link
                href="/about"
                className="px-[32px] py-[14px] border-2 border-[#B5B5F3]/50 text-[#B5B5F3] text-[15px] font-medium rounded-[30px] hover:border-[#B5B5F3] hover:bg-[#B5B5F3]/10 transition-colors"
                style={vs}
              >
                Learn More
              </Link>
            </div>
          </div>

          {/* Right: visual card */}
          <div className="relative flex-shrink-0 w-full lg:w-[440px] h-[340px] md:h-[400px] rounded-[24px] overflow-hidden bg-[#1a1826] border border-[#B5B5F3]/10">
            <Image src="/assets/thanksgiving-bg.png" alt="RCCG Rose of Sharon" fill className="object-cover" />
            <div className="absolute inset-0 bg-[rgba(0,0,128,0.30)]" />
            <div className="absolute bottom-[24px] left-[24px] right-[24px] bg-[rgba(16,14,26,0.85)] rounded-[16px] p-[16px] backdrop-blur-sm">
              <p className="text-[#B5B5F3] text-[12px] font-medium uppercase tracking-wider mb-[4px]" style={vs}>Every Sunday</p>
              <p className="text-[#FFFDFD] text-[18px] font-bold" style={vs}>7:45 AM Service</p>
              <p className="text-[#A3A1AF] text-[13px] mt-[4px]" style={vs}>Come as you are. Everyone is welcome.</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
