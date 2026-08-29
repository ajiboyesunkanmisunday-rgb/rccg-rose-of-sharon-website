"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { FormField, FormCard, inputCls, selectCls } from "@/components/ui/FormField";
import { post } from "@/lib/api";

const vs = { fontVariationSettings: '"wdth" 100' };

export default function NewBelieverPage() {
  const [form, setForm] = useState({
    firstName: "", middleName: "", lastName: "",
    countryCode: "+234", phoneNumber: "", email: "",
    sex: "", street: "", city: "", state: "", country: "Nigeria",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [error, setError] = useState("");

  function set(k: string) {
    return (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
      setForm((p) => ({ ...p, [k]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setError("");
    try {
      await post("/new-converts", {
        firstName: form.firstName,
        middleName: form.middleName || undefined,
        lastName: form.lastName,
        countryCode: form.countryCode,
        phoneNumber: form.phoneNumber,
        email: form.email || undefined,
        sex: form.sex,
        street: form.street || undefined,
        city: form.city || undefined,
        state: form.state || undefined,
        country: form.country || undefined,
      });
      setStatus("success");
    } catch (err: unknown) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Submission failed. Please try again.");
    }
  }

  return (
    <main>
      <section className="relative min-h-[380px] md:h-[460px] w-full overflow-hidden flex items-center justify-center">
        <div className="absolute inset-0">
          <Image src="/assets/thanksgiving-bg.png" alt="" fill className="object-cover pointer-events-none" priority />
          <div className="absolute inset-0 bg-[rgba(0,0,128,0.75)]" />
        </div>
        <Navbar />
        <div className="relative z-10 w-full max-w-[900px] px-6 mt-16 md:mt-[48px] flex flex-col gap-[24px] items-center text-center">
          <h1 className="text-[#FFFDFD] text-[36px] md:text-[56px] lg:text-[68px] font-medium leading-normal w-full" style={vs}>
            I&apos;m a New Believer
          </h1>
          <p className="text-[#FFFDFD] text-[16px] md:text-[18px] font-normal leading-[32px] w-full" style={vs}>
            Congratulations on your decision to follow Jesus! Register below and we will connect you to resources and people to help you grow in faith.
          </p>
        </div>
      </section>

      {/* What to Expect */}
      <section className="bg-[#D2D2E2] px-4 md:px-[60px] lg:px-[120px] py-[84px] flex flex-col gap-[48px] items-center w-full">
        <h2 className="text-[#100E1A] text-[48px] font-bold leading-normal text-center" style={vs}>
          What Happens Next?
        </h2>
        <div className="grid gap-[24px] w-full" style={{ gridTemplateColumns: "repeat(3, 1fr)" }}>
          {[
            { step: "01", title: "Believer's Class", desc: "Join our free believer's class to understand your new faith, the church, and how to live as a Christian." },
            { step: "02", title: "Personal Follow-up", desc: "A dedicated team member will reach out to welcome you and answer any questions you may have." },
            { step: "03", title: "Join a Group", desc: "Get connected to a small group or ministry within the church where you can grow and build relationships." },
          ].map((item) => (
            <div key={item.step} className="bg-white rounded-[16px] flex flex-col gap-[16px] p-[32px] shadow-[0px_4px_20px_rgba(0,0,0,0.08)]">
              <span className="text-[#000080] text-[48px] font-bold leading-none" style={vs}>{item.step}</span>
              <h3 className="text-[#100E1A] text-[20px] font-bold leading-normal" style={vs}>{item.title}</h3>
              <p className="text-[#A3A1AF] text-[16px] font-normal leading-[1.6]" style={vs}>{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Registration Form */}
      <section className="bg-[#F3F4F6] px-4 md:px-[60px] lg:px-[120px] py-[84px] flex flex-col gap-[32px] items-center w-full">
        <h2 className="text-[#000080] text-[48px] font-bold leading-normal text-center" style={vs}>
          Register as a New Believer
        </h2>
        <p className="text-[#6B7280] text-[20px] font-normal leading-normal text-center max-w-[700px]" style={vs}>
          Fill out the form below and a member of our New Converts team will reach out to you.
        </p>

        {status === "success" ? (
          <div className="bg-white rounded-2xl p-10 shadow-sm flex flex-col gap-[24px] items-center max-w-[600px] text-center">
            <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="32" cy="32" r="32" fill="#16A34A" fillOpacity="0.12" />
              <circle cx="32" cy="32" r="24" fill="#16A34A" fillOpacity="0.2" />
              <path d="M20 32L28 40L44 24" stroke="#16A34A" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <p className="text-[#111827] text-[25px] font-medium" style={vs}>Welcome to the Kingdom!</p>
            <p className="text-[#6B7280] text-[20px] font-normal" style={vs}>
              Your registration has been received. Our New Converts team will contact you shortly. Heaven is rejoicing over your decision!
            </p>
            <Link
              href="/trainings/water-baptism"
              className="bg-[#000080] px-[32px] py-[16px] rounded-[33px] text-[#FFFDFD] text-[20px] font-medium hover:bg-[#0000a0] transition-colors"
              style={vs}
            >
              Register for Water Baptism →
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-[16px] w-full max-w-[700px]">
            <FormCard title="Personal Information">
              <div className="flex flex-col gap-[16px]">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-[16px]">
                  <FormField label="First Name" required>
                    <input type="text" required value={form.firstName} onChange={set("firstName")} className={inputCls} placeholder="First name" />
                  </FormField>
                  <FormField label="Middle Name">
                    <input type="text" value={form.middleName} onChange={set("middleName")} className={inputCls} placeholder="Middle name" />
                  </FormField>
                  <FormField label="Last Name" required>
                    <input type="text" required value={form.lastName} onChange={set("lastName")} className={inputCls} placeholder="Last name" />
                  </FormField>
                </div>
                <FormField label="Gender" required>
                  <select required value={form.sex} onChange={set("sex")} className={selectCls}>
                    <option value="">Select gender</option>
                    <option value="MALE">Male</option>
                    <option value="FEMALE">Female</option>
                  </select>
                </FormField>
              </div>
            </FormCard>

            <FormCard title="Contact Details">
              <div className="flex flex-col gap-[16px]">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-[16px]">
                  <FormField label="Phone Number" required>
                    <div className="flex gap-[8px] w-full">
                      <select value={form.countryCode} onChange={set("countryCode")} className="rounded-lg border border-[#E5E7EB] px-2 py-3 text-sm text-[#374151] outline-none focus:border-[#000080] focus:ring-1 focus:ring-[#000080] bg-white flex-shrink-0 w-[80px]">
                        <option value="+234">+234</option>
                        <option value="+1">+1</option>
                        <option value="+44">+44</option>
                      </select>
                      <input type="tel" required value={form.phoneNumber} onChange={set("phoneNumber")} className={`${inputCls} flex-1`} placeholder="080 0000 0000" />
                    </div>
                  </FormField>
                  <FormField label="Email Address">
                    <input type="email" value={form.email} onChange={set("email")} className={inputCls} placeholder="your@email.com" />
                  </FormField>
                </div>
              </div>
            </FormCard>

            <FormCard title="Home Address">
              <div className="flex flex-col gap-[16px]">
                <FormField label="Street Address">
                  <input type="text" value={form.street} onChange={set("street")} className={inputCls} placeholder="Street address" />
                </FormField>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-[16px]">
                  <FormField label="City">
                    <input type="text" value={form.city} onChange={set("city")} className={inputCls} placeholder="City" />
                  </FormField>
                  <FormField label="State">
                    <input type="text" value={form.state} onChange={set("state")} className={inputCls} placeholder="State" />
                  </FormField>
                  <FormField label="Country">
                    <input type="text" value={form.country} onChange={set("country")} className={inputCls} />
                  </FormField>
                </div>
              </div>
            </FormCard>

            {status === "error" && (
              <p className="text-[#FF383C] text-[14px] font-normal text-center" style={vs}>{error}</p>
            )}

            <div className="flex justify-center mt-[8px]">
              <button
                type="submit"
                disabled={status === "loading"}
                className="bg-[#000080] px-[40px] py-[16px] rounded-[33px] text-[#FFFDFD] text-[18px] md:text-[22px] font-medium hover:bg-[#0000a0] transition-colors disabled:opacity-60"
                style={vs}
              >
                {status === "loading" ? "Submitting..." : "REGISTER"}
              </button>
            </div>
          </form>
        )}
      </section>

      <Footer />
    </main>
  );
}
