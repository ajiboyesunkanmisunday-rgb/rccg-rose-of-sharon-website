import Image from "next/image";
import Link from "next/link";

const vs = { fontVariationSettings: '"wdth" 100' };

const features = [
  "Secure & instant online giving",
  "Support ongoing church ministries",
  "Fund community outreach & CSR programs",
  "Every gift is sown into transformed lives",
];

export default function GiveOnline() {
  return (
    <section id="give" className="bg-[#0A0818] px-6 md:px-[60px] lg:px-[120px] py-[60px] md:py-[84px] w-full overflow-hidden">
      <div className="flex flex-col lg:flex-row items-center gap-[48px] lg:gap-[80px] max-w-[1148px] mx-auto">

        {/* Left: text */}
        <div className="flex flex-col gap-[24px] flex-1 min-w-0">
          <p className="text-[#B5B5F3] text-[14px] font-normal uppercase tracking-[0.15em]" style={vs}>
            Support the Mission
          </p>
          <h2
            className="text-[#FFFDFD] text-[32px] md:text-[42px] lg:text-[52px] font-bold leading-[1.15]"
            style={vs}
          >
            Give Online
          </h2>
          <p className="text-[#A3A1AF] text-[16px] md:text-[18px] font-normal leading-[1.8]" style={vs}>
            Every seed you plant fuels transformed lives, growing communities, and God&apos;s purpose
            being fulfilled through Rose of Sharon. Your giving makes a real, lasting difference.
          </p>
          <ul className="flex flex-col gap-[12px]">
            {features.map((item) => (
              <li key={item} className="flex items-center gap-[10px] text-[#FFFDFD] text-[15px]" style={vs}>
                <div className="size-[20px] rounded-full bg-[#000080] flex items-center justify-center flex-shrink-0">
                  <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                    <path d="M1 4l2.5 2.5L9 1" stroke="#B5B5F3" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                {item}
              </li>
            ))}
          </ul>
          <div className="pt-[8px]">
            <Link
              href="/give"
              className="inline-flex items-center gap-[8px] px-[32px] py-[14px] bg-[#000080] text-[#FFFDFD] text-[15px] font-bold rounded-[30px] hover:bg-[#0000a0] transition-colors shadow-[0_4px_16px_rgba(0,0,128,0.35)]"
              style={vs}
            >
              Give Now
            </Link>
          </div>
        </div>

        {/* Right: illustration */}
        <div className="relative flex-shrink-0 w-full lg:w-[460px] h-[300px] md:h-[360px] rounded-[24px] overflow-hidden bg-[#1a1826] border border-[#B5B5F3]/10 flex items-center justify-center">
          <div className="absolute inset-0">
            <Image src="/assets/give-bg.png" alt="" fill className="object-cover opacity-20" />
          </div>
          <div className="relative w-full h-full p-[24px]">
            <Image src="/assets/give-illustration.png" alt="Give Online" fill className="object-contain p-[16px]" />
          </div>
        </div>
      </div>
    </section>
  );
}
