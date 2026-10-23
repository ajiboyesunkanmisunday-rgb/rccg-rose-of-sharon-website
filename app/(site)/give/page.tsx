"use client";

import { useState } from "react";
import { motion } from "framer-motion";

const fadeUp = { hidden: { opacity: 0, y: "10%" }, visible: { opacity: 1, y: 0, transition: { duration: 1 } } };
const fadeIn  = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { duration: 1 } } };

const nairaAccounts = [
  { bank: "Fidelity Bank", logo: "https://cci-axios-web-cms-assets.s3.eu-north-1.amazonaws.com/web-assets/Fidelity_Bank_Plc_Main_Logo_f4af522aa7.svg", flag: "🇳🇬", accounts: [
    { label: "Offering/Tithe", number: "5540041633" },
    { label: "Building",       number: "5080211796" },
    { label: "Rent",           number: "5080212023" },
    { label: "Global",         number: "5540041633" },
  ]},
];

const otherAccounts = [
  { bank: "Access Bank",                   label: "Building account",   number: "1911506050" },
  { bank: "Access Bank",                   label: "Seed church",        number: "1911603344" },
  { bank: "Stanbic IBTC Bank",             label: "Building account",   number: "0072805827" },
  { bank: "Moniepoint Microfinance Bank",  label: "",                   number: "4664390779" },
];

const faqs = [
  {
    q: "How is my donation used?",
    a: "Your donation supports the mission of RCCG Rose of Sharon to spread the gospel and make disciples. Contributions go towards ministry programs, church operations, cell churches, community outreach, and special initiatives that help us bring transformation and impact to individuals and communities.",
  },
  {
    q: "Can I choose where my donation goes?",
    a: "Yes! We provide the option to direct your donation towards specific funds or projects, such as missions, church plants, cell churches, or outreach initiatives. During the giving process, you can select the area that resonates most with you, allowing you to support what matters most.",
  },
  {
    q: "Are there other ways to give besides online?",
    a: "Absolutely! In addition to online giving, you can also contribute through bank transfers, checks, or in-person at our church. Our team can provide more details to help you give in the way that's most convenient for you. Please feel free to contact us for more information.",
  },
  {
    q: "Is my payment information secured?",
    a: "Yes, protecting your financial information is our top priority. Our online giving platform uses secure encryption and trusted payment processors to ensure that your data is safe. We are committed to maintaining the highest standards of security for all transactions.",
  },
  {
    q: "Can I give to support a specific project or initiative?",
    a: "Yes, you can! Rose of Sharon offers designated giving options, allowing you to support specific projects or initiatives within the church. Whether you're passionate about missions, building projects, or outreach, you can choose to invest in the initiatives closest to your heart.",
  },
  {
    q: "Who do I contact with my questions?",
    a: "If you have any questions about giving, please reach out to our Giving Team at your@email.com or call us at +234 800 000 0000. We're here to assist and ensure that your giving experience at RCCG Rose of Sharon is seamless and meaningful.",
  },
];

const givingPurposes = ["Offering", "Tithe", "Rent", "Special"];

function CampusGivingSelector() {
  const [selected, setSelected] = useState<string>("Offering");
  return (
    <div className="rounded-lg md:border md:border-[#D0D5DD] md:p-4">
      <p className="mb-4 text-base font-normal">What would you like to give?</p>
      {/* desktop: buttons */}
      <div className="hidden gap-3 md:flex">
        {givingPurposes.map((purpose) => (
          <button
            key={purpose}
            onClick={() => setSelected(purpose)}
            className={`relative h-20 w-full cursor-pointer rounded-md px-4 text-left text-base font-medium transition-all duration-300 ease-in-out hover:border-cciRed ${
              selected === purpose
                ? "border border-cciRed bg-[#FFF5F5]"
                : "border border-[#00000014] bg-[#FAFAFA8F] text-black"
            }`}
          >
            {purpose}
          </button>
        ))}
      </div>
      {/* mobile: select */}
      <div className="md:hidden">
        <select
          value={selected}
          onChange={(e) => setSelected(e.target.value)}
          className="w-full rounded-md border border-gray-200 bg-white px-4 py-3 text-base"
        >
          {givingPurposes.map((p) => <option key={p}>{p}</option>)}
        </select>
      </div>
      <a
        href="#global"
        className="mt-4 flex w-fit items-center justify-center rounded-full bg-textRed px-8 py-3 text-xs font-extrabold uppercase tracking-[.25em] text-white transition hover:bg-black"
      >
        Give to a Campus
      </a>
    </div>
  );
}

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      onClick={() => { navigator.clipboard.writeText(text); setCopied(true); setTimeout(() => setCopied(false), 2000); }}
      className="text-xs text-[#DF4E4E] underline hover:no-underline"
    >
      {copied ? "Copied!" : "Copy"}
    </button>
  );
}

function FAQItem({ q, a, index }: { q: string; a: string; index: number }) {
  const [open, setOpen] = useState(false);
  const num = String(index + 1).padStart(2, "0");
  return (
    <div className="border-b border-gray-200">
      <button onClick={() => setOpen(!open)} className="flex w-full items-start justify-between py-5 text-left">
        <div className="flex items-start gap-4">
          <span className="min-w-[2rem] font-bold text-[#00000066]">{num}.</span>
          <span className="font-medium">{q}</span>
        </div>
        <span className="ml-4 text-xl text-[#DF4E4E]">{open ? "−" : "+"}</span>
      </button>
      {open && (
        <div className="flex gap-4 pb-5">
          <span className="min-w-[2rem] font-bold text-[#00000066]">{num}.</span>
          <p className="text-[#00000099]">{a}</p>
        </div>
      )}
    </div>
  );
}

export default function GivePage() {
  const [tab, setTab] = useState<"naira" | "dom">("naira");

  return (
    <>
      {/* ── HERO ── */}
      <motion.div
        variants={fadeIn}
        initial="hidden"
        animate="visible"
        className="give-hero-banner flex h-[600px] items-center justify-center bg-cover bg-center bg-no-repeat lg:h-[700px]"
        style={{ backgroundImage: "url('/media/give-hero-banner.038cbe32.jpg')" }}
      >
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mx-4 flex w-full max-w-2xl flex-col items-center gap-6"
        >
          <h3 className="rounded-full bg-[#00000078] p-2 text-center text-[10px] font-bold uppercase tracking-[0.24rem] text-[#FFFFFFCC]">
            💸 <span className="ml-0.5">give</span>
          </h3>
          <h1 className="my-3 max-w-[900px] px-4 text-center font-anton text-[3rem] font-medium uppercase text-white md:px-0 md:text-7xl md:leading-[1.2]">
            <span className="text-textRed">YOUR</span> GENEROSITY <br />
            OUR <span className="text-textRed">MISSION</span>
          </h1>
          <p className="w-full max-w-lg text-center text-base text-[#FFFFFFB2] md:text-lg lg:text-xl">
            Give towards our mission to spread the message of the gospel and make disciples
          </p>
          <div className="mt-8 md:flex md:items-center md:justify-center">
            <a
              href="#global"
              className="mb-6 flex w-full items-center justify-center gap-2 rounded-full border border-white bg-white px-5 py-3 text-[0.75rem] font-extrabold uppercase tracking-[.25em] text-black transition duration-300 hover:border-textRed hover:bg-textRed hover:text-white md:mr-6 md:w-auto"
            >
              Give Now
            </a>
            <a
              href="#campuses"
              className="mb-6 flex w-full items-center justify-center gap-2 rounded-full border border-white bg-transparent px-5 py-3 text-[0.75rem] font-extrabold uppercase tracking-[.25em] text-white transition duration-300 hover:border-textRed hover:bg-textRed hover:text-white md:w-auto"
            >
              Other Ways to Give
            </a>
          </div>
        </motion.div>
      </motion.div>

      {/* ── GLOBAL GIVING ── */}
      <motion.div
        id="global"
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="scroll-to-plus-nav mx-auto max-w-7xl px-4 py-12"
      >
        <div>
          <h6 className="w-fit rounded-full bg-[#F4F4F4] px-3 py-1 text-xs font-bold">
            🌍 <span className="ml-1 uppercase">Give to Rose of Sharon</span>
          </h6>
          <div className="md:flex md:items-center md:justify-between">
            <h2 className="font-anton text-3xl font-normal leading-[120%] text-black md:text-5xl">WAYS TO GIVE</h2>
            <p className="font-lato text-base tracking-[0.01rem] text-[#00000099] md:max-w-md">
              Join us as we put our money right where our faith is, partnering with God for the spread of the gospel in our day.
            </p>
          </div>
        </div>

        {/* Tab switcher */}
        <div className="my-4 flex justify-center lg:my-8">
          <div className="flex items-center self-center rounded-full border border-gray-200 bg-gray-50 p-1">
            <button
              onClick={() => setTab("naira")}
              className={`rounded-full px-4 py-3 text-xs font-bold uppercase tracking-wider transition md:px-8 md:py-4 ${tab === "naira" ? "bg-[#850000] text-white" : "cursor-pointer"}`}
            >
              Naira Account
            </button>
            <button
              onClick={() => setTab("dom")}
              className={`rounded-full px-4 py-3 text-xs font-bold uppercase tracking-wider transition md:px-8 md:py-4 ${tab === "dom" ? "bg-[#850000] text-white" : "cursor-pointer"}`}
            >
              Domiciliary Account
            </button>
          </div>
        </div>

        {tab === "naira" && (
          <div>
            {/* Fidelity Bank main accounts */}
            <div className="flex w-full flex-col rounded border p-4 md:flex-row md:items-start md:gap-6 md:p-6">
              <div className="flex items-center justify-between md:flex-col md:items-start md:gap-2">
                <div className="flex items-center gap-2 text-xl font-medium">
                  <img src="https://cci-axios-web-cms-assets.s3.eu-north-1.amazonaws.com/web-assets/Fidelity_Bank_Plc_Main_Logo_f4af522aa7.svg" alt="Fidelity Bank" width={100} height={32} />
                </div>
                <span className="text-sm text-[#00000066]">🇳🇬</span>
              </div>
              <div className="mx-auto mt-4 grid w-full grid-cols-1 gap-4 md:mt-0 md:grid-cols-2">
                {nairaAccounts[0].accounts.map((acct, idx) => (
                  <div key={`naira-acct-${idx}`} className="rounded bg-[#FFFFFFCC] p-2 shadow-sm lg:p-4" style={{ background: "#F8F8F8" }}>
                    <div className="mb-2 text-xs font-bold uppercase text-[#00000099]">{acct.label}</div>
                    <div className="flex items-center justify-between">
                      <p className="text-2xl font-medium text-black lg:text-3xl">{acct.number}</p>
                      <CopyButton text={acct.number} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Other accounts */}
            <div className="mx-auto mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
              {otherAccounts.map((acct) => (
                <div key={acct.number} className="flex w-full flex-col rounded border p-4 md:p-6">
                  <div className="mb-3 text-sm font-bold text-[#00000099]">{acct.bank}{acct.label ? ` | ${acct.label}` : ""}</div>
                  <div className="flex items-center justify-between">
                    <p className="text-2xl font-medium text-black">{acct.number}</p>
                    <CopyButton text={acct.number} />
                  </div>
                </div>
              ))}
            </div>

            {/* PayPal */}
            <div className="mt-8 rounded-2xl border border-gray-200 p-6 md:p-8">
              <h3 className="mb-2 font-anton text-2xl font-medium uppercase">Give via PayPal</h3>
              <p className="mb-6 text-[#00000099]">Give securely from anywhere in the world using PayPal balance, credit/debit cards, or bank accounts.</p>
              <a
                href="#global"
                className="flex w-fit items-center justify-center rounded-full bg-textRed px-8 py-3 text-xs font-extrabold uppercase tracking-[.25em] text-white transition hover:bg-black"
              >
                Give Now
              </a>
            </div>
          </div>
        )}

        {tab === "dom" && (
          <div className="rounded border p-6 text-center text-[#00000099]">
            <p>For domiciliary account giving, please contact us at <a href="mailto:your@email.com" className="text-textRed underline">your@email.com</a> or visit any Rose of Sharon campus.</p>
          </div>
        )}
      </motion.div>

      {/* ── CAMPUS GIVING ── */}
      <motion.div
        id="campuses"
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="scroll-to-plus-nav mx-auto max-w-7xl px-4 py-12"
      >
        <h6 className="w-fit rounded-full bg-[#F4F4F4] px-3 py-1 text-xs font-bold">
          🌍 <span className="ml-1 uppercase">Give to Specific Rose of Sharon Campuses</span>
        </h6>
        <h2 className="mb-4 font-anton text-3xl font-normal leading-[120%] text-black md:text-5xl">GIVE TO SPECIFIC CAMPUSES</h2>
        <p className="mb-8 text-[#00000099]">
          Join us as we put our money right where our faith is, partnering with God for the spread of the gospel in our day.
        </p>
        <CampusGivingSelector />
      </motion.div>

      {/* ── FAQs ── */}
      <div className="mx-auto max-w-3xl px-4 pb-20">
        <h2 className="mb-8 font-anton text-3xl font-medium uppercase md:text-5xl">FAQs</h2>
        {faqs.map((faq, i) => (
          <FAQItem key={i} q={faq.q} a={faq.a} index={i} />
        ))}
      </div>
    </>
  );
}
