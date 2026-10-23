"use client";

import { useState } from "react";
import Link from "next/link";
import { post } from "@/lib/api";
import { FormHero } from "@/app/(site)/(more)/_kit/ui";
import { FormField, FormCard, FormSheet, inputCls, selectCls, textareaCls, submitCls } from "@/app/(site)/(more)/_kit/form";

const celebrationTypes = [
  { value: "BIRTHDAY", label: "Birthday" },
  { value: "WEDDING", label: "Wedding Anniversary" },
  { value: "CHILD_DEDICATION", label: "Child Dedication" },
  { value: "FUNERAL", label: "Funeral / Remembrance" },
  { value: "OTHERS", label: "Others" },
];

export default function SpecialDayPage() {
  const [form, setForm] = useState({ name: "", phone: "", email: "", type: "", date: "", notes: "" });
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
      const contactInfo = [
        `Name: ${form.name}`,
        form.phone ? `Phone: ${form.phone}` : null,
        form.email ? `Email: ${form.email}` : null,
        form.notes ? `\nMessage: ${form.notes}` : null,
      ]
        .filter(Boolean)
        .join("\n");

      await post("/celebrations", { type: form.type, date: form.date, notes: contactInfo });
      setStatus("success");
    } catch (err: unknown) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Submission failed. Please try again.");
    }
  }

  return (
    <>
      <FormHero
        pill="SPECIAL DAY"
        title={
          <>
            Send Us Your Special <span className="text-textRed">Day</span>
          </>
        }
        subtitle="Let the church rejoice with you — birthdays, weddings, anniversaries and more."
      />

      <FormSheet>
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
        ) : (
          <form onSubmit={handleSubmit} className="ros:flex ros:flex-col ros:gap-4">
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
    </>
  );
}
