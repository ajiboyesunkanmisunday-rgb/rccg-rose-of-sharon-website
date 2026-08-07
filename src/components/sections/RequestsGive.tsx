"use client";

import { useState } from "react";
import Image from "next/image";

const categories = [
  "Prayer Request",
  "Suggestion",
  "Counselling",
  "Baby Dedication",
  "Baby Christening",
  "Testimony",
];

export default function RequestsGive() {
  const [form, setForm] = useState({ name: "", subject: "", category: "", details: "" });

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    alert("Request submitted! We'll get back to you soon.");
    setForm({ name: "", subject: "", category: "", details: "" });
  }

  return (
    <section id="requests" className="flex w-full">
      {/* Requests form */}
      <div className="flex flex-1 flex-col gap-[32px] items-center min-w-0 px-[32px] py-[72px] relative">
        <div aria-hidden className="absolute inset-0 pointer-events-none">
          <div className="absolute bg-[#625b5d] inset-0" />
          <div className="absolute inset-0 opacity-15 overflow-hidden">
            <Image src="/assets/requests-bg.png" alt="" fill className="object-cover" />
          </div>
        </div>

        <div className="flex flex-col gap-[32px] items-center relative flex-shrink-0 w-full">
          <h2
            className="text-[#FFFDFD] text-[48px] font-bold leading-normal text-center whitespace-nowrap"
            style={{ fontVariationSettings: '"wdth" 100' }}
          >
            Requests
          </h2>

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
                      <option key={c} value={c}>{c}</option>
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

            <div className="bg-[#000080] drop-shadow-[19px_19px_20px_rgba(0,0,0,0.1)] flex flex-col items-center justify-center px-[32px] py-[16px] rounded-[33px] flex-shrink-0">
              <button type="submit" className="flex items-center w-full">
                <span
                  className="text-[#FFFDFD] text-[25px] font-medium leading-normal text-center whitespace-nowrap"
                  style={{ fontVariationSettings: '"wdth" 100' }}
                >
                  SEND
                </span>
              </button>
            </div>
          </form>
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
            <Image src="/assets/give-illustration.png" alt="" fill className="object-cover" />
          </div>
        </div>

        <div className="bg-[#000080] drop-shadow-[19px_19px_20px_rgba(0,0,0,0.1)] flex flex-col items-center justify-center px-[32px] py-[16px] rounded-[35px] flex-shrink-0">
          <div className="flex items-center w-full">
            <span
              className="text-[#FFFDFD] text-[25px] font-medium leading-normal text-center whitespace-nowrap"
              style={{ fontVariationSettings: '"wdth" 100' }}
            >
              GIVE ONLINE
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
