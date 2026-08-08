import Navbar from "@/components/layout/Navbar";
import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative h-[735px] w-full overflow-hidden flex items-center justify-center">
      <div aria-hidden className="absolute inset-0 pointer-events-none">
        <Image
          src="/assets/hero-bg.png"
          alt=""
          fill
          className="object-cover"
          priority
        />
        <div className="absolute bg-[rgba(0,0,0,0.65)] inset-0" />
      </div>

      <Navbar />

      <div className="absolute left-1/2 top-[calc(50%+58px)] -translate-x-1/2 -translate-y-1/2 flex flex-col gap-[84px] items-center justify-center w-[1148px] z-10">
        <div className="flex flex-col gap-[32px] items-start w-full text-center text-white">
          <h1
            className="text-[#FFFDFD] text-[84px] font-medium leading-normal w-full"
            style={{ fontFamily: "'Roboto', sans-serif", fontVariationSettings: '"wdth" 100' }}
          >
            A Place Where God Have a Permanent Seat!
          </h1>
          <p
            className="text-[#FFFDFD] text-[25px] font-normal leading-[32px] w-full"
            style={{ fontVariationSettings: '"wdth" 100' }}
          >
            Step into a place where God&apos;s presence is constant, His Word is powerful, and your life is transformed.
          </p>
        </div>

        <Link
          href="#media"
          className="flex items-center gap-[5px] px-[32px] py-[16px] bg-[#000080] text-[#FFFDFD] text-[25px] font-medium rounded-[35px] drop-shadow-[19px_19px_20px_rgba(0,0,0,0.1)] hover:bg-[#0000a0] transition-colors flex-shrink-0"
        >
          <div className="relative size-[29px] flex-shrink-0">
            <Image src="/assets/play-filled.svg" alt="" fill />
          </div>
          Watch Sermon
        </Link>
      </div>
    </section>
  );
}
