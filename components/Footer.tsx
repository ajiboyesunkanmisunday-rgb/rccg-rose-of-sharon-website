import Link from "next/link";
import { FOOTER_SECTIONS, SOCIALS } from "./site-data";

const year = new Date().getFullYear();

export default function Footer() {
  return (
    <footer className="relative w-full bg-gradient-to-b from-ros-red to-ros-maroon font-lato">
      {/* ─── Give CTA banner (raised above footer) ─── */}
      <div className="absolute -top-12 left-0 right-0 mx-auto h-[350px] max-w-6xl overflow-hidden rounded-lg bg-[#F8EAEA] px-8 md:px-16">
        <div
          style={{ backgroundImage: "url(/assets/give-illustration.png)" }}
          className="absolute -bottom-[10%] right-[-5%] z-0 h-[300px] w-full bg-contain bg-right-bottom bg-no-repeat opacity-60"
        />
        <h2 className="relative z-10 pt-6 font-anton text-3xl font-normal text-black md:pt-12 md:text-6xl lg:text-[80px]">
          Give to Rose of Sharon
        </h2>
        <p className="relative z-10 mt-2 text-base text-[#000000B2] md:text-lg lg:text-xl">
          Your generosity keeps blessing lives, thank you for giving.
        </p>
        <div className="relative z-10 mt-10 flex flex-col items-start gap-2 sm:flex-row sm:items-center">
          <Link
            href="/give"
            className="flex h-10 items-center justify-center rounded-full border border-foreground bg-white px-4 text-[0.75rem] font-extrabold uppercase tracking-[.25em] text-black transition duration-300 hover:border-textRed hover:bg-textRed hover:text-white sm:h-12"
          >
            Give Now
          </Link>
          <Link
            href="/give"
            className="flex h-10 items-center justify-center rounded-full border border-textRed bg-textRed px-4 text-[0.75rem] font-extrabold uppercase tracking-[.25em] text-white transition duration-300 hover:border-foreground hover:bg-white hover:text-black sm:h-12"
          >
            Building Project
          </Link>
        </div>
      </div>

      {/* ─── Main footer body ─── */}
      <div className="container mx-auto w-full px-5 pb-[3.125rem] pt-96 md:px-[3.75rem]">
        {/* Mailing list */}
        <p className="mb-4 text-center font-lato text-xl font-[900] leading-10 tracking-[0.4rem] text-white md:text-[2rem] md:tracking-[10.24px]">
          JOIN OUR MAILING LIST
        </p>
        <div className="mx-auto w-full max-w-[514px]">
          <p className="mb-10 text-center font-lato text-base font-normal leading-[25.6px] tracking-wide text-[#ffffffb2]">
            We promise not to spam you, but send you edifying and amazing content regularly from RCCG Rose of Sharon.
          </p>
        </div>
        <form className="mx-auto flex max-w-lg flex-col gap-3">
          <input
            type="email"
            placeholder="Email"
            aria-label="Email"
            className="w-full border border-white/20 bg-white/10 px-5 py-[13px] text-[14px] text-white outline-none transition-colors placeholder:text-white/40 focus:border-white/50"
          />
          <button
            type="submit"
            className="w-full bg-white py-[13px] text-[12px] font-bold tracking-[0.18em] text-ros-maroon transition-colors hover:bg-white/90"
          >
            Submit
          </button>
        </form>

        <div className="my-12 border-b-[0.5px] border-[#ffffff33] md:my-[7.5rem]" />

        {/* Footer logo (mobile) */}
        <div className="mb-8 flex items-center gap-2.5 2xl:hidden">
          <img src="/assets/logo.png" alt="RCCG Rose of Sharon" className="h-10 w-auto brightness-0 invert" />
          <img src="/assets/logo-text.svg" alt="Rose of Sharon" className="h-4 w-auto" />
        </div>

        {/* Footer nav grid */}
        <div className="my-12 grid grid-cols-2 gap-10 md:my-[7.5rem] md:grid-cols-4 2xl:grid-cols-[auto_1fr_1fr_1fr_1fr]">
          <div className="hidden items-start 2xl:flex">
            <img src="/assets/logo.png" alt="RCCG Rose of Sharon" className="h-10 w-auto brightness-0 invert" />
          </div>

          {FOOTER_SECTIONS.map((section) => (
            <dl key={section.title}>
              <dt className="mb-4 font-lato text-[0.625rem] font-light uppercase tracking-[0.15rem] text-[#ffffff99]">
                {section.title}
              </dt>
              {section.links.map((link) => (
                <dd key={link.title} className="mb-3">
                  <Link href={link.href} className="font-lato text-sm tracking-[0.14px] text-white hover:underline">
                    {link.title}
                  </Link>
                </dd>
              ))}
            </dl>
          ))}
        </div>

        {/* Copyright + socials */}
        <div className="flex flex-col items-center justify-between gap-4 border-t border-[#ffffff33] pt-6 text-xs text-[#FFFFFF66] sm:flex-row">
          <span>© Copyright {year} RCCG Rose of Sharon. All Rights Reserved.</span>
          <div className="flex items-center gap-2">
            {SOCIALS.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                className="flex h-9 w-9 items-center justify-center rounded-full bg-[#FFFFFF1F] hover:bg-[#FFFFFF33]"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
                  <path d={social.path} />
                </svg>
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
