import Link from "next/link";

export default function Welcome() {
  return (
    <section id="about" className="bg-[#100E1A] px-6 md:px-[60px] lg:px-[100px] py-[60px] md:py-[84px] flex flex-col items-center justify-center gap-[32px] text-center w-full">
      <h2
        className="text-[#FFFDFD] text-[28px] md:text-[38px] lg:text-[48px] font-bold leading-normal w-full"
        style={{ fontVariationSettings: '"wdth" 100' }}
      >
        Welcome to RCCG Rose of Sharon
      </h2>

      <div className="flex flex-col gap-[24px] items-center w-full max-w-[1240px]">
        <p
          className="text-[#FFFDFD] text-[16px] md:text-[20px] lg:text-[25px] font-medium leading-normal w-full"
          style={{ fontVariationSettings: '"wdth" 100' }}
        >
          We believe in the power of God&apos;s Word to change lives and value the practical application
          of His Word to make a difference in who we are and what we do.
        </p>

        <p className="text-[#A3A1AF] text-[14px] md:text-[17px] lg:text-[20px] font-normal italic leading-[1.5] w-full">
          Our commitment to the practical application of God&apos;s Word is rooted in the belief that true
          transformation occurs when faith is put into action. It is not enough to simply hear the Word;
          we must be doers of the Word, actively engaging with its principles and precepts in our daily lives.
          In doing so, we become living testimonies of God&apos;s grace and power, demonstrating His love
          and truth to a world in desperate need of both.
        </p>
      </div>

      <Link
        href="/testimonies#share"
        className="flex items-center gap-2 px-6 md:px-[32px] py-3 md:py-[16px] bg-[#000080] text-[#FFFDFD] text-[16px] md:text-[20px] lg:text-[25px] font-medium rounded-[35px] drop-shadow-[19px_19px_20px_rgba(0,0,0,0.1)] hover:bg-[#0000a0] transition-colors"
      >
        Share Your Experience
      </Link>
    </section>
  );
}
