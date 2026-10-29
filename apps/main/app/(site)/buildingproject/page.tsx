"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { A } from "@ros/shared/link";

const fadeUp = { hidden: { opacity: 0, y: "10%" }, visible: { opacity: 1, y: 0, transition: { duration: 1 } } };

/*
 * Hero video of the proposed building plan. Put the video file in packages/shared/public/buildingproject/
 * (for example proposed-plan.mp4) and set this to "/buildingproject/proposed-plan.mp4". While it is empty the
 * hero shows the banner picture.
 */
const PLAN_VIDEO = "";

const S3 = "/assets/payments"; // payment logos, stored with the site

function CopyButton({ text, label = "COPY", className = "" }: { text: string; label?: string; className?: string; style?: React.CSSProperties }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      onClick={() => { navigator.clipboard.writeText(text); setCopied(true); setTimeout(() => setCopied(false), 2000); }}
      className={className}
    >
      {copied ? "COPIED!" : label}
    </button>
  );
}

export default function BuildingProjectPage() {
  const [tab, setTab] = useState<"one-time" | "recurring">("one-time");

  return (
    <>
      {/* ── HERO ── */}
      <motion.div
        variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { duration: 1.5 } } }}
        initial="hidden"
        animate="visible"
        className="rbc-give-header relative flex h-[600px] items-center justify-center overflow-hidden bg-cover bg-no-repeat lg:h-[700px]"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.62) 73%), url('/media/rbc-give-banner.75b7724a.jpg')`,
        }}
      >
        {PLAN_VIDEO && (
          <>
            <video autoPlay loop muted playsInline preload="auto" poster="/media/rbc-give-banner.75b7724a.jpg" className="absolute left-0 top-0 h-full w-full object-cover" aria-hidden="true">
              <source src={PLAN_VIDEO} type="video/mp4" />
            </video>
            <div className="absolute left-0 top-0 h-full w-full" style={{ background: "linear-gradient(rgba(0,0,0,0.45), rgba(0,0,0,0.6))" }} />
          </>
        )}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="relative z-10 mx-auto px-4 md:px-8 flex w-full max-w-7xl flex-col items-start gap-6"
        >
          <h1 className="my-3 max-w-[900px] text-left font-anton text-[3rem] font-medium uppercase text-white md:text-7xl md:leading-[1.2]">
            BUILD <span className="text-textRed">WITH US</span>
          </h1>
          <p className="w-full max-w-2xl text-left text-base text-[#FFFFFFB2] md:text-lg lg:text-xl">
            Our church is growing, and we&apos;re excited to take the next step: creating a building where our community can gather, worship, learn, and serve together.
          </p>
          <div className="mt-8 md:flex md:items-center md:justify-start">
            <A
              href="#global"
              className="mb-6 flex w-full items-center justify-center gap-2 rounded-full border border-white bg-white px-5 py-3 text-[0.75rem] font-extrabold uppercase tracking-[.25em] text-black transition duration-300 hover:border-textRed hover:bg-textRed hover:text-white md:w-auto"
            >
              Support God&apos;s Work
            </A>
          </div>
        </motion.div>
      </motion.div>

      {/* ── WAYS TO GIVE ── */}
      <div className="relative">
        <section className="bg-white px-4 py-12 md:py-20">
          <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 lg:grid-cols-[1.2fr_1fr]">
            <div className="flex flex-col gap-4">
              <h6 className="w-fit rounded-full bg-[#F4F4F4] px-3 py-1 text-xs font-bold">🏗️ BUILDING TOGETHER</h6>
              <h2 className="font-anton text-3xl uppercase leading-tight md:text-5xl">A place to worship, <span className="text-textRed">grow, and serve</span></h2>
              <p className="text-lg text-[#00000099]">This project is about more than bricks and mortar. It&apos;s about making room for meaningful connection, supporting people through every season of life, and welcoming future generations into a place of faith and hope.</p>
              <p className="text-lg text-[#00000099]">A project like this is made possible through the generosity, prayers, and participation of many people. Whether you choose to give, volunteer, share the vision, or keep the project in your prayers, you can help bring this dream to life.</p>
              <p className="text-lg font-bold text-black">Every contribution matters. Together, we can build a place that welcomes all and serves many.</p>
            </div>
            <div id="accounts" className="flex flex-col gap-4 rounded-lg border border-[#00000014] bg-[#FAFAFA] p-6" style={{ scrollMarginTop: 90 }}>
              <h3 className="font-anton text-2xl uppercase">RCCG ROS Building Fund</h3>
              <p className="text-sm text-[#00000099]">Give by bank transfer to either account below.</p>
              {[
                { bank: "Fidelity Bank", number: "6060094460" },
                { bank: "Globus Bank", number: "1000363698" },
              ].map((a) => (
                <div key={a.number} className="flex items-center justify-between gap-3 rounded bg-white p-4">
                  <div>
                    <p className="text-sm font-normal uppercase text-[#7F7C7C]">{a.bank}</p>
                    <p className="text-2xl font-medium text-black md:text-3xl">{a.number}</p>
                  </div>
                  <CopyButton text={a.number} label="COPY" className="cursor-pointer rounded-full border border-black px-4 py-2 text-xs font-bold tracking-[0.2em] transition hover:bg-black hover:text-white" />
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="overflow-hidden bg-[#F8F8F8CC]">
          <motion.div
            id="global"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="scroll-to-plus-nav mx-auto max-w-7xl px-4 py-10 md:py-20"
          >
            <div className="mb-6 flex flex-col flex-wrap items-center justify-between md:mb-10 md:flex-row">
              <h2 className="font-anton text-4xl font-normal leading-loose md:text-6xl">WAYS TO GIVE</h2>
              <div className="flex items-center gap-4 self-center">
                <button
                  onClick={() => setTab("one-time")}
                  className={`h-11 rounded-full border px-4 text-sm font-bold uppercase tracking-wider transition duration-300 md:px-7 md:text-lg ${
                    tab === "one-time"
                      ? "border-[#D71920] bg-white text-[#D71920]"
                      : "border-black bg-black text-white hover:border-black hover:bg-white hover:text-black"
                  }`}
                >
                  ONE-TIME GIVING
                </button>
                <button
                  onClick={() => setTab("recurring")}
                  className={`h-11 rounded-full border px-4 text-sm font-bold uppercase tracking-wider transition duration-300 md:px-7 md:text-lg ${
                    tab === "recurring"
                      ? "border-[#D71920] bg-white text-[#D71920]"
                      : "border-black bg-black text-white hover:border-black hover:bg-white hover:text-black"
                  }`}
                >
                  RECURRING GIVING
                </button>
              </div>
            </div>

            <section className="mx-auto max-w-7xl">
              <style>{`.bp-masonry{column-count:2;column-gap:16px}@media(max-width:767px){.bp-masonry{column-count:1}}.bp-masonry>div{display:contents}.bp-masonry>div>div{break-inside:avoid;margin-bottom:16px}`}</style>
              <div className="bp-masonry mx-auto md:pb-8">
                {/* Left column: bank accounts */}
                <div>
                  {/* Bank Transfer */}
                  <div className="mb-4 flex w-full flex-col rounded border border-[#F5811F29] bg-[#FEF0E4] p-4 md:mb-7">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-xl font-medium">
                        <img loading="lazy" decoding="async" src={`${S3}/access_bank_logp_1_6a47fbff2d.png`} alt="Bank" width={32} height={32} />
                        Bank Transfer
                      </div>
                      <img loading="lazy" decoding="async" src={`${S3}/nigeria_flag_a3b27f40ee.svg`} alt="Nigeria" width={34} height={24} />
                    </div>
                    <div className="mx-auto mt-6 flex w-full flex-col gap-2">
                      {[
                        { bank: "Fidelity Bank", number: "6060094460" },
                        { bank: "Globus Bank", number: "1000363698" },
                      ].map((a) => (
                        <div key={a.number} className="rounded bg-[#FFFFFFCC] p-2 lg:p-4">
                          <div className="mb-2 text-base font-normal uppercase text-[#7F7C7C]">{a.bank} · RCCG ROS Building Fund</div>
                          <div className="flex items-center justify-between">
                            <p className="text-2xl font-medium text-black lg:text-3xl">{a.number}</p>
                            <CopyButton text={a.number} label="Copy" className="cursor-pointer text-xs text-gray-400 hover:text-black" />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* International Transfer */}
                  <div className="flex w-full flex-col rounded border border-[#6FC59829] bg-[#F6FCF9] p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-xl font-medium">
                        <img loading="lazy" decoding="async" src={`${S3}/lemfi_icon_jpeg_1480cd6564.png`} alt="LemFi" width={32} height={32} />
                        International Transfer
                      </div>
                      <img loading="lazy" decoding="async" src={`${S3}/globus_19692219e3.svg`} alt="Global" width={34} height={24} />
                    </div>
                    <div className="mx-auto mt-8 w-full md:mt-20">
                      <div className="rounded bg-[#FFFFFFCC] p-2 lg:p-4">
                        <div className="mb-2 flex cursor-pointer items-center gap-2 text-base font-normal uppercase text-[#7F7C7C] underline">
                          USE your banking app
                        </div>
                        <div className="flex items-center justify-between">
                          <p className="text-2xl font-medium text-black lg:text-3xl">Contact the church</p>
                          <button onClick={() => navigator.clipboard.writeText("Contact the church")} className="cursor-pointer text-xs text-gray-400 hover:text-black">Copy</button>
                        </div>
                        <p className="uppercase text-[#7F7C7C]">SORT CODE: Contact the church</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right column: Stanbic + payment gateways */}
                <div className="flex flex-col gap-4">
                  {/* Stanbic IBTC */}
                  <div className="flex w-full flex-col rounded border border-[#3661FE29] bg-[#EFF2FF] p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-xl font-medium">
                        <img src={`${S3}/stanbic_logo_ibtc_dd0aff7db7.png`} alt="Stanbic IBTC" width={32} height={32} />
                        Domiciliary Accounts
                      </div>
                      <img loading="lazy" decoding="async" src={`${S3}/nigeria_flag_a3b27f40ee.svg`} alt="Nigeria" width={34} height={24} />
                    </div>
                    <div className="mt-4 flex flex-col gap-2">
                      {[
                        { label: "USD - Domiciliary account", number: "Contact the church", icon: `${S3}/usd_icon_8010e81f6b.svg` },
                        { label: "EURO - Domiciliary account", number: "Contact the church", icon: `${S3}/eur_icon_3960de2f32.svg` },
                        { label: "GBP - Domiciliary account", number: "Contact the church", icon: `${S3}/gbp_icon_d0298abcb6.svg` },
                        { label: "Sort Code", number: "Contact the church", icon: null },
                      ].map((acct) => (
                        <div key={acct.number} className="rounded bg-[#FFFFFFCC] p-2 lg:p-4">
                          <div className="mb-2 flex items-center gap-1 text-base font-normal uppercase text-[#7F7C7C]">
                            {acct.icon && <img loading="lazy" decoding="async" src={acct.icon} alt="" width={32} height={32} />}
                            <p>{acct.label}</p>
                          </div>
                          <div className="flex items-center justify-between">
                            <p className="text-2xl font-medium text-black lg:text-3xl">{acct.number}</p>
                            <button onClick={() => navigator.clipboard.writeText(acct.number)} className="cursor-pointer text-xs text-gray-400 hover:text-black">Copy</button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Paystack */}
                  <div className="flex w-full flex-col justify-between gap-3 rounded border" style={{ backgroundColor: "rgb(235,248,253)", borderColor: "rgba(0,164,220,0.16)" }}>
                    <div className="p-4">
                      <div className="flex items-center gap-2 text-xl font-medium">
                        <img loading="lazy" decoding="async" src={`${S3}/paystack_icon_31baaafadf.png`} alt="Paystack" width={32} height={32} />
                        <p>Give via Paystack</p>
                      </div>
                      <p className="my-4 text-lg text-black opacity-60">Give using Paystack&apos;s secure payment gateway. Choose to give in Naira or USD with instant processing.</p>
                    </div>
                    <div className="grid grid-cols-2 gap-1 text-center">
                      <A href="/give" target="_blank" rel="noopener noreferrer" className="flex w-full items-center justify-center rounded-bl px-4 py-5 text-sm font-bold uppercase tracking-[0.24em] text-white" style={{ backgroundColor: "rgb(0,164,220)" }}>₦ GIVE IN NAIRA</A>
                      <A href="/give" target="_blank" rel="noopener noreferrer" className="flex w-full items-center justify-center rounded-br px-4 py-5 text-sm font-bold uppercase tracking-[0.24em] text-white" style={{ backgroundColor: "rgb(0,26,51)" }}>$ GIVE IN USD</A>
                    </div>
                  </div>

                  {/* Interac */}
                  <div className="flex w-full flex-col justify-between gap-3 rounded border" style={{ backgroundColor: "rgb(255,249,238)", borderColor: "rgba(255,181,36,0.16)" }}>
                    <div className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-xl font-medium">
                          <img loading="lazy" decoding="async" src={`${S3}/interac_icon_70d73f697b.svg`} alt="Interac" width={32} height={32} />
                          <p>Give via Interac e-Transfer</p>
                        </div>
                        <img loading="lazy" decoding="async" src={`${S3}/canada_flag_a1f251e231.svg`} alt="Canada" width={34} height={24} />
                      </div>
                      <p className="my-4 text-lg text-black opacity-60">Send your gift securely through Canadian banks with instant email transfer.</p>
                    </div>
                    <CopyButton
                      text="your@email.com"
                      label="COPY EMAIL ADDRESS"
                      className="flex w-full items-center justify-center rounded-bl rounded-br px-4 py-7 text-sm font-bold uppercase tracking-[0.24em]"
                      style={{ backgroundColor: "rgb(255,181,36)" } as React.CSSProperties}
                    />
                  </div>

                  {/* Tithely */}
                  <div className="flex w-full flex-col justify-between gap-3 rounded border" style={{ backgroundColor: "rgb(235,250,244)", borderColor: "rgba(91,217,164,0.16)" }}>
                    <div className="p-4">
                      <div className="flex items-center gap-2 text-xl font-medium">
                        <img loading="lazy" decoding="async" src={`${S3}/tithely_icon_87fa274820.png`} alt="Tithely" width={32} height={32} />
                        <p>Give via Tithely</p>
                      </div>
                      <p className="my-4 text-lg text-black opacity-60">Give using your preferred payment method - including credit cards, debit cards, and bank transfers.</p>
                    </div>
                    <A
                      href="/give"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex w-full items-center justify-center rounded-bl rounded-br px-4 py-5 text-sm font-bold uppercase tracking-[0.24em] text-white"
                      style={{ backgroundColor: "rgb(90,217,164)" }}
                    >
                      Give Now
                    </A>
                  </div>

                  {/* PayPal */}
                  <div className="flex w-full flex-col justify-between gap-3 rounded border" style={{ backgroundColor: "rgb(237,244,250)", borderColor: "rgba(0,112,224,0.16)" }}>
                    <div className="p-4">
                      <div className="flex items-center gap-2 text-xl font-medium">
                        <img src={`${S3}/paypal_logo_c1164fab19.png`} alt="PayPal" width={32} height={32} />
                        <p>Give via PayPal</p>
                      </div>
                      <p className="my-4 text-lg text-black opacity-60">Give through PayPal&apos;s trusted payment system. Accepts multiple payment methods worldwide.</p>
                    </div>
                    <A
                      href="/give"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex w-full items-center justify-center rounded-bl rounded-br px-4 py-5 text-sm font-bold uppercase tracking-[0.24em] text-white"
                      style={{ backgroundColor: "rgb(0,112,224)" }}
                    >
                      Give Now
                    </A>
                  </div>

                  {/* Bitcoin */}
                  <div className="flex w-full flex-col justify-between gap-3 rounded border" style={{ backgroundColor: "rgb(246,247,248)", borderColor: "rgba(0,0,0,0.16)" }}>
                    <div className="p-4">
                      <div className="flex items-center gap-2 text-xl font-medium">
                        <img loading="lazy" decoding="async" src={`${S3}/bitcoin_b746719388.svg`} alt="Bitcoin" width={32} height={32} />
                        <p>Give Bitcoin</p>
                      </div>
                      <p className="my-4 text-lg text-black opacity-60">Give using cryptocurrency. Send Bitcoin securely to our digital wallet.</p>
                    </div>
                    <button className="flex w-full items-center justify-center rounded-bl rounded-br px-4 py-7 text-sm font-bold uppercase tracking-[0.24em] text-white" style={{ backgroundColor: "rgb(0,0,0)" }}>
                      COPY WALLET ADDRESS
                    </button>
                  </div>

                  {/* USDT */}
                  <div className="flex w-full flex-col justify-between gap-3 rounded border" style={{ backgroundColor: "rgb(241,249,247)", borderColor: "rgba(80,175,149,0.16)" }}>
                    <div className="p-4">
                      <div className="flex items-center gap-2 text-xl font-medium">
                        <img loading="lazy" decoding="async" src={`${S3}/usdt_7e47449be9.svg`} alt="USDT" width={32} height={32} />
                        <p>Give USDT</p>
                      </div>
                      <p className="my-4 text-lg text-black opacity-60">Give using USDT stablecoin. A secure way to contribute using cryptocurrency pegged to USD value.</p>
                    </div>
                    <button className="flex w-full items-center justify-center rounded-bl rounded-br px-4 py-7 text-sm font-bold uppercase tracking-[0.24em] text-white" style={{ backgroundColor: "rgb(80,175,149)" }}>
                      COPY WALLET ADDRESS
                    </button>
                  </div>
                </div>
              </div>
            </section>
          </motion.div>
        </section>
      </div>

      {/* ── VIDEO ── */}
      <section className="bg-white" id="mainVideo">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mx-auto w-full max-w-7xl bg-white p-4 sm:p-6 md:p-10 lg:p-20"
        >
          <h2 className="mb-4 text-center font-anton text-4xl font-normal uppercase leading-loose md:mb-8 md:text-6xl">
            Expanding our reach
          </h2>
          <video controls className="w-full border border-gray-300">
            <source src="" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </motion.div>
      </section>

      {/* ── PASTOR VISION ── */}
      <section className="bg-black" id="pastey" style={{ paddingBottom: 140 }}>
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mx-auto flex w-full max-w-7xl flex-col gap-4 bg-black px-6 py-8 sm:px-12 md:flex-row md:py-16 lg:gap-10 lg:px-24"
        >
          <div
            className="building-vision-pastey mb-4 hidden flex-1 bg-cover bg-center bg-no-repeat py-52 md:mb-0 md:flex md:h-auto md:p-0"
            style={{ backgroundSize: "contain", backgroundColor: "#0e0e0e", minHeight: 380 }}
          />
          <div className="mx-auto mt-5 w-full max-w-full bg-center md:max-w-[380px] lg:max-w-[500px]">
            <div className="mb-4 flex flex-col items-center md:items-start">
              <h2 className="text-center text-2xl font-black uppercase tracking-[0.2em] text-white md:text-left">
                OUR VISION
              </h2>
            </div>
            <p className="text-center font-medium leading-7 text-[#FFFFFFA3] md:text-left">
              We envision a welcoming, accessible space with room for worship services, children and youth programs, community gatherings, and practical support for people in need. A dedicated church building will help us serve our congregation and our wider community more effectively—now and for years to come.
            </p>
          </div>
        </motion.div>
      </section>
    </>
  );
}
