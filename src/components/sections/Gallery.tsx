import Image from "next/image";

const galleryImages = [
  "/assets/gallery-1.png",
  "/assets/gallery-2.png",
  "/assets/gallery-3.png",
  "/assets/gallery-4.png",
  "/assets/gallery-5.png",
  "/assets/gallery-6.png",
  "/assets/gallery-7.png",
  "/assets/gallery-8.png",
  "/assets/gallery-9.png",
  "/assets/gallery-10.png",
  "/assets/gallery-11.png",
  "/assets/gallery-12.png",
];

export default function Gallery() {
  return (
    <section id="gallery" className="bg-[#100E1A] px-4 md:px-[60px] lg:px-[120px] py-[60px] md:py-[84px] flex flex-col gap-[24px] items-center justify-center w-full">
      <h2
        className="text-[#FFFDFD] text-[26px] md:text-[32px] lg:text-[39px] font-semibold leading-normal text-center w-full"
        style={{ fontVariationSettings: '"wdth" 100' }}
      >
        Explore Our <span style={{ fontVariationSettings: '"wdth" 100' }}>Moments</span>
      </h2>

      <div className="h-[54px] w-[50px] relative flex-shrink-0">
        <Image src="/assets/icon-watch.svg" alt="" fill />
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-[12px] md:gap-[20px] w-full max-w-[1160px]">
        {galleryImages.map((src, i) => (
          <div key={i} className="relative overflow-hidden aspect-square">
            <Image
              src={src}
              alt=""
              fill
              className="object-cover pointer-events-none"
            />
          </div>
        ))}
      </div>

      <a
        href="/gallery"
        className="bg-[#000080] drop-shadow-[19px_19px_20px_rgba(0,0,0,0.1)] flex flex-col items-center justify-center px-[32px] py-[16px] relative flex-shrink-0 hover:bg-[#0000a0] transition-colors"
      >
        <span
          className="text-[#FFFDFD] text-[18px] md:text-[25px] font-medium leading-normal text-center"
          style={{ fontVariationSettings: '"wdth" 100' }}
        >
          View More
        </span>
      </a>
    </section>
  );
}
