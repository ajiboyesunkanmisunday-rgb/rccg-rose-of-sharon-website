"use client";

import { useState } from "react";
import Link, { A } from "../link";
import { post } from "../api";

const year = new Date().getFullYear();

const footerSections = [
  {
    title: "connect",
    links: [
      { title: "Become a member",  href: "/membership" },
      { title: "Prayer Request",   href: "/requests/prayer" },
      { title: "First Timers",     href: "/first-timer" },
      { title: "Testimonies",       href: "/testimonies" },
    ],
  },
  {
    title: "Ministries",
    links: [
      { title: "Hearts of David (Men)",  href: "/ministries/hearts-of-david" },
      { title: "Rose of Sharon Choir",  href: "/ministries/choir" },
      { title: "Oaks of Righteousness (Women)", href: "/ministries/oaks-of-righteousness" },
      { title: "Youth Fellowship",         href: "/youth" },
      { title: "Children Church",          href: "/ministries/kids-and-teens" },
    ],
  },
  {
    title: "Resources",
    links: [
      { title: "Believers Class",          href: "/membership-class" },
      { title: "Celebrations",             href: "/celebrations" },
      { title: "Relationship Talks",       href: "/counselling" },
      { title: "Announcements",           href: "/announcements" },
      { title: "Welfare Request",          href: "/welfare" },
      { title: "Suggestion Box",           href: "/requests/suggestion" },
    ],
  },
  {
    title: "Media",
    links: [
      { title: "Watch Online", href: "https://www.youtube.com/@rccgrostv", blank: true },
      { title: "Sermons",      href: "/media" },
    ],
  },
];

function MailingListForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim()) return;
    setStatus("loading");
    setMessage("");
    try {
      await post("/requests/suggestion", {
        subject: "Mailing List Subscription",
        content: `Please add this email address to the mailing list: ${email.trim()}`,
      });
      setStatus("success");
      setEmail("");
      setMessage("Thank you for subscribing!");
    } catch {
      setStatus("error");
      setMessage("Something went wrong. Please try again.");
    }
  }

  const field = { fontFamily: "Arial, Helvetica, sans-serif", fontSize: 14, height: 38, width: "100%", borderRadius: 8 } as const;
  return (
    <div className="mx-auto min-h-0 px-2 py-7">
      <form onSubmit={onSubmit} noValidate={false}>
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          aria-label="Email"
          style={{ ...field, background: "#fff", color: "#111", border: "1px solid #6b7280", padding: "0 12px", outline: "none" }}
        />
        <button
          type="submit"
          disabled={status === "loading"}
          style={{ ...field, marginTop: 24, background: "#fff", color: "#b20000", border: "none", cursor: "pointer", opacity: status === "loading" ? 0.7 : 1 }}
        >
          {status === "loading" ? "Submitting..." : "Submit"}
        </button>
        {message && (
          <p
            role="status"
            style={{ marginTop: 14, textAlign: "center", fontSize: 14, fontFamily: "Arial, Helvetica, sans-serif", color: status === "error" ? "#ffd2d2" : "#fff" }}
          >
            {message}
          </p>
        )}
      </form>
    </div>
  );
}

export default function Footer() {
  return (
    <footer className="relative w-full bg-gradient-to-b from-[#B20000] to-[#6B0000] font-lato" style={{ backgroundColor: "#B20000", backgroundImage: "linear-gradient(to bottom, #B20000, #6B0000)" }}>

      {/* ─── Give CTA banner (raised above footer) ─── */}
      <div className="-top-12 absolute left-0 right-0 mx-auto h-[350px] max-w-6xl overflow-hidden rounded-lg bg-[#F8EAEA] px-8 md:px-16">
        <div
          style={{ backgroundImage: "url(/hand.png)", pointerEvents: "none" }}
          className="absolute -bottom-[10%] right-[-5%] z-0 h-[300px] w-full bg-contain bg-right-bottom bg-no-repeat"
        />
        <h2 className="pt-6 font-anton font-normal text-3xl text-black md:pt-12 md:text-6xl lg:text-[80px]">
          Give to God
        </h2>
        <p className="z-20 mt-2 text-base text-[#000000B2] md:text-lg lg:text-xl">
          Your generosity keeps blessing lives, thank you for giving.
        </p>
        <div className="mt-10 flex flex-col items-start gap-2 sm:flex-row sm:items-center" style={{ position: "relative", zIndex: 10 }}>
          <A
            href="/give"
            className="flex h-10 items-center justify-center rounded-full border border-foreground bg-white px-4 text-[0.75rem] font-extrabold uppercase tracking-[.25em] text-black transition duration-300 hover:border-textRed hover:bg-textRed hover:text-white sm:h-12"
          >
            Give Now
          </A>
          <A
            href="/buildingproject"
            className="flex h-10 items-center justify-center rounded-full border border-textRed bg-textRed px-4 text-[0.75rem] font-extrabold uppercase tracking-[.25em] text-white transition duration-300 hover:border-foreground hover:bg-white hover:text-black sm:h-12"
          >
            Building Project
          </A>
        </div>
      </div>

      {/* ─── Main footer body ─── */}
      <div className="scroll-to-mailing-list container mx-auto w-full px-5 pb-[3.125rem] pt-96 md:px-[3.75rem]">

        {/* Mailing list */}
        <p className="mb-4 text-center font-lato text-xl font-[900] leading-10 tracking-[0.4rem] text-white md:text-[2rem] md:tracking-[10.24px]">
          JOIN OUR MAILING LIST
        </p>
        <div className="mx-auto w-full max-w-[514px]">
          <p className="mb-10 text-center font-lato text-base font-normal leading-[25.6px] tracking-wide text-[#ffffffb2]">
            We promise not to spam you, but send you edifying and amazing content regularly from RCCG Rose of Sharon.
          </p>
        </div>
        <div className="mx-auto max-w-lg">
          <MailingListForm />
        </div>

        {/* Divider */}
        <div className="my-12 border-b-[0.5px] border-[#ffffff33] md:my-[7.5rem]" />

        {/* Footer logo (mobile) */}
        <img src="/logo.svg" alt="RCCG Rose of Sharon" className="2xl:hidden mb-8 h-10 w-auto" />

        {/* Footer nav grid */}
        <div className="footer-grid my-12 md:my-[7.5rem]">
          {/* Logo (desktop) */}
          <img src="/logo.svg" alt="RCCG Rose of Sharon" className="hidden 2xl:inline-block h-10 w-auto" />

          {footerSections.map((section, i) => (
            <dl key={i}>
              <dt className="mb-4 font-lato text-[0.625rem] font-light uppercase tracking-[0.15rem]" style={{ color: "rgba(255,255,255,0.85)", fontWeight: 700, letterSpacing: "0.2em" }}>
                {section.title}
              </dt>
              {(section.links as { title: string; href: string; blank?: boolean }[]).map((link, j) => (
                <dd key={j} className="mb-3">
                  <A
                    href={link.href}
                    className="font-lato text-sm tracking-[0.14px] text-white hover:underline"
                    target={link.blank ? "_blank" : "_self"}
                    rel={link.blank ? "noopener noreferrer" : undefined}
                  >
                    {link.title}
                  </A>
                </dd>
              ))}
            </dl>
          ))}
        </div>

        {/* Copyright */}
        <div className="border-t border-[#ffffff33] pt-6 text-center text-xs text-[#FFFFFF66]">
          © Copyright {year} RCCG Rose of Sharon. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
}
