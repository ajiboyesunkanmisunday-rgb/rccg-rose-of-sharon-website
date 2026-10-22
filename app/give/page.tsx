"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { FormField, FormCard, inputCls, selectCls, textareaCls } from "@/components/ui/FormField";
import { post } from "@/lib/api";

const fadeUp = {
  hidden: { opacity: 0, y: "10%" },
  visible: { opacity: 1, transition: { duration: 1 }, y: 0 },
};

const givingCategories = [
  { label: "Tithe", icon: "📖", desc: "Returning 10% of your income to God — a covenant act of worship and trust." },
  { label: "First Fruit", icon: "🌾", desc: "Honouring God with the first and best of your increase at the start of each year." },
  { label: "Offering", icon: "🙏", desc: "A freewill gift of worship given beyond your tithe, from a grateful heart." },
  { label: "Building Fund", icon: "🏛️", desc: "Contributing to the physical growth and maintenance of the house of God." },
  { label: "Mission & Outreach", icon: "🌍", desc: "Supporting the spread of the Gospel and reaching the unreached in our community." },
  { label: "Special Seed", icon: "🌱", desc: "Planting a specific seed of faith in expectation of a particular harvest from God." },
];

const accountDetails = [
  { label: "Account Name", value: "RCCG Rose of Sharon" },
  { label: "Account Number", value: "Contact the church for account details" },
  { label: "Bank", value: "Contact the church for bank details" },
];

export default function GivePage() {
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
      await post("/requests/suggestion", {
        subject: `Giving Notification — ${form.category}`,
        content,
      });
      setStatus("success");
    } catch (err: unknown) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Submission failed. Please try again.");
    }
  }

  return (
    <div className="overflow-hidden">
      {/* ─── Hero ─── */}
      <div
        className="flex h-[500px] items-center justify-center bg-black bg-cover bg-center bg-no-repeat lg:h-[700px]"
        style={{ backgroundImage: "url(/assets/give-bg.png)" }}
      >
        <div className="flex h-full w-full items-center justify-center bg-black/65">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="mx-4 flex w-full max-w-3xl flex-col items-center gap-6"
          >
            <h3 className="rounded-full bg-[#00000078] p-2 text-center text-[10px] font-bold uppercase tracking-[0.24rem] text-[#FFFFFFCC]">
              🙏 <span className="ml-0.5">Worship through giving</span>
            </h3>
            <h1 className="my-3 max-w-[900px] px-4 text-center font-anton text-[3rem] font-medium uppercase text-white md:px-0 md:text-7xl md:leading-[1.2]">
              Give <span className="text-textRed">online</span>
            </h1>
            <p className="w-full max-w-2xl text-center text-base text-[#FFFFFFB2] md:text-lg lg:text-xl">
              &ldquo;Bring all the tithes into the storehouse&rdquo; — Malachi 3:10. Giving is an act of worship and
              partnership with God&apos;s agenda.
            </p>
          </motion.div>
        </div>
      </div>

      {/* ─── Giving categories ─── */}
      <section className="mx-auto max-w-7xl px-4 py-12 md:py-20">
        <h6 className="w-fit rounded-full bg-[#F4F4F4] px-3 py-1 text-xs font-bold">💝 <span className="ml-1">WAYS TO GIVE</span></h6>
        <h2 className="mb-10 mt-4 font-anton text-3xl font-normal leading-[120%] text-black md:text-5xl">
          GIVING CATEGORIES
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

      {/* ─── Notification form + bank details ─── */}
      <section className="bg-[#F4F4F4] px-4 py-12 md:py-20">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 lg:grid-cols-2">
          {/* Giving notification */}
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
                      <input
                        type="number"
                        min={0}
                        value={form.amount}
                        onChange={set("amount")}
                        className={inputCls}
                        placeholder="Optional"
                      />
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

          {/* Bank details */}
          <div className="flex flex-col gap-6">
            <div>
              <h6 className="w-fit rounded-full bg-white px-3 py-1 text-xs font-bold">🏦 <span className="ml-1">BANK TRANSFER</span></h6>
              <h2 className="mt-4 font-anton text-3xl font-normal text-black md:text-5xl">ACCOUNT DETAILS</h2>
              <p className="mt-2 text-[#00000099]">
                Transfer directly to the church account and use the notification form to let us know.
              </p>
            </div>

            <div className="flex flex-col gap-4">
              {accountDetails.map((item) => (
                <div key={item.label} className="flex flex-col gap-1 rounded-lg bg-white p-5 shadow-[0px_2px_12px_rgba(0,0,0,0.06)]">
                  <p className="text-[13px] font-bold uppercase tracking-wider text-[#00000066]">{item.label}</p>
                  <p className="text-lg font-bold">{item.value}</p>
                </div>
              ))}
            </div>

            <div className="rounded-lg border border-textRed/30 bg-textRed/10 p-5">
              <p className="text-sm leading-[1.7]">
                <span className="font-bold">Need account details?</span> Contact us via the{" "}
                <Link href="/requests/counseling" className="font-bold text-textRed hover:underline">
                  request form
                </Link>{" "}
                or reach us directly on our social media channels.
              </p>
            </div>

            <div className="flex flex-col gap-3">
              <p className="font-medium">Connect with us</p>
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
        </div>
      </section>

      {/* ─── Scripture ─── */}
      <section className="bg-black px-4 py-16">
        <div className="mx-auto flex max-w-3xl flex-col items-center gap-4 text-center">
          <p className="font-anton text-2xl uppercase leading-[1.4] text-white md:text-4xl">
            &ldquo;Each of you should give what you have decided in your heart to give, not reluctantly or under
            compulsion, for God loves a cheerful giver.&rdquo;
          </p>
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-textRed">2 Corinthians 9:7</p>
        </div>
      </section>
    </div>
  );
}
