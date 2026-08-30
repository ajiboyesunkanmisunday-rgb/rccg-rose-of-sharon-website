import Link from "next/link";

const vs = { fontVariationSettings: '"wdth" 100' };

const tags = ["Birthdays", "Weddings", "Child Dedication"];

export default function Thanksgiving() {
  return (
    <section id="thanksgiving" className="flex items-center relative w-full min-h-[400px] md:min-h-[510px]">
      <div aria-hidden className="absolute inset-0 pointer-events-none">
        <div className="absolute bg-[#000080] inset-0" />
        <div className="absolute inset-0 opacity-[0.57] overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/assets/thanksgiving-bg.png"
            alt=""
            className="absolute max-w-none"
            style={{ left: "21.46%", width: "78.54%", height: "155.68%", top: "-45.86%" }}
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-l from-[rgba(255,255,255,0)] from-[39.9%] to-[#000080] to-[75.5%]" />
      </div>

      <div className="flex flex-1 flex-col gap-6 md:gap-[28px] items-start min-w-0 px-6 md:px-[60px] lg:px-[120px] py-[60px] md:py-[84px] relative max-w-[680px]">
        <p className="text-[#B5B5F3] text-[14px] font-normal uppercase tracking-[0.15em]" style={vs}>
          Special Occasion
        </p>

        <h2
          className="text-[#FFFDFD] text-[28px] md:text-[38px] lg:text-[48px] font-bold leading-[1.2] text-left w-full"
          style={vs}
        >
          Special Thanksgiving Request
        </h2>

        {/* Tags */}
        <div className="flex flex-wrap gap-[10px]">
          {tags.map((tag) => (
            <div
              key={tag}
              className="flex items-center gap-[8px] px-[14px] py-[8px] rounded-full bg-[#B5B5F3]/10 border border-[#B5B5F3]/30"
            >
              <span className="text-[#B5B5F3] text-[13px] font-medium" style={vs}>{tag}</span>
            </div>
          ))}
        </div>

        <p
          className="text-[#FFFDFD] text-[14px] md:text-[17px] lg:text-[19px] font-normal leading-[1.8] text-left w-full"
          style={vs}
        >
          The church would love to rejoice with you on your special day! Whether you&apos;re marking a
          birthday, wedding, or child dedication, we want to celebrate and pray for you. Let us make
          your day even more special with love, prayers, and warm wishes from the church family.
        </p>

        <Link
          href="/celebrations"
          className="flex items-center gap-[8px] px-[32px] py-[14px] bg-[#000080] text-[#FFFDFD] text-[15px] font-bold rounded-[30px] hover:bg-[#0000a0] transition-colors shadow-[0_4px_16px_rgba(0,0,128,0.35)] flex-shrink-0"
          style={vs}
        >
          Let&apos;s Celebrate You
        </Link>
      </div>
    </section>
  );
}
