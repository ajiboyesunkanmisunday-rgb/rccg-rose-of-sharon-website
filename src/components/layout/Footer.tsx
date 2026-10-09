import Image from "next/image";
import Link from "next/link";

const CONNECT = [
  { label: "Become a Member", href: "/e-member" },
  { label: "Prayer Request", href: "/requests/prayer" },
  { label: "First Timers", href: "/first-timer" },
  { label: "New Believer", href: "/new-believer" },
];

const MINISTRIES = [
  { label: "Church Groups", href: "/groups" },
  { label: "CSR Program", href: "/csr" },
  { label: "Training Programs", href: "/trainings" },
];

const RESOURCES = [
  { label: "Celebrations", href: "/celebrations" },
  { label: "Counselling", href: "/requests/counseling" },
  { label: "Announcements", href: "/announcements" },
  { label: "Gallery", href: "/gallery" },
  { label: "Testimonies", href: "/testimonies" },
  { label: "Marketplace", href: "/marketplace" },
];

const MEDIA = [
  { label: "Watch Online", href: "/media" },
  { label: "Upcoming Events", href: "/events" },
  { label: "Give Online", href: "/give" },
];

export default function Footer() {
  return (
    <footer className="bg-[#7B1113] text-white">
      {/* Main footer grid */}
      <div className="px-6 md:px-16 xl:px-24 pt-16 pb-10">
        {/* Logo row */}
        <div className="mb-12">
          <Link href="/" className="flex items-center gap-3 w-fit">
            <div className="relative w-10 h-10">
              <Image src="/assets/logo.png" alt="RCCG Rose of Sharon" fill className="object-contain brightness-0 invert" />
            </div>
            <div className="flex flex-col leading-tight">
              <span className="font-barlow-condensed text-white text-[18px] font-black tracking-wider uppercase">ROSE OF SHARON</span>
              <span className="font-barlow-condensed text-white/60 text-[11px] font-semibold tracking-[0.2em] uppercase">RCCG · Endless Life</span>
            </div>
          </Link>
        </div>

        {/* 4-column links */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-8 mb-14">
          {/* Connect */}
          <div>
            <p className="font-barlow-condensed text-white/50 text-[11px] font-bold tracking-[0.2em] uppercase mb-5">CONNECT</p>
            <ul className="flex flex-col gap-3">
              {CONNECT.map((l) => (
                <li key={l.label}>
                  <Link href={l.href} className="font-barlow text-white/80 text-[15px] hover:text-white transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Ministries */}
          <div>
            <p className="font-barlow-condensed text-white/50 text-[11px] font-bold tracking-[0.2em] uppercase mb-5">MINISTRIES</p>
            <ul className="flex flex-col gap-3">
              {MINISTRIES.map((l) => (
                <li key={l.label}>
                  <Link href={l.href} className="font-barlow text-white/80 text-[15px] hover:text-white transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <p className="font-barlow-condensed text-white/50 text-[11px] font-bold tracking-[0.2em] uppercase mb-5">RESOURCES</p>
            <ul className="flex flex-col gap-3">
              {RESOURCES.map((l) => (
                <li key={l.label}>
                  <Link href={l.href} className="font-barlow text-white/80 text-[15px] hover:text-white transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Media */}
          <div>
            <p className="font-barlow-condensed text-white/50 text-[11px] font-bold tracking-[0.2em] uppercase mb-5">MEDIA</p>
            <ul className="flex flex-col gap-3">
              {MEDIA.map((l) => (
                <li key={l.label}>
                  <Link href={l.href} className="font-barlow text-white/80 text-[15px] hover:text-white transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/15 pt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <p className="font-barlow text-white/40 text-[13px]">
            © {new Date().getFullYear()} RCCG Rose of Sharon. All rights reserved.
          </p>

          {/* Social icons */}
          <div className="flex items-center gap-5">
            <a href="https://www.instagram.com/rccgros/?hl=en" target="_blank" rel="noopener noreferrer"
              aria-label="Instagram" className="text-white/50 hover:text-white transition-colors">
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </a>
            <a href="https://www.facebook.com/rccgrospage/" target="_blank" rel="noopener noreferrer"
              aria-label="Facebook" className="text-white/50 hover:text-white transition-colors">
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </a>
            <a href="https://www.youtube.com/@rccgrostv" target="_blank" rel="noopener noreferrer"
              aria-label="YouTube" className="text-white/50 hover:text-white transition-colors">
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                <path d="M23.495 6.205a3.007 3.007 0 0 0-2.088-2.088c-1.87-.501-9.396-.501-9.396-.501s-7.507-.01-9.396.501A3.007 3.007 0 0 0 .527 6.205a31.247 31.247 0 0 0-.522 5.805 31.247 31.247 0 0 0 .522 5.783 3.007 3.007 0 0 0 2.088 2.088c1.868.502 9.396.502 9.396.502s7.506 0 9.396-.502a3.007 3.007 0 0 0 2.088-2.088 31.247 31.247 0 0 0 .5-5.783 31.247 31.247 0 0 0-.5-5.805zM9.609 15.601V8.408l6.264 3.602z"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
