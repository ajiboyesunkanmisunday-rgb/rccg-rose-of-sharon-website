import Navbar from "@/components/layout/Navbar";
import Image from "next/image";
import Link from "next/link";

const vs = { fontVariationSettings: '"wdth" 100' };

export default function Hero() {
  return (
    <section className="relative min-h-[500px] md:min-h-[600px] lg:h-[735px] w-full overflow-hidden flex items-center justify-center">
      <div aria-hidden className="absolute inset-0 pointer-events-none">
        <Image
          src="/assets/hero-bg.png"
          alt=""
          fill
          className="object-cover"
          priority
        />
        <div className="absolute bg-[rgba(16,14,26,0.65)] inset-0" />
      </div>

      <Navbar activePage="home" />

      <div className="relative z-10 flex flex-col gap-8 md:gap-[48px] items-center justify-center w-full max-w-[1000px] px-6 md:px-8 text-center mt-16 md:mt-[58px]">
        <div className="flex flex-col gap-[16px] md:gap-[24px] items-center w-full">
          <h1
            className="text-[#FFFDFD] text-[52px] md:text-[80px] lg:text-[108px] font-bold italic leading-tight w-full"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Rose of Sharon
          </h1>
          <p
            className="text-[#FFFDFD] text-[16px] md:text-[20px] lg:text-[24px] font-normal leading-[1.5] w-full max-w-[600px]"
            style={vs}
          >
            Where God has a permanent seat
          </p>
        </div>

        <Link
          href="https://www.youtube.com/@rccgrostv"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-[10px] px-[32px] py-[14px] bg-[#000080] text-[#FFFDFD] text-[15px] font-bold rounded-[30px] hover:bg-[#0000a0] transition-colors shadow-[0_4px_16px_rgba(0,0,128,0.35)]"
          style={vs}
        >
          <span className="size-[10px] rounded-full bg-[#FF3D3D] animate-pulse flex-shrink-0" />
          Watch Live
        </Link>
      </div>
    </section>
  );
}
