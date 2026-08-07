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

      <div className="relative z-10 flex flex-col gap-[84px] items-center justify-center w-[1148px]">
        <div className="flex flex-col gap-[16px] items-center text-center">
          <h1
            className="text-[#FFFDFD] text-[84px] font-medium leading-tight"
            style={{ fontFamily: "'Roboto', sans-serif", fontVariationSettings: '"wdth" 100' }}
          >
            A Place Where God Have a Permanent Seat!
          </h1>
          <p
            className="text-[#FFFDFD] text-[25px] font-normal leading-normal"
            style={{ fontVariationSettings: '"wdth" 100' }}
          >
            Step into a place where God&apos;s presence is constant, His Word is powerful, and your life is transformed.
          </p>
        </div>

        <Link
          href="#media"
          className="flex items-center gap-[5px] px-[32px] py-[16px] bg-[#000080] text-[#FFFDFD] text-[25px] font-medium rounded-[35px] drop-shadow-[19px_19px_20px_rgba(0,0,0,0.1)] hover:bg-[#0000a0] transition-colors"
        >
          <div className="relative size-[24px] flex-shrink-0">
            <Image src="/assets/play-filled.svg" alt="" fill />
          </div>
          Watch Sermon
        </Link>
      </div>
    </section>
  );
}
