import Link from "next/link";

const events = [
  { date: "1st Mar. 2026", title: "Thanksgiving Service", time: "7:45am", highlight: true },
  { date: "10th Mar. 2026", title: "Digging Deep", time: "6:30pm", highlight: false },
  { date: "20th Mar. 2026", title: "Congregational Vigil", time: "7:45am", highlight: true },
];

export default function Events() {
  return (
    <section id="calendar" className="bg-[#D2D2E2] px-[120px] py-[84px] flex flex-col gap-[32px] w-full">
      <h2
        className="text-[#100E1A] text-[48px] font-bold text-center leading-normal"
        style={{ fontVariationSettings: '"wdth" 100' }}
      >
        Events
      </h2>

      <div className="flex flex-col gap-[24px]">
        {events.map((event) => (
          <div
            key={event.title}
            className={`flex items-center p-[12px] rounded-[30px] ${
              event.highlight ? "bg-[#000080]/80" : "bg-[#FFFDFD]/70"
            }`}
          >
            <div className="w-[210px] px-[12px] py-[8px]">
              <span
                className={`text-[25px] font-normal leading-normal ${
                  event.highlight ? "text-[#FFFDFD]" : "text-[#00003D]"
                }`}
                style={{ fontVariationSettings: '"wdth" 100' }}
              >
                {event.date}
              </span>
            </div>

            <div className="w-[345px] px-[12px] py-[8px]">
              <span
                className={`text-[25px] font-bold leading-[32.5px] ${
                  event.highlight ? "text-[#FFFDFD]" : "text-[#00003D]"
                }`}
                style={{ fontVariationSettings: '"wdth" 100' }}
              >
                {event.title}
              </span>
            </div>

            <div className="w-[130px] px-[12px] py-[8px]">
              <span
                className={`text-[25px] font-normal leading-normal ${
                  event.highlight ? "text-[#FFFDFD]" : "text-[#00003D]"
                }`}
                style={{ fontVariationSettings: '"wdth" 100' }}
              >
                {event.time}
              </span>
            </div>

            <div className="flex items-center gap-2 ml-auto">
              <button className="px-[32px] py-[12px] bg-[#FFFDFD] text-[#000080] text-base font-bold rounded-[30px] hover:bg-gray-100 transition-colors whitespace-nowrap">
                I Will be There
              </button>
              <button
                className={`px-[32px] py-[12px] text-base font-normal rounded-[30px] transition-colors whitespace-nowrap ${
                  event.highlight ? "text-[#FFFDFD]/65 hover:text-[#FFFDFD]" : "text-[#00003D]/65 hover:text-[#00003D]"
                }`}
                style={{ fontVariationSettings: '"wdth" 100' }}
              >
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-center">
        <Link
          href="/events"
          className="text-[#000080] text-[25px] font-medium leading-normal hover:underline"
          style={{ fontVariationSettings: '"wdth" 100' }}
        >
          View all
        </Link>
      </div>
    </section>
  );
}
