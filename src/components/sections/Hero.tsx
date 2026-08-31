import Navbar from "@/components/layout/Navbar";
import Image from "next/image";
import Link from "next/link";

const vs = { fontVariationSettings: '"wdth" 100' };

export default function Hero() {
  return (
    <section className="relative min-h-[580px] md:min-h-[660px] lg:h-[760px] w-full overflow-hidden flex items-center justify-center">

      {/* Background image */}
      <div aria-hidden className="absolute inset-0 pointer-events-none">
        <Image
          src="/assets/hero-bg.png"
          alt=""
          fill
          className="object-cover"
          priority
        />
        {/* Multi-stop cinematic overlay */}
        <div className="absolute inset-0"
          style={{ background: 'linear-gradient(160deg, rgba(10,8,24,0.72) 0%, rgba(0,0,40,0.55) 40%, rgba(10,8,24,0.80) 100%)' }} />
      </div>

      {/* Ambient light orbs */}
      <div aria-hidden className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Navy orb — top right */}
        <div
          className="absolute rounded-full"
          style={{
            width: '520px', height: '520px',
            top: '-12%', right: '-8%',
            background: 'rgba(0,0,128,0.38)',
            filter: 'blur(110px)',
            animation: 'float 9s ease-in-out infinite',
          }}
        />
        {/* Lavender orb — bottom left */}
        <div
          className="absolute rounded-full"
          style={{
            width: '380px', height: '380px',
            bottom: '-8%', left: '-6%',
            background: 'rgba(181,181,243,0.18)',
            filter: 'blur(90px)',
            animation: 'float 13s ease-in-out infinite 3.5s',
          }}
        />
        {/* Deep indigo orb — mid-centre */}
        <div
          className="absolute rounded-full"
          style={{
            width: '300px', height: '300px',
            top: '30%', left: '28%',
            background: 'rgba(0,0,80,0.22)',
            filter: 'blur(70px)',
            animation: 'floatReverse 11s ease-in-out infinite 6s',
          }}
        />
      </div>

      <Navbar activePage="home" />

      {/* Content */}
      <div className="relative z-10 flex flex-col gap-8 md:gap-[52px] items-center justify-center w-full max-w-[1000px] px-6 md:px-8 text-center mt-20 md:mt-[68px]">
        <div className="flex flex-col gap-[18px] md:gap-[26px] items-center w-full">
          <h1
            className="text-[#FFFDFD] text-[52px] md:text-[82px] lg:text-[112px] font-bold italic leading-[1.05] w-full tracking-[-0.01em]"
            style={{
              fontFamily: "'Playfair Display', serif",
              animation: 'fadeUp 1s cubic-bezier(0.16, 1, 0.3, 1) both',
            }}
          >
            Rose of Sharon
          </h1>
          <p
            className="text-[#FFFDFD]/85 text-[16px] md:text-[20px] lg:text-[22px] font-normal leading-[1.6] w-full max-w-[560px] tracking-[0.02em]"
            style={{ ...vs, animation: 'fadeUp 1s cubic-bezier(0.16, 1, 0.3, 1) 0.18s both' }}
          >
            Where God has a permanent seat
          </p>
        </div>

        <Link
          href="https://www.youtube.com/@rccgrostv"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-[10px] px-[34px] py-[15px] bg-[#000080] text-[#FFFDFD] text-[15px] font-bold rounded-[30px] hover:bg-[#0000a0] hover:shadow-[0_8px_32px_rgba(0,0,128,0.55)] transition-all duration-300 shadow-[0_4px_20px_rgba(0,0,128,0.4)]"
          style={{ ...vs, animation: 'fadeUp 1s cubic-bezier(0.16, 1, 0.3, 1) 0.36s both' }}
        >
          <span className="size-[10px] rounded-full bg-[#FF3D3D] animate-pulse flex-shrink-0" />
          Watch Live
        </Link>

        {/* Subtle scroll indicator */}
        <div
          className="absolute bottom-[28px] left-1/2 -translate-x-1/2 flex flex-col items-center gap-[6px] opacity-50"
          style={{ animation: 'fadeIn 1s ease 1.2s both' }}
        >
          <div className="w-[1px] h-[36px] bg-gradient-to-b from-[#FFFDFD]/60 to-transparent" />
          <span className="text-[#FFFDFD] text-[10px] uppercase tracking-[0.2em]" style={vs}>Scroll</span>
        </div>
      </div>
    </section>
  );
}
