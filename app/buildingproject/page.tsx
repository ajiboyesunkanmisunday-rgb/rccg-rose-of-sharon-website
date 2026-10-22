"use client";

import { useState } from "react";
import { motion } from "framer-motion";

const fadeUp = { hidden: { opacity: 0, y: "10%" }, visible: { opacity: 1, y: 0, transition: { duration: 1 } } };

function Badge({ label }: { label: string }) {
  return (
    <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-black/10 text-[10px] font-bold uppercase text-black/70">
      {label.replace(/[^A-Za-z]/g, "").slice(0, 2)}
    </span>
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
        className="rbc-give-header flex h-[600px] items-center justify-center bg-cover bg-no-repeat lg:h-[700px]"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0), rgba(0,0,0,0.4) 73%), url('/assets/give-bg.png')`,
        }}
      >
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mx-4 flex w-full max-w-2xl flex-col items-center gap-6"
        >
          <h1 className="my-3 max-w-[900px] px-4 text-center font-anton text-[3rem] font-medium uppercase text-white md:px-0 md:text-7xl md:leading-[1.2]">
            BUILD <span className="text-textRed">WITH US</span>
          </h1>
          <p className="w-full max-w-lg text-center text-base text-[#FFFFFFB2] md:text-lg lg:text-xl">
            Your support helps us build a home for worship, discipleship and community at Rose of Sharon
          </p>
          <div className="mt-8 gap-6 md:flex md:items-center md:justify-center">
            <a
              href="#global"
              className="mb-6 flex w-full items-center justify-center gap-2 rounded-full border border-white bg-white px-5 py-3 text-[0.75rem] font-extrabold uppercase tracking-[.25em] text-black transition duration-300 hover:border-textRed hover:bg-textRed hover:text-white md:w-auto"
            >
              Give Now
            </a>
            <button className="mb-6 flex w-full items-center justify-center gap-2 rounded-full border border-white bg-transparent px-5 py-3 text-[0.75rem] font-extrabold uppercase tracking-[.25em] text-white transition duration-300 hover:border-textRed hover:bg-textRed hover:text-white md:w-auto">
              Recurring giving
            </button>
          </div>
        </motion.div>
      </motion.div>

      {/* ── WAYS TO GIVE ── */}
      <div className="relative">
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
                      ? "border-[#C0362A] bg-white text-[#C0362A]"
                      : "border-black bg-black text-white hover:border-black hover:bg-white hover:text-black"
                  }`}
                >
                  ONE-TIME GIVING
                </button>
                <button
                  onClick={() => setTab("recurring")}
                  className={`h-11 rounded-full border px-4 text-sm font-bold uppercase tracking-wider transition duration-300 md:px-7 md:text-lg ${
                    tab === "recurring"
                      ? "border-[#C0362A] bg-white text-[#C0362A]"
                      : "border-black bg-black text-white hover:border-black hover:bg-white hover:text-black"
                  }`}
                >
                  RECURRING GIVING
                </button>
              </div>
            </div>

            <section className="mx-auto max-w-7xl">
              <div className="mx-auto grid grid-cols-1 gap-4 md:grid-cols-2 md:pb-8">
                {/* Left column: bank accounts */}
                <div>
                  {/* Bank Transfer */}
                  <div className="mb-4 flex w-full flex-col rounded border border-[#F5811F29] bg-[#FEF0E4] p-4 md:mb-7">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-xl font-medium">
                        <Badge label="Bank" />
                        Bank Transfer
                      </div>
                      <Badge label="Nigeria" />
                    </div>
                    <div className="mx-auto mt-8 w-full md:mt-16">
                      <div className="rounded bg-[#FFFFFFCC] p-2 lg:p-4">
                        <div className="mb-2 text-base font-normal uppercase text-[#7F7C7C]">Naira Account</div>
                        <div className="flex items-center justify-between">
                          <p className="text-2xl font-medium text-black lg:text-3xl">Contact the church</p>
                          <button
                            onClick={() => { navigator.clipboard.writeText("Contact the church"); }}
                            className="cursor-pointer"
                          >
                            Copy
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* International Transfer */}
                  <div className="flex w-full flex-col rounded border border-[#6FC59829] bg-[#F6FCF9] p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-xl font-medium">
                        <Badge label="Intl" />
                        International Transfer
                      </div>
                      <Badge label="Global" />
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
                        <Badge label="Stanbic IBTC" />
                        Domiciliary Accounts
                      </div>
                      <Badge label="Nigeria" />
                    </div>
                    <div className="mt-4 flex flex-col gap-2">
                      {[
                        { label: "USD - Domiciliary account", number: "Contact the church" },
                        { label: "EURO - Domiciliary account", number: "Contact the church" },
                        { label: "GBP - Domiciliary account", number: "Contact the church" },
                        { label: "Sort Code", number: "Contact the church" },
                      ].map((acct) => (
                        <div key={acct.number} className="rounded bg-[#FFFFFFCC] p-2 lg:p-4">
                          <div className="mb-2 flex items-center gap-1 text-base font-normal uppercase text-[#7F7C7C]">
                            <Badge label={acct.label} />
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
                        <Badge label="Paystack" />
                        <p>Give via Paystack</p>
                      </div>
                      <p className="my-4 text-lg text-black opacity-60">Give using Paystack&apos;s secure payment gateway. Choose to give in Naira or USD with instant processing.</p>
                    </div>
                    <div className="grid grid-cols-2 gap-1 text-center">
                      <a href="/give" className="flex w-full items-center justify-center rounded-bl px-4 py-5 text-sm font-bold uppercase tracking-[0.24em] text-white" style={{ backgroundColor: "rgb(0,164,220)" }}>₦ GIVE IN NAIRA</a>
                      <a href="/give" className="flex w-full items-center justify-center rounded-br px-4 py-5 text-sm font-bold uppercase tracking-[0.24em] text-white" style={{ backgroundColor: "rgb(0,26,51)" }}>$ GIVE IN USD</a>
                    </div>
                  </div>

                  {/* Interac */}
                  <div className="flex w-full flex-col justify-between gap-3 rounded border" style={{ backgroundColor: "rgb(255,249,238)", borderColor: "rgba(255,181,36,0.16)" }}>
                    <div className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-xl font-medium">
                          <Badge label="Interac" />
                          <p>Give via Interac e-Transfer</p>
                        </div>
                        <Badge label="Canada" />
                      </div>
                      <p className="my-4 text-lg text-black opacity-60">Send your gift securely through Canadian banks with instant email transfer.</p>
                    </div>
                    <a href="/give" className="flex w-full items-center justify-center rounded-bl rounded-br px-4 py-7 text-sm font-bold uppercase tracking-[0.24em]" style={{ backgroundColor: "rgb(255,181,36)" }}>CONTACT THE CHURCH FOR DETAILS</a>
                  </div>

                  {/* Tithely */}
                  <div className="flex w-full flex-col justify-between gap-3 rounded border" style={{ backgroundColor: "rgb(235,250,244)", borderColor: "rgba(91,217,164,0.16)" }}>
                    <div className="p-4">
                      <div className="flex items-center gap-2 text-xl font-medium">
                        <Badge label="Tithely" />
                        <p>Give via Tithely</p>
                      </div>
                      <p className="my-4 text-lg text-black opacity-60">Give using your preferred payment method - including credit cards, debit cards, and bank transfers.</p>
                    </div>
                    <a
                      href="/give"
                      className="flex w-full items-center justify-center rounded-bl rounded-br px-4 py-5 text-sm font-bold uppercase tracking-[0.24em] text-white"
                      style={{ backgroundColor: "rgb(90,217,164)" }}
                    >
                      Give Now
                    </a>
                  </div>

                  {/* PayPal */}
                  <div className="flex w-full flex-col justify-between gap-3 rounded border" style={{ backgroundColor: "rgb(237,244,250)", borderColor: "rgba(0,112,224,0.16)" }}>
                    <div className="p-4">
                      <div className="flex items-center gap-2 text-xl font-medium">
                        <Badge label="PayPal" />
                        <p>Give via PayPal</p>
                      </div>
                      <p className="my-4 text-lg text-black opacity-60">Give through PayPal&apos;s trusted payment system. Accepts multiple payment methods worldwide.</p>
                    </div>
                    <a
                      href="/give"
                      className="flex w-full items-center justify-center rounded-bl rounded-br px-4 py-5 text-sm font-bold uppercase tracking-[0.24em] text-white"
                      style={{ backgroundColor: "rgb(0,112,224)" }}
                    >
                      Give Now
                    </a>
                  </div>

                  {/* Bitcoin */}
                  <div className="flex w-full flex-col justify-between gap-3 rounded border" style={{ backgroundColor: "rgb(246,247,248)", borderColor: "rgba(0,0,0,0.16)" }}>
                    <div className="p-4">
                      <div className="flex items-center gap-2 text-xl font-medium">
                        <Badge label="Bitcoin" />
                        <p>Give Bitcoin</p>
                      </div>
                      <p className="my-4 text-lg text-black opacity-60">Give using cryptocurrency. Send Bitcoin securely to our digital wallet.</p>
                    </div>
                    <a href="/give" className="flex w-full items-center justify-center rounded-bl rounded-br px-4 py-7 text-sm font-bold uppercase tracking-[0.24em] text-white" style={{ backgroundColor: "rgb(0,0,0)" }}>
                      WALLET ADDRESS — CONTACT THE CHURCH
                    </a>
                  </div>

                  {/* USDT */}
                  <div className="flex w-full flex-col justify-between gap-3 rounded border" style={{ backgroundColor: "rgb(241,249,247)", borderColor: "rgba(80,175,149,0.16)" }}>
                    <div className="p-4">
                      <div className="flex items-center gap-2 text-xl font-medium">
                        <Badge label="USDT" />
                        <p>Give USDT</p>
                      </div>
                      <p className="my-4 text-lg text-black opacity-60">Give using USDT stablecoin. A secure way to contribute using cryptocurrency pegged to USD value.</p>
                    </div>
                    <a href="/give" className="flex w-full items-center justify-center rounded-bl rounded-br px-4 py-7 text-sm font-bold uppercase tracking-[0.24em] text-white" style={{ backgroundColor: "rgb(80,175,149)" }}>
                      WALLET ADDRESS — CONTACT THE CHURCH
                    </a>
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
          <img src="/assets/hero-bg.png" alt="Rose of Sharon" className="w-full border border-gray-300 object-cover" />
        </motion.div>
      </section>

      {/* ── PASTOR VISION ── */}
      <section className="bg-black" id="pastey">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mx-auto flex w-full max-w-7xl flex-col gap-4 bg-black px-6 py-8 sm:px-12 md:flex-row md:py-16 lg:gap-10 lg:px-24"
        >
          <div
            className="building-vision-pastey mb-4 hidden flex-1 bg-cover bg-center bg-no-repeat py-52 md:mb-0 md:flex md:h-auto md:p-0"
            style={{ backgroundImage: "url(/assets/gallery-12.png)" }}
          />
          <div className="mx-auto mt-5 w-full max-w-full bg-center md:max-w-[380px] lg:max-w-[500px]">
            <div className="mb-4 flex flex-col items-center md:items-start">
              <h2 className="text-center text-2xl font-black uppercase tracking-[0.2em] text-white md:text-left">
                THE VISION FOR OUR BUILDING
              </h2>
            </div>
            <p className="text-center font-medium leading-7 text-[#FFFFFFA3] md:text-left">
              Thank you for partnering with us to build a home for worship, discipleship and community at Rose of Sharon. Every gift, large or small, helps us provide a place where lives are transformed and God&apos;s presence is constant.
              <br /><br />
              We are grateful to God who backs up His word, and to you for your relentless support.
              <br /><br />
              Keep partnering with us to see the vision fulfilled.
            </p>
            <div className="my-10 text-center md:text-left">
              <p className="text-2xl text-white italic">Our Lead Pastor</p>
              <p className="pt-2 text-[#FFFFFFB2]">RCCG Rose of Sharon</p>
            </div>
          </div>
        </motion.div>
      </section>
    </>
  );
}
