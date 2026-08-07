"use client";

import { useState } from "react";

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
    // TODO: wire to api.rccgros.org
    alert("Request submitted! We'll get back to you soon.");
    setForm({ name: "", subject: "", category: "", details: "" });
  }

  return (
    <section id="requests" className="flex">
      {/* Requests form */}
      <div
        className="flex-1 px-8 py-6 flex flex-col gap-8 items-center justify-center"
        style={{
          backgroundImage: "url('/requests-bg.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundColor: "#625B5D",
        }}
      >
        <h2 className="text-[#FFFDFD] text-[48px] font-bold">Requests</h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3 w-full max-w-[480px]">
          <div className="flex flex-col gap-1">
            <label className="text-[#FFFDFD] text-[13px]">
              Name <span className="text-[#FF383C]">*</span>
            </label>
            <input
              type="text"
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="h-10 bg-[#FFFDFD] rounded border border-[#A3A1AF] px-3 text-[#100E1A] text-sm focus:outline-none focus:border-[#000080]"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-[#FFFDFD] text-[13px]">
              Subject <span className="text-[#FF383C]">*</span>
            </label>
            <input
              type="text"
              required
              value={form.subject}
              onChange={(e) => setForm({ ...form, subject: e.target.value })}
              className="h-10 bg-[#FFFDFD] rounded border border-[#A3A1AF] px-3 text-[#100E1A] text-sm focus:outline-none focus:border-[#000080]"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-[#FFFDFD] text-[13px]">
              Category <span className="text-[#FF383C]">*</span>
            </label>
            <select
              required
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
              className="h-10 bg-[#FFFDFD] rounded border border-[#A3A1AF] px-3 text-[#100E1A] text-sm focus:outline-none focus:border-[#000080]"
            >
              <option value="">Select a category</option>
              {categories.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-[#FFFDFD] text-[13px]">
              Details <span className="text-[#FF383C]">*</span>
            </label>
            <textarea
              required
              value={form.details}
              onChange={(e) => setForm({ ...form, details: e.target.value })}
              rows={5}
              className="bg-[#FFFDFD] rounded-[10px] border border-[#A3A1AF] px-3 py-2 text-[#100E1A] text-sm focus:outline-none focus:border-[#000080] resize-none"
            />
          </div>

          <div className="flex justify-center pt-2">
            <button
              type="submit"
              className="px-8 py-4 bg-[#000080] text-[#FFFDFD] text-[25px] font-medium rounded-[33px] shadow-[19px_19px_40px_rgba(0,0,0,0.10)] hover:bg-[#0000a0] transition-colors"
            >
              SEND
            </button>
          </div>
        </form>
      </div>

      {/* Give Online */}
      <div
        className="flex-1 px-8 py-18 flex flex-col items-center justify-center gap-8"
        style={{
          backgroundImage: "url('/give-bg.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundColor: "#595587",
        }}
      >
        <div className="w-full max-w-[536px] aspect-[536/354] bg-white/20 rounded-xl flex items-center justify-center">
          <div className="text-white/60 text-center">
            <svg className="w-20 h-20 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
            <p className="text-lg font-medium">Give generously</p>
          </div>
        </div>

        <button className="flex items-center gap-2 px-8 py-4 bg-[#000080] text-[#FFFDFD] text-[25px] font-medium rounded-[35px] shadow-[19px_19px_40px_rgba(0,0,0,0.10)] hover:bg-[#0000a0] transition-colors">
          GIVE ONLINE
        </button>
      </div>
    </section>
  );
}
