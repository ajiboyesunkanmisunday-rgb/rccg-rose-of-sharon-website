"use client";

import { FormHero } from "@/app/(site)/(more)/_kit/ui";

import { useState } from "react";
import Image from "next/image";
import { FormField, FormCard, inputCls, textareaCls, FormSheet, submitCls, inputClsNoW, selectClsNoW, textareaClsNoW } from "@/app/(site)/(more)/_kit/form";
import { post } from "@/lib/api";


export default function BabyChristeningPage() {
  const [form, setForm] = useState({
    parentName: "", phone: "", email: "",
    babyName: "", babyDob: "", additionalInfo: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [error, setError] = useState("");

  function set(k: string) {
    return (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm((p) => ({ ...p, [k]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setError("");
    try {
      const content = `Parent/Guardian Name: ${form.parentName}\nPhone: ${form.phone}\nEmail: ${form.email}\nBaby's Name: ${form.babyName}\nDate of Birth: ${form.babyDob}\n\nAdditional Information:\n${form.additionalInfo}`;
      await post("/requests/baby-christening", {
        subject: `Baby Christening Request — ${form.babyName}`,
        content,
      });
      setStatus("success");
    } catch (err: unknown) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Submission failed. Please try again.");
    }
  }

  return (
    <div>
      <FormHero pill="FORMS" title={<>Baby <span className="text-textRed">Christening</span></>} subtitle="Welcome your child into the family of God. Fill out the form and our team will contact you to arrange the christening." />

      <FormSheet>
        <h2 className="ros-anton ros:uppercase ros:text-[#DF4E4E] ros:text-[48px] ros:leading-normal ros:text-center">
          Request Baby Christening
        </h2>

        {status === "success" ? (
          <div className="ros:bg-white ros:rounded-2xl ros:p-10 ros:shadow-sm ros:flex ros:flex-col ros:gap-[16px] ros:items-center ros:max-w-[600px] ros:text-center">
            <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="32" cy="32" r="32" fill="#16A34A" fillOpacity="0.12" />
              <circle cx="32" cy="32" r="24" fill="#16A34A" fillOpacity="0.2" />
              <path d="M20 32L28 40L44 24" stroke="#16A34A" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <p className="ros:text-[#111827] ros:text-[25px] ros:font-medium">Request Submitted!</p>
            <p className="ros:text-[#6B7280] ros:text-[16px] ros:font-normal">
              Thank you! Your baby christening request has been received. Our team will contact you to confirm the details.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="ros:flex ros:flex-col ros:gap-[16px] ros:items-center ros:w-full ros:max-w-[700px]">
            <FormCard title="Parent / Guardian Details">
              <div className="ros:flex ros:flex-col ros:gap-[16px]">
                <div className="ros:grid ros:grid-cols-1 ros:sm:grid-cols-2 ros:gap-[16px]">
                  <FormField label="Parent / Guardian Name" required>
                    <input type="text" required value={form.parentName} onChange={set("parentName")} className={inputCls} placeholder="Full name" />
                  </FormField>
                  <FormField label="Phone Number" required>
                    <input type="tel" required value={form.phone} onChange={set("phone")} className={inputCls} placeholder="+234 800 000 0000" />
                  </FormField>
                </div>
                <FormField label="Email Address">
                  <input type="email" value={form.email} onChange={set("email")} className={inputCls} placeholder="your@email.com" />
                </FormField>
              </div>
            </FormCard>

            <FormCard title="Baby's Details">
              <div className="ros:flex ros:flex-col ros:gap-[16px]">
                <div className="ros:grid ros:grid-cols-1 ros:sm:grid-cols-2 ros:gap-[16px]">
                  <FormField label="Baby's Full Name" required>
                    <input type="text" required value={form.babyName} onChange={set("babyName")} className={inputCls} placeholder="Baby's name" />
                  </FormField>
                  <FormField label="Baby's Date of Birth" required>
                    <input type="date" required value={form.babyDob} onChange={set("babyDob")} className={inputCls} />
                  </FormField>
                </div>
                <FormField label="Additional Information / Special Requests">
                  <textarea
                    value={form.additionalInfo}
                    onChange={set("additionalInfo")}
                    className={textareaCls}
                    rows={5}
                    placeholder="Any special notes or preferred date..."
                  />
                </FormField>
              </div>
            </FormCard>

            {status === "error" && (
              <p className="ros:text-[#FF383C] ros:text-[14px] ros:font-normal ros:text-center">{error}</p>
            )}

            <button
              type="submit"
              disabled={status === "loading"}
              className={submitCls}
             
            >
              {status === "loading" ? "Submitting..." : "SUBMIT REQUEST"}
            </button>
          </form>
        )}
      </FormSheet>
    </div>
  );
}
