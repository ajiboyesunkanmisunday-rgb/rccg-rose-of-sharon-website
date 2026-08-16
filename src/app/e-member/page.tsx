"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { FormField, inputCls, wrapCls, selectCls, SectionHeading } from "@/components/ui/FormField";
import { post } from "@/lib/api";

const vs = { fontVariationSettings: '"wdth" 100' };

export default function EMemberPage() {
  const [form, setForm] = useState({
    firstName: "", middleName: "", lastName: "",
    countryCode: "+234", phoneNumber: "", email: "",
    sex: "", maritalStatus: "",
    dayOfBirth: "", monthOfBirth: "", yearOfBirth: "",
    dayOfWedding: "", monthOfWedding: "", yearOfWedding: "",
    state: "", country: "Nigeria",
    occupation: "",
  });
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
      await post("/users/e-member", {
        firstName: form.firstName,
        middleName: form.middleName || undefined,
        lastName: form.lastName,
        countryCode: form.countryCode,
        phoneNumber: form.phoneNumber,
        email: form.email || undefined,
        sex: form.sex,
        maritalStatus: form.maritalStatus || undefined,
        dayOfBirth: form.dayOfBirth ? parseInt(form.dayOfBirth) : undefined,
        monthOfBirth: form.monthOfBirth ? parseInt(form.monthOfBirth) : undefined,
        yearOfBirth: form.yearOfBirth ? parseInt(form.yearOfBirth) : undefined,
        dayOfWedding: form.dayOfWedding ? parseInt(form.dayOfWedding) : undefined,
        monthOfWedding: form.monthOfWedding ? parseInt(form.monthOfWedding) : undefined,
        yearOfWedding: form.yearOfWedding ? parseInt(form.yearOfWedding) : undefined,
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

  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December",
  ];

  return (
    <main>
      {/* Hero */}
      <section className="relative h-[500px] w-full overflow-hidden flex items-center justify-center">
        <div className="absolute inset-0">
          <Image src="/assets/hero-bg.png" alt="" fill className="object-cover pointer-events-none" priority />
          <div className="absolute inset-0 bg-[rgba(16,14,26,0.75)]" />
        </div>
        <Navbar />
        <div className="absolute left-1/2 top-[calc(50%+48px)] -translate-x-1/2 -translate-y-1/2 flex flex-col gap-[16px] items-center w-[1148px] z-10 text-center">
          <p className="text-[#B5B5F3] text-[16px] font-normal uppercase tracking-[0.15em]" style={vs}>Online Membership</p>
          <h1 className="text-[#FFFDFD] text-[72px] font-medium leading-normal w-full" style={vs}>Become an E-Member</h1>
          <p className="text-[#FFFDFD] text-[20px] font-normal leading-[32px]" style={vs}>
            Register as an online member of RCCG Rose of Sharon and stay connected with your church family.
          </p>
        </div>
      </section>

      {/* Form */}
      <section className="bg-[#100E1A] px-[120px] py-[84px] flex flex-col gap-[32px] items-center w-full">
        <div className="flex items-center gap-[8px]">
          <Link href="/about" className="text-[#B5B5F3] text-[16px] hover:underline" style={vs}>About</Link>
          <span className="text-[#A3A1AF]">/</span>
          <span className="text-[#FFFDFD] text-[16px]" style={vs}>E-Member Registration</span>
        </div>
        <h2 className="text-[#FFFDFD] text-[48px] font-bold text-center" style={vs}>E-Member Form</h2>

        {/* Benefits */}
        <div className="grid gap-[16px] w-full max-w-[900px]" style={{ gridTemplateColumns: "repeat(3, 1fr)" }}>
          {[
            { icon: "📋", title: "Church Records", desc: "Your details are securely stored in the church database" },
            { icon: "🔔", title: "Stay Updated", desc: "Receive announcements and church updates directly" },
            { icon: "🤝", title: "Stay Connected", desc: "Remain part of the Rose of Sharon family wherever you are" },
          ].map((b) => (
            <div key={b.title} className="bg-[#1a1826] rounded-[12px] p-[20px] flex flex-col gap-[8px] border border-[#B5B5F3]/10 text-center">
              <span className="text-[32px]">{b.icon}</span>
              <p className="text-[#FFFDFD] text-[16px] font-bold" style={vs}>{b.title}</p>
              <p className="text-[#A3A1AF] text-[13px] font-normal leading-[1.5]" style={vs}>{b.desc}</p>
            </div>
          ))}
        </div>

        {status === "success" ? (
          <div className="flex flex-col gap-[24px] items-center max-w-[600px] text-center">
            <div className="size-[80px] rounded-full bg-[#000080] flex items-center justify-center text-[36px] text-white">✓</div>
            <p className="text-[#FFFDFD] text-[25px] font-medium" style={vs}>Welcome to the Family!</p>
            <p className="text-[#A3A1AF] text-[16px]" style={vs}>
              Your e-member registration has been received. You are now part of the RCCG Rose of Sharon online community.
            </p>
            <div className="flex gap-[16px] flex-wrap justify-center">
              <Link href="/groups" className="text-[#B5B5F3] text-[16px] hover:underline" style={vs}>Join a Group</Link>
              <Link href="/trainings" className="text-[#B5B5F3] text-[16px] hover:underline" style={vs}>Training Programs</Link>
              <Link href="/" className="text-[#B5B5F3] text-[16px] hover:underline" style={vs}>Back to Home</Link>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-[16px] w-full max-w-[900px]">
            <SectionHeading>Personal Information</SectionHeading>
            <div className="grid grid-cols-3 gap-[16px] w-full">
              <FormField label="First Name" required>
                <div className={wrapCls}><input type="text" required value={form.firstName} onChange={set("firstName")} className={inputCls} /></div>
              </FormField>
              <FormField label="Middle Name">
                <div className={wrapCls}><input type="text" value={form.middleName} onChange={set("middleName")} className={inputCls} /></div>
              </FormField>
              <FormField label="Last Name" required>
                <div className={wrapCls}><input type="text" required value={form.lastName} onChange={set("lastName")} className={inputCls} /></div>
              </FormField>
            </div>
            <div className="grid grid-cols-2 gap-[16px] w-full">
              <FormField label="Gender" required>
                <div className={wrapCls}>
                  <select required value={form.sex} onChange={set("sex")} className={selectCls}>
                    <option value="">Select</option>
                    <option value="MALE">Male</option>
                    <option value="FEMALE">Female</option>
                  </select>
                </div>
              </FormField>
              <FormField label="Marital Status">
                <div className={wrapCls}>
                  <select value={form.maritalStatus} onChange={set("maritalStatus")} className={selectCls}>
                    <option value="">Select</option>
                    <option value="SINGLE">Single</option>
                    <option value="MARRIED">Married</option>
                    <option value="DIVORCED">Divorced</option>
                    <option value="WIDOWED">Widowed</option>
                  </select>
                </div>
              </FormField>
            </div>

            <SectionHeading>Date of Birth</SectionHeading>
            <div className="grid grid-cols-3 gap-[16px] w-full">
              <FormField label="Day">
                <div className={wrapCls}><input type="number" min={1} max={31} value={form.dayOfBirth} onChange={set("dayOfBirth")} className={inputCls} placeholder="1–31" /></div>
              </FormField>
              <FormField label="Month">
                <div className={wrapCls}>
                  <select value={form.monthOfBirth} onChange={set("monthOfBirth")} className={selectCls}>
                    <option value="">Select month</option>
                    {months.map((m, i) => <option key={m} value={i + 1}>{m}</option>)}
                  </select>
                </div>
              </FormField>
              <FormField label="Year">
                <div className={wrapCls}><input type="number" min={1900} max={2020} value={form.yearOfBirth} onChange={set("yearOfBirth")} className={inputCls} placeholder="e.g. 1990" /></div>
              </FormField>
            </div>

            {form.maritalStatus === "MARRIED" && (
              <>
                <SectionHeading>Wedding Anniversary</SectionHeading>
                <div className="grid grid-cols-3 gap-[16px] w-full">
                  <FormField label="Day">
                    <div className={wrapCls}><input type="number" min={1} max={31} value={form.dayOfWedding} onChange={set("dayOfWedding")} className={inputCls} placeholder="1–31" /></div>
                  </FormField>
                  <FormField label="Month">
                    <div className={wrapCls}>
                      <select value={form.monthOfWedding} onChange={set("monthOfWedding")} className={selectCls}>
                        <option value="">Select month</option>
                        {months.map((m, i) => <option key={m} value={i + 1}>{m}</option>)}
                      </select>
                    </div>
                  </FormField>
                  <FormField label="Year">
                    <div className={wrapCls}><input type="number" min={1950} max={2030} value={form.yearOfWedding} onChange={set("yearOfWedding")} className={inputCls} placeholder="e.g. 2015" /></div>
                  </FormField>
                </div>
              </>
            )}

            <SectionHeading>Contact & Location</SectionHeading>
            <FormField label="Phone Number" required>
              <div className="flex gap-[8px] w-full h-[40px]">
                <div className="bg-[#FFFDFD] border border-[#A3A1AF] rounded-[4px] flex-shrink-0 w-[90px] flex items-center">
                  <select value={form.countryCode} onChange={set("countryCode")} className="w-full h-full px-2 bg-transparent text-[#100E1A] text-sm focus:outline-none">
                    <option value="+234">+234</option>
                    <option value="+1">+1</option>
                    <option value="+44">+44</option>
                    <option value="+27">+27</option>
                    <option value="+33">+33</option>
                  </select>
                </div>
                <div className={`${wrapCls} flex-1`}><input type="tel" required value={form.phoneNumber} onChange={set("phoneNumber")} className={inputCls} /></div>
              </div>
            </FormField>
            <FormField label="Email Address">
              <div className={wrapCls}><input type="email" value={form.email} onChange={set("email")} className={inputCls} /></div>
            </FormField>
            <div className="grid grid-cols-2 gap-[16px] w-full">
              <FormField label="State / City">
                <div className={wrapCls}><input type="text" value={form.state} onChange={set("state")} className={inputCls} /></div>
              </FormField>
              <FormField label="Country">
                <div className={wrapCls}><input type="text" value={form.country} onChange={set("country")} className={inputCls} /></div>
              </FormField>
            </div>

            <SectionHeading>Occupation</SectionHeading>
            <FormField label="Occupation / Profession">
              <div className={wrapCls}><input type="text" value={form.occupation} onChange={set("occupation")} className={inputCls} /></div>
            </FormField>

            {status === "error" && (
              <p className="text-[#FF383C] text-[14px] text-center" style={vs}>{error}</p>
            )}

            <div className="flex justify-center mt-[8px]">
              <button
                type="submit"
                disabled={status === "loading"}
                className="bg-[#000080] px-[32px] py-[16px] rounded-[33px] text-[#FFFDFD] text-[25px] font-medium hover:bg-[#0000a0] transition-colors disabled:opacity-60"
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
