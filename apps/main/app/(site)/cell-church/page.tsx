import Link from "@ros/shared/link";
import CentresDirectory from "@/components/CentresDirectory";

export default function CellChurchPage() {
  const activities = [
    {
      image: "/media/activityOne_optimized.ab130a98.jpg",
      title: "Worship & Prayer",
      description: "Strengthening faith through shared devotion.",
    },
    {
      image: "/family.jpg",
      title: "Biblical Teaching",
      description: "Learning and growing in the Word.",
    },
    {
      image: "/media/activityThree_optimized.05324fd1.jpg",
      title: "Fellowship & Support",
      description: "Encouraging one another in the faith",
    },
    {
      image: "/hero.jpg",
      title: "Evangelism & Outreach",
      description: "Reaching souls for Christ",
    },
  ];

  const whyJoin = [
    {
      title: "Stronger Community",
      description: "Grow in the faith with a close-knit group of believers.",
    },
    {
      title: "Spiritual Growth",
      description: "Deepen your faith through prayer, Bible study, and shared experiences.",
    },
    {
      title: "Leadership Development",
      description: "Step into your calling by leading and serving in your local house fellowship.",
    },
    {
      title: "Kingdom Expansion",
      description: "Be part of a movement bringing church to more homes and hearts.",
    },
  ];

  return (
    <>
      {/* ── HERO ── */}
      <div
        className="cell-church-hero-banner relative flex h-[600px] flex-col items-center justify-center bg-cover bg-center bg-no-repeat lg:h-[700px]"
      style={{ backgroundImage: "url('/media/hero.da0d6666.jpg')" }}
      >
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at center, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.7) 100%)" }} />
        <div className="relative z-10 mx-4 flex w-full max-w-2xl flex-col items-center gap-6">
          <h3 className="rounded-full bg-[#00000078] p-2 text-center text-[10px] font-bold uppercase tracking-[0.24rem] text-[#FFFFFFCC]">
            ⛪ <span className="ml-0.5">the house fellowship</span>
          </h3>
          <div className="w-full px-4 text-center font-anton text-[3rem] font-bold uppercase leading-[120%] tracking-wide text-white md:text-7xl md:leading-[108%]">
            <span className="block">Fellowship In</span>
            <span className="block">The Neighborhood</span>
          </div>
          <div className="mx-8">
            <div className="mt-8 flex flex-col items-center gap-4 md:flex-row md:justify-center">
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

      {/* ── CONTENT ── */}
      <div className="scroll-to-plus-nav mx-auto max-w-7xl px-4 py-12">
        <div className="h-fit bg-white">
          {/* What is a House Fellowship */}
          <div className="mt-10 flex flex-col items-start justify-between gap-5 py-[4%] md:mt-0 md:flex-row">
            <span className="flex flex-1 flex-col gap-4 font-anton text-[48px] font-normal uppercase leading-[40px] text-black md:leading-[120%]" style={{ fontSize: "clamp(30px, 8.5vw, 48px)" }}>
              <p className="text-black">What is a</p>
              <p className="text-[#DF4E4E]">House Fellowship?</p>
            </span>
            <span className="max-w-[30.6rem] flex-1 text-[16px] font-normal leading-[160%] tracking-[1%] text-[#00000099]">
              A house fellowship is a gathering of a small group of believers who meet regularly to grow in faith together. These groups are small and welcoming, usually 7-15 people, so everyone can participate, grow in their knowledge of Christ and build meaningful relationships.
            </span>
          </div>

          {/* Activity cards */}
          <div className="md-mt-0 mt-10 grid grid-cols-1 gap-4 pb-[4%] md:grid-cols-2 lg:grid-cols-4">
            {activities.map((activity, i) => (
              <div key={i} className="relative h-[440px] overflow-hidden rounded-lg">
                <img loading="lazy" decoding="async" src={activity.image} alt={activity.title} className="absolute inset-0 h-full w-full object-cover" />
                <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.3) 38%, rgba(0,0,0,0.35) 55%, rgba(0,0,0,0.82) 100%)" }} />
                <div className="absolute left-4 right-4 top-4 z-10">
                  <h3 className="text-lg font-bold text-white" style={{ textShadow: "0 1px 6px rgba(0,0,0,0.6)" }}>{activity.title}</h3>
                </div>
                <div className="absolute bottom-6 left-4 right-4 z-10">
                  <p className="mb-4 text-sm text-white" style={{ textShadow: "0 1px 6px rgba(0,0,0,0.6)" }}>{activity.description}</p>
                </div>
                <div className="absolute bottom-3 left-4 right-4 z-10 flex items-center gap-0.5 text-sm">
                  <Link href="/" className="capitalize text-white underline transition-colors hover:text-white">
                    Learn more
                  </Link>
                  <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="mt-1 text-white">
                    <path d="M5 12h14" /><path d="m12 5 7 7-7 7" />
                  </svg>
                </div>
              </div>
            ))}
          </div>

          {/* Why Join */}
          <div className="mt-16 flex flex-col items-start justify-between gap-8 py-[4%] md:mt-0 md:flex-row">
            <span className="flex flex-1 flex-col gap-4 font-anton text-[48px] font-normal uppercase leading-[40px] text-black md:leading-[120%]" style={{ fontSize: "clamp(30px, 8.5vw, 48px)" }}>
              <p className="text-black">Why Join A</p>
              <p className="text-[#DF4E4E]">House Fellowship?</p>
            </span>
            <div className="flex-1">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                {whyJoin.map((item, i) => (
                  <div key={i} className="relative h-[250px] rounded-[16px] border border-[#EABBBB] p-4 pb-16 shadow-md">
                    <div className="mt-6">
                      <h3 className="text-[24px] font-medium text-black">{item.title}</h3>
                      <p className="mt-4 max-w-[75%] text-sm text-gray-700">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>


    </>
  );
}
