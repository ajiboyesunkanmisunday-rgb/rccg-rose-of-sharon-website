import Link from "next/link";

export default function Welcome() {
  return (
    <section className="bg-[#100E1A] px-[100px] py-[84px] flex flex-col items-center justify-center gap-[32px] text-center w-full">
      <div className="flex flex-col items-center gap-[32px] w-full">
        <h2
          className="text-[#FFFDFD] text-[48px] font-bold leading-normal w-full"
          style={{ fontVariationSettings: '"wdth" 100' }}
        >
          Welcome to RCCG Rose of Sharon
        </h2>

        <div className="flex flex-col gap-[24px] items-center w-[1240px]">
          <p
            className="text-[#FFFDFD] text-[25px] font-medium leading-normal min-w-full w-[min-content]"
            style={{ fontVariationSettings: '"wdth" 100' }}
          >
            We believe in the power of God&apos;s Word to change lives and value the practical application
            of His Word to make a difference in who we are and what we do.
          </p>

          <div className="text-[#A3A1AF] text-[20px] font-normal italic leading-[1.5] w-[1240px]">
            <p className="mb-0">
              Our commitment to the practical application of God&apos;s Word is rooted in the belief that true
              transformation occurs when faith is put into action. It is not enough to simply hear the Word;
              we must be doers of the Word, actively engaging with its principles and precepts in our daily lives.
            </p>
            <p>
              In doing so, we become living testimonies of God&apos;s grace and power, demonstrating His love
              and truth to a world in desperate need of both.
            </p>
          </div>
        </div>

        <Link
          href="#testimony"
          className="inline-flex items-center gap-2 px-[32px] py-[16px] bg-[#000080] text-[#FFFDFD] text-[25px] font-medium rounded-[35px] drop-shadow-[19px_19px_20px_rgba(0,0,0,0.1)] hover:bg-[#0000a0] transition-colors"
        >
          Share Your Experience
        </Link>
      </div>
    </section>
  );
}
