"use client";

import { useState } from "react";
import Image from "next/image";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { FormField, FormCard, inputCls, selectCls } from "@/components/ui/FormField";
import { post } from "@/lib/api";

const vs = { fontVariationSettings: '"wdth" 100' };

const months = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

export default function EMemberPage() {
  const [form, setForm] = useState({
    firstName: "", middleName: "", lastName: "",
    countryCode: "+234", phoneNumber: "", email: "",
    sex: "", maritalStatus: "",
    dobDay: "", dobMonth: "", dobYear: "",
    weddingDay: "", weddingMonth: "", weddingYear: "",
    state: "", country: "Nigeria",
    occupation: "",
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
      await post("/users/e-member", {
        firstName: form.firstName,
        middleName: form.middleName || undefined,
        lastName: form.lastName,
        countryCode: form.countryCode,
        phoneNumber: form.phoneNumber,
        email: form.email || undefined,
        sex: form.sex,
        maritalStatus: form.maritalStatus || undefined,
        dayOfBirth: form.dobDay ? parseInt(form.dobDay) : undefined,
        monthOfBirth: form.dobMonth ? parseInt(form.dobMonth) : undefined,
        yearOfBirth: form.dobYear ? parseInt(form.dobYear) : undefined,
        dayOfWedding: form.weddingDay ? parseInt(form.weddingDay) : undefined,
        monthOfWedding: form.weddingMonth ? parseInt(form.weddingMonth) : undefined,
        yearOfWedding: form.weddingYear ? parseInt(form.weddingYear) : undefined,
        state: form.state || undefined,
        country: form.country || undefined,
        occupation: form.occupation || undefined,
      });
      setStatus("success");
    } catch (err: unknown) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Submission failed. Please try again.");
    }
  }

  return (
    <main>
      {/* Hero */}
      <section className="relative min-h-[400px] md:h-[500px] w-full overflow-hidden flex items-center justify-center">
        <div className="absolute inset-0">
          <Image src="/assets/hero-bg.png" alt="" fill className="object-cover pointer-events-none" priority />
          <div className="absolute inset-0 bg-[rgba(16,14,26,0.75)]" />
        </div>
        <Navbar />
        <div className="relative z-10 w-full max-w-[900px] px-6 mt-16 md:mt-[48px] flex flex-col gap-[12px] items-center text-center">
          <p className="text-[#B5B5F3] text-[14px] font-normal uppercase tracking-[0.15em]" style={vs}>Online Membership</p>
          <h1 className="text-[#FFFDFD] text-[36px] md:text-[56px] lg:text-[72px] font-medium leading-tight" style={vs}>
            Become an E-Member
          </h1>
          <p className="text-[#FFFDFD] text-[16px] md:text-[18px] font-normal leading-[1.6]" style={vs}>
            Register as an online member of RCCG Rose of Sharon and stay connected with your church family.
          </p>
        </div>
      </section>

      {/* Form Section */}
      <section className="bg-[#F3F4F6] px-4 md:px-[60px] lg:px-[120px] py-[48px] md:py-[72px] flex flex-col gap-[24px] items-center w-full">

        {/* Benefits */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full max-w-[860px]">
          {[
            { icon: "📋", title: "Church Records", desc: "Your details are securely stored in the church database" },
            { icon: "🔔", title: "Stay Updated", desc: "Receive announcements and church updates directly" },
            { icon: "🤝", title: "Stay Connected", desc: "Remain part of the Rose of Sharon family wherever you are" },
          ].map((b) => (
            <div key={b.title} className="bg-white rounded-xl p-5 flex flex-col gap-[8px] border border-[#E5E7EB] text-center">
              <span className="text-[28px]">{b.icon}</span>
              <p className="text-[#000080] text-[14px] font-bold" style={vs}>{b.title}</p>
              <p className="text-[#6B7280] text-[13px] leading-[1.5]" style={vs}>{b.desc}</p>
            </div>
          ))}
        </div>

        <div className="w-full max-w-[860px] flex flex-col gap-[4px] items-center text-center">
          <h2 className="text-[#000080] text-[26px] md:text-[32px] font-bold" style={vs}>E-Member Registration Form</h2>
          <p className="text-[#6B7280] text-[14px]" style={vs}>All fields marked * are required</p>
        </div>

        {status === "success" ? (
          <div className="flex flex-col gap-[16px] items-center max-w-[500px] text-center bg-white rounded-2xl p-10 shadow-sm">
            <div className="size-[72px] rounded-full bg-green-100 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
            <p className="text-[#000080] text-[22px] font-bold" style={vs}>Welcome to the Family!</p>
            <p className="text-[#6B7280] text-[15px]" style={vs}>
              Your e-member registration has been received. You are now part of the RCCG Rose of Sharon online community.
            </p>
            <button
              onClick={() => setStatus("idle")}
              className="text-[#000080] text-[14px] font-medium hover:underline"
              style={vs}
            >
              Submit another registration
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-[16px] w-full max-w-[860px]">

            {/* Personal Information */}
            <FormCard title="Personal Information">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <FormField label="First Name" required>
                  <input type="text" required value={form.firstName} onChange={set("firstName")} className={inputCls} placeholder="Enter first name" />
                </FormField>
                <FormField label="Middle Name">
                  <input type="text" value={form.middleName} onChange={set("middleName")} className={inputCls} placeholder="Enter middle name" />
                </FormField>
                <FormField label="Last Name" required>
                  <input type="text" required value={form.lastName} onChange={set("lastName")} className={inputCls} placeholder="Enter last name" />
                </FormField>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                <FormField label="Gender" required>
                  <select required value={form.sex} onChange={set("sex")} className={selectCls}>
                    <option value="">Select gender</option>
                    <option value="MALE">Male</option>
                    <option value="FEMALE">Female</option>
                  </select>
                </FormField>
                <FormField label="Marital Status">
                  <select value={form.maritalStatus} onChange={set("maritalStatus")} className={selectCls}>
                    <option value="">Select status</option>
                    <option value="SINGLE">Single</option>
                    <option value="MARRIED">Married</option>
                    <option value="SEPARATED">Separated</option>
                    <option value="DIVORCED">Divorced</option>
                    <option value="SINGLE_PARENT">Single Parent</option>
                    <option value="WIDOWED">Widowed</option>
                  </select>
                </FormField>
              </div>

              <div className="mt-4">
                <label className="block text-sm font-medium text-[#374151] mb-1">Date of Birth</label>
                <div className="grid grid-cols-3 gap-3">
                  <select value={form.dobDay} onChange={set("dobDay")} className={selectCls}>
                    <option value="">Day</option>
                    {Array.from({ length: 31 }, (_, i) => i + 1).map((d) => (
                      <option key={d} value={d}>{d}</option>
                    ))}
                  </select>
                  <select value={form.dobMonth} onChange={set("dobMonth")} className={selectCls}>
                    <option value="">Month</option>
                    {months.map((m, i) => <option key={m} value={i + 1}>{m}</option>)}
                  </select>
                  <select value={form.dobYear} onChange={set("dobYear")} className={selectCls}>
                    <option value="">Year</option>
                    {Array.from({ length: 100 }, (_, i) => new Date().getFullYear() - i).map((y) => (
                      <option key={y} value={y}>{y}</option>
                    ))}
                  </select>
                </div>
              </div>

              {form.maritalStatus === "MARRIED" && (
                <div className="mt-4">
                  <label className="block text-sm font-medium text-[#374151] mb-1">Wedding Anniversary</label>
                  <div className="grid grid-cols-3 gap-3">
                    <select value={form.weddingDay} onChange={set("weddingDay")} className={selectCls}>
                      <option value="">Day</option>
                      {Array.from({ length: 31 }, (_, i) => i + 1).map((d) => (
                        <option key={d} value={d}>{d}</option>
                      ))}
                    </select>
                    <select value={form.weddingMonth} onChange={set("weddingMonth")} className={selectCls}>
                      <option value="">Month</option>
                      {months.map((m, i) => <option key={m} value={i + 1}>{m}</option>)}
                    </select>
                    <select value={form.weddingYear} onChange={set("weddingYear")} className={selectCls}>
                      <option value="">Year</option>
                      {Array.from({ length: 80 }, (_, i) => new Date().getFullYear() - i).map((y) => (
                        <option key={y} value={y}>{y}</option>
                      ))}
                    </select>
                  </div>
                </div>
              )}

              <div className="mt-4">
                <FormField label="Occupation / Profession">
                  <input type="text" value={form.occupation} onChange={set("occupation")} className={inputCls} placeholder="Your occupation" />
                </FormField>
              </div>
            </FormCard>

            {/* Contact Details */}
            <FormCard title="Contact &amp; Location">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FormField label="Phone Number" required>
                  <div className="flex gap-2">
                    <select value={form.countryCode} onChange={set("countryCode")} className={`${selectCls} w-[100px] flex-shrink-0`}>
                      <option value="+234">+234</option>
                      <option value="+1">+1</option>
                      <option value="+44">+44</option>
                      <option value="+27">+27</option>
                      <option value="+33">+33</option>
                    </select>
                    <input type="tel" required value={form.phoneNumber} onChange={set("phoneNumber")} className={`${inputCls} flex-1`} placeholder="080 0000 0000" />
                  </div>
                </FormField>
                <FormField label="Email Address">
                  <input type="email" value={form.email} onChange={set("email")} className={inputCls} placeholder="your@email.com" />
                </FormField>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                <FormField label="State / City">
                  <input type="text" value={form.state} onChange={set("state")} className={inputCls} placeholder="State or city" />
                </FormField>
                <FormField label="Country">
                  <input type="text" value={form.country} onChange={set("country")} className={inputCls} placeholder="Country" />
                </FormField>
              </div>
            </FormCard>

            {status === "error" && (
              <p className="text-red-500 text-[14px] text-center" style={vs}>{error}</p>
            )}

            <div className="flex justify-center mt-[8px]">
              <button
                type="submit"
                disabled={status === "loading"}
                className="bg-[#000080] px-[40px] py-[16px] rounded-[33px] text-[#FFFDFD] text-[18px] md:text-[22px] font-medium hover:bg-[#0000a0] transition-colors disabled:opacity-60"
                style={vs}
              >
                {status === "loading" ? "REGISTERING..." : "REGISTER AS E-MEMBER"}
              </button>
            </div>
          </form>
        )}
      </section>

      <Footer />
    </main>
  );
}
