"use client";

import { useState } from "react";
import Link from "@ros/shared/link";
import { post } from "@ros/shared/api";
import { FormField, FormCard, FormSheet, inputCls, selectCls, textareaCls, submitCls } from "@ros/shared/kit/form";

const celebrationTypes = [
  { value: "BIRTHDAY", label: "Birthday" },
  { value: "WEDDING", label: "Wedding Anniversary" },
  { value: "CHILD_DEDICATION", label: "Child Dedication" },
  { value: "FUNERAL", label: "Funeral / Remembrance" },
  { value: "OTHERS", label: "Others" },
];

export default function CelebrationForm() {
  const [form, setForm] = useState({ name: "", phone: "", email: "", type: "", date: "", notes: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [error, setError] = useState("");
  // the backend wants to know which member is asking, so the visitor is found by membership email or phone first
  const [identifier, setIdentifier] = useState("");
  const [member, setMember] = useState<{ id: string; firstName: string } | null>(null);
  const [verifying, setVerifying] = useState(false);
  const [verifyError, setVerifyError] = useState("");

  async function verify(e: React.FormEvent) {
    e.preventDefault();
    setVerifying(true);
    setVerifyError("");
    try {
      const res = await fetch("/api/member/verify", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ identifier }) });
      const json = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(json.message || "We could not check your membership. Please try again.");
      setMember({ id: json.id, firstName: json.firstName || "" });
      if (json.firstName) setForm((p) => ({ ...p, name: p.name || json.firstName }));
    } catch (err: unknown) {
      setVerifyError(err instanceof Error ? err.message : "We could not check your membership. Please try again.");
    } finally {
      setVerifying(false);
    }
  }

  function set(k: string) {
    return (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
      setForm((p) => ({ ...p, [k]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!member) return;
    setStatus("loading");
    setError("");
    try {
      const contactInfo = [
        `Name: ${form.name}`,
        form.phone ? `Phone: ${form.phone}` : null,
        form.email ? `Email: ${form.email}` : null,
        form.notes ? `\nMessage: ${form.notes}` : null,
      ]
        .filter(Boolean)
        .join("\n");

      await post("/celebrations", { userId: member.id, type: form.type, date: form.date, notes: contactInfo });
      setStatus("success");
    } catch (err: unknown) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Submission failed. Please try again.");
    }
  }

  return (
    <div id="request" className="ros:pt-8 ros:md:pt-12" style={{ scrollMarginTop: 90 }}>
      <FormSheet flat>
        <div className="ros:mb-6 ros:flex ros:flex-col ros:items-center ros:gap-2 ros:text-center">
          <h2 className="ros-anton ros:text-3xl ros:uppercase ros:text-black ros:md:text-4xl">Celebration Request</h2>
          <p className="ros:max-w-[600px] ros:text-[#00000099]">
            The church would love to celebrate and pray for you on your special day. Fill the form below and we&apos;ll make it extra special.
          </p>
        </div>

        {status === "success" ? (
          <div className="ros:flex ros:flex-col ros:items-center ros:gap-4 ros:px-4 ros:py-12 ros:text-center">
            <div className="ros:flex ros:size-[80px] ros:items-center ros:justify-center ros:rounded-full ros:bg-[#DF4E4E] ros:text-[36px] ros:text-white">🎉</div>
            <p className="ros-anton ros:text-2xl ros:uppercase">Request Received!</p>
            <p className="ros:text-[#00000099]">
              We&apos;ve received your celebration request. The church family will celebrate and pray for you on your special day!
            </p>
            <Link href="/" className="ros:text-sm ros:font-bold ros:text-[#DF4E4E] ros:hover:underline">
              ← Back to Home
            </Link>
          </div>
        ) : !member ? (
          <form onSubmit={verify} noValidate className="ros:flex ros:flex-col ros:gap-4">
            <FormCard title="Your Membership">
              <div className="ros:flex ros:flex-col ros:gap-4">
                <p className="ros:text-sm ros:text-[#00000099]">
                  Celebration requests are for members of Rose of Sharon. Enter the email address or phone number on your membership record and we will find you.
                </p>
                <FormField label="Membership email or phone number" required>
                  <input type="text" required value={identifier} onChange={(e) => setIdentifier(e.target.value)} className={inputCls} placeholder="you@example.com or 080 0000 0000" autoComplete="off" data-no-check />
                </FormField>
                {verifyError && <p className="ros:text-sm ros:text-[#FF383C]">{verifyError}</p>}
              </div>
            </FormCard>
            <div className="ros:flex ros:justify-center">
              <button type="submit" disabled={verifying || identifier.trim().length < 5} className={submitCls}>
                {verifying ? "Checking..." : "Continue"}
              </button>
            </div>
            <p className="ros:text-center ros:text-sm ros:text-[#00000099]">
              Not a member yet? <Link href="/membership" className="ros:font-bold ros:text-[#DF4E4E] ros:hover:underline">Become a member</Link>
            </p>
          </form>
        ) : (
          <form onSubmit={handleSubmit} className="ros:flex ros:flex-col ros:gap-4">
            <p className="ros:self-center ros:rounded-full ros:bg-[#16A34A]/10 ros:px-4 ros:py-1.5 ros:text-sm ros:font-bold ros:text-[#16A34A]">
              ✓ Verified member{member.firstName ? `: ${member.firstName}` : ""}
            </p>
            <FormCard title="Your Information">
              <div className="ros:flex ros:flex-col ros:gap-4">
                <FormField label="Full Name" required>
                  <input type="text" required value={form.name} onChange={set("name")} className={inputCls} />
                </FormField>
                <div className="ros:grid ros:grid-cols-1 ros:gap-4 ros:sm:grid-cols-2">
                  <FormField label="Phone Number" required>
                    <input type="tel" required value={form.phone} onChange={set("phone")} className={inputCls} />
                  </FormField>
                  <FormField label="Email Address">
                    <input type="email" value={form.email} onChange={set("email")} className={inputCls} />
                  </FormField>
                </div>
              </div>
            </FormCard>

            <FormCard title="Celebration Details">
              <div className="ros:flex ros:flex-col ros:gap-4">
                <div className="ros:grid ros:grid-cols-1 ros:gap-4 ros:sm:grid-cols-2">
                  <FormField label="Celebration Type" required>
                    <select required value={form.type} onChange={set("type")} className={selectCls}>
                      <option value="">Select type</option>
                      {celebrationTypes.map((t) => (
                        <option key={t.value} value={t.value}>
                          {t.label}
                        </option>
                      ))}
                    </select>
                  </FormField>
                  <FormField label="Date of Celebration" required>
                    <input type="date" required value={form.date} onChange={set("date")} className={inputCls} />
                  </FormField>
                </div>
                <FormField label="Additional Message">
                  <textarea
                    value={form.notes}
                    onChange={set("notes")}
                    rows={4}
                    placeholder="Any special requests or things you would like the church to know..."
                    className={textareaCls}
                  />
                </FormField>
              </div>
            </FormCard>

            {status === "error" && <p className="ros:text-center ros:text-sm ros:text-[#FF383C]">{error}</p>}
            <div className="ros:flex ros:justify-center">
              <button type="submit" disabled={status === "loading"} className={submitCls}>
                {status === "loading" ? "Submitting..." : "Send us your special day"}
              </button>
            </div>
          </form>
        )}
      </FormSheet>
    </div>
  );
}
