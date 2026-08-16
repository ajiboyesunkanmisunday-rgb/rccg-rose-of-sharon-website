"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { post } from "@/lib/api";

const categories = [
  { label: "Prayer Request", value: "prayer", endpoint: "/requests/prayer" },
  { label: "Suggestion", value: "suggestion", endpoint: "/requests/suggestion" },
  { label: "Counselling", value: "counseling", endpoint: "/requests/counseling" },
  { label: "Baby Dedication", value: "baby-dedication", endpoint: "/requests/baby-dedication" },
  { label: "Baby Christening", value: "baby-christening", endpoint: "/requests/baby-christening" },
  { label: "Testimony", value: "testimony", endpoint: "/testimonies" },
];

export default function RequestsGive() {
  const router = useRouter();
  const [form, setForm] = useState({ name: "", subject: "", category: "", details: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const cat = categories.find((c) => c.value === form.category);
    if (!cat) return;

    if (cat.value === "counseling") {
      router.push("/requests/counseling");
      return;
    }

    setStatus("loading");
    setError("");
    try {
      const content = `From: ${form.name}\n\n${form.details}`;
      if (cat.value === "testimony") {
        await post("/testimonies", { subject: form.subject, content });
      } else {
        await post(cat.endpoint, { subject: form.subject, content });
      }
      setStatus("success");
      setForm({ name: "", subject: "", category: "", details: "" });
    } catch (err: unknown) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Submission failed. Please try again.");
    }
  }

  return (
    <section id="requests" className="bg-[#3a394f] flex items-start px-[120px] w-full">
      {/* Requests form */}
      <div className="flex flex-1 flex-col gap-[32px] items-center min-w-0 px-[32px] py-[24px] relative self-stretch">
        <div aria-hidden className="absolute inset-0 pointer-events-none">
          <div className="absolute bg-[#625b5d] inset-0" />
          <div className="absolute inset-0 opacity-15 overflow-hidden">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/assets/requests-bg.png" alt="" className="absolute max-w-none w-full" style={{ height: "153.52%", left: "0.03%", top: "-9.22%" }} />
          </div>
        </div>

        <div className="flex flex-col gap-[32px] items-center relative flex-shrink-0 w-full">
          <h2
            className="text-[#FFFDFD] text-[48px] font-bold leading-normal text-center whitespace-nowrap"
            style={{ fontVariationSettings: '"wdth" 100' }}
          >
            Requests
          </h2>

          {status === "success" ? (
            <div className="flex flex-col gap-[16px] items-center py-[32px] text-center">
              <div className="size-[60px] rounded-full bg-[#000080] flex items-center justify-center text-[28px] text-white">✓</div>
              <p className="text-[#FFFDFD] text-[20px] font-medium" style={{ fontVariationSettings: '"wdth" 100' }}>
                Request submitted! We&apos;ll get back to you soon.
              </p>
              <button
                onClick={() => setStatus("idle")}
                className="text-[#B5B5F3] text-[14px] hover:underline"
                style={{ fontVariationSettings: '"wdth" 100' }}
              >
                Submit another request
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-[12px] items-center justify-center w-full">
              <div className="flex items-center w-full">
                <div className="flex flex-1 flex-col items-start min-w-0 relative">
                  <p className="text-[#FFFDFD] text-[13px] font-normal leading-[14px] flex-shrink-0 mb-0">
                    Name <span className="text-[#FF383C]">*</span>
                  </p>
                  <div className="flex flex-1 flex-col items-start min-w-0 w-full">
                    <div className="bg-[#FFFDFD] border border-[#A3A1AF] h-[40px] rounded-[4px] flex-shrink-0 w-full">
                      <input
                        type="text"
                        required
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        className="w-full h-full px-3 bg-transparent text-[#100E1A] text-sm focus:outline-none rounded-[4px]"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center w-full">
                <div className="flex flex-1 flex-col gap-[4px] items-start min-w-0 relative">
                  <p className="text-[#FFFDFD] text-[13px] font-normal leading-[14px] text-center whitespace-nowrap flex-shrink-0">
                    Subject <span className="text-[#FF383C]">*</span>
                  </p>
                  <div className="bg-[#FFFDFD] border border-[#A3A1AF] h-[40px] rounded-[4px] flex-shrink-0 w-full">
                    <input
                      type="text"
                      required
                      value={form.subject}
                      onChange={(e) => setForm({ ...form, subject: e.target.value })}
                      className="w-full h-full px-3 bg-transparent text-[#100E1A] text-sm focus:outline-none rounded-[4px]"
                    />
                  </div>
                </div>
              </div>

              <div className="flex items-center w-full">
                <div className="flex flex-1 flex-col gap-[4px] items-start min-w-0 relative">
                  <p className="text-[#FFFDFD] text-[13px] font-normal leading-[14px] text-center whitespace-nowrap flex-shrink-0">
                    Category <span className="text-[#FF383C]">*</span>
                  </p>
                  <div className="bg-[#FFFDFD] border border-[#A3A1AF] h-[40px] rounded-[4px] flex-shrink-0 w-full">
                    <select
                      required
                      value={form.category}
                      onChange={(e) => setForm({ ...form, category: e.target.value })}
                      className="w-full h-full px-3 bg-transparent text-[#100E1A] text-sm focus:outline-none rounded-[4px]"
                    >
                      <option value="">Select a category</option>
                      {categories.map((c) => (
                        <option key={c.value} value={c.value}>{c.label}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              <div className="flex items-center w-full">
                <div className="flex flex-1 flex-col gap-[4px] items-start min-w-0 relative">
                  <p className="text-[#FFFDFD] text-[13px] font-normal leading-[14px] text-center whitespace-nowrap flex-shrink-0">
                    Details <span className="text-[#FF383C]">*</span>
                  </p>
                  <div className="bg-[#FFFDFD] border border-[#A3A1AF] h-[102px] rounded-[10px] flex-shrink-0 w-full">
                    <textarea
                      required
                      value={form.details}
                      onChange={(e) => setForm({ ...form, details: e.target.value })}
                      className="w-full h-full px-3 py-2 bg-transparent text-[#100E1A] text-sm focus:outline-none rounded-[10px] resize-none"
                    />
                  </div>
                </div>
              </div>

              {status === "error" && (
                <p className="text-[#FF383C] text-[13px] text-center w-full" style={{ fontVariationSettings: '"wdth" 100' }}>{error}</p>
              )}

              <div className="bg-[#000080] drop-shadow-[19px_19px_20px_rgba(0,0,0,0.1)] flex flex-col items-center justify-center px-[32px] py-[16px] rounded-[33px] flex-shrink-0">
                <button type="submit" disabled={status === "loading"} className="flex items-center w-full disabled:opacity-60">
                  <span
                    className="text-[#FFFDFD] text-[25px] font-medium leading-normal text-center whitespace-nowrap"
                    style={{ fontVariationSettings: '"wdth" 100' }}
                  >
                    {status === "loading" ? "SENDING..." : "SEND"}
                  </span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>

      {/* Give Online */}
      <div className="flex flex-1 flex-col gap-[32px] items-center justify-center min-w-0 px-[32px] py-[72px] relative self-stretch">
        <div aria-hidden className="absolute inset-0 pointer-events-none">
          <div className="absolute bg-[#595587] inset-0" />
          <Image src="/assets/give-bg.png" alt="" fill className="object-cover opacity-15" />
        </div>

        <div className="aspect-[536/354] relative flex-shrink-0 w-full">
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/assets/give-illustration.png" alt="" className="absolute max-w-none w-full" style={{ height: "113.56%", left: 0, top: "-7.53%" }} />
          </div>
        </div>

        <Link
          href="/give"
          className="bg-[#000080] drop-shadow-[19px_19px_20px_rgba(0,0,0,0.1)] flex flex-col items-center justify-center px-[32px] py-[16px] rounded-[35px] flex-shrink-0 hover:bg-[#0000a0] transition-colors"
        >
          <span
            className="text-[#FFFDFD] text-[25px] font-medium leading-normal text-center whitespace-nowrap"
            style={{ fontVariationSettings: '"wdth" 100' }}
          >
            GIVE ONLINE
          </span>
        </Link>
      </div>
    </section>
  );
}
