import Link from "next/link";

const events = [
  {
    date: "1st Mar. 2026",
    title: "Thanksgiving Service",
    time: "7:45am",
    highlight: true,
  },
  {
    date: "10th Mar. 2026",
    title: "Digging Deep",
    time: "6:30pm",
    highlight: false,
  },
  {
    date: "20th Mar. 2026",
    title: "Congregational Vigil",
    time: "7:45am",
    highlight: true,
  },
];

export default function Events() {
  return (
    <section id="calendar" className="bg-[#D2D2E2] px-30 py-21">
      <div className="flex flex-col gap-8">
        <h2 className="text-[#100E1A] text-[48px] font-bold text-center">Events</h2>

        <div className="flex flex-col gap-6">
          {events.map((event) => (
            <div
              key={event.title}
              className={`flex items-center justify-between px-3 py-3 rounded-[30px] ${
                event.highlight
                  ? "bg-[#000080]/80"
                  : "bg-[#FFFDFD]/70"
              }`}
            >
              <div className="w-[210px] px-3 py-2">
                <span
                  className={`text-[25px] font-normal ${
                    event.highlight ? "text-white" : "text-[#00003D]"
                  }`}
                >
                  {event.date}
                </span>
              </div>

              <div className="w-[345px] px-3 py-2">
                <span
                  className={`text-[25px] font-bold leading-[32.5px] ${
                    event.highlight ? "text-white" : "text-[#00003D]"
                  }`}
                >
                  {event.title}
                </span>
              </div>

              <div className="w-[130px] px-3 py-2">
                <span
                  className={`text-[25px] font-normal ${
                    event.highlight ? "text-white" : "text-[#00003D]"
                  }`}
                >
                  {event.time}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button className="px-8 py-3 bg-[#FFFDFD] text-[#000080] text-base font-bold rounded-[30px] hover:bg-gray-100 transition-colors whitespace-nowrap">
                  I Will be There
                </button>
                <button
                  className={`px-8 py-3 text-base font-bold rounded-[30px] transition-colors whitespace-nowrap ${
                    event.highlight ? "text-[#FFFDFD]/65 hover:text-white" : "text-[#00003D]/65 hover:text-[#00003D]"
                  }`}
                >
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Link href="#" className="text-[#000080] text-[25px] font-medium hover:underline">
            View all
          </Link>
        </div>
      </div>
    </section>
  );
}
