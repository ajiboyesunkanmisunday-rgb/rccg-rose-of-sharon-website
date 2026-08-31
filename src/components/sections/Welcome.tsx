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

      <section id="about" className="bg-[#100E1A] px-6 md:px-[60px] lg:px-[120px] py-[72px] md:py-[96px] w-full">
        <div className="flex flex-col lg:flex-row gap-[48px] lg:gap-[80px] items-center max-w-[1148px] mx-auto">

          {/* Left: text */}
          <div className="flex flex-col gap-[24px] flex-1 min-w-0">
            <p className="reveal text-[#B5B5F3] text-[13px] font-medium uppercase tracking-[0.2em]" style={vs}>
              Welcome
            </p>
            <h2
              className="reveal reveal-delay-1 text-[#FFFDFD] text-[32px] md:text-[44px] lg:text-[54px] font-bold leading-[1.12] tracking-[-0.02em]"
              style={vs}
            >
              A Place to Grow,<br />Worship &amp; Belong
            </h2>
            <p className="reveal reveal-delay-2 text-[#A3A1AF] text-[16px] md:text-[18px] font-normal leading-[1.85]" style={vs}>
              We believe in the power of God&apos;s Word to change lives. At Rose of Sharon, faith meets
              real life — every Sunday and beyond.
            </p>
            <ul className="reveal reveal-delay-3 flex flex-col gap-[14px]">
              {features.map((item) => (
                <li key={item} className="flex items-center gap-[12px] text-[#FFFDFD] text-[15px]" style={vs}>
                  <div className="size-[22px] rounded-full bg-[#000080] flex items-center justify-center flex-shrink-0 shadow-[0_2px_8px_rgba(0,0,128,0.4)]">
                    <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                      <path d="M1 4l2.5 2.5L9 1" stroke="#B5B5F3" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  {item}
                </li>
              ))}
            </ul>
            <div className="reveal reveal-delay-4 flex gap-[12px] flex-wrap pt-[8px]">
              <Link
                href="/testimonies#share"
                className="px-[32px] py-[14px] bg-[#000080] text-[#FFFDFD] text-[15px] font-bold rounded-[30px] hover:bg-[#0000a0] hover:shadow-[0_8px_28px_rgba(0,0,128,0.5)] transition-all duration-300 shadow-[0_4px_16px_rgba(0,0,128,0.35)]"
                style={vs}
              >
                Share Your Story
              </Link>
              <Link
                href="/about"
                className="px-[32px] py-[14px] border border-[#B5B5F3]/40 text-[#B5B5F3] text-[15px] font-medium rounded-[30px] hover:border-[#B5B5F3] hover:bg-[#B5B5F3]/10 transition-all duration-300"
                style={vs}
              >
                Learn More
              </Link>
            </div>
          </div>

          {/* Right: visual card */}
          <div className="reveal reveal-delay-2 gradient-border relative flex-shrink-0 w-full lg:w-[460px] h-[360px] md:h-[420px] rounded-[28px] overflow-hidden bg-[#1a1826] border border-[#B5B5F3]/10 shadow-[0_20px_60px_rgba(0,0,0,0.4)]">
            <Image src="/assets/thanksgiving-bg.png" alt="RCCG Rose of Sharon" fill className="object-cover transition-transform duration-700 hover:scale-105" />
            <div className="absolute inset-0" style={{ background: 'linear-gradient(160deg, rgba(0,0,128,0.25) 0%, rgba(10,8,24,0.55) 100%)' }} />
            <div className="absolute bottom-[24px] left-[24px] right-[24px] bg-[rgba(10,8,24,0.82)] rounded-[18px] p-[18px] backdrop-blur-md border border-[#B5B5F3]/10">
              <p className="text-[#B5B5F3] text-[11px] font-semibold uppercase tracking-[0.2em] mb-[4px]" style={vs}>Every Sunday</p>
              <p className="text-[#FFFDFD] text-[19px] font-bold tracking-[-0.01em]" style={vs}>7:45 AM Service</p>
              <p className="text-[#A3A1AF] text-[13px] mt-[5px] leading-[1.5]" style={vs}>Come as you are. Everyone is welcome.</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
