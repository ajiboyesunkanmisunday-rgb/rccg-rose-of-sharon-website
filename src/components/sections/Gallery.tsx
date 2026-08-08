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
    <section id="gallery" className="bg-[#100E1A] px-[120px] py-[84px] flex flex-col gap-[24px] items-center justify-center w-full">
      <h2
        className="text-[#FFFDFD] text-[39px] font-semibold leading-normal text-center min-w-full w-[min-content]"
        style={{ fontVariationSettings: '"wdth" 100' }}
      >
        Explore Our <span style={{ fontVariationSettings: '"wdth" 100' }}>Moments</span>
      </h2>

      <div className="h-[54px] w-[50px] relative flex-shrink-0">
        <Image src="/assets/icon-watch.svg" alt="" fill />
      </div>

      <div className="flex flex-col gap-[8px] items-center w-full">
        <div
          className="grid gap-x-[20px] gap-y-[20px] overflow-clip p-[12px] w-[1160px]"
          style={{
            gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
            gridTemplateRows: "179.33px 179.33px 179.33px",
            height: "428px",
          }}
        >
          {galleryImages.map((src, i) => (
            <div key={i} className="relative overflow-hidden">
              <Image
                src={src}
                alt=""
                fill
                className="object-cover pointer-events-none"
              />
            </div>
          ))}
        </div>

        <div className="bg-[#000080] drop-shadow-[19px_19px_20px_rgba(0,0,0,0.1)] flex flex-col items-center justify-center px-[32px] py-[16px] rounded-[35px] relative flex-shrink-0">
          <span
            className="text-[#FFFDFD] text-[25px] font-medium leading-normal text-center whitespace-nowrap"
            style={{ fontVariationSettings: '"wdth" 100' }}
          >
            View More
          </span>
        </div>
      </div>
    </section>
  );
}
