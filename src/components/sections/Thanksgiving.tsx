import Link from "next/link";

export default function Thanksgiving() {
  return (
    <section id="thanksgiving" className="flex items-center relative w-full min-h-[510px]">
      <div aria-hidden className="absolute inset-0 pointer-events-none">
        <div className="absolute bg-[#000080] inset-0" />
        <div className="absolute inset-0 opacity-[0.57] overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/assets/thanksgiving-bg.png"
            alt=""
            className="absolute max-w-none"
            style={{ left: "21.46%", width: "78.54%", height: "155.68%", top: "-45.86%" }}
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-l from-[rgba(255,255,255,0)] from-[39.9%] to-[#000080] to-[75.5%]" />
      </div>

      <div className="flex flex-1 flex-col gap-[32px] items-center min-w-0 px-[120px] py-[84px] relative">
          <h2
            className="text-[#FFFDFD] text-[39px] font-semibold leading-normal text-center w-full"
            style={{ fontVariationSettings: '"wdth" 100' }}
          >
            Special Thanksgiving Request
          </h2>

          <div className="flex flex-col gap-[24px] items-center w-full">
            <div className="h-[4px] w-[127px] relative flex-shrink-0 overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/assets/icon-frame-1.svg" alt="" className="absolute inset-0 w-full h-full" />
            </div>
            <p
              className="text-[#FFFDFD] text-[20px] font-normal leading-normal text-center w-full"
              style={{ fontVariationSettings: '"wdth" 100' }}
            >
              The church would love to rejoice with you on your special day! Whether you&apos;re marking a
              birthday, wedding, or anniversary, we want to celebrate and pray for you. Fill out the form
              below to notify us, and let&apos;s make your day even more special with love, prayers, and warm
              wishes from the church family.
            </p>
          </div>

          <h3
            className="text-[#B5B5F3] text-[48px] font-bold leading-normal text-center w-full"
            style={{ fontVariationSettings: '"wdth" 100' }}
          >
            Is Your Day Let&apos;s Celebrate With You
          </h3>

        <Link href="/celebrations" className="flex items-center gap-[5px] px-[32px] py-[16px] bg-[#000080] text-[#FFFDFD] text-[25px] font-medium rounded-[35px] drop-shadow-[19px_19px_20px_rgba(0,0,0,0.1)] hover:bg-[#0000a0] transition-colors flex-shrink-0">
          <div className="h-[22px] w-[24px] flex-shrink-0 overflow-hidden relative">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/assets/icon-vector.svg" alt="" className="absolute inset-0 w-full h-full" />
          </div>
          SEND US YOUR SPECIAL DAY
        </Link>
      </div>
    </section>
  );
}
