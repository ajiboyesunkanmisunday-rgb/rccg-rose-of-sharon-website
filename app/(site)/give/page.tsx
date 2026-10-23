"use client";

import { useState } from "react";
import { motion } from "framer-motion";

const fadeUp = { hidden: { opacity: 0, y: "10%" }, visible: { opacity: 1, y: 0, transition: { duration: 1 } } };
const fadeIn  = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { duration: 1 } } };

const givingAccounts = [
  { label: "Offering",            accounts: [{ bank: "Fidelity Bank", number: "4110027806" }] },
  { label: "General Tithe",       accounts: [{ bank: "Union Bank", number: "0057205864" }, { bank: "Fidelity Bank", number: "4110027813" }] },
  { label: "Seed",                accounts: [{ bank: "Wema Bank", number: "0122758791" }] },
  { label: "Building Fund",       accounts: [{ bank: "Fidelity Bank", number: "6060094460" }, { bank: "Globus Bank", number: "1000363698" }] },
  { label: "Thanksgiving",        accounts: [{ bank: "Wema Bank", number: "0123927851" }] },
  { label: "Minister Tithe",      accounts: [{ bank: "Zenith Bank", number: "1015348020" }] },
  { label: "First Fruit",         accounts: [{ bank: "Wema Bank", number: "0122795468" }] },
  { label: "RCCG Rose of Sharon Youth Fellowship", accounts: [{ bank: "Wema Bank", number: "0124573004" }] },
  { label: "RCCG Rose of Sharon (CSR)",            accounts: [{ bank: "Fidelity Bank", number: "6060168886" }] },
  { label: "RCCG Rose of Sharon (Ikeja For Christ)", accounts: [{ bank: "Wema Bank", number: "0124475847" }] },
  { label: "RCCG Rose of Sharon", accounts: [{ bank: "Globus Bank", number: "1000363698" }] },
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
            <span className="text-textRed">GIVING</span> TO GOD <br />
            SUPPORT <span className="text-textRed">THE WORK</span>
          </h1>
          <p className="w-full max-w-lg text-center text-base text-[#FFFFFFB2] md:text-lg lg:text-xl">
            Support the kingdom's business and we bring the whole world to Christ
          </p>
          <div className="mt-8 md:flex md:items-center md:justify-center">
            <a
              href="#global"
              className="mb-6 flex w-full items-center justify-center gap-2 rounded-full border border-white bg-white px-5 py-3 text-[0.75rem] font-extrabold uppercase tracking-[.25em] text-black transition duration-300 hover:border-textRed hover:bg-textRed hover:text-white md:mr-6 md:w-auto"
            >
              Give Now
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
          <div className="md:flex md:items-center md:justify-between">
            <h2 className="font-anton text-3xl font-normal leading-[120%] text-black md:text-5xl">WAYS TO GIVE</h2>
            <p className="font-lato text-base tracking-[0.01rem] text-[#00000099] md:max-w-md">
              Join us as we put our money right where our faith is, partnering with God for the spread of the gospel in our day.
            </p>
          </div>
        </div>

        <p className="mt-6 text-center text-sm font-bold uppercase tracking-[0.2em] text-[#00000099]">Rose of Sharon account details</p>
        <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {givingAccounts.map((g) => (
            <div key={g.label} className="flex w-full flex-col gap-3 rounded border p-4 md:p-6">
              <div className="text-xs font-bold uppercase text-[#00000099]">{g.label}</div>
              {g.accounts.map((acct) => (
                <div key={acct.bank + acct.number} className="rounded p-3 lg:p-4" style={{ background: "#F8F8F8" }}>
                  <div className="mb-1 text-sm font-bold text-[#00000099]">{acct.bank}</div>
                  <div className="flex items-center justify-between">
                    <p className="text-2xl font-medium text-black">{acct.number}</p>
                    <CopyButton text={acct.number} />
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
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
