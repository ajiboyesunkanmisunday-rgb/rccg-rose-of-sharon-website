export default function Gallery() {
  const placeholders = Array.from({ length: 12 });

  return (
    <section id="gallery" className="bg-[#100E1A] px-30 py-21 flex flex-col items-center gap-6">
      <h2 className="text-[#FFFDFD] text-[39px] font-semibold">Explore Our Moments</h2>

      <div className="w-full max-w-[1160px]">
        <div className="grid grid-cols-4 gap-3">
          {placeholders.map((_, i) => (
            <div
              key={i}
              className="aspect-[269/179] bg-white/10 rounded-lg overflow-hidden"
              style={{
                backgroundImage: `url('/gallery/photo-${i + 1}.jpg')`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <div className="w-full h-full bg-[#100E1A]/20" />
            </div>
          ))}
        </div>
      </div>

      <button className="flex items-center gap-2 px-8 py-4 bg-[#000080] text-[#FFFDFD] text-[25px] font-medium rounded-sm shadow-[19px_19px_40px_rgba(0,0,0,0.10)] hover:bg-[#0000a0] transition-colors">
        View More
      </button>
    </section>
  );
}
