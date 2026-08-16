import Image from "next/image";
import Link from "next/link";

const groupCards = [
  {
    tagline: "Men of Valour",
    italic: "Rise Together.",
    description: "Join the men's fellowship — growing in faith, brotherhood and purpose.",
    badge: "MEN",
    badgeColor: "border-[#FFFDFD] text-[#FFFDFD]",
  },
  {
    tagline: "Women of Virtue",
    italic: "Strength & Grace.",
    description: "A community of women built on God's Word, supporting one another.",
    badge: "WOMEN",
    badgeColor: "border-[#9B96FE] text-[#9B96FE]",
  },
  {
    tagline: "Youth on Fire",
    italic: "Your Season.",
    description: "Vibrant, spirit-filled youth community — where your generation finds purpose.",
    badge: "YOUTH",
    badgeColor: "border-[#FFFDFD] text-[#FFFDFD]",
  },
];

function GroupCard({ tagline, italic, description, badge, badgeColor }: typeof groupCards[0]) {
  return (
    <Link
      href="/groups"
      className="bg-[rgba(16,14,26,0.35)] flex flex-1 h-[308px] items-center justify-center min-w-0 px-[16px] py-[32px] relative group hover:bg-[rgba(16,14,26,0.55)] transition-colors"
    >
      <div className="flex flex-1 flex-col h-full items-center justify-between min-w-0 relative">
        <div className="text-center w-full">
          <span
            className="text-[#FFFDFD] text-[39px] font-semibold leading-[46.8px]"
            style={{ fontFamily: "'Roboto', sans-serif", fontVariationSettings: '"wdth" 100' }}
          >
            {tagline}{" "}
          </span>
          <span
            className="text-[#9B96FE] text-[36px] font-bold italic leading-[46.8px]"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            {italic}
          </span>
        </div>

        <p
          className="text-[#FFFDFD] text-[16px] font-normal leading-[24px] text-center w-full"
          style={{ fontVariationSettings: '"wdth" 100' }}
        >
          {description}
        </p>

        <div className="flex gap-[12px] items-start w-full">
          <div className={`border-2 ${badgeColor} flex flex-1 items-center justify-center min-w-0 px-[32px] py-[12px] rounded-[24px] group-hover:bg-white/10 transition-colors`}>
            <span className="text-[16px] font-medium leading-normal whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
              {badge}
            </span>
          </div>
          <div className="border-2 border-[#B5B5F3]/50 flex flex-1 items-center justify-center min-w-0 px-[32px] py-[12px] rounded-[24px]">
            <span className="text-[#B5B5F3] text-[16px] font-medium leading-normal whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
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
    <section id="groups" className="flex items-start relative w-full px-[120px]">
      <div aria-hidden className="absolute inset-0 pointer-events-none">
        <div className="absolute bg-[#242222] inset-0" />
        <Image
          src="/assets/groups-bg.png"
          alt=""
          fill
          className="object-cover opacity-35"
        />
      </div>
      <div className="flex gap-[32px] items-start relative w-full">
        {groupCards.map((card) => (
          <GroupCard key={card.badge} {...card} />
        ))}
      </div>
    </section>
  );
}
