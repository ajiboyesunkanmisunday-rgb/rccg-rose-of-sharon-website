import Link from "next/link";

const vs = { fontVariationSettings: '"wdth" 100' };

const highlights = [
  { icon: "📱", label: "Digital Marketing" },
  { icon: "💻", label: "Graphic Design" },
  { icon: "🧵", label: "Fashion & Tailoring" },
  { icon: "🍳", label: "Catering & Food Business" },
  { icon: "📸", label: "Photography" },
  { icon: "💇", label: "Beauty & Wellness" },
];

export default function CSR() {
  return (
    <section className="bg-[#100E1A] w-full px-6 md:px-[60px] lg:px-[120px] py-[60px] md:py-[84px] flex flex-col lg:flex-row gap-8 lg:gap-[80px] items-center">
      {/* Left: content */}
      <div className="flex flex-col gap-[28px] flex-1 min-w-0">
        <div className="flex flex-col gap-[8px]">
          <p
            className="text-[#B5B5F3] text-[13px] font-medium uppercase tracking-[0.22em]"
            style={vs}
          >
            Church Skills Resource
          </p>
          <h2
            className="text-[#FFFDFD] text-[28px] md:text-[38px] lg:text-[48px] font-bold leading-[1.2]"
            style={vs}
          >
            Equipping You to Excel &amp; Create
          </h2>
        </div>
        <p
          className="text-[#A3A1AF] text-[16px] md:text-[18px] leading-[1.8]"
          style={vs}
        >
          Our CSR program offers practical, hands-on vocational training across a wide range of
          professional skills — empowering church members and community with tools to build
          sustainable livelihoods rooted in godly values.
        </p>

        {/* Skill tags */}
        <div className="flex flex-wrap gap-[10px]">
          {highlights.map((h) => (
            <div
              key={h.label}
              className="flex items-center gap-[8px] px-[14px] py-[8px] rounded-full bg-[#B5B5F3]/10 border border-[#B5B5F3]/20"
            >
              <span className="text-[16px]">{h.icon}</span>
              <span className="text-[#B5B5F3] text-[13px] font-medium" style={vs}>
                {h.label}
              </span>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap gap-[16px] mt-[4px]">
          <Link
            href="/csr"
            className="px-[32px] py-[14px] bg-[#000080] text-[#FFFDFD] text-[15px] font-bold rounded-[30px] hover:bg-[#0000a0] transition-colors shadow-[0_4px_16px_rgba(0,0,128,0.35)]"
            style={vs}
          >
            Explore CSR Program →
          </Link>
          <Link
            href="/csr#register"
            className="px-[32px] py-[14px] border-2 border-[#B5B5F3]/50 text-[#B5B5F3] text-[15px] font-medium rounded-[30px] hover:border-[#B5B5F3] hover:bg-[#B5B5F3]/10 transition-colors"
            style={vs}
          >
            Register Interest
          </Link>
        </div>
      </div>

      {/* Right: stat cards */}
      <div className="w-full lg:w-[400px] lg:flex-shrink-0 flex flex-col gap-[16px]">
        {[
          {
            number: "8+",
            label: "Skills Programs",
            desc: "From digital marketing to fashion & tailoring",
          },
          {
            number: "Free",
            label: "For Members",
            desc: "Subsidized or free training for church members",
          },
          {
            number: "✓",
            label: "Certified",
            desc: "Receive a certificate of completion for every course",
          },
        ].map((card) => (
          <div
            key={card.label}
            className="bg-[#1A1826] rounded-[20px] p-[24px] flex items-center gap-[20px] border border-[#B5B5F3]/10"
          >
            <div className="w-[60px] h-[60px] rounded-[14px] bg-[#000080] flex items-center justify-center flex-shrink-0">
              <span className="text-[#FFFDFD] text-[24px] font-bold" style={vs}>
                {card.number}
              </span>
            </div>
            <div className="flex flex-col gap-[4px]">
              <p className="text-[#FFFDFD] text-[16px] font-bold" style={vs}>
                {card.label}
              </p>
              <p className="text-[#A3A1AF] text-[13px] leading-[1.5]" style={vs}>
                {card.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
