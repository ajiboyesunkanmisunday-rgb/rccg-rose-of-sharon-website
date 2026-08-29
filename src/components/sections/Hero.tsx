import Navbar from "@/components/layout/Navbar";
import Image from "next/image";
import Link from "next/link";

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

      <div className="relative z-10 flex flex-col gap-10 md:gap-[84px] items-center justify-center w-full max-w-[1148px] px-6 md:px-8 text-center mt-16 md:mt-[58px]">
        <div className="flex flex-col gap-4 md:gap-[32px] items-center w-full text-white">
          <h1
            className="text-[#FFFDFD] text-[36px] md:text-[58px] lg:text-[84px] font-medium leading-tight w-full"
            style={{ fontFamily: "'Roboto', sans-serif", fontVariationSettings: '"wdth" 100' }}
          >
            A Place Where God Have a Permanent Seat!
          </h1>
          <p
            className="text-[#FFFDFD] text-[15px] md:text-[19px] lg:text-[25px] font-normal leading-[1.5] md:leading-[32px] w-full max-w-[800px]"
            style={{ fontVariationSettings: '"wdth" 100' }}
          >
            Step into a place where God&apos;s presence is constant, His Word is powerful, and your life is transformed.
          </p>
        </div>

        <Link
          href="/media"
          className="flex items-center gap-[5px] px-6 md:px-[32px] py-3 md:py-[16px] bg-[#000080] text-[#FFFDFD] text-[16px] md:text-[20px] lg:text-[25px] font-medium rounded-[35px] drop-shadow-[19px_19px_20px_rgba(0,0,0,0.1)] hover:bg-[#0000a0] transition-colors"
        >
          <div className="relative size-[22px] md:size-[29px] flex-shrink-0">
            <Image src="/assets/play-filled.svg" alt="" fill />
          </div>
          Watch Sermon
        </Link>
      </div>
    </section>
  );
}
