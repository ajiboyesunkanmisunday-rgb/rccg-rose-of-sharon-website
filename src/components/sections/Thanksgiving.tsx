export default function Thanksgiving() {
  return (
    <section
      id="thanksgiving"
      className="relative px-30 py-21 flex items-center justify-center min-h-[510px]"
      style={{
        backgroundImage: "url('/thanksgiving-bg.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-[#000080] via-[#000080]/80 to-transparent" />

      <div className="relative z-10 max-w-[860px] flex flex-col items-center gap-8 text-center">
        <h2 className="text-[#FFFDFD] text-[39px] font-semibold">
          Special Thanksgiving Request
        </h2>

        <div className="flex flex-col items-center gap-6">
          <div className="flex items-center gap-1">
            {[0, 1, 2].map((i) => (
              <div key={i} className="w-1 h-1 bg-[#FFFDFD] rounded-full" />
            ))}
            <div className="w-[100px] h-1 bg-[#FFFDFD] rounded-[12px]" />
          </div>

          <p className="text-[#FFFDFD] text-[20px] font-normal">
            The church would love to rejoice with you on your special day! Whether you're marking a
            birthday, wedding, or anniversary, we want to celebrate and pray for you. Fill out the form
            below to notify us, and let's make your day even more special with love, prayers, and warm
            wishes from the church family.
          </p>
        </div>

        <h3 className="text-[#B5B5F3] text-[48px] font-bold">
          Is Your Day Let&apos;s Celebrate With You
        </h3>

        <button className="flex items-center gap-2 px-8 py-4 bg-[#000080] text-[#FFFDFD] text-[25px] font-medium rounded-[35px] shadow-[19px_19px_40px_rgba(0,0,0,0.10)] hover:bg-[#0000a0] transition-colors border border-white/20">
          <svg className="w-5 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          SEND US YOUR SPECIAL DAY
        </button>
      </div>
    </section>
  );
}
