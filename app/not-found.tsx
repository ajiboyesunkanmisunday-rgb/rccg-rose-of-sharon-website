import Link from "next/link";

export default function NotFound() {
  return (
    <section className="flex min-h-[70vh] flex-col items-center justify-center gap-6 bg-black px-4 py-24 text-center">
      <img src="/assets/logo.png" alt="RCCG Rose of Sharon" className="h-14 w-auto" />
      <h1 className="font-anton text-[96px] leading-none text-textRed md:text-[140px]">404</h1>
      <p className="font-anton text-2xl uppercase text-white md:text-4xl">Page not found</p>
      <p className="max-w-md text-[#FFFFFFB2]">
        The page you&apos;re looking for doesn&apos;t exist or may have been moved. Let&apos;s get you back where you belong.
      </p>
      <div className="flex flex-wrap items-center justify-center gap-3">
        <Link
          href="/"
          className="rounded-full border border-textRed bg-textRed px-6 py-3 text-[0.75rem] font-extrabold uppercase tracking-[.25em] text-white hover:border-white hover:bg-transparent"
        >
          Go home
        </Link>
        <Link
          href="/first-timer"
          className="rounded-full border border-white px-6 py-3 text-[0.75rem] font-extrabold uppercase tracking-[.25em] text-white hover:bg-white hover:text-black"
        >
          I&apos;m a first timer
        </Link>
      </div>
    </section>
  );
}
