import Link from "next/link";
import Image from "next/image";

const vs = { fontVariationSettings: '"wdth" 100' };

export default function NotFound() {
  return (
    <main className="bg-[#100E1A] min-h-screen flex flex-col items-center justify-center px-[120px] py-[84px] relative overflow-hidden">
      <div aria-hidden className="absolute inset-0 pointer-events-none opacity-10">
        <Image src="/assets/hero-bg.png" alt="" fill className="object-cover" />
      </div>

      <div className="relative z-10 flex flex-col gap-[32px] items-center text-center max-w-[700px]">
        <div className="flex items-center gap-[12px]">
          <Image src="/assets/logo.png" alt="RCCG Rose of Sharon" width={56} height={56} />
          <Image src="/assets/logo-text.svg" alt="Rose of Sharon" width={220} height={34} />
        </div>

        <h1
          className="text-[#B5B5F3] text-[120px] font-bold leading-none"
          style={vs}
        >
          404
        </h1>

        <p className="text-[#FFFDFD] text-[32px] font-medium leading-normal" style={vs}>
          Page Not Found
        </p>

        <p className="text-[#A3A1AF] text-[18px] font-normal leading-[1.7]" style={vs}>
          The page you&apos;re looking for doesn&apos;t exist or may have been moved.
          Let&apos;s get you back to where you belong.
        </p>

        <div className="flex flex-wrap gap-[16px] items-center justify-center">
          <Link
            href="/"
            className="px-[32px] py-[16px] bg-[#000080] text-[#FFFDFD] text-[18px] font-medium rounded-[35px] hover:bg-[#0000a0] transition-colors"
            style={vs}
          >
            Go Home
          </Link>
          <Link
            href="/events"
            className="px-[32px] py-[16px] border-2 border-[#B5B5F3] text-[#B5B5F3] text-[18px] font-medium rounded-[35px] hover:bg-[#B5B5F3]/10 transition-colors"
            style={vs}
          >
            Upcoming Events
          </Link>
        </div>

        <div className="flex flex-wrap gap-[24px] items-center justify-center pt-[8px]">
          {[
            { label: "First Timer", href: "/first-timer" },
            { label: "Trainings", href: "/trainings" },
            { label: "Groups", href: "/groups" },
            { label: "Testimonies", href: "/testimonies" },
            { label: "Prayer Request", href: "/requests/prayer" },
          ].map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-[#A3A1AF] text-[15px] hover:text-[#B5B5F3] transition-colors"
              style={vs}
            >
              {l.label}
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
