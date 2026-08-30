"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { post } from "@/lib/api";

const vs = { fontVariationSettings: '"wdth" 100' };

const categories = [
  { label: "Prayer Request", value: "prayer", endpoint: "/requests/prayer" },
  { label: "Suggestion", value: "suggestion", endpoint: "/requests/suggestion" },
  { label: "Counselling", value: "counseling", endpoint: "/requests/counseling" },
  { label: "Baby Dedication", value: "baby-dedication", endpoint: "/requests/baby-dedication" },
  { label: "Baby Christening", value: "baby-christening", endpoint: "/requests/baby-christening" },
  { label: "Testimony", value: "testimony", endpoint: "/testimonies" },
];

export default function FloatingRequestButton() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [form, setForm] = useState({ name: "", subject: "", category: "", details: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [error, setError] = useState("");

  function closeModal() {
    setIsOpen(false);
    if (status === "success") {
      setStatus("idle");
      setForm({ name: "", subject: "", category: "", details: "" });
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const cat = categories.find((c) => c.value === form.category);
    if (!cat) return;

    if (cat.value === "counseling") {
      router.push("/requests/counseling");
      closeModal();
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
    } catch (err: unknown) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Submission failed. Please try again.");
    }
  }

  return (
    <>
      {/* Floating button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 flex items-center gap-[8px] px-[24px] py-[14px] bg-[#000080] text-[#FFFDFD] text-[15px] font-bold rounded-[30px] shadow-[0_8px_32px_rgba(0,0,128,0.45)] hover:bg-[#0000a0] transition-all"
        style={vs}
        aria-label="Send a request"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
        </svg>
        Requests
      </button>

      {/* Modal backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 px-4 py-6"
          onClick={(e) => { if (e.target === e.currentTarget) closeModal(); }}
        >
          <div className="bg-white rounded-2xl w-full max-w-[560px] max-h-[90vh] overflow-y-auto shadow-2xl">
            {/* Modal header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-[#E5E7EB]">
              <h2 className="text-[#000080] text-[20px] font-bold" style={vs}>Send a Request</h2>
              <button
                onClick={closeModal}
                className="text-[#6B7280] hover:text-[#111827] transition-colors w-[32px] h-[32px] flex items-center justify-center rounded-full hover:bg-[#F3F4F6]"
                aria-label="Close"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Modal body */}
            <div className="p-6">
              {status === "success" ? (
                <div className="flex flex-col gap-[16px] items-center py-[24px] text-center">
                  <div className="size-[60px] rounded-full bg-green-100 flex items-center justify-center">
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>
                  <p className="text-[#000080] text-[20px] font-bold" style={vs}>Request Submitted!</p>
                  <p className="text-[#6B7280] text-[15px]" style={vs}>We&apos;ll get back to you soon.</p>
                  <button
                    onClick={() => {
                      setStatus("idle");
                      setForm({ name: "", subject: "", category: "", details: "" });
                    }}
                    className="text-[#000080] text-[14px] font-medium hover:underline"
                    style={vs}
                  >
                    Submit another request
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-[16px]">
                  <div className="flex flex-col gap-[6px]">
                    <label className="text-[14px] font-semibold text-[#111827]" style={vs}>
                      Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="w-full rounded-lg border border-[#D1D5DB] px-4 py-[12px] text-[14px] text-[#111827] bg-white outline-none placeholder:text-[#9CA3AF] focus:border-[#000080] focus:ring-2 focus:ring-[#000080]/10 transition-colors"
                      placeholder="Your full name"
                      style={vs}
                    />
                  </div>

                  <div className="flex flex-col gap-[6px]">
                    <label className="text-[14px] font-semibold text-[#111827]" style={vs}>
                      Category <span className="text-red-500">*</span>
                    </label>
                    <select
                      required
                      value={form.category}
                      onChange={(e) => setForm({ ...form, category: e.target.value })}
                      className="w-full rounded-lg border border-[#D1D5DB] px-4 py-[12px] text-[14px] text-[#111827] bg-white outline-none focus:border-[#000080] focus:ring-2 focus:ring-[#000080]/10 transition-colors"
                      style={vs}
                    >
                      <option value="">Select a category</option>
                      {categories.map((c) => (
                        <option key={c.value} value={c.value}>{c.label}</option>
                      ))}
                    </select>
                  </div>

                  <div className="flex flex-col gap-[6px]">
                    <label className="text-[14px] font-semibold text-[#111827]" style={vs}>
                      Subject <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={form.subject}
                      onChange={(e) => setForm({ ...form, subject: e.target.value })}
                      className="w-full rounded-lg border border-[#D1D5DB] px-4 py-[12px] text-[14px] text-[#111827] bg-white outline-none placeholder:text-[#9CA3AF] focus:border-[#000080] focus:ring-2 focus:ring-[#000080]/10 transition-colors"
                      placeholder="Brief subject"
                      style={vs}
                    />
                  </div>

                  <div className="flex flex-col gap-[6px]">
                    <label className="text-[14px] font-semibold text-[#111827]" style={vs}>
                      Details <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      required
                      value={form.details}
                      onChange={(e) => setForm({ ...form, details: e.target.value })}
                      rows={4}
                      className="w-full rounded-lg border border-[#D1D5DB] px-4 py-[12px] text-[14px] text-[#111827] bg-white outline-none placeholder:text-[#9CA3AF] focus:border-[#000080] focus:ring-2 focus:ring-[#000080]/10 transition-colors resize-none"
                      placeholder="Share your request or message..."
                      style={vs}
                    />
                  </div>

                  {status === "error" && (
                    <p className="text-red-500 text-[13px]" style={vs}>{error}</p>
                  )}

                  <button
                    type="submit"
                    disabled={status === "loading"}
                    className="w-full px-[32px] py-[14px] bg-[#000080] text-[#FFFDFD] text-[15px] font-bold rounded-[30px] hover:bg-[#0000a0] transition-colors shadow-[0_4px_16px_rgba(0,0,128,0.35)] disabled:opacity-60 mt-[4px]"
                    style={vs}
                  >
                    {status === "loading" ? "Sending..." : "Send Request"}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
