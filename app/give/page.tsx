"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { FormField, FormCard, inputCls, selectCls, textareaCls } from "@/components/ui/FormField";
import { post } from "@/lib/api";

const fadeUp = { hidden: { opacity: 0, y: "10%" }, visible: { opacity: 1, y: 0, transition: { duration: 1 } } };
const fadeIn = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { duration: 1 } } };

// Placeholder account details — replace with the real Rose of Sharon accounts.
const nairaAccounts = [
  {
    bank: "Bank Transfer",
    flag: "🇳🇬",
    accounts: [
      { label: "Offering/Tithe", number: "Contact the church" },
      { label: "Building", number: "Contact the church" },
      { label: "Rent", number: "Contact the church" },
      { label: "Global", number: "Contact the church" },
    ],
  },
];

const otherAccounts = [
  { bank: "Bank Transfer", label: "Building account", number: "Contact the church" },
  { bank: "Bank Transfer", label: "Seed church", number: "Contact the church" },
  { bank: "Bank Transfer", label: "Offering", number: "Contact the church" },
  { bank: "Bank Transfer", label: "", number: "Contact the church" },
];

const faqs = [
  {
    q: "How is my donation used?",
    a: "Your donation supports the mission of RCCG Rose of Sharon to spread the gospel and make disciples. Contributions go towards ministry programs, church operations, community outreach, and special initiatives.",
  },
  {
    q: "Can I choose where my donation goes?",
    a: "Yes! You can direct your giving towards specific funds or projects, such as the building fund, missions, or outreach initiatives. When you let the church know about your giving, select the category that resonates most with you.",
  },
  {
    q: "Are there other ways to give besides online?",
    a: "Absolutely! In addition to online giving, you can also contribute through bank transfers or in person at the church. Please contact the church team for more details to help you give in the way that's most convenient for you.",
  },
  {
    q: "Is my payment information secured?",
    a: "Yes, protecting your financial information is a top priority. Please only give through the official church channels listed on this page, and never share your card details with anyone who contacts you unexpectedly.",
  },
  {
    q: "Can I give to support a specific project or initiative?",
    a: "Yes, you can! Rose of Sharon offers designated giving options, allowing you to support specific projects or initiatives within the church. Whether you're passionate about missions, the building project, or outreach, you can choose where to invest.",
  },
  {
    q: "Who do I contact with my questions?",
    a: "If you have any questions about giving, please reach out to the church through the request form on this website or our social media channels. We're here to assist and ensure that your giving experience at Rose of Sharon is seamless and meaningful.",
  },
];

const givingPurposes = ["Offering", "Tithe", "Rent", "Special"];

const givingCategories = [
  { label: "Tithe", icon: "📖", desc: "Returning 10% of your income to God — a covenant act of worship and trust." },
  { label: "First Fruit", icon: "🌾", desc: "Honouring God with the first and best of your increase at the start of each year." },
  { label: "Offering", icon: "🙏", desc: "A freewill gift of worship given beyond your tithe, from a grateful heart." },
  { label: "Building Fund", icon: "🏛️", desc: "Contributing to the physical growth and maintenance of the house of God." },
  { label: "Mission & Outreach", icon: "🌍", desc: "Supporting the spread of the Gospel and reaching the unreached in our community." },
  { label: "Special Seed", icon: "🌱", desc: "Planting a specific seed of faith in expectation of a particular harvest from God." },
];

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
            className={`relative h-20 w-full cursor-pointer rounded-md px-4 text-left text-base font-medium transition-all duration-300 ease-in-out hover:border-textRed ${
              selected === purpose
                ? "border border-textRed bg-[#FFF5F5]"
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
          {givingPurposes.map((p) => (
            <option key={p}>{p}</option>
          ))}
        </select>
      </div>
      <a
        href="#notify"
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
      onClick={() => {
        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }}
      className="text-xs text-textRed underline hover:no-underline"
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
        <span className="ml-4 text-xl text-textRed">{open ? "−" : "+"}</span>
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
  const [form, setForm] = useState({ name: "", phone: "", category: "", amount: "", note: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [error, setError] = useState("");

  function set(k: string) {
    return (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
      setForm((p) => ({ ...p, [k]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setError("");
    try {
      const content = [
        `Name: ${form.name}`,
        `Phone: ${form.phone}`,
        `Category: ${form.category}`,
        form.amount ? `Amount: ₦${form.amount}` : null,
        form.note ? `Note: ${form.note}` : null,
      ]
        .filter(Boolean)
        .join("\n");
      await post("/requests/suggestion", { subject: `Giving Notification — ${form.category}`, content });
      setStatus("success");
    } catch (err: unknown) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Submission failed. Please try again.");
    }
  }

  return (
    <>
      {/* ── HERO ── */}
      <motion.div
        variants={fadeIn}
        initial="hidden"
        animate="visible"
        className="flex h-[600px] items-center justify-center bg-cover bg-center bg-no-repeat lg:h-[700px]"
        style={{
          backgroundImage: "linear-gradient(rgba(0,0,0,0.55), rgba(0,0,0,0.55)), url('/assets/give-bg.png')",
        }}
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
            &ldquo;Bring all the tithes into the storehouse&rdquo; — Malachi 3:10. Giving is an act of worship and
            partnership with God&apos;s agenda.
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
              className={`rounded-full px-4 py-3 text-xs font-bold uppercase tracking-wider transition md:px-8 md:py-4 ${tab === "naira" ? "bg-ros-maroon text-white" : "cursor-pointer"}`}
            >
              Naira Account
            </button>
            <button
              onClick={() => setTab("dom")}
              className={`rounded-full px-4 py-3 text-xs font-bold uppercase tracking-wider transition md:px-8 md:py-4 ${tab === "dom" ? "bg-ros-maroon text-white" : "cursor-pointer"}`}
            >
              Domiciliary Account
            </button>
          </div>
        </div>

        {tab === "naira" && (
          <div>
            {/* Main accounts */}
            <div className="flex w-full flex-col rounded border p-4 md:flex-row md:items-start md:gap-6 md:p-6">
              <div className="flex items-center justify-between md:flex-col md:items-start md:gap-2">
                <div className="flex items-center gap-2 text-xl font-medium">RCCG Rose of Sharon</div>
                <span className="text-sm text-[#00000066]">{nairaAccounts[0].flag}</span>
              </div>
              <div className="mx-auto mt-4 grid w-full grid-cols-1 gap-4 md:mt-0 md:grid-cols-2">
                {nairaAccounts[0].accounts.map((acct, idx) => (
                  <div key={`naira-acct-${idx}`} className="rounded bg-[#F8F8F8] p-2 shadow-sm lg:p-4">
                    <div className="mb-2 text-xs font-bold uppercase text-[#00000099]">{acct.label}</div>
                    <div className="flex items-center justify-between">
                      <p className="text-lg font-medium text-black lg:text-xl">{acct.number}</p>
                      <CopyButton text={acct.number} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Other accounts */}
            <div className="mx-auto mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
              {otherAccounts.map((acct, i) => (
                <div key={i} className="flex w-full flex-col rounded border p-4 md:p-6">
                  <div className="mb-3 text-sm font-bold text-[#00000099]">
                    {acct.bank}
                    {acct.label ? ` | ${acct.label}` : ""}
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-lg font-medium text-black">{acct.number}</p>
                    <CopyButton text={acct.number} />
                  </div>
                </div>
              ))}
            </div>

            {/* PayPal */}
            <div className="mt-8 rounded-2xl border border-gray-200 p-6 md:p-8">
              <h3 className="mb-2 font-anton text-2xl font-medium uppercase">Give via PayPal</h3>
              <p className="mb-6 text-[#00000099]">
                Give securely from anywhere in the world using PayPal balance, credit/debit cards, or bank accounts.
              </p>
              <a
                href="#notify"
                className="flex w-fit items-center justify-center rounded-full bg-textRed px-8 py-3 text-xs font-extrabold uppercase tracking-[.25em] text-white transition hover:bg-black"
              >
                Give Now
              </a>
            </div>
          </div>
        )}

        {tab === "dom" && (
          <div className="rounded border p-6 text-center text-[#00000099]">
            <p>
              For domiciliary account giving, please{" "}
              <Link href="/requests/suggestion" className="text-textRed underline">
                contact the church
              </Link>{" "}
              or visit us in person.
            </p>
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
      {/* ── GIVING CATEGORIES ── */}
      <section className="mx-auto max-w-7xl px-4 py-12 md:py-20">
        <h6 className="w-fit rounded-full bg-[#F4F4F4] px-3 py-1 text-xs font-bold">
          💝 <span className="ml-1">GIVING CATEGORIES</span>
        </h6>
        <h2 className="mb-10 mt-4 font-anton text-3xl font-normal leading-[120%] text-black md:text-5xl">
          WHAT YOU CAN GIVE
        </h2>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {givingCategories.map((g) => (
            <div key={g.label} className="flex flex-col gap-3 rounded-lg border border-[#00000014] bg-[#FAFAFA8F] p-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-black text-[22px]">{g.icon}</div>
              <h3 className="text-lg font-bold">{g.label}</h3>
              <p className="text-[#00000099]">{g.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── GIVING NOTIFICATION ── */}
      <section id="notify" className="scroll-to-plus-nav bg-[#F4F4F4] px-4 py-12 md:py-20">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 lg:grid-cols-2">
          <div className="flex flex-col gap-6">
            <div>
              <h2 className="font-anton text-3xl font-normal text-black md:text-5xl">GIVING NOTIFICATION</h2>
              <p className="mt-2 text-[#00000099]">
                Made a transfer? Let the church know so we can record it and pray with you.
              </p>
            </div>

            {status === "success" ? (
              <div className="flex flex-col items-center gap-4 rounded-2xl bg-white p-10 text-center shadow-sm">
                <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="32" cy="32" r="32" fill="#16A34A" fillOpacity="0.12" />
                  <circle cx="32" cy="32" r="24" fill="#16A34A" fillOpacity="0.2" />
                  <path d="M20 32L28 40L44 24" stroke="#16A34A" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <p className="text-xl font-bold">Thank You!</p>
                <p className="text-[#00000099]">Your giving notification has been received. God bless you richly!</p>
                <Link href="/testimonies" className="text-sm font-bold text-textRed hover:underline">
                  Share your testimony →
                </Link>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <FormCard>
                  <div className="flex flex-col gap-3.5">
                    <FormField label="Full Name" required>
                      <input type="text" required value={form.name} onChange={set("name")} className={inputCls} />
                    </FormField>
                    <FormField label="Phone Number" required>
                      <input type="tel" required value={form.phone} onChange={set("phone")} className={inputCls} />
                    </FormField>
                    <FormField label="Giving Category" required>
                      <select required value={form.category} onChange={set("category")} className={selectCls}>
                        <option value="">Select category</option>
                        {givingCategories.map((g) => (
                          <option key={g.label} value={g.label}>
                            {g.label}
                          </option>
                        ))}
                      </select>
                    </FormField>
                    <FormField label="Amount (₦)">
                      <input type="number" min={0} value={form.amount} onChange={set("amount")} className={inputCls} placeholder="Optional" />
                    </FormField>
                    <FormField label="Additional Note">
                      <textarea value={form.note} onChange={set("note")} className={textareaCls} rows={3} />
                    </FormField>
                  </div>
                </FormCard>
                {status === "error" && <p className="text-[13px] text-[#FF383C]">{error}</p>}
                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="mt-2 h-12 rounded-full border border-textRed bg-textRed px-8 text-[0.75rem] font-extrabold uppercase tracking-[.25em] text-white transition duration-300 hover:border-black hover:bg-white hover:text-black disabled:opacity-60"
                >
                  {status === "loading" ? "Submitting..." : "Notify the church"}
                </button>
              </form>
            )}
          </div>

          <div className="flex flex-col gap-6">
            <div>
              <h6 className="w-fit rounded-full bg-white px-3 py-1 text-xs font-bold">🏦 <span className="ml-1">BANK TRANSFER</span></h6>
              <h2 className="mt-4 font-anton text-3xl font-normal text-black md:text-5xl">ACCOUNT DETAILS</h2>
              <p className="mt-2 text-[#00000099]">
                Transfer directly to the church account and use the notification form to let us know.
              </p>
            </div>
            <div className="flex flex-col gap-4">
              {[
                { label: "Account Name", value: "RCCG Rose of Sharon" },
                { label: "Account Number", value: "Contact the church for account details" },
                { label: "Bank", value: "Contact the church for bank details" },
              ].map((item) => (
                <div key={item.label} className="flex flex-col gap-1 rounded-lg bg-white p-5 shadow-[0px_2px_12px_rgba(0,0,0,0.06)]">
                  <p className="text-[13px] font-bold uppercase tracking-wider text-[#00000066]">{item.label}</p>
                  <p className="text-lg font-bold">{item.value}</p>
                </div>
              ))}
            </div>
            <div className="flex flex-wrap gap-3">
              {[
                { label: "Instagram", href: "https://www.instagram.com/rccgros/?hl=en" },
                { label: "Facebook", href: "https://www.facebook.com/rccgrospage/" },
                { label: "YouTube", href: "https://www.youtube.com/@rccgrostv" },
              ].map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full border border-black px-4 py-2 text-[10px] font-black uppercase tracking-[0.2em] text-black hover:bg-black hover:text-white"
                >
                  {s.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── SCRIPTURE ── */}
      <section className="bg-black px-4 py-16">
        <div className="mx-auto flex max-w-3xl flex-col items-center gap-4 text-center">
          <p className="font-anton text-2xl uppercase leading-[1.4] text-white md:text-4xl">
            &ldquo;Each of you should give what you have decided in your heart to give, not reluctantly or under
            compulsion, for God loves a cheerful giver.&rdquo;
          </p>
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-textRed">2 Corinthians 9:7</p>
        </div>
      </section>

    </>
  );
}
