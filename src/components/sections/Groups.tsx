import Image from "next/image";
import Link from "next/link";

const vs = { fontVariationSettings: '"wdth" 100' };

const groupCards = [
  {
    tagline: "Hearts of",
    italic: "David",
    description: "A fellowship rooted in worship and intercession — pursuing the heart of God together.",
  },
  {
    tagline: "Oaks of",
    italic: "Righteousness",
    description: "Established in God's Word, growing strong in faith, character, and purpose.",
  },
  {
    tagline: "Young",
    italic: "Professionals",
    description: "Spirit-filled young people connecting faith with career, vision, and calling.",
  },
];

function GroupCard({ tagline, italic, description }: typeof groupCards[0]) {
  return (
    <Link
      href="/groups"
      className="flex flex-1 min-h-[240px] md:h-[340px] items-center justify-center min-w-0 px-[24px] py-[40px] relative group border-r border-[#B5B5F3]/10 last:border-r-0 overflow-hidden"
      style={{ background: 'rgba(10,8,24,0.68)' }}
    >
      {/* Hover glow overlay */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at 50% 100%, rgba(0,0,128,0.25) 0%, transparent 70%)' }}
      />
      {/* Gradient border via top border glow on hover */}
      <div
        className="absolute top-0 left-0 right-0 h-[1px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(181,181,243,0.6), transparent)' }}
      />

      <div className="flex flex-1 flex-col h-full items-center justify-between min-w-0 relative gap-6 md:gap-0 z-10">
        <div className="text-center w-full">
          <span
            className="text-[#FFFDFD] text-[26px] md:text-[34px] lg:text-[40px] font-semibold leading-tight tracking-[-0.01em]"
            style={vs}
          >
            {tagline}{" "}
          </span>
          <span
            className="text-[#9B96FE] text-[24px] md:text-[32px] lg:text-[38px] font-bold italic leading-tight"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            {italic}
          </span>
        </div>

        <p
          className="text-[#A3A1AF] group-hover:text-[#FFFDFD] text-[14px] md:text-[15px] font-normal leading-[1.7] text-center w-full transition-colors duration-300"
          style={vs}
        >
          {description}
        </p>

        <div className="flex justify-center w-full">
          <div className="border border-[#B5B5F3]/40 flex items-center justify-center gap-[8px] px-[28px] md:px-[40px] py-[10px] md:py-[11px] rounded-[24px] group-hover:border-[#B5B5F3]/80 group-hover:bg-[#B5B5F3]/10 transition-all duration-300">
            <span className="text-[#B5B5F3] text-[13px] md:text-[14px] font-semibold uppercase tracking-[0.08em]" style={vs}>
              Join
            </span>
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="text-[#B5B5F3] translate-x-0 group-hover:translate-x-1 transition-transform duration-300">
              <path d="M1 6h10M7 2l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default function Groups() {
  return (
    <section id="groups" className="flex items-start relative w-full overflow-hidden">
      <div aria-hidden className="absolute inset-0 pointer-events-none">
        <div className="absolute bg-[#1a1826] inset-0" />
        <Image
          src="/assets/groups-bg.png"
          alt=""
          fill
          className="object-cover opacity-50"
        />
        {/* Subtle vignette */}
        <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at 50% 50%, transparent 30%, rgba(10,8,24,0.5) 100%)' }} />
      </div>
      <div className="reveal flex flex-col md:flex-row gap-0 items-start relative w-full">
        {groupCards.map((card) => (
          <GroupCard key={card.italic} {...card} />
        ))}
      </div>
    </section>
  );
}
