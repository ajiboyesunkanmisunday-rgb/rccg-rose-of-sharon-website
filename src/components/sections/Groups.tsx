import Image from "next/image";
import Link from "next/link";

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
    tagline: "Young Leaders &",
    italic: "Professionals",
    description: "Spirit-filled young people connecting faith with career, vision, and calling.",
  },
];

function GroupCard({ tagline, italic, description }: typeof groupCards[0]) {
  return (
    <Link
      href="/groups"
      className="bg-[rgba(16,14,26,0.35)] flex flex-1 min-h-[220px] md:h-[308px] items-center justify-center min-w-0 px-[16px] py-[32px] relative group hover:bg-[rgba(16,14,26,0.55)] transition-colors"
    >
      <div className="flex flex-1 flex-col h-full items-center justify-between min-w-0 relative gap-6 md:gap-0">
        <div className="text-center w-full">
          <span
            className="text-[#FFFDFD] text-[26px] md:text-[32px] lg:text-[39px] font-semibold leading-tight"
            style={{ fontFamily: "'Roboto', sans-serif", fontVariationSettings: '"wdth" 100' }}
          >
            {tagline}{" "}
          </span>
          <span
            className="text-[#9B96FE] text-[24px] md:text-[30px] lg:text-[36px] font-bold italic leading-tight"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            {italic}
          </span>
        </div>

        <p
          className="text-[#FFFDFD] text-[14px] md:text-[16px] font-normal leading-[24px] text-center w-full"
          style={{ fontVariationSettings: '"wdth" 100' }}
        >
          {description}
        </p>

        <div className="flex justify-center w-full">
          <div className="border-2 border-[#B5B5F3]/50 flex items-center justify-center px-[32px] md:px-[48px] py-[10px] md:py-[12px] rounded-[24px] group-hover:border-[#B5B5F3] transition-colors">
            <span className="text-[#B5B5F3] text-[14px] md:text-[16px] font-medium leading-normal" style={{ fontVariationSettings: '"wdth" 100' }}>
              JOIN →
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default function Groups() {
  return (
    <section id="groups" className="flex items-start relative w-full">
      <div aria-hidden className="absolute inset-0 pointer-events-none">
        <div className="absolute bg-[#242222] inset-0" />
        <Image
          src="/assets/groups-bg.png"
          alt=""
          fill
          className="object-cover opacity-35"
        />
      </div>
      <div className="flex flex-col md:flex-row gap-0 items-start relative w-full">
        {groupCards.map((card) => (
          <GroupCard key={card.italic} {...card} />
        ))}
      </div>
    </section>
  );
}
