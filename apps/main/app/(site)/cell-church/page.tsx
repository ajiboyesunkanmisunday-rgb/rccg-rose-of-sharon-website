import Link from "@ros/shared/link";
import CentresDirectory from "@/components/CentresDirectory";

export default function CellChurchPage() {
  return (
    <>
      {/* ── HERO ── */}
      <div
        className="cell-church-hero-banner relative flex h-[600px] flex-col items-center justify-center bg-cover bg-center bg-no-repeat lg:h-[700px]"
      style={{ backgroundImage: "url('/media/hero.da0d6666.jpg')" }}
      >
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at center, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.7) 100%)" }} />
        <div className="relative z-10 mx-auto px-4 md:px-8 flex w-full max-w-7xl flex-col items-start gap-6">
          <h3 className="rounded-full bg-[#00000078] p-2 text-left text-[10px] font-bold uppercase tracking-[0.24rem] text-[#FFFFFFCC]">
            ⛪ <span className="ml-0.5">the house fellowship</span>
          </h3>
          <div className="w-full px-4 text-left font-anton text-[3rem] font-bold uppercase leading-[120%] tracking-wide text-white md:text-7xl md:leading-[108%]">
            <span className="block">Fellowship In</span>
            <span className="block">The Neighborhood</span>
          </div>
          <div className="mx-8">
            <div className="mt-8 flex flex-col items-start gap-4 md:flex-row md:items-center md:justify-start">
              <Link
                href="#centres"
                className="flex w-full items-center justify-center gap-2 rounded-full border border-white bg-transparent px-5 py-3 text-[0.75rem] font-extrabold uppercase tracking-[.25em] text-white transition duration-300 hover:border-textRed hover:bg-textRed hover:text-white md:w-auto"
              >
                JOIN A FELLOWSHIP
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* ── CENTRES (first, so visitors can find a fellowship straight away) ── */}
      <CentresDirectory />
    </>
  );
}
