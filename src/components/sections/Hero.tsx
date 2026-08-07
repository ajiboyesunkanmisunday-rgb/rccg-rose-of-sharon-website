import Navbar from "@/components/layout/Navbar";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative h-[735px] w-full overflow-hidden flex items-center justify-center">
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/hero-bg.jpg')" }}
      />
      <div className="absolute inset-0 bg-black/65" />

      <Navbar />

      {/* Content */}
      <div className="relative z-10 max-w-[1148px] mx-auto px-6 flex flex-col items-center gap-21 pt-16">
        <div className="flex flex-col gap-8 text-center">
          <h1 className="text-white text-[84px] font-medium leading-tight">
            A Place Where God Have a Permanent Seat!
          </h1>
          <p className="text-white text-[25px] font-normal leading-8">
            Step into a place where God's presence is constant, His Word is powerful, and your life is transformed.
          </p>
        </div>

        <Link
          href="#media"
          className="flex items-center gap-2 px-8 py-4 bg-[#000080] text-white text-[25px] font-medium rounded-[35px] shadow-[19px_19px_40px_rgba(0,0,0,0.10)] hover:bg-[#0000a0] transition-colors"
        >
          <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="10" fill="white" opacity="0.9" />
            <polygon points="10,8 16,12 10,16" fill="#000080" />
          </svg>
          Watch Sermon
        </Link>
      </div>
    </section>
  );
}
