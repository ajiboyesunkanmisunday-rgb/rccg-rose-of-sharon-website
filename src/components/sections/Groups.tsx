import Image from "next/image";

function GroupCard() {
  return (
    <div className="bg-[rgba(16,14,26,0.35)] flex flex-1 h-[308px] items-center justify-center min-w-0 px-[16px] py-[32px] relative">
      <div className="flex flex-1 flex-col h-full items-center justify-between min-w-0 relative">
        <div className="text-center w-full">
          <span
            className="text-[#FFFDFD] text-[39px] font-semibold leading-[46.8px]"
            style={{ fontFamily: "'Roboto', sans-serif", fontVariationSettings: '"wdth" 100' }}
          >
            Let&apos;s Tailor
          </span>
          <span className="text-[36px] leading-[46.8px]"> </span>
          <span
            className="text-[#9B96FE] text-[36px] font-bold italic leading-[46.8px]"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Your Experience.
          </span>
        </div>

        <p
          className="text-[#FFFDFD] text-[16px] font-normal leading-[24px] text-center w-full"
          style={{ fontVariationSettings: '"wdth" 100' }}
        >
          Join the church groups and see what God can do through you
        </p>

        <div className="flex gap-[12px] items-start w-full">
          <div className="border-2 border-[#FFFDFD] flex flex-1 items-center justify-center min-w-0 px-[32px] py-[12px] rounded-[24px]">
            <span className="text-[#FFFDFD] text-[16px] font-medium leading-normal whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>MEN</span>
          </div>
          <div className="border-2 border-[#9B96FE] flex flex-1 items-center justify-center min-w-0 px-[32px] py-[12px] rounded-[24px]">
            <span className="text-[#9B96FE] text-[16px] font-medium leading-normal whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>WOMEN</span>
          </div>
          <div className="border-2 border-[#FFFDFD] flex flex-1 items-center justify-center min-w-0 px-[32px] py-[12px] rounded-[24px]">
            <span className="text-[#FFFDFD] text-[16px] font-medium leading-normal whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>YOUTH</span>
          </div>
        </div>
      </div>
    </div>
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
        <GroupCard />
        <GroupCard />
        <GroupCard />
      </div>
    </section>
  );
}
